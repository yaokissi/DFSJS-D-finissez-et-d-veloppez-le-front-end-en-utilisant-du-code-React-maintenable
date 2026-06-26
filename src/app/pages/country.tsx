import { type FC, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

import { useData } from '../hooks/UseData';
import { HeaderComponent, type IndicatorData } from '../components/HeaderComponent';
import type { Country as CountryType } from '../models/olympics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const Country: FC = () => {
  // hook useParams pour récupérer l’ID du pays depuis l'URL
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useData();
  const navigate = useNavigate();

  // Recherche du pays correspondant à l'ID numérique
  const countryId = Number(id);
  const currentCountry = data?.find((c: CountryType) => c.id === countryId);

  useEffect(() => {
    // Si on a fini de charger, mais qu'on ne trouve pas le pays :
    if (!isLoading && !currentCountry) {
      navigate('/404', { replace: true });
    }
  }, [isLoading, data, currentCountry, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Chargement des données du pays...</p>
      </div>
    );
  }

  // Gestion d'erreurs 
  if (!data || !id) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-2xl text-red-400 font-bold">Erreur : Données introuvables.</p>
        <Link to="/" className="text-teal-400 hover:underline">&larr; Retour au Dashboard</Link>
      </div>
    );
  }
if (!currentCountry) {
    return null;
  }
 



  // Calculs métiers des données du pays avec les types number 
  const totalParticipations = currentCountry.participations.length;
  const totalMedals = currentCountry.participations.reduce((sum: number, p) => sum + p.medalsCount, 0);
  const totalAthletes = currentCountry.participations.reduce((sum: number, p) => sum + p.athleteCount, 0);

  // Utilisation du composant indicator 
  const countryIndicators: IndicatorData[] = [
    { title: 'Participations', value: totalParticipations },
    { title: 'Total médailles', value: totalMedals },
    { title: 'Total athlètes', value: totalAthletes },
  ];

  // Configuration du graphique d'évolution par année
  const evolutionData = {
    labels: currentCountry.participations.map((p) => p.year.toString()),
    datasets: [
      {
        label: 'Nombre de médailles',
        data: currentCountry.participations.map((p) => p.medalsCount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const evolutionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { color: 'white' } },
    },
    scales: {
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <Link to="/" className="inline-block text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            &larr; Retour au Dashboard
          </Link>
        </div>

        {/* Rendu dynamique de l'en-tête avec HeaderComponent */}
        <HeaderComponent title={currentCountry.name} indicators={countryIndicators} />

        {/* Zone du graphique avec Line */}
        <div className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl mt-8 border border-gray-700">
          <div style={{ height: '400px' }}>
            <Line data={evolutionData} options={evolutionOptions} />
          </div>
        </div>

        <div className="text-sm text-gray-400 mt-4 text-center md:text-left">
          <p>Données des 5 dernières éditions des Jeux Olympiques</p>
        </div>
      </div>
    </div>
  );
};