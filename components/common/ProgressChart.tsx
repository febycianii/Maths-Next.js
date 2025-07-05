/**
 * ProgressChart.tsx
 *
 * A reusable chart component to visualize user progress.
 * It uses the 'recharts' library to render a bar chart, showing scores for different quiz categories.
 * This component is designed to be easily integrated into dashboards.
 */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Defines the props for the ProgressChart component.
interface ProgressChartProps {
    // The data should be an array of objects, each with a 'name' (for the X-axis label)
    // and a 'score' (for the bar height).
    data: { name: string; score: number; }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-96">
             <h3 className="text-xl font-semibold mb-4 text-gray-700">Quiz Performance</h3>
            {/* ResponsiveContainer ensures the chart adapts to the size of its parent container. */}
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/* Defines the grid, axes, tooltip, legend, and bars of the chart. */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
                    <Legend />
                    <Bar dataKey="score" fill="#3b82f6" name="Score" unit="%" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;
