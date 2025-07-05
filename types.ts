/**
 * types.ts
 *
 * This file contains TypeScript type definitions and enums used across the application.
 * Centralizing types helps maintain consistency and improves code readability.
 */

/**
 * Defines the possible user roles within the application.
 */
export enum Role {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
    Parent = 'parent'
}

/**
 * Represents a user object in the system.
 */
export interface User {
    id: string;          // Unique identifier for the user.
    name: string;
    email: string;
    password: string;    // Note: In a real-world application, this would be a securely hashed password.
    role: Role;
    childId?: string;    // Optional: Links a parent to their child's user ID.
    teacherId?: string;  // Optional: Links a student to their teacher's user ID.
}

/**
 * Defines the types of mathematical operations available for quizzes.
 */
export enum Operation {
    Addition = 'addition',
    Subtraction = 'subtraction',
    Multiplication = 'multiplication'
}

/**
 * Represents a single question within a quiz.
 */
export interface QuizQuestion {
    question: string;          // The mathematical question as a string (e.g., "5 + 3").
    correctAnswer: number;
    userAnswer?: number;       // The user's answer. Undefined if not answered.
    isCorrect?: boolean;       // True if userAnswer matches correctAnswer.
    timeTaken: number;         // Time in seconds the user took to answer this question.
}

/**
 * Represents a completed quiz session.
 * This data is stored to track user progress over time.
 */
export interface QuizSession {
    sessionId: string;        // Unique identifier for the quiz session.
    userId: string;           // The ID of the user who took the quiz.
    date: string;             // ISO string format of when the quiz was completed.
    operation: Operation;     // The mathematical operation of the quiz.
    stage: number;            // The difficulty stage of the quiz.
    timerSetting: number;     // The time limit per question in seconds.
    score: number;            // The final score as a percentage (0-100).
    questions: QuizQuestion[];// An array of all questions from the session.
}
