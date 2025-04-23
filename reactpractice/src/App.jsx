// src/App.jsx
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import menuItems from './data/menuItems';
import AppRoutes from './routes/AppRoutes';

function AppWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar menuItems={menuItems} />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
