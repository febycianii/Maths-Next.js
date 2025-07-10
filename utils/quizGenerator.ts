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
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer between min and max.
 */
const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a single math question based on the operation and difficulty stage.
 * @param operation The mathematical operation (e.g., Addition).
 * @param stage The difficulty level (1, 2, 3, etc.).
 * @returns An object containing the question string and its correct answer.
 */
export const generateQuestion = (operation: Operation, stage: number): Omit<QuizQuestion, 'userAnswer' | 'isCorrect' | 'timeTaken'> => {
    let num1: number, num2: number, question: string, correctAnswer: number;

    switch (operation) {
        case Operation.Addition:
            if (stage === 1) { // 0-5 + 0-5
                num1 = getRandomInt(0, 5);
                num2 = getRandomInt(0, 5);
            } else if (stage === 2) { // 0-10 + 0-10
                num1 = getRandomInt(0, 10);
                num2 = getRandomInt(0, 10);
            } else if (stage === 3) { // 0-20 + 0-20
                num1 = getRandomInt(0, 20);
                num2 = getRandomInt(0, 20);
            } else {
                throw new Error(`Unsupported addition stage: ${stage}. Supported stages: 1, 2, 3`);
            }
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;

        case Operation.Subtraction:
            // Ensures the result is not negative.
            if (stage === 1) { // Minuend (the first number) up to 10
                num1 = getRandomInt(1, 10);
                num2 = getRandomInt(0, num1);
            } else if (stage === 2) { // Minuend up to 20
                num1 = getRandomInt(1, 20);
                num2 = getRandomInt(0, num1);
            } else {
                throw new Error(`Unsupported subtraction stage: ${stage}. Supported stages: 1, 2`);
            }
            question = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
            
        case Operation.Multiplication:
            if (stage === 1) { // Times tables for 1-5
                num1 = getRandomInt(1, 5);
                num2 = getRandomInt(1, 5);
            } else if (stage === 2) { // Times tables for 6-10 (both numbers should be 6-10)
                num1 = getRandomInt(6, 10);
                num2 = getRandomInt(6, 10);
            } else if (stage === 3) { // Mixed times tables for 1-10
                num1 = getRandomInt(1, 10);
                num2 = getRandomInt(1, 10);
            } else {
                throw new Error(`Unsupported multiplication stage: ${stage}. Supported stages: 1, 2, 3`);
            }
            question = `${num1} × ${num2}`;
            correctAnswer = num1 * num2;
            break;

        default:
            // Fallback for an unsupported operation.
            throw new Error(`Unknown operation: ${operation}. Supported operations: ${Object.values(Operation).join(', ')}`);
    }

    return { question, correctAnswer };
};
