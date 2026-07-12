import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import api, { getErrorMessage } from '../services/api';
import { AuthContext } from './AuthContext';

export const MyPostsArchivedContext = createContext();

export const MyPostsArchivedProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [myPostsArchived, setMyPostsArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPostsArchived = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Path is lowercase per the API contract (only /posts/me/Deleted uses a capital D).
      const res = await api.get('/posts/me/archived');
      // API returns { posts: [...], pagination: {...} }, not a bare array.
      setMyPostsArchived(Array.isArray(res.data?.posts) ? res.data.posts : []);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch Archived posts.'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyPostsArchived();
  }, [fetchMyPostsArchived]);

  const value = useMemo(
    () => ({ myPostsArchived, loading, error, refreshMyPosts: fetchMyPostsArchived }),
    [myPostsArchived, loading, error, fetchMyPostsArchived]
  );

  return <MyPostsArchivedContext.Provider value={value}>{children}</MyPostsArchivedContext.Provider>;
};

export const useMyPostsArchived = () => useContext(MyPostsArchivedContext);
