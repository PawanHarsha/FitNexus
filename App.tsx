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
    // Simulated JWT decode for placeholder
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
        isProfileComplete: false // Mark as incomplete initially for new user flow
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
    // Placeholder login - creates a basic user to trigger profile completion
    const placeholderUser: User = {
      id: 'placeholder-' + Math.random().toString(36).substr(2, 9),
      name: 'Nexus Athlete',
      email: 'athlete@nexus.fit',
      picture: 'https://i.pravatar.cc/150?u=nexus',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isProfileComplete: false
    };
    setUser(placeholderUser);
  };

  const handleProfileComplete = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentView(View.HOME);
  };

  const renderView = () => {
    // Guard protected views
    const isProtected = currentView === View.ASSISTANT || currentView === View.DASHBOARD || currentView === View.PROFILE;
    if (isProtected && !user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-nexus-gray rounded-full flex items-center justify-center mb-6 text-nexus-primary shadow-xl shadow-nexus-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
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
        return <Profile user={user} />;
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