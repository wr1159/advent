'use client';
import { mockAttendant } from '@/app/(dashboard)/dashboard/statistics/page';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { twMerge } from 'tailwind-merge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface LineChartProps {
  data: mockAttendant[];
  param: keyof mockAttendant;
  label: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, param, label }) => {
  const tempLabels: string[] = [];
  const lineData: number[] = [];
  data.sort((a, b) => (a[param] > b[param] ? 1 : -1));
  data.forEach((attendant) => {
    var keyValue = attendant[param];
    // if keyValue is date, convert it to short date string, otherwise convert it to normal string
    if (keyValue instanceof Date) keyValue = keyValue.toDateString();
    else keyValue = keyValue.toString();

    const labelIndex = tempLabels.indexOf(keyValue) ?? -1;
    if (labelIndex === -1) {
      tempLabels.push(keyValue);
      lineData.push(1);
    } else {
      lineData[labelIndex] += 1;
    }
  });

  const chartData = {
    labels: tempLabels,
    datasets: [
      {
        label: label,
        data: lineData,
        borderColor: 'rgb(0, 38, 75)',
        backgroundColor: 'rgba(0, 38, 75, 0.5)',
        pointRadius: 1,
        pointHitRadius: 4,
        // grid display how
        grid: {
          display: false
        }
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: lineData.reduce((a, b) => Math.min(a, b)) - 1,
        max: lineData.reduce((a, b) => Math.max(a, b)) + 1,
        display: false
      }
    }
    // does not maintain aspect ratio
  };
  return <Line options={options} data={chartData} />;
};

export default LineChart;
