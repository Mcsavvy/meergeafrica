"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
        boxWidth: 6,
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#f0f0f0',
      },
      ticks: {
        stepSize: 2.5,
      },
    },
  },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const data = {
  labels,
  datasets: [
    {
      label: 'Product 1',
      data: [12.5, 8, 6.5, 7, 4],
      borderColor: '#FF4D4D',
      backgroundColor: '#FF4D4D',
      tension: 0.4,
    },
    {
      label: 'Product 2',
      data: [1.5, 3, 4, 5, 2],
      borderColor: '#FFA64D',
      backgroundColor: '#FFA64D',
      tension: 0.4,
    },
    {
      label: 'Product 3',
      data: [3, 4, 5, 4.5, 5.5],
      borderColor: '#FFD700',
      backgroundColor: '#FFD700',
      tension: 0.4,
    },
    {
      label: 'Product 4',
      data: [4, 3.5, 2.5, 2, 1],
      borderColor: '#4DFF4D',
      backgroundColor: '#4DFF4D',
      tension: 0.4,
    },
    {
      label: 'Product 5',
      data: [5, 7.5, 10, 9, 12],
      borderColor: '#4DA6FF',
      backgroundColor: '#4DA6FF',
      tension: 0.4,
    },
    {
      label: 'Product 6',
      data: [6, 4, 7, 11, 7],
      borderColor: '#A64DFF',
      backgroundColor: '#A64DFF',
      tension: 0.4,
    },
  ],
};

export function LineChart() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line options={options} data={data} />
    </div>
  );
}
