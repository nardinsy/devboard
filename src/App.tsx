import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import LoginPage from './features/auth/pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <LoginPage />
    </BrowserRouter>
  );
}
