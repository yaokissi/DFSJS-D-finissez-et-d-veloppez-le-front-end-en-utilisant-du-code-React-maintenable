// src/app/pages/NotFound.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-9xl font-bold text-teal-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page introuvable</h2>
      <p className="text-l text-gray-400 mb-8 max-w-lg">
        Désolé, la page que vous recherchez n'existe pas. L'URL est peut-être incorrecte ou le pays n'est pas répertorié.
      </p>
      
      {/* Bouton de retour à l'accueil */}
      <Link 
        to="/" 
        className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
      >
        Retourner au Dashboard
      </Link>
    </div>
  );
};