// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const roleToDashboard = {
  admin: '/dashboard/admin',
  teacher: '/dashboard/teacher',
  student: '/dashboard/student',
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User is logged in but trying to access unauthorized dashboard
    return <Navigate to={roleToDashboard[user.role]} replace />;
  }

  // User is authorized for this route
  return children;
};

export default ProtectedRoute;
