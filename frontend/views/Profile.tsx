import React from 'react';
import { User } from '../types';
import { Shield, Mail, Calendar, Settings, Award, History, Phone, User as UserIcon, Crown, Sparkles } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onUpgrade: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpgrade }) => {
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-nexus-dark border border-nexus-gray rounded-3xl overflow-hidden shadow-2xl">
        {/* Header/Cover */}
        <div className={`h-32 ${user.isPro ? 'bg-gradient-to-r from-nexus-primary/20 via-nexus-primary/5 to-nexus-primary/20' : 'bg-nexus-primary/10'}`}></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              <img 
                src={user.picture} 
                alt={user.name} 
                className={`w-32 h-32 rounded-full border-4 shadow-lg ${user.isPro ? 'border-nexus-primary shadow-[0_0_20px_rgba(163,230,53,0.3)]' : 'border-nexus-black'}`}
              />
              {user.isPro && (
                <div className="absolute -top-2 -right-2 bg-nexus-primary text-nexus-black p-1.5 rounded-full shadow-xl">
                  <Crown size={20} strokeWidth={3} />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mt-4 uppercase italic tracking-tighter flex items-center gap-3">
              {user.name}
              {user.isPro && <Sparkles size={24} className="text-nexus-primary" />}
            </h2>
            <div className="flex items-center gap-2 text-nexus-muted text-sm mt-1">
              <Mail size={14} /> {user.email}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="space-y-6">
              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield size={16} /> Member Vitals
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Joined Nexus</span>
                    <span className="text-white text-sm flex items-center gap-2 font-mono">{user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Contact</span>
                    <span className="text-white text-sm flex items-center gap-2 font-mono"><Phone size={14} /> {user.phone || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Age / Sex</span>
                    <span className="text-white text-sm flex items-center gap-2 font-mono"><UserIcon size={14} /> {user.age || '??'} / {user.sex || '??'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Account Tier</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${
                      user.isPro 
                        ? 'text-nexus-primary bg-nexus-primary/10 border-nexus-primary' 
                        : 'text-nexus-muted bg-nexus-gray border-nexus-gray'
                    }`}>
                      {user.isPro ? 'Nexus Pro' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>

              {!user.isPro && (
                <div className="bg-gradient-to-br from-nexus-dark to-nexus-black p-6 rounded-2xl border border-nexus-primary/30 shadow-[0_10px_30px_rgba(163,230,53,0.05)]">
                  <h4 className="text-nexus-primary font-black uppercase text-xs tracking-widest mb-2 italic">Upgrade Available</h4>
                  <p className="text-nexus-text text-sm mb-4 leading-relaxed">
                    Unlock unlimited global gym access and 0% service fees in the marketplace.
                  </p>
                  <button 
                    onClick={onUpgrade}
                    className="w-full bg-nexus-primary text-nexus-black py-3 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                    Go Pro Now <Crown size={14} />
                  </button>
                </div>
              )}

              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={16} /> Achievements
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Consistency King', 'Early Bird', '1000lb Club', 'Nexus OG'].map((badge) => (
                    <span key={badge} className="px-3 py-1 bg-nexus-gray text-white text-[10px] rounded-full border border-nexus-gray/50 uppercase font-bold tracking-widest">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <History size={16} /> Nexus Logs
                </h3>
                <div className="space-y-4">
                  {[
                    { act: 'Profile Initialized', loc: 'Mainframe', time: 'Just now' },
                    { act: 'Gym Session', loc: 'Iron Paradise NYC', time: '2 hours ago' },
                    { act: 'AI Consultation', loc: 'Custom Leg Plan', time: '2 days ago' },
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-nexus-gray pl-4 py-1">
                      <p className="text-white text-sm font-semibold italic">{item.act}</p>
                      <p className="text-nexus-muted text-xs uppercase tracking-tighter">{item.loc} • {item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-nexus-gray hover:bg-white hover:text-nexus-black text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                <Settings size={18} /> Modify Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};