import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReadMore from './components/Readmore/Readmore';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './protection/ProtectedRoute';
import HeartButton from './components/LikeButton/HeartButton';
import AutosaveHistory from './pages/AutosaveHistory';
import ResendVerification from './pages/ResendVerification';
import VerifySuccess from './pages/VerifySuccess';
import WritingPageSlate from './RichTextEditor/WritingPageSlate';
import WritingPageSlateEditing from './RichTextEditor/WritingPageSlateEditing';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AddComment from './components/comment/Addcomment';
import About from './components/About/About'; 
import UserProfile from './components/userdetails/UserProfile'
import useFCMNotifications from './firebase/useFCMNotifications';
import NewUpdates from './Newupdates/NewUpdates';
import TopbarUpdate from './Newupdates/TopbarUpdate';

function App() {
  useFCMNotifications();
  const location = useLocation();
  const ispage = location.pathname === '/login' || location.pathname === '/register' || location.pathname == '/dashboard' || location.pathname == "/writing" || location.pathname == "/richtext";
  return (
    <>
    <TopbarUpdate/>
      {!ispage && <Navbar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<HeartButton />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/posts/:id" element={<ReadMore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editing/:id?" element={<WritingPageSlateEditing />} />
        <Route path="/autosave-history" element={<AutosaveHistory />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/updates" element={<NewUpdates />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/addcomment" element={<AddComment />} />
          <Route path="/writing" element={<WritingPageSlate />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
      </Routes>
      {!ispage && <Footer />}
    </>
  );
}

export default App;
