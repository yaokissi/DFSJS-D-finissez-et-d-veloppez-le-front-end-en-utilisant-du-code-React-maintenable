import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './app/pages/home';
import { Country } from './app/pages/country';




export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
};