import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Layout from './components/Layout';
import HomeParallax from './components/HomeParallax';
import AuthPage from './components/AuthPage';
import TryOnPage from './components/TryOnPage';
import { CartItem, Product, Order, UserProfile } from './types';
import { ShoppingCart, Heart, ArrowRight, Upload, Loader2, Sparkles, Plus, Trash2, Check, Package, CreditCard, LogIn, Mail, Lock, Shirt, ShoppingBag, User } from 'lucide-react';
import { generateOutfitAdvice } from './services/geminiService';
import ShopPage from './components/ShopPage';
import PlannerPage from './components/PlannerPage';
import DashboardPage from './components/DashboardPage';

// 3. Shop Page - Moved to components/ShopPage.tsx

// 4. Try-On Page - Moved to components/TryOnPage.tsx

// 5. Planner Page - Moved to components/PlannerPage.tsx

// 6. Cart Page
const CartPage: React.FC<{ cart: CartItem[], updateQty: (id: number, d: number) => void, removeItem: (id: number) => void, checkout: () => void }> = ({ cart, updateQty, removeItem, checkout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="px-8 py-3 bg-brand text-white rounded-full font-semibold hover:bg-violet-600 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">-</button>
                    <span className="w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={checkout} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 7. Dashboard/Profile Page - Moved to components/DashboardPage.tsx

// --- APP COMPONENT ---
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = () => {
    alert("Checkout functionality coming soon!");
    setCart([]);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/*" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      ) : (
        <Layout cartCount={cart.reduce((a, b) => a + b.quantity, 0)}>
          <Routes>
            <Route path="/" element={<HomeParallax />} />
            <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
            <Route path="/try-on" element={<TryOnPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} checkout={checkout} />} />
            <Route path="/dashboard" element={<DashboardPage onSignOut={() => setIsAuthenticated(false)} />} />
            <Route path="/profile" element={<DashboardPage onSignOut={() => setIsAuthenticated(false)} />} />
            <Route path="/orders" element={<DashboardPage onSignOut={() => setIsAuthenticated(false)} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
};

export default App;