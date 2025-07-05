/**
 * Layout.tsx
 *
 * This component provides a consistent layout structure for all authenticated pages.
 * It includes a header with the application name, navigation links, user information,
 * and a logout button. The main content for each page is rendered as children.
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../constants';
import { LogOutIcon, HomeIcon, UserIcon } from '../Icons';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Access user data and logout function from the authentication context.
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    /**
     * Handles the user logout process.
     * It calls the logout function from the auth context and redirects to the login page.
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header section */}
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    {/* App Logo/Name linking to the dashboard */}
                    <Link to="/dashboard" className="text-2xl font-bold text-primary">{APP_NAME}</Link>
                    
                    {/* Navigation and User Info */}
                    <div className="flex items-center space-x-4">
                        <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                            <HomeIcon className="w-5 h-5 mr-1" />
                            Dashboard
                        </Link>
                        {/* Display current user's name and role */}
                        <div className="flex items-center text-gray-700">
                            <UserIcon className="w-5 h-5 mr-2 text-gray-500"/>
                            <span className="font-medium">{user?.name}</span>
                            <span className="text-gray-500 ml-2 text-sm">({user?.role})</span>
                        </div>
                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-500 hover:text-red-700 font-semibold transition-colors"
                            aria-label="Logout"
                        >
                            <LogOutIcon className="w-5 h-5 mr-1" />
                            Logout
                        </button>
                    </div>
                </nav>
            </header>
            
            {/* Main content area where page-specific components are rendered */}
            <main className="container mx-auto p-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;
