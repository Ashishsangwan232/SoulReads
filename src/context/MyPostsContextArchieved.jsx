// contexts/MyPostsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const MyPostsArchivedContext = createContext();

export const MyPostsArchivedProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [myPostsArchived, setMyPostsArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const fetchMyPostsArchived = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/posts/me/Archived`);
      setMyPostsArchived(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch Archived posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPostsArchived();
  }, [user]);

  return (
    <MyPostsArchivedContext.Provider value={{ myPostsArchived, loading, error, refreshMyPosts: fetchMyPostsArchived }}>
      {children}
    </MyPostsArchivedContext.Provider>
  );
};

export const useMyPostsArchived = () => useContext(MyPostsArchivedContext);
