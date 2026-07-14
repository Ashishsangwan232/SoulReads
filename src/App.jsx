import React, { Suspense, lazy } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './protection/ProtectedRoute';
import HeartButton from './components/LikeButton/HeartButton';
import ResendVerification from './pages/ResendVerification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import About from './components/About/About';
import useFCMNotifications from './firebase/useFCMNotifications';
import NewUpdates from './Newupdates/NewUpdates';
import Maintenace from './Maintenace';
import NotFound from './pages/NotFound';
import Loading from './components/loader/Loading';

// These pull in heavy dependencies (Slate editor, Dashboard's own tree of
// widgets) that anonymous/read-only visitors shouldn't have to download upfront.
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AutosaveHistory = lazy(() => import('./pages/AutosaveHistory'));
const WritingPageSlate = lazy(() => import('./RichTextEditor/WritingPageSlate'));
const WritingPageSlateEditing = lazy(() => import('./RichTextEditor/WritingPageSlateEditing'));
const ExploreMain = lazy(() => import('./components/NewExplore/ExploreMain'));
const VerifySuccess = lazy(() => import('./pages/VerifySuccess'));
const ReadMore = lazy(() => import('./components/Readmore/Readmore'));
const AddComment = lazy(() => import('./components/comment/Addcomment'));
const UserProfile = lazy(() => import('./components/userdetails/UserProfile'));

// Toggle this in your .env file: VITE_MAINTENANCE_MODE=true
// When true, every route falls back to the Maintenance page instead of the real app.
const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

function App() {
  useFCMNotifications();
  const location = useLocation();
  const ispage = location.pathname === '/login' || location.pathname === '/register' || location.pathname == '/dashboard' || location.pathname == "/writing" || location.pathname == "/richtext";

  if (MAINTENANCE_MODE) {
    return (
      <Routes>
        <Route path="*" element={<Maintenace />} />
      </Routes>
    );
  }

  return (
    <>
      <div>
        {!ispage && <Navbar />}
      </div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heart" element={<HeartButton />} />
          <Route path="/posts/:id" element={<ReadMore />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editing/:id?" element={<WritingPageSlateEditing />} />
          <Route path="/autosave-history" element={<AutosaveHistory />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/updates" element={<NewUpdates />} />

          <Route path="/explore" element={<ExploreMain />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/addcomment" element={<AddComment />} />
            <Route path="/writing" element={<WritingPageSlate />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/verify-success" element={<VerifySuccess />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!ispage && <Footer />}
    </>
  );
}

export default App;
