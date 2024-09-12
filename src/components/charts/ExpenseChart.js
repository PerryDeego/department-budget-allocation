import React, { useContext } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { AppContext } from "../../context/AppContext";

// Register the components including scales and elements
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const ExpenseChart = () => {
    const { expenses } = useContext(AppContext);

    // Check if expenses is defined and has items
    if (!expenses || expenses.length === 0) {
        return <div>No expenses available to display.</div>;
    }

    const data = {
        labels: expenses.map(expense => expense.name), // Use expense names as labels
        datasets: [
            {
                label: 'Expense Cost',
                data: expenses.map(expense => expense.cost), // Use expense costs as data
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light background color
                borderColor: 'rgba(255, 99, 132, 1)', // Darker border color
                borderWidth: 2,
                fill: false, // Set to true if you want the area under the line to be filled
            },
        ],
    };

    return (
        <div>
            <h3>Expenses Breakdown</h3>
            <div className="chart-container">
                <Line data={data} />
            </div>
        </div>
    );
};

export default ExpenseChart;
