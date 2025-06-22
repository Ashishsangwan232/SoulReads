
// src/contexts/commentContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useLikeContext } from './Likecontext'; // ✅ Import like context

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { checkUserLikeStatus } = useLikeContext(); // ✅ Access like checker

  const fetchComments = useCallback(async (postId) => {
    setLoadingComments(true);
    setComments([]);
    try {
      const res = await axios.get(`${API_URL}/comments/${postId}`);
      const rawComments = res.data;

      // ✅ Enrich comments with like status
      const enrichedComments = await Promise.all(
        rawComments.map(async (comment) => {
          try {
            const { liked } = await checkUserLikeStatus(comment._id, 'Comment');
            return { ...comment, isLikedByCurrentUser: liked };
          } catch (err) {
            console.warn(`Like status failed for comment ${comment._id}`);
            return { ...comment, isLikedByCurrentUser: false }; // fallback
          }
        })
      );

      setComments(enrichedComments);
      setError(null);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError('Failed to load comments');
    } finally {
      setLoadingComments(false);
    }
  }, [checkUserLikeStatus]);

  const addComment = useCallback(async (postId, content) => {
    try {
      const res = await axios.post(`${API_URL}/comments/${postId}`, { content });

      // ✅ Immediately check like status for new comment
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

  return (
    <CommentContext.Provider value={{ comments, loadingComments, error, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => useContext(CommentContext);
