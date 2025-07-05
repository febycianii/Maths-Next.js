
import { Operation } from './types';

export const APP_NAME = "Math Trainer";

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
            { id: 1, description: 'Minuend up to 10' },
            { id: 2, description: 'Minuend up to 20' }
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

export const TIMER_OPTIONS = [8, 4, 3]; // in seconds

export const TOTAL_QUESTIONS = 10;
