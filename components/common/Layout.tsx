
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../constants';
import { LogOutIcon, HomeIcon, UserIcon } from '../Icons';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <Link to="/dashboard" className="text-2xl font-bold text-primary">{APP_NAME}</Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                            <HomeIcon className="w-5 h-5 mr-1" />
                            Dashboard
                        </Link>
                        <div className="flex items-center text-gray-700">
                            <UserIcon className="w-5 h-5 mr-2 text-gray-500"/>
                            <span className="font-medium">{user?.name}</span>
                            <span className="text-gray-500 ml-2 text-sm">({user?.role})</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                            <LogOutIcon className="w-5 h-5 mr-1" />
                            Logout
                        </button>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto p-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;