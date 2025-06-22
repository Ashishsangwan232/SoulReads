import { createContext, useContext, useEffect, useState } from 'react';
import { useMyPosts } from './MyPostsContext';

export const DraftsContext = createContext();

export const DraftsProvider = ({ children }) => {
  const { myPosts, loading: myLoading } = useMyPosts();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const filtered = myPosts.filter((post) => post.status === 'draft' && !post.isDeleted);
    setDrafts(filtered);
  }, [myPosts]);
  return (
    <DraftsContext.Provider value={{ drafts, loading: myLoading }}>
      {children}
    </DraftsContext.Provider>
  );
};

export const useDrafts = () => useContext(DraftsContext);
