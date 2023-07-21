'use client';
import { AttendantData } from '@/types/Attendant';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface BarChartProps {
  data: AttendantData[];
  param: keyof AttendantData;
  label: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, param, label }) => {
  const tempLabels: string[] = [];
  const barData: number[] = [];
  data.sort((a, b) => (a[param] > b[param] ? 1 : -1));
  data.forEach((attendant) => {
    var keyValue = attendant[param];
    // if keyValue is date, convert it to short date string, otherwise convert it to normal string
    // if (keyValue instanceof Date) keyValue = keyValue.toDateString();
    // else keyValue = keyValue.toString();

    const labelIndex = tempLabels.indexOf(keyValue) ?? -1;
    if (labelIndex === -1) {
      tempLabels.push(keyValue);
      barData.push(1);
    } else {
      barData[labelIndex] += 1;
    }
  });

  const chartData = {
    labels: tempLabels,
    datasets: [
      {
        label: label,
        data: barData,
        backgroundColor: 'rgba(0, 38, 75, 1)'
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
        min: barData.reduce((a, b) => Math.min(a, b)) - 1,
        max: barData.reduce((a, b) => Math.max(a, b)) + 1,
        grid: {
          display: false
        },
        // vertical axis label only shows in integer steps
        ticks: {
          stepSize: 1
        }
      }
    }
    // does not maintain aspect ratio
  };

  return <Bar options={options} data={chartData} />;
};

export default BarChart;
