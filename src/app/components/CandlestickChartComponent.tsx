import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

// Register chart components, including TimeScale
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, CandlestickController, CandlestickElement, TimeScale);

interface CandlestickChartProps {
  data: { x: string; open: number; high: number; low: number; close: number }[];
}

const CandlestickChartComponent: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Candlestick Data',
        data: data.map(item => ({
          x: DateTime.fromISO(item.x).toMillis(),
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close,
        })),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const { o, h, l, c } = tooltipItem.raw;
            return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day' },
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Price' },
      },
    },
  };
  //@ts-ignore
  return <Chart type="candlestick" data={chartData} options={options} />;
};

export default CandlestickChartComponent;
