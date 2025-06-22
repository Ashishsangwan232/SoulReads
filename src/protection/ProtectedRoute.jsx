// src/routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Renders its children if user is logged-in.
 * Otherwise it redirects to /login and remembers the page the user wanted.
 */
const ProtectedRoute = () => {
  const { user,loading } = useContext(AuthContext);
  const location = useLocation();

   if (loading) {
    return <div>Loading...</div>; // or a loader spinner
  }
  // if not logged-in, jump to /login and keep target path in "state"
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // logged-in – render nested route component(s)
  return <Outlet />;
};

export default ProtectedRoute;
