import type { FC } from 'react';

interface IndicatorProps {
  title: string;
  value: number;
 
}

export const Indicator: FC<IndicatorProps> = ({ title, value, }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-2">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
};