import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UpdatePostContext = createContext();

export const UpdatePostProvider = ({ children }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const updatePost = async (postId, updates) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);
    try {
      const res = await axios.patch(`${API_URL}/posts/${postId}`, updates);
      setUpdateSuccess(res.data.message);
      return res.data.post; // return updated post
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      setUpdateError(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <UpdatePostContext.Provider
      value={{ updatePost, isUpdating, updateError, updateSuccess }}
    >
      {children}
    </UpdatePostContext.Provider>
  );
};

export const useUpdatePost = () => useContext(UpdatePostContext);
