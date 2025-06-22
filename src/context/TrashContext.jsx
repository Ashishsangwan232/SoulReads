import { createContext, useContext, useEffect, useState } from 'react';
import { useMyPosts } from './MyPostsContext';

export const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
  const { myPosts, loading: myLoading } = useMyPosts();
  const [trashed, setTrashed] = useState([]);

  useEffect(() => {
    const filtered = myPosts.filter((post) => post.isDeleted);
    setTrashed(filtered);
  }, [myPosts]);

  return (
    <TrashContext.Provider value={{ trashed, loading: myLoading }}>
      {children}
    </TrashContext.Provider>
  );
};

export const useTrash = () => useContext(TrashContext);
