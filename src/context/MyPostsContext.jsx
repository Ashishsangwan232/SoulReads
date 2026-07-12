import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import api, { getErrorMessage } from '../services/api';
import { AuthContext } from './AuthContext';

export const MyPostsContext = createContext();

export const MyPostsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get('/posts/me');
      // API returns { posts: [...], pagination: {...} }, not a bare array.
      setMyPosts(Array.isArray(res.data?.posts) ? res.data.posts : []);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch your posts.'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const value = useMemo(
    () => ({ myPosts, loading, error, refreshMyPosts: fetchMyPosts }),
    [myPosts, loading, error, fetchMyPosts]
  );

  return <MyPostsContext.Provider value={value}>{children}</MyPostsContext.Provider>;
};

export const useMyPosts = () => useContext(MyPostsContext);
