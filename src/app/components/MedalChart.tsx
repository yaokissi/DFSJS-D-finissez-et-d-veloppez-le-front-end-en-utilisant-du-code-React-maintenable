import type { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import type { Country } from '../models/olympics';

interface MedalChartProps {
  countries: Country[];
}

export const MedalChart: FC<MedalChartProps> = ({ countries }) => {

    const calculateTotalMedals = (country: Country) => {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  };

   const chartData = {
    labels: countries.map((d: Country) => d.name),
    datasets: [{
      label: 'Total des médailles',
      data: countries.map((d: Country) => calculateTotalMedals(d)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: 'white' },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
      <div style={{ height: '400px' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};