import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useMyPosts } from './MyPostsContext';

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const { refreshMyPosts } = useMyPosts();
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const toggleArchive = async (postId) => {
    try {
      setLoading(true);
      const res = await axios.patch(`${API_URL}/posts/toggle-archive/${postId}`);

      console.log(res.data.message); // Optional: show message to user via toast
      // Refresh user's posts after archive toggle
      refreshMyPosts();
      return res.data;
    } catch (err) {
      console.error('Error toggling archive:', err?.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArchiveContext.Provider value={{ loading, toggleArchive }}>
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
