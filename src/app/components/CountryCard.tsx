import type { FC } from 'react';
import type { Country } from '../models/olympics';

// La prop attendue est un objet Country complet
interface CountryCardProps {
  country: Country;
}

export const CountryCard: FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 text-center">
      <h4 className="text-lg font-bold">{country.name}</h4>
    </div>
  );
};