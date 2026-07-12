import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';
import './index.css';

import ErrorBoundary from './components/ErrorBoundary';
import { UIFeedbackProvider } from './components/UIFeedback/UIFeedbackProvider';
import { composeProviders } from './context/composeProviders';
import { AuthProvider } from './context/AuthContext';
import { AllPostsProvider } from './context/AllPostsContext';
import { MyPostsProvider } from './context/MyPostsContext';
import { BookmarksProvider } from './context/BookmarksContext';
import { DraftsProvider } from './context/DraftsContext';
import { TrashProvider } from './context/TrashContext';
import { SinglePostProvider } from './context/SinglePostContext';
import { CommentProvider } from './context/CommentsContext';
import { CountPostProvider } from './context/CountPostContext';
import { ArchiveProvider } from './context/ArchiveContext';
import { MyPostsArchivedProvider } from './context/MyPostsContextArchived';
import { LikeProvider } from './context/LikeContext';
import { UpdatePostProvider } from './context/UpdatePostContext';
import { DeleteProvider } from './context/DeleteContext';
import { CustomThemeProvider } from './context/ThemeContext';

// Order matches the previous hand-nested tree exactly (outermost first).
// NOTE: PostActionsProvider was removed here — it was dead code that duplicated
// LikeContext/BookmarksContext/ArchiveContext/DeleteContext with broken endpoints.
const AppProviders = composeProviders([
  CustomThemeProvider,
  AuthProvider,
  LikeProvider,
  AllPostsProvider,
  MyPostsProvider,
  BookmarksProvider,
  UpdatePostProvider,
  DraftsProvider,
  DeleteProvider,
  TrashProvider,
  ArchiveProvider,
  MyPostsArchivedProvider,
  SinglePostProvider,
  CommentProvider,
  CountPostProvider,
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UIFeedbackProvider>
        <BrowserRouter>
          <AppProviders>
            <App />
          </AppProviders>
        </BrowserRouter>
      </UIFeedbackProvider>
    </ErrorBoundary>
  </React.StrictMode>
);