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
import { Subscription } from './views/Subscription';
import { View, User } from './types';
import { Crown, Sparkles, Lock } from 'lucide-react';

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
        isPro: false
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
      isPro: false
    };
    setUser(placeholderUser);
  };

  const handleProfileComplete = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentView(View.HOME);
  };

  const handleUpgrade = () => {
    if (user) {
      const upgradedUser = { ...user, isPro: true };
      setUser(upgradedUser);
      setCurrentView(View.DASHBOARD);
    }
  };

  const renderView = () => {
    // 1. Check for basic login protection
    const isProtected = currentView === View.ASSISTANT || currentView === View.DASHBOARD || currentView === View.PROFILE;
    if (isProtected && !user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-nexus-gray rounded-full flex items-center justify-center mb-6 text-nexus-primary shadow-xl shadow-nexus-primary/10">
            <Lock size={32} />
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

    // 2. Check for Pro/Elite protection specifically for Dashboard and Assistant
    const isProRequired = currentView === View.ASSISTANT || currentView === View.DASHBOARD;
    if (isProRequired && user && !user.isPro) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-nexus-primary/10 rounded-3xl flex items-center justify-center text-nexus-primary border border-nexus-primary/20 animate-pulse">
              <Crown size={48} />
            </div>
            <div className="absolute -top-2 -right-2 bg-nexus-black p-1.5 rounded-full border border-nexus-primary/50 text-nexus-primary">
              <Sparkles size={16} />
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Pro Level Required</h2>
          <p className="text-nexus-muted max-w-lg mb-10 leading-relaxed">
            AI-powered coaching and advanced biometric tracking are <span className="text-white font-bold">Nexus Pro</span> exclusive features. Upgrade your membership to unlock the full potential of the mainframe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setCurrentView(View.SUBSCRIPTION)}
              className="bg-nexus-primary text-nexus-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_40px_rgba(163,230,53,0.2)] flex items-center gap-2"
            >
              See Pro Plans <Crown size={18} />
            </button>
            <button 
              onClick={() => setCurrentView(View.HOME)}
              className="bg-nexus-gray text-nexus-text px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-nexus-black transition-all"
            >
              Return to Base
            </button>
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
        return <Profile user={user} onUpgrade={() => setCurrentView(View.SUBSCRIPTION)} />;
      case View.LOGIN:
        return <Login onLogin={handleManualLogin} />;
      case View.PROFILE_COMPLETION:
        return user ? <ProfileCompletion user={user} onComplete={handleProfileComplete} /> : <Login onLogin={handleManualLogin} />;
      case View.SUBSCRIPTION:
        return <Subscription onUpgrade={handleUpgrade} />;
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