import type { FC } from 'react';
import { Indicator } from './Indicator';

// On définit le type pour un indicateur
export interface IndicatorData {
  title: string;
  value: number;
}

// Les props attendues par notre Header
interface HeaderComponentProps {
  title: string;
  indicators: IndicatorData[];
}

export const HeaderComponent: FC<HeaderComponentProps> = ({ title, indicators }) => {
  return (
    <div className="mb-8">

      <h1 className="text-4xl font-bold mb-6 text-center">
        {title}
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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