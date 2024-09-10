import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartData {
  labels: string[];
  data: number[];
}

const PieChartComponent: React.FC<PieChartData> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;
