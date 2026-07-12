//SinglePostContext.jsx
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import api from '../services/api';

export const SinglePostContext = createContext();

export const SinglePostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  // Cancels the in-flight fetch for the *previous* id so a slow response for
  // post A can't land after post B and overwrite it (e.g. fast navigation).
  const abortRef = useRef(null);

  const fetchPostById = useCallback(async (id) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`, { signal: controller.signal });
      setPost(res.data);
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      console.error('Error fetching post by ID:', err);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({ post, loading, fetchPostById }), [post, loading, fetchPostById]);

  return (
    <SinglePostContext.Provider value={value}>
      {children}
    </SinglePostContext.Provider>
  );
};

export const useSinglePost = () => useContext(SinglePostContext);
