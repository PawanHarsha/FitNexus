import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Marketplace } from './views/Marketplace';
import { Booking } from './views/Booking';
import { HomeGym } from './views/HomeGym';
import { AICoach } from './views/AICoach';
import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';
import { Login } from './views/Login';
import { ProfileCompletion } from './views/ProfileCompletion';
import { View, User } from './types';
import { Crown, ArrowRight, Zap, ShieldCheck, Cpu } from 'lucide-react';

// Mock Client ID - In production, this would be your actual Google Client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  // Initialize Google OAuth
  useEffect(() => {
    /* global google */
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
    }
  }, []);

  // Handle redirect logic for profile completion
  useEffect(() => {
    if (user && !user.isProfileComplete && currentView !== View.PROFILE_COMPLETION) {
      setCurrentView(View.PROFILE_COMPLETION);
    } else if (user && user.isProfileComplete && (currentView === View.LOGIN || currentView === View.PROFILE_COMPLETION)) {
      setCurrentView(View.HOME);
    }
  }, [user, currentView]);

  const handleGoogleResponse = (response: any) => {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      const newUser: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isProfileComplete: false,
        isPro: false,
        isPhoneVerified: false
      };

      setUser(newUser);
    } catch (e) {
      console.error("Auth error", e);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentView(View.HOME);
    if ((window as any).google) {
      (window as any).google.accounts.id.disableAutoSelect();
    }
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleManualLogin = () => {
    const placeholderUser: User = {
      id: 'placeholder-' + Math.random().toString(36).substr(2, 9),
      name: 'Nexus Athlete',
      email: 'athlete@nexus.fit',
      picture: 'https://i.pravatar.cc/150?u=nexus',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isProfileComplete: false,
      isPro: false,
      isPhoneVerified: false
    };
    setUser(placeholderUser);
  };

  const handleProfileComplete = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentView(View.HOME);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const upgradeToPro = () => {
    if (user) {
      setUser({ ...user, isPro: true });
    }
  };

  const renderView = () => {
    // 1. Check Login Guard
    const isProtected = currentView === View.ASSISTANT || currentView === View.DASHBOARD || currentView === View.PROFILE;
    if (isProtected && !user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-nexus-gray rounded-full flex items-center justify-center mb-6 text-nexus-primary shadow-xl shadow-nexus-primary/10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Exclusive Territory</h2>
          <p className="text-nexus-muted max-w-md mb-8">
            Access to our AI Coach and progress mainframe is restricted to elite members. Sign in to continue.
          </p>
          <button 
            onClick={() => setCurrentView(View.LOGIN)}
            className="bg-nexus-primary text-nexus-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105"
          >
            Authenticate Now
          </button>
        </div>
      );
    }

    // 2. Check Pro Guard (only for Assistant and Dashboard)
    const isProRequired = currentView === View.ASSISTANT || currentView === View.DASHBOARD;
    if (isProRequired && user && !user.isPro) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-gradient-to-br from-nexus-dark to-nexus-black border border-nexus-primary/30 rounded-[2rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Crown size={200} className="text-nexus-primary" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-nexus-primary/10 text-nexus-primary px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-nexus-primary/20">
                <Crown size={14} /> FitNexus Pro Required
              </div>
              
              <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
                Unlock the <br /> <span className="text-nexus-primary">Elite Mainframe</span>
              </h2>
              
              <p className="text-nexus-muted text-lg max-w-xl mx-auto mb-12">
                Standard access does not include deep neural coaching or live biometric tracking. Upgrade to Pro to bypass all restrictions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-nexus-black/40 p-6 rounded-2xl border border-nexus-gray/50">
                  <Cpu className="text-nexus-primary mx-auto mb-4" size={24} />
                  <h4 className="text-white font-bold text-sm uppercase mb-2">AI Neural Coaching</h4>
                  <p className="text-nexus-muted text-xs">Unrestricted access to NexusCoach v3.0</p>
                </div>
                <div className="bg-nexus-black/40 p-6 rounded-2xl border border-nexus-gray/50">
                  <Zap className="text-nexus-primary mx-auto mb-4" size={24} />
                  <h4 className="text-white font-bold text-sm uppercase mb-2">Live Vital Sync</h4>
                  <p className="text-nexus-muted text-xs">Real-time calorie and recovery metrics</p>
                </div>
                <div className="bg-nexus-black/40 p-6 rounded-2xl border border-nexus-gray/50">
                  <Crown className="text-nexus-primary mx-auto mb-4" size={24} />
                  <h4 className="text-white font-bold text-sm uppercase mb-2">Priority Booking</h4>
                  <p className="text-nexus-muted text-xs">First access to limited trainer sessions</p>
                </div>
              </div>

              <button 
                onClick={upgradeToPro}
                className="bg-nexus-primary text-nexus-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl shadow-nexus-primary/20"
              >
                Go Pro Now <ArrowRight size={20} />
              </button>
              <p className="text-nexus-muted text-[10px] mt-6 uppercase tracking-widest opacity-50">Cancel anytime • No hidden protocols</p>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case View.HOME:
        return <Home changeView={setCurrentView} />;
      case View.MARKETPLACE:
        return <Marketplace addToCart={addToCart} />;
      case View.BOOKING:
        return <Booking />;
      case View.HOME_GYM:
        return <HomeGym addToCart={addToCart} />;
      case View.ASSISTANT:
        return <AICoach />;
      case View.DASHBOARD:
        return <Dashboard />;
      case View.PROFILE:
        return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      case View.LOGIN:
        return <Login onLogin={handleManualLogin} />;
      case View.PROFILE_COMPLETION:
        return user ? <ProfileCompletion user={user} onComplete={handleProfileComplete} /> : <Login onLogin={handleManualLogin} />;
      default:
        return <Home changeView={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      cartCount={cartCount}
      user={user}
      onLogout={logout}
    >
      {renderView()}
    </Layout>
  );
}

export default App;