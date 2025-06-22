import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { AllPostsProvider } from './context/AllPostsContext';
import { MyPostsProvider } from './context/MyPostsContext';
import { BookmarksProvider } from './context/BookmarksContext';
// import { LikeProvider } from './context/LikedPostsContext';
import { DraftsProvider } from './context/DraftsContext';
import { TrashProvider } from './context/TrashContext';
import { SinglePostProvider } from './context/SinglePostContext';
import { PostActionsProvider } from './context/PostActionsContext'; // For toggles and deletions
import { CommentProvider } from './context/CommentsContext';
import { CountPostProvider } from './context/CountPostContext';
import { ArchiveProvider } from './context/ArchiveContext';
import { MyPostsArchivedProvider } from './context/MyPostsContextArchieved';
import { LikeProvider } from './context/Likecontext';
import { UpdatePostProvider } from './context/UpdatePostContext';
import { DeleteProvider } from './context/DeleteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AllPostsProvider>
          <MyPostsProvider>
            <BookmarksProvider>
              <UpdatePostProvider>
                <LikeProvider>
                  <DraftsProvider>
                    <DeleteProvider>
                      <TrashProvider>
                        <ArchiveProvider>
                          <MyPostsArchivedProvider>
                            <SinglePostProvider>
                              <PostActionsProvider>
                                <CommentProvider>
                                  <CountPostProvider>
                                    <App />
                                  </CountPostProvider>
                                </CommentProvider>
                              </PostActionsProvider>
                            </SinglePostProvider>
                          </MyPostsArchivedProvider>
                        </ArchiveProvider>
                      </TrashProvider>
                    </DeleteProvider>
                  </DraftsProvider>
                </LikeProvider>
              </UpdatePostProvider>
            </BookmarksProvider>
          </MyPostsProvider>
        </AllPostsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);