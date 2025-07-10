/**
 * quizGenerator.ts
 *
 * This utility file contains the logic for generating individual quiz questions.
 * It's responsible for creating math problems with varying difficulty based on the
 * selected operation and stage.
 */
import { Operation, QuizQuestion } from '../types';

/**
 * Generates a random integer within a specified range (inclusive).
 * Uses a more robust random number generation approach.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer between min and max.
 */
const getRandomInt = (min: number, max: number): number => {
    // Validate input parameters
    if (min > max) {
        throw new Error('Minimum value cannot be greater than maximum value');
    }
    if (min < 0 || max < 0) {
        throw new Error('Values must be non-negative');
    }
    
    // Use crypto.randomBytes for better randomness if available, fallback to Math.random
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return min + (array[0] % (max - min + 1));
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Validates operation and stage parameters to prevent runtime errors.
 * @param operation The mathematical operation.
 * @param stage The difficulty level.
 */
const validateParameters = (operation: Operation, stage: number): void => {
    if (!Object.values(Operation).includes(operation)) {
        throw new Error(`Invalid operation: ${operation}`);
    }
    
    if (!Number.isInteger(stage) || stage < 1) {
        throw new Error(`Invalid stage: ${stage}. Stage must be a positive integer.`);
    }
    
    // Validate stage ranges for each operation
    switch (operation) {
        case Operation.Addition:
            if (stage > 3) {
                throw new Error(`Invalid stage for Addition: ${stage}. Must be 1-3.`);
            }
            break;
        case Operation.Subtraction:
            if (stage > 2) {
                throw new Error(`Invalid stage for Subtraction: ${stage}. Must be 1-2.`);
            }
            break;
        case Operation.Multiplication:
            if (stage > 3) {
                throw new Error(`Invalid stage for Multiplication: ${stage}. Must be 1-3.`);
            }
            break;
    }
};

/**
 * Generates a single math question based on the operation and difficulty stage.
 * @param operation The mathematical operation (e.g., Addition).
 * @param stage The difficulty level (1, 2, 3, etc.).
 * @returns An object containing the question string and its correct answer.
 */
export const generateQuestion = (operation: Operation, stage: number): Omit<QuizQuestion, 'userAnswer' | 'isCorrect' | 'timeTaken'> => {
    // Validate input parameters
    validateParameters(operation, stage);
    
    let num1: number, num2: number, question: string, correctAnswer: number;

    switch (operation) {
        case Operation.Addition:
            if (stage === 1) { // 0-5 + 0-5
                num1 = getRandomInt(0, 5);
                num2 = getRandomInt(0, 5);
            } else if (stage === 2) { // 0-10 + 0-10
                num1 = getRandomInt(0, 10);
                num2 = getRandomInt(0, 10);
            } else { // 0-20 + 0-20
                num1 = getRandomInt(0, 20);
                num2 = getRandomInt(0, 20);
            }
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;

        case Operation.Subtraction:
            // Ensures the result is not negative and handles edge cases properly.
            if (stage === 1) { // Minuend (the first number) up to 10
                num1 = getRandomInt(1, 10);
                num2 = getRandomInt(0, num1);
            } else { // Minuend up to 20
                num1 = getRandomInt(1, 20);
                num2 = getRandomInt(0, num1);
            }
            question = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
            
        case Operation.Multiplication:
            if (stage === 1) { // Times tables for 1-5
                num1 = getRandomInt(1, 5);
                num2 = getRandomInt(1, 5);
            } else if (stage === 2) { // Times tables for 6-10
                num1 = getRandomInt(6, 10);
                num2 = getRandomInt(1, 10);
            } else { // Mixed times tables for 1-10
                num1 = getRandomInt(1, 10);
                num2 = getRandomInt(1, 10);
            }
            question = `${num1} × ${num2}`;
            correctAnswer = num1 * num2;
            break;

        default:
            // This should never be reached due to validation, but provides a fallback
            throw new Error(`Unsupported operation: ${operation}`);
    }

    // Final validation to ensure we have valid numbers
    if (!Number.isFinite(correctAnswer)) {
        throw new Error(`Invalid calculation result for question: ${question}`);
    }

    return { question, correctAnswer };
};
