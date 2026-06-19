// src/app/pages/Home.tsx
import type { FC } from 'react';
import { useOlympicsData } from '../hooks/UseOlympicsData';
import { Indicator } from '../components/Indicator';
import { MedalChart } from '../components/MedalChart';

import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend);

export const Home: FC = () => {
    const { data } = useOlympicsData();

    if (!data) {
        return <div className="min-h-screen ml-auto mr-auto bg-gray-900 text-white p-8">Chargement...</div>;
    }


    const totalParticipatingCountries = data.length;
    const totalGamesEditions = 5;

    const indicatorsData = [
        { title: 'Pays participants', value: totalParticipatingCountries, color: 'text-blue-400' },
        { title: 'Éditions des JO', value: totalGamesEditions, color: 'text-green-400' },
    ];


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

                <div className="mb-8">
                    <MedalChart countries={data} />
                </div>
                <div className="mt-8">
                    <div className="text-sm text-gray-400 mb-4">
                        <p>Cliquez sur un pays pour voir ses détails :</p>
                    </div>

                </div>


            </div>
        </div>
    );
};