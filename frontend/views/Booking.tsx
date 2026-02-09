import React, { useState, useEffect } from 'react';
import { fetchGyms } from '../services/geminiService';
import { Gym } from '../types';
import { MapPin, Search, Calendar, Star, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export const Booking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gyms, setGyms] = useState<Gym[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [bookedGyms, setBookedGyms] = useState<Record<string, boolean>>({});

  const loadData = async (query: string = '') => {
    setLoading(true);
    const data = await fetchGyms(query);
    setGyms(data);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleBook = (id: string) => {
    setBookedGyms(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Nexus Pass Booking</h2>
        <p className="text-xl text-nexus-muted max-w-2xl mx-auto">
          One account, unlimited access. Book a session at any partner location worldwide.
        </p>
      </div>

      <div className="bg-nexus-dark p-4 rounded-xl flex items-center gap-4 mb-12 max-w-2xl mx-auto border border-nexus-gray shadow-2xl">
        <MapPin className="text-nexus-primary" />
        <input 
          type="text" 
          placeholder="Search global gyms, trainers, or classes..." 
          className="bg-transparent border-none outline-none text-white w-full placeholder-nexus-muted"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="p-2">
          {loading ? <Loader2 className="animate-spin text-nexus-primary" size={20} /> : <Search size={20} className="text-nexus-muted" />}
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-64 bg-nexus-dark border border-nexus-gray rounded-xl animate-pulse" />
          ))
        ) : !gyms || gyms.length === 0 ? (
          <div className="text-center py-20 bg-nexus-dark border border-nexus-gray rounded-2xl flex flex-col items-center">
            <AlertCircle size={40} className="text-nexus-muted mb-4 opacity-20" />
            <p className="text-nexus-muted italic">Gym data not available at this location.</p>
          </div>
        ) : (
          gyms.map(gym => (
            <div key={gym.id} className="bg-nexus-dark rounded-xl overflow-hidden border border-nexus-gray flex flex-col md:flex-row hover:border-nexus-primary transition-all">
              <div className="w-full md:w-1/3 h-48 md:h-auto relative group">
                <img src={gym.image} alt={gym.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-2 left-2 bg-nexus-primary text-nexus-black text-xs font-bold px-2 py-1 rounded uppercase">
                  {gym.type}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 uppercase italic tracking-tight">{gym.name}</h3>
                      <p className="text-nexus-muted flex items-center gap-1 text-sm mb-4">
                        <MapPin size={14} /> {gym.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-nexus-primary">${gym.pricePerSession}</div>
                      <div className="text-xs text-nexus-muted uppercase tracking-widest">Single Access</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gym.features.map((feat, idx) => (
                      <span key={idx} className="bg-nexus-black px-3 py-1 rounded text-[10px] uppercase font-bold text-nexus-muted border border-nexus-gray">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-nexus-gray/50">
                  <div className="flex items-center text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    <span className="ml-1 text-white font-bold">{gym.rating}</span>
                  </div>
                  <button 
                    onClick={() => handleBook(gym.id)}
                    disabled={bookedGyms[gym.id]}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                      bookedGyms[gym.id] 
                        ? 'bg-green-900/50 text-green-400 border border-green-500/50 scale-95' 
                        : 'bg-nexus-text text-nexus-black hover:bg-nexus-primary'
                    }`}
                  >
                    {bookedGyms[gym.id] ? (
                      <>Access Granted <CheckCircle size={16} /></>
                    ) : (
                      <>Reserve Spot <Calendar size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};