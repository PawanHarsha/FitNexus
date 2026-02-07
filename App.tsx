import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Marketplace } from './views/Marketplace';
import { Booking } from './views/Booking';
import { HomeGym } from './views/HomeGym';
import { AICoach } from './views/AICoach';
import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';
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

      // Show One Tap prompt if not logged in
      if (!user) {
        (window as any).google.accounts.id.prompt();
      }
    }
  }, [user]);

  const handleGoogleResponse = (response: any) => {
    // In a real app, you would send this credential to your backend to verify
    // For this demo, we'll decode the JWT payload (simulated)
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
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    setUser(newUser);
    // If the user was trying to access a protected view, we could redirect them back here
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
    if ((window as any).google) {
      (window as any).google.accounts.id.prompt();
    } else {
      // Fallback for demo if script fails to load
      setUser({
        id: 'mock-123',
        name: 'Alex Fitness',
        email: 'alex@example.com',
        picture: 'https://i.pravatar.cc/150?u=alex',
        joinedDate: 'March 2024'
      });
    }
  };

  const renderView = () => {
    // Guard protected views
    const isProtected = currentView === View.ASSISTANT || currentView === View.DASHBOARD || currentView === View.PROFILE;
    if (isProtected && !user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-20 h-20 bg-nexus-gray rounded-full flex items-center justify-center mb-6 text-nexus-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Exclusive Territory</h2>
          <p className="text-nexus-muted max-w-md mb-8">
            Please sign in with Google to access your AI Coach, progress tracking, and personalized profile features.
          </p>
          <button 
            onClick={handleManualLogin}
            className="bg-white text-nexus-black px-8 py-3 rounded-xl font-bold hover:bg-nexus-primary transition-colors flex items-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Sign in with Google
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