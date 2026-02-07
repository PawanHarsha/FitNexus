import React from 'react';
import { User } from '../types';
import { Shield, Mail, Calendar, Settings, Award, History } from 'lucide-react';

interface ProfileProps {
  user: User | null;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-nexus-dark border border-nexus-gray rounded-3xl overflow-hidden shadow-2xl">
        {/* Header/Cover */}
        <div className="h-32 bg-nexus-primary/20"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col items-center -mt-16 mb-6">
            <img 
              src={user.picture} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-nexus-black shadow-lg"
            />
            <h2 className="text-3xl font-bold text-white mt-4">{user.name}</h2>
            <div className="flex items-center gap-2 text-nexus-muted text-sm mt-1">
              <Mail size={14} /> {user.email}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="space-y-6">
              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield size={16} /> Member Info
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Member Since</span>
                    <span className="text-white text-sm flex items-center gap-2"><Calendar size={14} /> {user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Account Status</span>
                    <span className="text-nexus-primary text-xs font-bold px-2 py-1 bg-nexus-primary/10 rounded">ELITE PRO</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Global Pass</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={16} /> Achievements
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Consistency King', 'Early Bird', '1000lb Club', 'Nexus OG'].map((badge) => (
                    <span key={badge} className="px-3 py-1 bg-nexus-gray text-white text-xs rounded-full border border-nexus-gray/50">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-nexus-black p-4 rounded-xl border border-nexus-gray">
                <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <History size={16} /> Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { act: 'Gym Session', loc: 'Iron Paradise NYC', time: '2 hours ago' },
                    { act: 'Marketplace Purchase', loc: 'Nitro Whey Gold', time: 'Yesterday' },
                    { act: 'AI Consultation', loc: 'Custom Leg Plan', time: '2 days ago' },
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-nexus-gray pl-4 py-1">
                      <p className="text-white text-sm font-semibold">{item.act}</p>
                      <p className="text-nexus-muted text-xs">{item.loc} • {item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-nexus-gray hover:bg-nexus-text hover:text-nexus-black text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Settings size={18} /> Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};