
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import QuizSetup from './pages/QuizSetup';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/quiz/select" element={<Layout><QuizSetup /></Layout>} />
                <Route path="/quiz/start" element={<Layout><Quiz /></Layout>} />
                <Route path="/quiz/results" element={<Layout><QuizResults /></Layout>} />
            </Route>

            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;
