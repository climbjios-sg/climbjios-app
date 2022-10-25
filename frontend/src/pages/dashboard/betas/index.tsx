import { Routes, Route } from 'react-router-dom';
import BetaCreate from './create';
import BetasList from './list';

export default function Betas() {
  return (
    <Routes>
      <Route path="create" element={<BetaCreate />} />
      <Route path="" element={<BetasList />} />
    </Routes>
  );
}
