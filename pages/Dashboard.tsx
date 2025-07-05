
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import AdminDashboard from '../components/admin/UserManagement';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import StudentDashboard from '../components/student/StudentDashboard';
import ParentDashboard from '../components/parent/ParentDashboard';

const Dashboard: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center p-4">Loading dashboard...</div>;
    }

    if (!user) {
        return <div className="text-center p-4 text-danger">Error: User not found.</div>;
    }

    const renderDashboard = () => {
        switch (user.role) {
            case Role.Admin:
                return <AdminDashboard />;
            case Role.Teacher:
                return <TeacherDashboard />;
            case Role.Student:
                return <StudentDashboard />;
            case Role.Parent:
                return <ParentDashboard />;
            default:
                return <div>Unknown role. Please contact support.</div>;
        }
    };

    return (
        <div>
            {renderDashboard()}
        </div>
    );
};

export default Dashboard;
