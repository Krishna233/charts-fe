import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register the necessary components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

interface LineChartComponentProps {
  labels: string[];
  data: number[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Line Chart Data',
        data,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
        fill: true, // Optionally fill the area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Axis',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartComponent;
