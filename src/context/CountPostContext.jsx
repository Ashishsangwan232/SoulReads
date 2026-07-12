import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api, { getErrorMessage } from "../services/api";

export const CountPostContext = createContext();

export const CountPostProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTotalPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/posts/count');
      setCount(res.data.totalPosts);
    } catch (err) {
      console.error("Error fetching Total Post count: ", err);
      setError(getErrorMessage(err, "Failed to load posts."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTotalPost();
  }, [fetchTotalPost]);

  const value = useMemo(
    () => ({ count, loading, error, refreshMyPosts: fetchTotalPost }),
    [count, loading, error, fetchTotalPost]
  );

  return (
    <CountPostContext.Provider value={value}>
      {children}
    </CountPostContext.Provider>
  );
};

export const useTotalPostCount = () => useContext(CountPostContext);
