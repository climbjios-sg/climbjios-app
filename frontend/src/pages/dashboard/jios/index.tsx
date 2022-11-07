import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import JiosCreate from './create';
import JiosEdit from './edit';
import JiosList from './list';

export default function Jios() {
  return (
    <Routes>
      <Route path="create" element={<JiosCreate />} />
      <Route path="edit/:id" element={<JiosEdit />} />
      <Route path="" element={<JiosList />} />
    </Routes>
  );
}
