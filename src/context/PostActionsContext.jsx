import { createContext, useContext } from 'react';
import axios from 'axios';

export const PostActionsContext = createContext();

export const PostActionsProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;
  
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const toggleLike = async (postId) => {
    try {
      await axios.patch(`${API_URL}/posts/${postId}/like`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      await axios.patch(`${API_URL}/posts/${postId}/bookmark`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const toggleArchive = async (postId) => {
    try {
      await axios.patch(`${API_URL}/posts/${postId}/archive`, {}, authHeaders);
    } catch (err) {
      console.error('Error toggling archive:', err);
    }
  };

  const softDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}`, authHeaders);
    } catch (err) {
      console.error('Error soft deleting post:', err);
    }
  };

  const hardDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/permanent`, authHeaders);
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
