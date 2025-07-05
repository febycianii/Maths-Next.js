/**
 * QuizSetup.tsx
 *
 * This page allows students to configure their quiz before starting.
 * Users can select the mathematical operation (e.g., Addition), a difficulty stage,
 * and a time limit per question. Once configured, the settings are passed to the
 * Quiz page via React Router's location state.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Operation } from '../types';
import { QUIZ_CONFIG, TIMER_OPTIONS } from '../constants';
import StyledButton from '../components/common/StyledButton';

const QuizSetup: React.FC = () => {
    // State to manage the selected quiz settings.
    const [operation, setOperation] = useState<Operation>(Operation.Addition);
    const [stage, setStage] = useState(1);
    const [timer, setTimer] = useState(TIMER_OPTIONS[0]);
    const navigate = useNavigate();

    /**
     * Navigates to the quiz page, passing the selected configuration
     * in the navigation state.
     */
    const handleStartQuiz = () => {
        navigate('/quiz/start', {
            state: { operation, stage, timer }
        });
    };

    // Get the configuration for the currently selected operation.
    const currentOperationConfig = QUIZ_CONFIG[operation];

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Setup Your Quiz</h1>
            
            <div className="space-y-6">
                {/* Operation Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">1. Choose an Operation</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.values(Operation).map(op => (
                            <button
                                key={op}
                                onClick={() => { setOperation(op); setStage(1); /* Reset stage on op change */ }}
                                className={`p-4 rounded-lg text-center font-bold transition-all duration-200 ${operation === op ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {QUIZ_CONFIG[op].name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stage Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">2. Select a Stage</h2>
                     <div className="space-y-2">
                        {currentOperationConfig.stages.map(s => (
                             <div key={s.id} onClick={() => setStage(s.id)} className={`p-4 rounded-lg cursor-pointer transition-all ${stage === s.id ? 'bg-green-100 border-2 border-secondary' : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'}`}>
                                <p className="font-bold">Stage {s.id}</p>
                                <p className="text-sm text-gray-600">{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timer Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">3. Set the Timer</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {TIMER_OPTIONS.map(t => (
                            <button
                                key={t}
                                onClick={() => setTimer(t)}
                                className={`p-4 rounded-lg text-center font-bold transition-all duration-200 ${timer === t ? 'bg-accent text-white shadow-lg scale-105' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {t} seconds
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-10 text-center">
                 <StyledButton size="lg" onClick={handleStartQuiz}>Start Quiz</StyledButton>
            </div>
        </div>
    );
};

export default QuizSetup;
