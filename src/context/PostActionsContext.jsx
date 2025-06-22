import { createContext, useContext } from 'react';
import axios from 'axios';

export const PostActionsContext = createContext();

export const PostActionsProvider = ({ children }) => {
  const token = localStorage.getItem('token');

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const toggleLike = async (postId) => {
    try {
      await axios.patch(`/api/posts/${postId}/like`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      await axios.patch(`/api/posts/${postId}/bookmark`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const toggleArchive = async (postId) => {
    try {
      await axios.patch(`/api/posts/${postId}/archive`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling archive:', err);
    }
  };

  const softDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, authHeaders);
    } catch (err) {
      console.error('Error soft deleting post:', err);
    }
  };

  const hardDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}/permanent`, authHeaders);
    } catch (err) {
      console.error('Error hard deleting post:', err);
    }
  };

  return (
    <PostActionsContext.Provider value={{
      toggleLike,
      toggleBookmark,
      toggleArchive,
      softDeletePost,
      hardDeletePost
    }}>
      {children}
    </PostActionsContext.Provider>
  );
};

export const usePostActions = () => useContext(PostActionsContext);
