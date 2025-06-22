import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Capitalize context properly
export const CountPostContext = createContext();

export const CountPostProvider = ({ children }) => {
  const [count, setCount] = useState(0); // should be number, not []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API_URL = import.meta.env.VITE_API_URL;
  const fetchTotalPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/posts/count`, {
        withCredentials: true 
      });
      setCount(res.data.totalPosts); 
    } catch (err) {
      console.error("Error fetching Total Post count: ", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  // optional auto-fetch when component mounts
  useEffect(() => {
    fetchTotalPost();
  }, []);

  return (
    <CountPostContext.Provider value={{ count, loading, error, refreshMyPosts:fetchTotalPost }}>
      {children}
    </CountPostContext.Provider>
  );
};

export const useTotalPostCount = () => useContext(CountPostContext);
