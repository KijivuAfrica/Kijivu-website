import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackMeta } from './lib/metaPixel';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentCompletePage from './pages/PaymentCompletePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AnnouncementBar from './components/AnnouncementBar';
import TajiMobileBanner from './components/TajiMobileBanner';
import KijivuNav from './components/KijivuNav';
import KijivuRegionPopup from './components/KijivuRegionPopup';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackMeta('PageView');
  }, [location.pathname]);
  return null;
}

function App() {
  const [cart, setCart] = useState([]);
  const [barDismissed, setBarDismissed] = useState(
    () => !!localStorage.getItem('kijivuBarDismissed')
  );

  const addToCart = (product) => {
    trackMeta('AddToCart', {
      content_ids: [String(product.id)],
      content_name: product.name,
      currency: 'KES',
      value: product.price,
    });
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <RouteTracker />
      {!barDismissed && <AnnouncementBar onDismiss={() => setBarDismissed(true)} />}
      <KijivuNav cart={cart} topOffset={barDismissed ? 0 : 40} />
      <KijivuRegionPopup />
      <TajiMobileBanner />
      <Routes>
        <Route path="/"             element={<HomePage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/product/:id"  element={<ProductPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/checkout"     element={<CheckoutPage cart={cart} onClearCart={clearCart} />} />
        <Route path="/shop"         element={<ShopPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/about"        element={<AboutPage cart={cart} />} />
        <Route path="/admin"        element={<AdminDashboard />} />
        <Route path="/payment-complete" element={<PaymentCompletePage />} />
        <Route path="/privacy"      element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
