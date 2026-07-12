import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import api, { getErrorMessage } from '../services/api';
import { useMyPosts } from './MyPostsContext';

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const { refreshMyPosts } = useMyPosts();
  const [loading, setLoading] = useState(false);

  const toggleArchive = useCallback(async (postId) => {
    try {
      setLoading(true);
      const res = await api.patch(`/posts/toggle-archive/${postId}`);
      refreshMyPosts();
      return res.data;
    } catch (err) {
      console.error('Error toggling archive:', getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshMyPosts]);

  const value = useMemo(() => ({ loading, toggleArchive }), [loading, toggleArchive]);

  return (
    <ArchiveContext.Provider value={value}>
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
