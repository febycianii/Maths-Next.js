/**
 * Quiz.tsx
 *
 * This component handles the active quiz session. It's one of the most complex
 * components in the application, managing the quiz state, timer, question progression,
 * and final submission of the results.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
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

    // Retrieve quiz configuration from the navigation state.
    const { operation, stage, timer } = location.state || {};

    // State for the quiz data and progress.
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(timer);
    const [isQuizActive, setIsQuizActive] = useState(false);
    
    // Convenience variable for the current question object.
    const currentQ = questions[currentQuestionIndex];

    /**
     * Generates a new question on-demand
     */
    const generateNewQuestion = useCallback((index: number): QuizQuestion => {
        return {
            ...generateQuestion(operation, stage),
            timeTaken: 0,
        };
    }, [operation, stage]);

    /**
     * This function handles the progression to the next question or the end of the quiz.
     * It's called when the user submits an answer or when the timer runs out.
     */
    const nextQuestion = useCallback(() => {
        if (!currentQ) return;

        // Process the answer for the current question.
        const userAnswerNum = parseInt(currentAnswer, 10);
        const userAnswer = isNaN(userAnswerNum) ? undefined : userAnswerNum;
        const isCorrect = userAnswer === currentQ.correctAnswer;
        const timeTaken = timer - timeLeft;
        
        // Create an updated question object with the user's answer and result.
        const updatedQuestion: QuizQuestion = { ...currentQ, userAnswer, isCorrect, timeTaken };
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = updatedQuestion;
        
        setQuestions(updatedQuestions);
        
        // If there are more questions, advance to the next one.
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setCurrentAnswer('');
            setTimeLeft(timer); // Reset the timer.
            
            // Generate the next question on-demand
            const nextQuestion = generateNewQuestion(nextIndex);
            const newQuestions = [...updatedQuestions];
            newQuestions[nextIndex] = nextQuestion;
            setQuestions(newQuestions);
        } else {
            // End of the quiz.
            const finalQuestions = updatedQuestions;
            const score = Math.round((finalQuestions.filter(q => q.isCorrect).length / TOTAL_QUESTIONS) * 100);
            
            // Construct the quiz session object to be saved.
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

            // Save the session and navigate to the results page.
            api.saveQuizSession(session).then(() => {
                navigate('/quiz/results', { state: { session } });
            }).catch(error => {
                console.error("Failed to save quiz session:", error);
                alert("There was an error saving your quiz results. You will be returned to the dashboard.");
                navigate('/dashboard');
            });
        }
    }, [currentAnswer, currentQ, currentQuestionIndex, navigate, operation, questions, stage, timer, timeLeft, user, generateNewQuestion]);

    // useRef to hold the latest version of the nextQuestion callback.
    // This is a crucial pattern to avoid stale closures in the timer's setInterval,
    // ensuring the timer always calls the most up-to-date version of the function.
    const savedNextQuestion = useRef(nextQuestion);
    useEffect(() => {
        savedNextQuestion.current = nextQuestion;
    });

    // Effect to initialize the quiz on component mount.
    useEffect(() => {
        // If config is missing, redirect back to setup.
        if (!operation || !stage || !timer || !user) {
            navigate('/quiz/select');
            return;
        }

        // Generate only the first question initially for better performance
        const firstQuestion = generateNewQuestion(0);
        setQuestions([firstQuestion]);
        setTimeLeft(timer);
        setIsQuizActive(true);
    }, [operation, stage, timer, user, navigate, generateNewQuestion]);

    // Effect to manage the question timer.
    useEffect(() => {
        if (!isQuizActive || questions.length === 0) return; // Don't start the timer until quiz is active and questions are loaded.
        
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // When time expires, call the latest nextQuestion function via the ref.
                    savedNextQuestion.current();
                    return timer; // This return won't be used as component state changes, but it's good practice.
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts or dependencies change.
        return () => clearInterval(interval);
    }, [timer, isQuizActive]); // Removed questions.length dependency to fix timer restart issue

    // Handle form submission when the user presses Enter.
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

                {/* Progress bar */}
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
