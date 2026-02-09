import React from 'react';
import { View } from '../types';
import { ArrowRight, ShoppingBag, Dumbbell, MapPin } from 'lucide-react';

interface HomeProps {
  changeView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ changeView }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-black via-nexus-black/80 to-transparent z-10"></div>
        <div 
          className="h-[600px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')` }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Train <span className="text-nexus-primary">Anywhere.</span><br />
                Own Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-white">Limits.</span>
              </h1>
              <p className="text-xl text-nexus-text mb-8">
                The all-in-one ecosystem for fitness. Shop premium gear, access gyms worldwide, and build your dream home setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => changeView(View.BOOKING)}
                  className="bg-nexus-primary hover:bg-nexus-primaryHover text-nexus-black px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  Find a Gym <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => changeView(View.MARKETPLACE)}
                  className="bg-nexus-gray hover:bg-nexus-text hover:text-nexus-black text-white px-8 py-4 rounded-lg font-bold text-lg transition-all border border-nexus-gray"
                >
                  Shop Gear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div onClick={() => changeView(View.MARKETPLACE)} className="bg-nexus-dark p-8 rounded-2xl border border-nexus-gray hover:border-nexus-primary cursor-pointer transition-all group">
            <div className="bg-nexus-gray w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-nexus-primary transition-colors">
              <ShoppingBag size={32} className="text-white group-hover:text-nexus-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Premium Marketplace</h3>
            <p className="text-nexus-muted">
              Curated selection of supplements, apparel, and accessories from top-tier brands.
            </p>
          </div>

          <div onClick={() => changeView(View.BOOKING)} className="bg-nexus-dark p-8 rounded-2xl border border-nexus-gray hover:border-nexus-primary cursor-pointer transition-all group">
            <div className="bg-nexus-gray w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-nexus-primary transition-colors">
              <MapPin size={32} className="text-white group-hover:text-nexus-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Universal Access</h3>
            <p className="text-nexus-muted">
              Pay here, gym everywhere. Instant drop-in passes for gyms and trainers near you.
            </p>
          </div>

          <div onClick={() => changeView(View.HOME_GYM)} className="bg-nexus-dark p-8 rounded-2xl border border-nexus-gray hover:border-nexus-primary cursor-pointer transition-all group">
            <div className="bg-nexus-gray w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-nexus-primary transition-colors">
              <Dumbbell size={32} className="text-white group-hover:text-nexus-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Build Your Gym</h3>
            <p className="text-nexus-muted">
              Expert-designed packages to turn your home into a personal strength sanctuary.
            </p>
          </div>

        </div>
      </div>
      
      {/* AI Teaser */}
      <div className="bg-nexus-gray py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="md:w-1/2">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet NexusCoach AI</h2>
             <p className="text-nexus-muted text-lg mb-6">
               Unsure what protein to buy? Need a workout plan for your new home gym? 
               Our AI assistant is trained on elite fitness data to guide your journey.
             </p>
             <button 
               onClick={() => changeView(View.ASSISTANT)}
               className="text-nexus-primary font-bold text-lg flex items-center gap-2 hover:underline"
             >
               Start Chatting <ArrowRight size={20} />
             </button>
           </div>
           <div className="md:w-1/2 flex justify-center">
             <div className="bg-nexus-black p-6 rounded-2xl border border-nexus-gray max-w-sm w-full shadow-2xl">
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-nexus-primary"></div>
                  <div className="bg-nexus-dark p-3 rounded-lg text-sm text-nexus-text">
                    I recommend the Nitro Whey Gold for lean muscle recovery. Would you like to see the nutrition label?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-nexus-gray p-3 rounded-lg text-sm text-white">
                    Yes, and add it to my cart please!
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};