// src/components/PieChart.js
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AppContext } from "../../context/AppContext";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css'; // Adjust the path as necessary


// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remainingBudget = budget - totalExpenses;

  const data = {
    labels: ['Remaining Budget', 'Total Expenses'],
    datasets: [
      {
        data: [remainingBudget, totalExpenses],
        backgroundColor: ['#badbcc', '#f8d7da'],
        hoverBackgroundColor: ['#badbcc', '#f8d7da'],
      },
    ],
  };

  return (
    <div>
      <h3>Budget Overview</h3>
      <div className="pie-chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
