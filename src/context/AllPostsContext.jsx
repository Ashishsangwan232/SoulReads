import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AllPostsContext = createContext();

export const AllPostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/posts/getAll`);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching all posts:', err);
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <AllPostsContext.Provider value={{ posts, loading, error, refresh: fetchAllPosts }}>
      {children}
    </AllPostsContext.Provider>
  );
};

export const useAllPosts = () => useContext(AllPostsContext);
