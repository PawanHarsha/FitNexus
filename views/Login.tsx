import React from 'react';
import { Bot, MapPin, Activity, ShoppingBag, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-nexus-black overflow-hidden">
      {/* Brand Side */}
      <div className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Gym" 
            className="w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nexus-black via-nexus-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-nexus-primary rounded-xl flex items-center justify-center text-nexus-black font-bold text-2xl">N</div>
            <span className="text-2xl font-black text-white italic tracking-tighter">FITNEXUS</span>
          </div>
          <h1 className="text-6xl font-black text-white leading-none uppercase italic tracking-tighter">
            Join the <br />
            <span className="text-nexus-primary">Elite Ecosystem</span>
          </h1>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-6 max-w-md">
          <div className="flex items-center gap-3 text-nexus-text">
            <Bot className="text-nexus-primary" size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">AI Coaching</span>
          </div>
          <div className="flex items-center gap-3 text-nexus-text">
            <MapPin className="text-nexus-primary" size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">Global Pass</span>
          </div>
          <div className="flex items-center gap-3 text-nexus-text">
            <Activity className="text-nexus-primary" size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">Live Metrics</span>
          </div>
          <div className="flex items-center gap-3 text-nexus-text">
            <ShoppingBag className="text-nexus-primary" size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">Pro Gear</span>
          </div>
        </div>
      </div>

      {/* Login Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-3 mb-12 justify-center">
            <div className="w-10 h-10 bg-nexus-primary rounded-xl flex items-center justify-center text-nexus-black font-bold text-2xl">N</div>
            <span className="text-2xl font-black text-white italic tracking-tighter uppercase">FITNEXUS</span>
          </div>

          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Welcome Back</h2>
            <p className="text-nexus-muted">Enter the mainframe to continue your progress.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full bg-white hover:bg-nexus-primary text-nexus-black font-black py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-4 group"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              <span className="uppercase tracking-widest">Sign in with Google</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-nexus-gray"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-nexus-black px-2 text-nexus-muted tracking-[0.2em]">Secure Authentication</span></div>
            </div>

            <p className="text-nexus-muted text-center text-xs px-8 leading-relaxed">
              By entering the Nexus, you agree to our <span className="text-nexus-text underline cursor-pointer">Terms of Combat</span> and <span className="text-nexus-text underline cursor-pointer">Privacy Protocols</span>.
            </p>
          </div>

          <div className="mt-16 p-6 bg-nexus-dark border border-nexus-gray rounded-2xl">
            <p className="text-nexus-primary text-xs font-black uppercase tracking-widest mb-2">New to FitNexus?</p>
            <p className="text-nexus-muted text-sm">
              Our automated system will create your unique athlete profile instantly upon your first Google sign-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};