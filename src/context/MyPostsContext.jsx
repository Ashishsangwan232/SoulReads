// contexts/MyPostsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const MyPostsContext = createContext();

export const MyPostsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API_URL = import.meta.env.VITE_API_URL;
  const fetchMyPosts = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/posts/me`);
      setMyPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  return (
    <MyPostsContext.Provider value={{ myPosts, loading, error, refreshMyPosts: fetchMyPosts }}>
      {children}
    </MyPostsContext.Provider>
  );
};

export const useMyPosts = () => useContext(MyPostsContext)