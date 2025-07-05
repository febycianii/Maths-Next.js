
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizSession } from '../types';
import StyledButton from '../components/common/StyledButton';
import { CheckCircleIcon, XCircleIcon } from '../components/Icons';

const QuizResults: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const session: QuizSession | undefined = location.state?.session;

    if (!session) {
        return (
            <div className="text-center">
                <p>No quiz results found.</p>
                <StyledButton onClick={() => navigate('/dashboard')} className="mt-4">Go to Dashboard</StyledButton>
            </div>
        );
    }
    
    const scoreColor = session.score >= 80 ? 'text-green-500' : session.score >= 50 ? 'text-orange-500' : 'text-red-500';

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-4xl font-bold text-gray-800">Quiz Complete!</h1>
                <p className="text-xl text-gray-600 mt-2">Here's how you did:</p>
                <div className={`text-8xl font-bold my-8 ${scoreColor}`}>
                    {session.score}%
                </div>
                <div className="flex justify-center space-x-8 text-lg">
                    <span><strong className="text-green-600">{session.questions.filter(q => q.isCorrect).length}</strong> Correct</span>
                    <span><strong className="text-red-600">{session.questions.filter(q => !q.isCorrect).length}</strong> Incorrect</span>
                </div>
                <div className="mt-10 flex justify-center space-x-4">
                    <StyledButton onClick={() => navigate('/quiz/select')}>Play Again</StyledButton>
                    <StyledButton variant="secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</StyledButton>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Question Breakdown</h2>
                <ul className="divide-y divide-gray-200">
                    {session.questions.map((q, index) => (
                        <li key={index} className="py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                {q.isCorrect ? <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4"/> : <XCircleIcon className="w-6 h-6 text-red-500 mr-4"/>}
                                <span className="text-lg font-mono">{q.question} = {q.correctAnswer}</span>
                            </div>
                            <div className={`text-lg font-bold ${q.isCorrect ? 'text-gray-700' : 'text-red-500'}`}>
                                Your answer: {q.userAnswer ?? 'N/A'}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuizResults;
