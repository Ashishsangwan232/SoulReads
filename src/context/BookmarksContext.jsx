import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loadingbookmared, setLoadingBookmared] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch bookmarks when user logs in
  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      setLoadingBookmared(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${API_URL}/bookmark/bookmarked`);
        setBookmarks(res.data); // each item includes a `post` field if populated
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err.message);
      } finally {
        setLoadingBookmared(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  // 🔁 Toggle bookmark
  const toggleBookmark = async (postId) => {
    try {
      const res = await axios.post(`${API_URL}/bookmark/togglebookmark/${postId}`);
      const isBookmarked = bookmarks.some((b) => b.post._id === postId);

      if (isBookmarked) {
        setBookmarks(bookmarks.filter((b) => b.post._id !== postId));
      } else {
        const newBookmark = { post: { _id: postId }, bookmarkedAt: new Date() };
        setBookmarks((prev) => [...prev, newBookmark]);
      }
    } catch (err) {
      console.error('Toggle bookmark failed:', err.message);
    }
  };

  // 🧠 Check if bookmarked
  const isBookmarked = (postId) => {
    return bookmarks.some((b) => b.post._id === postId);
  };

  // 📦 Return all bookmarked post objects
  const getBookmarkedPosts = () => {
    return bookmarks.map((b) => b.post);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,            // raw bookmarks with metadata
        toggleBookmark,
        isBookmarked,
        getBookmarkedPosts,   // 📦 easy way to access just the post objects
        loadingbookmared,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
