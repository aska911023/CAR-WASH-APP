import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import { useEffect } from 'react';

import Home from './pages/customer/Home';
import ShopsList from './pages/customer/ShopsList';
import ShopDetail from './pages/customer/ShopDetail';
import Market from './pages/customer/Market';
import Community from './pages/customer/Community';
import Profile from './pages/customer/Profile';
import MyBookings from './pages/customer/MyBookings';

import Dashboard from './pages/vendor/Dashboard';
import ShopProfile from './pages/vendor/ShopProfile';
import Bookings from './pages/vendor/Bookings';
import Products from './pages/vendor/Products';
import CRM from './pages/vendor/CRM';
import Chat from './pages/vendor/Chat';

const RoleSelector = () => {
  const { loginAs } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (role: 'customer' | 'vendor') => {
    navigate('/', { replace: true });
    loginAs(role);
  };

  return (
    <div className="h-screen bg-neutral-200 flex justify-center overflow-hidden font-sans">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] h-full bg-[#141414] shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="text-center mb-14 px-8">
          <h1 className="text-4xl font-medium mb-2 tracking-wide drop-shadow-lg text-white/90">誰在使用 WashHub？</h1>
        </div>

        <div className="flex gap-10">
          <div onClick={() => handleLogin('customer')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-32 h-32 rounded-[20px] overflow-hidden box-border border-[3px] border-transparent group-hover:border-white transition-all duration-200 relative bg-gradient-to-br from-[#1A2980] to-[#26D0CE] flex items-center justify-center shadow-[0_10px_40px_rgba(26,41,128,0.4)]">
              <span className="text-6xl font-bold text-white/90 group-hover:scale-110 transition-transform duration-300">客</span>
            </div>
            <p className="mt-4 text-neutral-400 group-hover:text-white text-xl transition-colors">顧客</p>
          </div>

          <div onClick={() => handleLogin('vendor')} className="flex flex-col items-center group cursor-pointer">
            <div className="w-32 h-32 rounded-[20px] overflow-hidden box-border border-[3px] border-transparent group-hover:border-white transition-all duration-200 relative bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] flex items-center justify-center shadow-[0_10px_40px_rgba(255,65,108,0.4)]">
              <span className="text-6xl font-bold text-white/90 group-hover:scale-110 transition-transform duration-300">店</span>
            </div>
            <p className="mt-4 text-neutral-400 group-hover:text-white text-xl transition-colors">店家</p>
          </div>
        </div>

        <div className="mt-16">
          <button className="px-6 py-2 border border-neutral-600 text-neutral-500 hover:text-white hover:border-white tracking-widest text-xs uppercase transition-colors rounded-sm">
            Manage Profiles
          </button>
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  const { state } = useAppContext();

  if (!state.role) {
    return <RoleSelector />;
  }

  return (
    <div key={state.role} style={{ animation: 'fadeIn 0.25s ease' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <ScrollToTop />
      <Layout>
        <Routes>
          {state.role === 'customer' ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/shops" element={<ShopsList />} />
              <Route path="/shops/:id" element={<ShopDetail />} />
              <Route path="/market" element={<Market />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mybookings" element={<MyBookings />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/shop" element={<ShopProfile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/products" element={<Products />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/chat" element={<Chat />} />
            </>
          )}
        </Routes>
      </Layout>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
