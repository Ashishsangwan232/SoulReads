//SinglePostContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const SinglePostContext = createContext();

export const SinglePostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPostById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post by ID:', err);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SinglePostContext.Provider value={{ post, loading, fetchPostById }}>
      {children}
    </SinglePostContext.Provider>
  );
};

export const useSinglePost = () => useContext(SinglePostContext);
