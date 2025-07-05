
import { User, Role, QuizSession } from '../types';

const DB_KEYS = {
    USERS: 'math_trainer_users',
    SESSIONS: 'math_trainer_sessions'
};

// Types for credentials and signup data
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    role: Role;
}


// Helper functions to interact with localStorage
const getFromDb = <T>(key: string): T[] => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Error reading from localStorage key "${key}"`, e);
        return [];
    }
};

const saveToDb = <T>(key: string, data: T[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error writing to localStorage key "${key}"`, e);
    }
};

// The main API object that mimics a backend service
export const api = {
    initialize: (): void => {
        const users = getFromDb<User>(DB_KEYS.USERS);
        if (users.length === 0) {
            // Create a default admin user if no users exist
            const adminUser: User = {
                id: 'admin_user',
                name: 'Admin',
                email: 'admin@mathtrainer.com',
                // NOTE: In a real app, never store plain text passwords
                password: 'admin', 
                role: Role.Admin,
            };
            saveToDb(DB_KEYS.USERS, [adminUser]);
            console.log('Default admin user created. Email: admin@mathtrainer.com, Pass: admin');
        }
    },

    login: async ({ email, password }: LoginCredentials): Promise<User> => {
        const users = getFromDb<User>(DB_KEYS.USERS);
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password.');
        }
        return user;
    },

    signup: async (data: SignUpData): Promise<void> => {
        const users = getFromDb<User>(DB_KEYS.USERS);
        if (users.some(u => u.email === data.email)) {
            throw new Error('An account with this email already exists.');
        }
        const newUser: User = {
            id: `user_${Date.now()}`,
            ...data
        };
        users.push(newUser);
        saveToDb(DB_KEYS.USERS, users);
    },

    getUsers: async (): Promise<User[]> => {
        return getFromDb<User>(DB_KEYS.USERS);
    },
    
    addUser: async (user: User): Promise<User> => {
        const users = getFromDb<User>(DB_KEYS.USERS);
        if (users.some(u => u.email === user.email && u.id !== user.id)) {
            throw new Error('User with this email already exists.');
        }
        users.push(user);
        saveToDb(DB_KEYS.USERS, users);
        return user;
    },

    updateUser: async (updatedUser: User): Promise<User> => {
        let users = getFromDb<User>(DB_KEYS.USERS);
        const userIndex = users.findIndex(u => u.id === updatedUser.id);
        if (userIndex === -1) {
            throw new Error('User not found.');
        }

        const originalUser = users[userIndex];
        // Keep original password if the new one is empty/not provided
        if (!updatedUser.password) {
            updatedUser.password = originalUser.password;
        }

        users[userIndex] = updatedUser;
        saveToDb(DB_KEYS.USERS, users);
        return updatedUser;
    },

    deleteUser: async (userId: string): Promise<void> => {
        let users = getFromDb<User>(DB_KEYS.USERS);
        users = users.filter(u => u.id !== userId);
        saveToDb(DB_KEYS.USERS, users);
    },

    getQuizSessionsByUserId: async (userId: string): Promise<QuizSession[]> => {
        const sessions = getFromDb<QuizSession>(DB_KEYS.SESSIONS);
        return sessions.filter(s => s.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    saveQuizSession: async (session: QuizSession): Promise<void> => {
        const sessions = getFromDb<QuizSession>(DB_KEYS.SESSIONS);
        sessions.push(session);
        saveToDb(DB_KEYS.SESSIONS, sessions);
    }
};
