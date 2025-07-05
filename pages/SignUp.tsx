
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import StyledButton from '../components/common/StyledButton';
import { APP_NAME } from '../constants';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(Role.Student);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        try {
            await signup({ name, email, password, role });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-center text-4xl font-extrabold text-primary">{APP_NAME}</h1>
                    <h2 className="mt-2 text-center text-lg text-gray-600">
                        Create a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                    <div className="space-y-4">
                        <input name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                        <input name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                        <input name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <select name="role" value={role} onChange={e => setRole(e.target.value as Role)} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-primary focus:border-primary">
                            <option value={Role.Student}>I am a Student</option>
                            <option value={Role.Teacher}>I am a Teacher</option>
                            <option value={Role.Parent}>I am a Parent</option>
                        </select>
                    </div>

                    <div>
                        <StyledButton type="submit" className="w-full">
                            Sign up
                        </StyledButton>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
