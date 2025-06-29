import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useLikeContext } from './Likecontext';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const { checkUserLikeStatus } = useLikeContext();

  const fetchComments = useCallback(async (postId, showLoading = false) => {
    if (!postId) return;

    if (showLoading) setLoadingComments(true);
    setCurrentPostId(postId);

    try {
      const res = await axios.get(`${API_URL}/comments/${postId}`);
      const rawComments = Array.isArray(res.data) ? res.data : [];

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
      console.error("Error fetching comments:", err);
      setError('Failed to load comments');
    } finally {
      setLoadingComments(false);
      setInitialLoad(false);
    }
  }, [API_URL, checkUserLikeStatus]);

  const addComment = useCallback(async (postId, content) => {
    if (!content?.trim()) {
      return { success: false, error: 'Comment cannot be empty' };
    }

    try {
      const res = await axios.post(`${API_URL}/comments/${postId}`, { content });
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
  }, [API_URL, checkUserLikeStatus]);

  const deleteComment = async (commentId, postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        await axios.patch(`${API_URL}/posthard/comments/${commentId}`, {
          withCredentials: true
        });
        fetchComments(postId, false); // No loading UI for polling update
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Could not delete comment.");
    }
  };

  // Polling: Refresh comments every 10 seconds, no loader flash
  useEffect(() => {
    if (!currentPostId) return;

    fetchComments(currentPostId, true); // Initial load shows loader

    const interval = setInterval(() => {
      fetchComments(currentPostId, false); // Silent polling
    }, 8000);

    return () => clearInterval(interval);
  }, [currentPostId, fetchComments]);

  return (
    <CommentContext.Provider value={{
      comments,
      loadingComments,
      error,
      fetchComments,
      addComment,
      setComments,
      deleteComment,
    }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => useContext(CommentContext);
