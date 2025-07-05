
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserIcon } from '../Icons';

const TeacherDashboard: React.FC = () => {
    const { user } = useAuth();

    // In a full app, you would fetch students assigned to this teacher
    // and display their aggregated analytics.

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Teacher Dashboard</h2>
            <p className="text-gray-600 mb-6">Welcome, {user?.name}. Here's an overview of your class.</p>
            
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed">
                <UserIcon className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-700">Class Analytics Coming Soon</h3>
                <p className="mt-1 text-gray-500">This area will show student progress, identify areas of weakness, and allow you to generate reports.</p>
            </div>
        </div>
    );
};

export default TeacherDashboard;
