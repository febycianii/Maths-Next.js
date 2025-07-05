
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { QuizSession, Operation } from '../../types';
import ProgressChart from '../common/ProgressChart';
import StyledButton from '../common/StyledButton';
import { PlusCircleIcon, BarChartIcon } from '../Icons';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState<QuizSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            if (user) {
                const userSessions = await api.getQuizSessionsByUserId(user.id);
                setSessions(userSessions);
            }
            setIsLoading(false);
        };
        fetchSessions();
    }, [user]);

    const getAverageScore = (operation: Operation) => {
        const opSessions = sessions.filter(s => s.operation === operation);
        if (opSessions.length === 0) return 0;
        const totalScore = opSessions.reduce((sum, s) => sum + s.score, 0);
        return Math.round(totalScore / opSessions.length);
    };
    
    const chartData = [
        { name: 'Addition', score: getAverageScore(Operation.Addition) },
        { name: 'Subtraction', score: getAverageScore(Operation.Subtraction) },
        { name: 'Multiplication', score: getAverageScore(Operation.Multiplication) },
    ];

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
                    <p className="text-gray-600">Ready to sharpen your math skills? Let's get started.</p>
                </div>
                <StyledButton size="lg" onClick={() => navigate('/quiz/select')}>
                    <PlusCircleIcon className="w-6 h-6 mr-2" />
                    Start New Quiz
                </StyledButton>
            </div>

            {isLoading ? (
                <p>Loading progress...</p>
            ) : sessions.length > 0 ? (
                <>
                <ProgressChart data={chartData} />
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Quizzes</h3>
                    <ul className="divide-y divide-gray-200">
                        {sessions.slice(0, 5).map(session => (
                            <li key={session.sessionId} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800 capitalize">{session.operation} - Stage {session.stage}</p>
                                    <p className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
                                </div>
                                <div className={`font-bold text-lg ${session.score >= 80 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {session.score}%
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <BarChartIcon className="w-16 h-16 mx-auto text-gray-300" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-700">No quizzes taken yet</h3>
                    <p className="mt-1 text-gray-500">Complete your first quiz to see your progress here.</p>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
