import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { getErrorMessage } from '../services/api';

export const AllPostsContext = createContext();

export const AllPostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/posts/getAll');
      // API returns { posts: [...], pagination: {...} }, not a bare array.
      setPosts(Array.isArray(res.data?.posts) ? res.data.posts : []);
    } catch (err) {
      console.error('Error fetching all posts:', err);
      setError(getErrorMessage(err, 'Failed to load posts.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const value = useMemo(
    () => ({ posts, loading, error, refresh: fetchAllPosts }),
    [posts, loading, error, fetchAllPosts]
  );

  return <AllPostsContext.Provider value={value}>{children}</AllPostsContext.Provider>;
};

export const useAllPosts = () => useContext(AllPostsContext);
