import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import api, { getErrorMessage } from '../services/api';

const UpdatePostContext = createContext();

export const UpdatePostProvider = ({ children }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  const updatePost = useCallback(async (postId, updates) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);
    try {
      const res = await api.patch(`/posts/${postId}`, updates);
      setUpdateSuccess(res.data.message);
      return res.data.post; // return updated post
    } catch (err) {
      setUpdateError(getErrorMessage(err, 'Update failed'));
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const value = useMemo(
    () => ({ updatePost, isUpdating, updateError, updateSuccess }),
    [updatePost, isUpdating, updateError, updateSuccess]
  );

  return (
    <UpdatePostContext.Provider value={value}>
      {children}
    </UpdatePostContext.Provider>
  );
};

export const useUpdatePost = () => useContext(UpdatePostContext);
