'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
import PieChartComponent from './components/pieChartComponent';
import CandlestickChartComponent from './components/CandlestickChartComponent';
import LineChartComponent from './components/LineChartComponent';
import BarChartComponent from './components/BarChartComponent';

// Define types for the data
interface PieChartData {
  labels: string[];
  data: number[];
}

interface CandlestickData {
  data: { x: string; open: number; high: number; low: number; close: number }[];
}

interface LineChartData {
  labels: string[];
  data: number[];
}

interface BarChartData {
  labels: string[];
  data: number[];
}

const Home: React.FC = () => {
  const [pieData, setPieData] = useState<PieChartData>({ labels: [], data: [] });
  const [candlestickData, setCandlestickData] = useState<CandlestickData>({ data: [] });
  const [lineData, setLineData] = useState<LineChartData>({ labels: [], data: [] });
  const [barData, setBarData] = useState<BarChartData>({ labels: [], data: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pieResponse, candlestickResponse, lineResponse, barResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/pie-chart-data/'),
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/')
        ]);

        setPieData({ labels: pieResponse.data.labels, data: pieResponse.data.data });
        setCandlestickData({ data: candlestickResponse.data.data });
        setLineData({ labels: lineResponse.data.labels, data: lineResponse.data.data });
        setBarData({ labels: barResponse.data.labels, data: barResponse.data.data });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch chart data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <nav>
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <ul>
            <li><a href="#pieChart" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200">Pie Chart</a></li>
            <li><a href="#candlestickChart" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200">Candlestick Chart</a></li>
            <li><a href="#lineChart" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200">Line Chart</a></li>
            <li><a href="#barChart" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200">Bar Chart</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Charts Dashboard</h1>
            <button className="md:hidden" onClick={toggleSidebar}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white overflow-hidden shadow rounded-lg" id="pieChart">
                <div className="px-4 py-5 sm:p-6 h-[90%]">
                  <h2 className="text-lg font-medium text-gray-900">Pie Chart</h2>
                  <PieChartComponent labels={pieData.labels} data={pieData.data} />
                </div>
              </section>
              <section className="bg-white overflow-hidden shadow rounded-lg" id="lineChart">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">Line Chart</h2>
                  <LineChartComponent labels={lineData.labels} data={lineData.data} />
                </div>
              </section>
              <section className="bg-white overflow-hidden shadow rounded-lg" id="candlestickChart">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">Candlestick Chart</h2>
                  <CandlestickChartComponent data={candlestickData.data} />
                </div>
              </section>
              <section className="bg-white overflow-hidden shadow rounded-lg" id="barChart">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">Bar Chart</h2>
                  <BarChartComponent labels={barData.labels} data={barData.data} />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;