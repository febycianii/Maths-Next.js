
export enum Role {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
    Parent = 'parent'
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // In a real app, this would be a hash
    role: Role;
    childId?: string; // For parents
    teacherId?: string; // For students
}

export enum Operation {
    Addition = 'addition',
    Subtraction = 'subtraction',
    Multiplication = 'multiplication'
}

export interface QuizQuestion {
    question: string;
    correctAnswer: number;
    userAnswer?: number;
    isCorrect?: boolean;
    timeTaken: number;
}

export interface QuizSession {
    sessionId: string;
    userId: string;
    date: string;
    operation: Operation;
    stage: number;
    timerSetting: number;
    score: number;
    questions: QuizQuestion[];
}
