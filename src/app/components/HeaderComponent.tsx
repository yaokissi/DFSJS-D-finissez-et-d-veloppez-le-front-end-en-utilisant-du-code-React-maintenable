import type { FC, } from 'react';
import { Indicator } from './Indicator';

// On définit le type pour un indicateur
export interface IndicatorData {
  title: string;
  value: number;
}

// props attendues par notre Header
interface HeaderComponentProps {
  title: string;
  indicators: IndicatorData[];
}

export const HeaderComponent: FC<HeaderComponentProps> = ({ title, indicators }) => {
  // Déterminer dynamiquement le nombre de colonnes en fonction du nombre d'indicateurs
  const gridColsClass = indicators.length === 2 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className="mb-8">

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {title}
      </h1>

        {/* Affichage dynamique des indicateurs */}
      <div className={`grid ${gridColsClass} gap-4`}>
        {indicators.map((indicator, index) => (
          <Indicator 
            key={index} 
            title={indicator.title} 
            value={indicator.value} 
          />
        ))}
      </div>
    </div>
  );
};