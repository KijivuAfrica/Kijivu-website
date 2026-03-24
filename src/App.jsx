import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackMeta } from './lib/metaPixel';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentCompletePage from './pages/PaymentCompletePage';
import ShopPage from './pages/ShopPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FreeWaitingRoom from './pages/FreeWaitingRoom';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackMeta('PageView');
  }, [location.pathname]);
  return null;
}

function App() {
  const [cart, setCart] = useState([]);

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
      <Routes>
        <Route path="/"        element={<HomePage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/checkout"    element={<CheckoutPage cart={cart} onClearCart={clearCart} />} />
        <Route path="/shop"            element={<ShopPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/free-waiting-room" element={<FreeWaitingRoom />} />
        <Route path="/admin"           element={<AdminDashboard />} />
        <Route path="/payment-complete" element={<PaymentCompletePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
