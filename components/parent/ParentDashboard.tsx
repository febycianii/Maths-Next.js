
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { BarChartIcon } from '../Icons';

const ParentDashboard: React.FC = () => {
    const { user } = useAuth();

    // In a full app, you would fetch the linked child's data using user.childId
    // and display their performance.

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Parent Dashboard</h2>
            <p className="text-gray-600 mb-6">Welcome, {user?.name}. Monitor your child's progress here.</p>

            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed">
                <BarChartIcon className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-700">Child's Progress Coming Soon</h3>
                <p className="mt-1 text-gray-500">Once your child is linked and completes quizzes, their progress reports will appear here.</p>
            </div>
        </div>
    );
};

export default ParentDashboard;
