/**
 * constants.ts
 *
 * This file defines application-wide constants to avoid magic strings and numbers,
 * making the code easier to maintain and configure.
 */
import { Operation } from './types';

// The official name of the application, used in headers and titles.
export const APP_NAME = "Math Trainer";

// Configuration object for all quiz types.
// It structures the available operations, their names, and difficulty stages.
export const QUIZ_CONFIG = {
    [Operation.Addition]: {
        name: 'Addition',
        stages: [
            { id: 1, description: 'Numbers 0-5 + 0-5' },
            { id: 2, description: 'Numbers 0-10 + 0-10' },
            { id: 3, description: 'Numbers 0-20 + 0-20' }
        ]
    },
    [Operation.Subtraction]: {
        name: 'Subtraction',
        stages: [
            { id: 1, description: 'Minuend up to 10' }, // e.g., 9 - 4
            { id: 2, description: 'Minuend up to 20' }  // e.g., 18 - 7
        ]
    },
    [Operation.Multiplication]: {
        name: 'Multiplication',
        stages: [
            { id: 1, description: 'Times tables 1-5' },
            { id: 2, description: 'Times tables 6-10' },
            { id: 3, description: 'Mixed times tables 1-10' }
        ]
    }
};

// Available timer options (in seconds) for each quiz question.
export const TIMER_OPTIONS = [8, 4, 3];

// The total number of questions in every quiz session.
export const TOTAL_QUESTIONS = 10;
