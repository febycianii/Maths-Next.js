
import { Operation, QuizQuestion } from '../types';

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
            } else { // 0-20 + 0-20
                num1 = getRandomInt(0, 20);
                num2 = getRandomInt(0, 20);
            }
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;

        case Operation.Subtraction:
            if (stage === 1) { // Minuend up to 10
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
            if (stage === 1) { // 1-5
                num1 = getRandomInt(1, 5);
                num2 = getRandomInt(1, 5);
            } else if (stage === 2) { // 6-10
                num1 = getRandomInt(6, 10);
                num2 = getRandomInt(1, 10);
            } else { // 1-10
                num1 = getRandomInt(1, 10);
                num2 = getRandomInt(1, 10);
            }
            question = `${num1} × ${num2}`;
            correctAnswer = num1 * num2;
            break;

        default:
            throw new Error('Unknown operation');
    }

    return { question, correctAnswer };
};
