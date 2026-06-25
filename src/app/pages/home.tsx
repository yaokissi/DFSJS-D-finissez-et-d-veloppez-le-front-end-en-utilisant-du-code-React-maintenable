import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/UseData';
import { HeaderComponent, type IndicatorData } from '../components/HeaderComponent';
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
    const { data } = useData();
    const navigate = useNavigate();

    

    if (!data) {
        return <div className="min-h-screen ml-auto mr-auto bg-gray-900 text-white p-8">Chargement...</div>;
    }


    const totalParticipatingCountries = data.length;
    const totalGamesEditions = data[0].participations.length;

    const dashboardIndicators: IndicatorData[] = [
        { title: 'Pays participants', value: totalParticipatingCountries, },
        { title: 'Éditions des JO', value: totalGamesEditions, },
    ];
    // fonction pour gérer le clic sur un pays
    const handleCountryClick = (id: number) => {
        navigate(`/country/${id}`);
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

                <HeaderComponent
                    title="Médailles par pays"
                    indicators={dashboardIndicators}
                />

                <div className="mb-8">
                    <MedalChart countries={data} onCountryClick={handleCountryClick}/>
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