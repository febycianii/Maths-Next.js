/**
 * UserManagement.tsx
 *
 * This component provides an interface for administrators to manage users.
 * It displays a list of all users and allows for creating, editing, and deleting them.
 * A modal form is used for adding and editing user details.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { User, Role } from '../../types';
import { PlusCircleIcon, EditIcon, TrashIcon } from '../Icons';
import StyledButton from '../common/StyledButton';

/**
 * Main component for the user management dashboard.
 */
const UserManagement: React.FC = () => {
    // State for storing the list of users.
    const [users, setUsers] = useState<User[]>([]);
    // State to indicate if data is being fetched.
    const [isLoading, setIsLoading] = useState(true);
    // State to hold the user currently being edited. Null for a new user.
    const [editingUser, setEditingUser] = useState<User | null>(null);
    // State to control the visibility of the user form modal.
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetches all users from the API and updates the state.
    // useCallback is used to memoize the function, preventing unnecessary re-renders.
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const allUsers = await api.getUsers();
        setUsers(allUsers);
        setIsLoading(false);
    }, []);

    // Fetch users when the component mounts.
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Handles the deletion of a user after confirmation.
    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await api.deleteUser(userId);
            fetchUsers(); // Refresh the user list.
        }
    };

    // Opens the modal to edit an existing user.
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    // Opens the modal to add a new user.
    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    // Closes the modal and resets the editing state.
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    // Handles form submission from the modal (create or update).
    const handleFormSubmit = async (user: User) => {
        if (editingUser) {
            await api.updateUser(user);
        } else {
            // Create a unique ID for the new user.
            await api.addUser({ ...user, id: `user_${Date.now()}` });
        }
        fetchUsers(); // Refresh the user list.
        handleModalClose();
    };

    if (isLoading) return <div className="text-center p-4">Loading users...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <StyledButton onClick={handleAdd}>
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Add User
                </StyledButton>
            </div>
            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    {/* Table headers */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap capitalize">{user.role}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                                    <button onClick={() => handleEdit(user)} className="text-primary hover:text-primary-hover" aria-label={`Edit ${user.name}`}><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDelete(user.id)} className="text-danger hover:text-red-700" aria-label={`Delete ${user.name}`}><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Render modal form if isModalOpen is true */}
            {isModalOpen && <UserFormModal user={editingUser} onClose={handleModalClose} onSubmit={handleFormSubmit} />}
        </div>
    );
};

/**
 * Props for the UserFormModal component.
 */
interface UserFormModalProps {
    user: User | null; // The user to edit, or null to create a new one.
    onClose: () => void;
    onSubmit: (user: User) => void;
}

/**
 * A modal component containing a form to add or edit user details.
 */
const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSubmit }) => {
    // State for the form data, initialized with the user's data if editing.
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        email: user?.email || '',
        password: '', // Password is blank by default for security.
        role: user?.role || Role.Student,
    });

    // Handles changes in form inputs.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handles form submission.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation.
        if (!formData.name || !formData.email || (!user && !formData.password) || !formData.role) {
            alert('Please fill all required fields.');
            return;
        }
        onSubmit(formData as User);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6">{user ? 'Edit User' : 'Add New User'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password {user ? '(leave blank to keep current)' : ''}</label>
                        <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required={!user} />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                            {Object.values(Role).map(role => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
                        </select>
                    </div>
                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <StyledButton type="button" variant="ghost" onClick={onClose}>Cancel</StyledButton>
                        <StyledButton type="submit">{user ? 'Save Changes' : 'Create User'}</StyledButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserManagement;
