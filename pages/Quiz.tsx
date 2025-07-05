import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuestion } from '../utils/quizGenerator';
import { TOTAL_QUESTIONS } from '../constants';
import { QuizQuestion, QuizSession } from '../types';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Quiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { operation, stage, timer } = location.state || {};

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(timer);
    
    const currentQ = questions[currentQuestionIndex];

    const nextQuestion = useCallback(() => {
        if (!currentQ) return;

        const userAnswerNum = parseInt(currentAnswer, 10);
        const userAnswer = isNaN(userAnswerNum) ? undefined : userAnswerNum;
        const isCorrect = userAnswer === currentQ.correctAnswer;
        const timeTaken = timer - timeLeft;
        
        const updatedQuestion: QuizQuestion = { ...currentQ, userAnswer, isCorrect, timeTaken };
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = updatedQuestion;
        
        // This is crucial for correctly tracking answers before moving to the next question or finishing the quiz.
        setQuestions(updatedQuestions);
        
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentAnswer('');
            setTimeLeft(timer);
        } else {
            // End of quiz
            const finalQuestions = updatedQuestions;
            const score = Math.round((finalQuestions.filter(q => q.isCorrect).length / TOTAL_QUESTIONS) * 100);
            const session: QuizSession = {
                sessionId: `session_${Date.now()}`,
                userId: user!.id,
                date: new Date().toISOString(),
                operation,
                stage,
                timerSetting: timer,
                score,
                questions: finalQuestions,
            };
            api.saveQuizSession(session).then(() => {
                navigate('/quiz/results', { state: { session } });
            });
        }
    }, [currentAnswer, currentQ, currentQuestionIndex, navigate, operation, questions, stage, timer, timeLeft, user]);


    useEffect(() => {
        if (!operation || !stage || !timer || !user) {
            navigate('/quiz/select');
            return;
        }

        const generatedQuestions: QuizQuestion[] = Array.from({ length: TOTAL_QUESTIONS }, () => ({
            ...generateQuestion(operation, stage),
            timeTaken: 0, // Initialize timeTaken, as it is calculated on answer submission
        }));
        setQuestions(generatedQuestions);
        setTimeLeft(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operation, stage, timer, user]);

    useEffect(() => {
        if (questions.length === 0) return;
        
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    nextQuestion();
                    return timer;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, timer, nextQuestion, questions.length]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextQuestion();
    };
    
    if (!currentQ) {
        return <div className="text-center p-8">Loading quiz...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-lg font-bold">Question {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}</div>
                    <div className="text-2xl font-mono bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">{timeLeft}</div>
                </div>

                <div className="my-10">
                    <p className="text-7xl font-bold text-gray-800 tracking-wider">{currentQ.question}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        autoFocus
                        className="w-full text-4xl text-center p-4 border-b-4 border-primary focus:outline-none focus:border-blue-700 transition"
                        placeholder="Your answer"
                    />
                </form>

                <div className="mt-8 h-2.5 w-full bg-gray-200 rounded-full">
                    <div
                        className="h-2.5 bg-secondary rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;