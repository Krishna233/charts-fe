import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface BarChartData {
  labels: string[];
  data: number[];
}

const BarChartComponent: React.FC<BarChartData> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Bar Chart Data',
        data,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChartComponent;
