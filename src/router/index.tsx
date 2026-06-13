import { Routes, Route } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Home — Phase 1 complete ✓</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
