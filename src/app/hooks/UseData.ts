import { useState, useEffect } from 'react';
import type { Country } from '../models/olympics';
import { olympicsData } from '../data/data';

export const useData = () => {
  // état des données et chargement séparément
  const [data, setData] = useState<Country[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // fonction fetchData pour simuler la récupération des données
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(olympicsData);
      setIsLoading(false);
    };

    fetchData();
  }, []); 
  //  on retourne les données et l'état pour que la page puisse les utiliser
  return { data, isLoading };
};