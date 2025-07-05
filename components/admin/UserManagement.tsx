
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';
import { User, Role } from '../../types';
import { PlusCircleIcon, EditIcon, TrashIcon } from '../Icons';
import StyledButton from '../common/StyledButton';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const allUsers = await api.getUsers();
        setUsers(allUsers);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await api.deleteUser(userId);
            fetchUsers();
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleFormSubmit = async (user: User) => {
        if (editingUser) {
            await api.updateUser(user);
        } else {
            await api.addUser({ ...user, id: `user_${Date.now()}` });
        }
        fetchUsers();
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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap capitalize">{user.role}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                                    <button onClick={() => handleEdit(user)} className="text-primary hover:text-primary-hover"><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDelete(user.id)} className="text-danger hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <UserFormModal user={editingUser} onClose={handleModalClose} onSubmit={handleFormSubmit} />}
        </div>
    );
};

interface UserFormModalProps {
    user: User | null;
    onClose: () => void;
    onSubmit: (user: User) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || Role.Student,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (!formData.name || !formData.email || (!user && !formData.password) || !formData.role) {
            alert('Please fill all required fields.');
            return;
        }
        onSubmit(formData as User);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6">{user ? 'Edit User' : 'Add New User'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password {user ? '(leave blank to keep current)' : ''}</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required={!user} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                            {Object.values(Role).map(role => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
                        </select>
                    </div>
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
