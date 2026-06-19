// src/app/pages/Home.tsx
import type { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { useOlympicsData } from '../hooks/UseOlympicsData';
import { Indicator } from '../components/Indicator';
import type{ Country } from '../models/olympics';

export const Home: FC = () => {
  const { data } = useOlympicsData();

  if (!data) {
    return <div className="min-h-screen ml-auto mr-auto bg-gray-900 text-white p-8">Chargement...</div>;
  }

  const calculateTotalMedals = (country: Country) => {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  };

  const totalParticipatingCountries = data.length;
  const totalGamesEditions = 5;

  const indicatorsData = [
    { title: 'Pays participants', value: totalParticipatingCountries, color: 'text-blue-400' },
    { title: 'Éditions des JO', value: totalGamesEditions, color: 'text-green-400' },
  ];

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [{
      label: 'Total des médailles',
      data: data.map(d => calculateTotalMedals(d)),
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Historique des Jeux Olympiques - TéléSport
        </h1>

        <div className="mb-8">
          <p className="text-lg">
            Bienvenue sur la page dédiée à l'historique des Jeux Olympiques.
            Explorez les performances des pays au fil des années.
          </p>
        </div>

        <div className="mb-2">
          {indicatorsData.map((indicator, index) => (
            <Indicator 
              key={index} 
              title={indicator.title} 
              value={indicator.value} 
            />
          ))}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>Cliquez sur un pays pour voir ses détails</p>
        </div>
      </div>
    </div>
  );
};