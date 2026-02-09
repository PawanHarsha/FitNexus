import React from 'react';
import { Check, Zap, Shield, Crown, Star, ArrowRight, ShieldCheck } from 'lucide-react';

interface SubscriptionProps {
  onUpgrade: () => void;
}

export const Subscription: React.FC<SubscriptionProps> = ({ onUpgrade }) => {
  const plans = [
    {
      name: 'Standard',
      price: '0',
      description: 'Essential access for the casual athlete.',
      features: ['Basic Marketplace Access', 'Limited Gym Bookings', 'Standard AI Coach Response', 'Public Dashboard'],
      cta: 'Current Plan',
      premium: false
    },
    {
      name: 'Nexus Pro',
      price: '29',
      description: 'The complete ecosystem for serious performance.',
      features: [
        'Unlimited Global Gym Access',
        '0% Marketplace Service Fees',
        'Priority AI Coach (Instant)',
        'Advanced Biometric Analytics',
        'Early Access to Gear Drops',
        '3D Home Gym Blueprinting'
      ],
      cta: 'Upgrade to Pro',
      premium: true,
      popular: true
    },
    {
      name: 'Nexus Elite',
      price: '99',
      description: 'Institutional-grade training for professionals.',
      features: [
        'All Pro Features',
        'Personal Human Liaison',
        'Custom Nutrition Mainframe',
        'Quarterly Lab Analysis Sync',
        'Private VIP Facility Access'
      ],
      cta: 'Go Elite',
      premium: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-nexus-primary/10 text-nexus-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-nexus-primary/20">
          <Crown size={14} /> Premium Protocol
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          Unleash the <span className="text-nexus-primary">Full System</span>
        </h2>
        <p className="text-nexus-muted text-xl max-w-2xl mx-auto">
          Upgrade your authentication level to access restricted zones and global high-performance facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 hover:translate-y-[-8px] ${
              plan.popular 
                ? 'bg-nexus-dark border-nexus-primary shadow-[0_0_40px_rgba(163,230,53,0.1)] z-10' 
                : 'bg-nexus-black border-nexus-gray hover:border-nexus-muted'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nexus-primary text-nexus-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Recommended
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-2xl font-black uppercase italic mb-2 ${plan.premium ? 'text-nexus-primary' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-nexus-muted text-sm leading-relaxed h-10">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">${plan.price}</span>
              <span className="text-nexus-muted text-sm uppercase tracking-widest">/ month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-nexus-text">
                  <div className={`mt-0.5 p-0.5 rounded-full ${plan.premium ? 'bg-nexus-primary text-nexus-black' : 'bg-nexus-gray text-white'}`}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={plan.name === 'Nexus Pro' ? onUpgrade : undefined}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all text-sm flex items-center justify-center gap-2 group ${
                plan.cta === 'Current Plan'
                  ? 'bg-nexus-gray text-nexus-muted cursor-default'
                  : plan.premium
                    ? 'bg-nexus-primary text-nexus-black hover:bg-white'
                    : 'bg-white text-nexus-black hover:bg-nexus-primary'
              }`}
            >
              {plan.cta}
              {plan.cta !== 'Current Plan' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="bg-nexus-dark border border-nexus-gray rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-nexus-gray rounded-2xl text-nexus-primary">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white uppercase italic tracking-tight">Encryption Guaranteed</h4>
            <p className="text-nexus-muted text-sm">All payments are processed via the Nexus Secure Layer. 256-bit encryption active.</p>
          </div>
        </div>
        <div className="flex gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-6" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="Paypal" />
        </div>
      </div>
    </div>
  );
};