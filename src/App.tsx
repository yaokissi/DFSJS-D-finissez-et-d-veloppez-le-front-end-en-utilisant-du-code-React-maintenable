import type { FC } from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './app/pages/home';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend);

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};