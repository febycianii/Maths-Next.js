/**
 * Dashboard.tsx
 *
 * This page component serves as a router for the different types of user dashboards.
 * It uses the authenticated user's role from the `useAuth` hook to determine which
 * specific dashboard component to render (e.g., Admin, Teacher, Student, Parent).
 * It also handles the loading state while user data is being fetched.
 */
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

// Import the specific dashboard components for each role.
import AdminDashboard from '../components/admin/UserManagement';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import StudentDashboard from '../components/student/StudentDashboard';
import ParentDashboard from '../components/parent/ParentDashboard';

const Dashboard: React.FC = () => {
    // Get the current user and loading state from the authentication context.
    const { user, isLoading } = useAuth();

    // Display a loading message while the user data is being retrieved.
    if (isLoading) {
        return <div className="text-center p-4">Loading dashboard...</div>;
    }

    // Handle the case where no user is found after loading.
    if (!user) {
        return <div className="text-center p-4 text-danger">Error: User not found.</div>;
    }

    /**
     * Renders the appropriate dashboard component based on the user's role.
     * A switch statement provides a clean way to handle the different roles.
     */
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
                // Fallback for an unknown role.
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
