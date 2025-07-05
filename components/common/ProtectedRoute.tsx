/**
 * ProtectedRoute.tsx
 *
 * This component acts as a guard for routes that require user authentication.
 * It checks the authentication state from the AuthContext. If the user is authenticated,
 * it renders the child routes (via <Outlet />). Otherwise, it redirects the user
 * to the login page. It also handles the loading state while authentication is being verified.
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  // Get authentication status from the custom hook.
  const { isAuthenticated, isLoading } = useAuth();

  // While the authentication status is being checked, display a loading message.
  // This prevents a flash of the login page for already authenticated users on page refresh.
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If the user is not authenticated, redirect them to the login page.
  // The 'replace' prop prevents the user from navigating back to the protected route.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the nested child routes.
  // <Outlet /> is a placeholder for the child routes defined in App.tsx.
  return <Outlet />;
};

export default ProtectedRoute;
