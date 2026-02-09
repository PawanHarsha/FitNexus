import React, { useState, useEffect } from 'react';
import { fetchPackages } from '../services/geminiService';
import { Package } from '../types';
import { Check, Truck, PenTool, LayoutTemplate, Loader2, AlertCircle } from 'lucide-react';

interface HomeGymProps {
  addToCart: () => void;
}

export const HomeGym: React.FC<HomeGymProps> = ({ addToCart }) => {
  const [packages, setPackages] = useState<Package[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPackages();
      setPackages(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-nexus-black">
      <div className="bg-gradient-to-b from-nexus-gray/50 to-nexus-black py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">Build Your sanctuary</h1>
        <p className="text-xl text-nexus-muted max-w-3xl mx-auto mb-10">
          Professional grade equipment bundles tailored by API to fit your square footage.
        </p>
        <div className="flex justify-center gap-12 text-nexus-primary text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2"><Truck size={18} /> Logistics Included</div>
          <div className="flex items-center gap-2"><PenTool size={18} /> White Glove Install</div>
          <div className="flex items-center gap-2"><LayoutTemplate size={18} /> 3D Rendering</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-[500px] bg-nexus-dark border border-nexus-gray rounded-2xl animate-pulse" />)}
          </div>
        ) : !packages || packages.length === 0 ? (
          <div className="text-center py-20 bg-nexus-dark border border-nexus-gray rounded-3xl flex flex-col items-center">
            <AlertCircle size={40} className="text-nexus-muted mb-4 opacity-20" />
            <p className="text-nexus-muted italic">Gym packages currently not available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className={`rounded-2xl overflow-hidden flex flex-col relative border transition-all duration-500 hover:scale-105 ${
                  pkg.tier === 'PRO' ? 'border-nexus-primary bg-nexus-dark shadow-2xl' : 'border-nexus-gray bg-nexus-black'
                }`}
              >
                {pkg.tier === 'PRO' && (
                  <div className="absolute top-0 left-0 w-full bg-nexus-primary text-nexus-black text-center text-[10px] font-black py-1 tracking-widest">
                    SYSTEM RECOMMENDED
                  </div>
                )}
                
                <div className="h-56 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-700" />
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{pkg.name}</h3>
                  <p className="text-nexus-muted text-sm mb-6 h-12 leading-relaxed">{pkg.description}</p>
                  
                  <div className="mb-8 border-b border-nexus-gray pb-4">
                    <span className="text-4xl font-black text-white">${pkg.price}</span>
                    <span className="text-nexus-muted text-xs uppercase tracking-widest ml-2">Final Bundle</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-nexus-text">
                        <Check className="text-nexus-primary shrink-0 mt-0.5" size={16} />
                        <span className="font-medium tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={addToCart}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                      pkg.tier === 'PRO' 
                        ? 'bg-nexus-primary text-nexus-black hover:bg-nexus-primaryHover' 
                        : 'bg-nexus-gray text-white hover:bg-white hover:text-nexus-black'
                    }`}
                  >
                    Configure Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};