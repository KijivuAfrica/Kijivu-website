import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
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
      <Routes>
        <Route path="/"        element={<HomePage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/checkout"    element={<CheckoutPage cart={cart} onClearCart={clearCart} />} />
        <Route path="/admin"       element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
