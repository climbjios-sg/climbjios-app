import { Routes, Route } from 'react-router-dom';
import BetaGymSearch from './search';
import BetaGym from './gym';

export default function Beta() {
  return (
    <Routes>
      <Route path=":gymId" element={<BetaGym />} />
      <Route path="" element={<BetaGymSearch />} />
    </Routes>
  );
}
