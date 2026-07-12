import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loadingbookmared, setLoadingBookmared] = useState(true);

  // Fetch bookmarks when user logs in
  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      setLoadingBookmared(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await api.get('/bookmark/bookmarked');
        // API returns { bookmarks: [...], pagination: {...} }, not a bare array.
        // Each item includes a `post` field if populated.
        setBookmarks(Array.isArray(res.data?.bookmarks) ? res.data.bookmarks : []);
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err.message);
      } finally {
        setLoadingBookmared(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  // Toggle bookmark. Trusts the server's response (201 = added, 200 = removed)
  // rather than guessing from local state, so it can't drift out of sync.
  const toggleBookmark = useCallback(async (postId) => {
    try {
      const res = await api.post(`/bookmark/togglebookmark/${postId}`);
      const wasAdded = res.status === 201;

      if (wasAdded) {
        setBookmarks((prev) => [...prev, { post: { _id: postId }, bookmarkedAt: new Date() }]);
      } else {
        setBookmarks((prev) => prev.filter((b) => b.post._id !== postId));
      }
    } catch (err) {
      console.error('Toggle bookmark failed:', err.message);
    }
  }, []);

  const isBookmarked = useCallback(
    (postId) => bookmarks.some((b) => b.post._id === postId),
    [bookmarks]
  );

  const getBookmarkedPosts = useCallback(
    () => bookmarks.map((b) => b.post),
    [bookmarks]
  );

  const value = useMemo(
    () => ({ bookmarks, toggleBookmark, isBookmarked, getBookmarkedPosts, loadingbookmared }),
    [bookmarks, toggleBookmark, isBookmarked, getBookmarkedPosts, loadingbookmared]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

export const useBookmarks = () => useContext(BookmarksContext);
