import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import { useLikeContext } from './LikeContext';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);

  const { checkUserLikeStatus } = useLikeContext();
  // Cancels the in-flight fetch for the *previous* postId so a slow response
  // for post A can't land after post B and overwrite its comments.
  const abortRef = useRef(null);

  const fetchComments = useCallback(async (postId, showLoading = false) => {
    if (!postId) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (showLoading) setLoadingComments(true);
    setCurrentPostId(postId);

    try {
      const res = await api.get(`/comments/${postId}`, { signal: controller.signal });
      // API returns { comments: [...], pagination: {...} }, not a bare array.
      const rawComments = Array.isArray(res.data?.comments) ? res.data.comments : [];

      const enriched = await Promise.all(
        rawComments.map(async (comment) => {
          try {
            const { liked } = await checkUserLikeStatus(comment._id, 'Comment');
            return { ...comment, isLikedByCurrentUser: liked };
          } catch {
            return { ...comment, isLikedByCurrentUser: false };
          }
        })
      );

      setComments(enriched);
      setError(null);

    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      console.error("Error fetching comments:", err);
      setError('Failed to load comments');
    } finally {
      setLoadingComments(false);
    }
  }, [checkUserLikeStatus]);

  const addComment = useCallback(async (postId, content) => {
    if (!content?.trim()) {
      return { success: false, error: 'Comment cannot be empty' };
    }

    try {
      const res = await api.post(`/comments/${postId}`, { content });
      let newComment = res.data;

      try {
        const { liked } = await checkUserLikeStatus(newComment._id, 'Comment');
        newComment = { ...newComment, isLikedByCurrentUser: liked };
      } catch {
        newComment = { ...newComment, isLikedByCurrentUser: false };
      }

      setComments((prev) => [newComment, ...prev]);
      return { success: true };

    } catch (err) {
      console.error("Error adding comment:", err);
      return { success: false, error: 'Failed to add comment' };
    }
  }, [checkUserLikeStatus]);

  // Returns { success, error } instead of alert()-ing directly, so the caller
  // (UI) decides how to present the failure (toast, inline message, etc.).
  const deleteComment = useCallback(async (commentId, postId) => {
    try {
      // NOTE: this endpoint isn't listed in API_REFERENCE.md — confirm the real
      // comment-delete route with the backend team.
      await api.patch(`/posthard/comments/${commentId}`);
      fetchComments(postId, false); // No loading UI for polling update
      return { success: true };
    } catch (err) {
      console.error("Failed to delete comment:", err);
      return { success: false, error: 'Could not delete comment.' };
    }
  }, [fetchComments]);

  // Stops the polling below and clears the loaded comments. Consumers (e.g. the
  // post-detail page) should call this on unmount / when navigating away from a
  // post, otherwise polling for that post keeps running in the background for
  // the lifetime of the app (this provider is mounted at the app root).
  const clearComments = useCallback(() => {
    abortRef.current?.abort();
    setCurrentPostId(null);
    setComments([]);
  }, []);

  // Polling: Refresh comments every 8 seconds while a post's comments are open,
  // no loader flash. Paused while the tab isn't visible to avoid needless requests.
  useEffect(() => {
    if (!currentPostId) return;

    fetchComments(currentPostId, true); // Initial load shows loader

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchComments(currentPostId, false); // Silent polling
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentPostId, fetchComments]);

  const value = useMemo(
    () => ({ comments, loadingComments, error, fetchComments, addComment, setComments, deleteComment, clearComments }),
    [comments, loadingComments, error, fetchComments, addComment, deleteComment, clearComments]
  );

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export const useComments = () => useContext(CommentContext);
