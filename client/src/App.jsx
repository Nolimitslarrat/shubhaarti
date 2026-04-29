import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JournalsPage from './pages/JournalsPage';
import DomainPage from './pages/DomainPage';
import CartPage from './pages/CartPage';
import QuotePage from './pages/QuotePage';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/AuthPage';
import LibrariansPage from './pages/LibrariansPage';
import { CartProvider } from './context/CartContext';

const AppLayout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-background text-textMain font-sans">
      {!isAdminPage && <Navbar />}
      <main className={`flex-grow ${!isAdminPage ? '' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/domain/:domainName" element={<DomainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AuthPage />} />
          <Route path="/librarians" element={<LibrariansPage />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </Router>
  );
}

export default App;
