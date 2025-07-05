/**
 * App.tsx
 *
 * This is the root component of the application.
 * It sets up the main application structure, including the authentication provider and routing.
 */
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Import page and layout components
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import QuizSetup from './pages/QuizSetup';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

/**
 * AppRoutes component defines the application's routing logic.
 * It uses React Router to render different pages based on the URL.
 * It also distinguishes between public routes (Login, SignUp) and protected routes
 * that require authentication.
 */
const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>
            {/* Public routes accessible to everyone */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes wrapped by the ProtectedRoute component */}
            {/* The Layout component provides a consistent header and navigation for these pages */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/quiz/select" element={<Layout><QuizSetup /></Layout>} />
                <Route path="/quiz/start" element={<Layout><Quiz /></Layout>} />
                <Route path="/quiz/results" element={<Layout><QuizResults /></Layout>} />
            </Route>

            {/* Fallback route: Redirects to dashboard if logged in, or login page if not. */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
};


/**
 * The main App component.
 * It wraps the entire application with the AuthProvider to make authentication state
 * available to all components. It also sets up HashRouter for client-side routing.
 */
const App: React.FC = () => {
  return (
    // AuthProvider manages user authentication state globally.
    <AuthProvider>
        {/* HashRouter is used for routing. It uses the URL hash to keep UI in sync with the URL. */}
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;
