import React, { useState } from 'react';
import { User } from '../types';
import { Shield, Mail, Calendar, Settings, Award, History, Phone, User as UserIcon, Crown, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSendOtp = () => {
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      const updatedUser = { ...user, isPhoneVerified: true };
      onUpdateUser(updatedUser);
      setIsVerifying(false);
      setOtpSent(false);
      setOtpCode('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* OTP Verification Modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nexus-black/80 backdrop-blur-sm px-4">
          <div className="bg-nexus-dark border border-nexus-gray w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Secure Link</h3>
                <p className="text-nexus-muted text-sm">Authenticating mobile: {user.phone}</p>
              </div>
              <button onClick={() => { setIsVerifying(false); setOtpSent(false); }} className="text-nexus-muted hover:text-white">
                <X size={24} />
              </button>
            </div>

            {!otpSent ? (
              <div className="space-y-6">
                <p className="text-nexus-text text-sm leading-relaxed">
                  We will send a 6-digit authentication code to your registered mobile number to verify your identity within the Nexus.
                </p>
                <button 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-nexus-primary text-nexus-black font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP Code'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-nexus-muted ml-1">Authentication Code</label>
                  <input 
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className="w-full bg-nexus-black border border-nexus-gray rounded-xl py-4 text-center text-2xl font-black tracking-[0.5em] text-nexus-primary focus:border-nexus-primary outline-none"
                  />
                </div>
                <button 
                  onClick={handleVerifyOtp}
                  disabled={loading || otpCode.length < 6}
                  className="w-full bg-nexus-primary text-nexus-black font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Code'}
                </button>
                <p className="text-center text-xs text-nexus-muted">
                  Didn't receive it? <button onClick={handleSendOtp} className="text-nexus-primary font-bold hover:underline">Resend</button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-nexus-dark border border-nexus-gray rounded-3xl overflow-hidden shadow-2xl">
        {/* Header/Cover */}
        <div className={`h-32 ${user.isPro ? 'bg-gradient-to-r from-nexus-primary/40 to-nexus-primary/10' : 'bg-nexus-gray'}`}></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              <img 
                src={user.picture} 
                alt={user.name} 
                className={`w-32 h-32 rounded-full border-4 ${user.isPro ? 'border-nexus-primary' : 'border-nexus-black'} shadow-lg`}
              />
              {user.isPro && (
                <div className="absolute bottom-1 right-1 bg-nexus-primary rounded-full p-1.5 border-4 border-nexus-black">
                  <Crown size={18} className="text-nexus-black" />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mt-4 uppercase italic tracking-tighter flex items-center gap-2">
              {user.name}
              {user.isPro && <CheckCircle2 size={24} className="text-nexus-primary" />}
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
                    <span className="text-white text-sm font-mono">{user.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Mobile Auth</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-mono">{user.phone || 'Not set'}</span>
                      {user.isPhoneVerified ? (
                        <span className="flex items-center gap-1 text-[9px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 font-black tracking-widest uppercase">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      ) : (
                        <button 
                          onClick={() => setIsVerifying(true)}
                          className="flex items-center gap-1 text-[9px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-500/20 font-black tracking-widest uppercase hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <AlertCircle size={10} /> Unchecked
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Age / Sex</span>
                    <span className="text-white text-sm font-mono">{user.age || '??'} / {user.sex || '??'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-nexus-muted text-sm">Account Tier</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${
                      user.isPro 
                        ? 'text-nexus-primary bg-nexus-primary/10 border-nexus-primary/20' 
                        : 'text-nexus-muted bg-nexus-gray border-nexus-gray'
                    }`}>
                      {user.isPro ? 'FITNEXUS PRO' : 'STANDARD'}
                    </span>
                  </div>
                </div>
              </div>

              {user.isPro && (
                <div className="bg-gradient-to-br from-nexus-primary/5 to-transparent p-4 rounded-xl border border-nexus-primary/20">
                  <h3 className="text-nexus-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Crown size={16} /> Pro Active Perks
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-nexus-text text-xs flex items-center gap-2"><CheckCircle2 size={12} className="text-nexus-primary" /> Full Neural AI Coaching</li>
                    <li className="text-nexus-text text-xs flex items-center gap-2"><CheckCircle2 size={12} className="text-nexus-primary" /> Real-time Biometric Dashboard</li>
                    <li className="text-nexus-text text-xs flex items-center gap-2"><CheckCircle2 size={12} className="text-nexus-primary" /> Multi-Gym Multi-Trainer Access</li>
                  </ul>
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
                    { act: 'Mobile Verification', loc: 'Gateway 4', time: user.isPhoneVerified ? 'Confirmed' : 'Pending' },
                    { act: 'Profile Initialized', loc: 'Mainframe', time: 'Just now' },
                    { act: 'Gym Session', loc: 'Iron Paradise NYC', time: '2 hours ago' },
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-nexus-gray pl-4 py-1">
                      <p className="text-white text-sm font-semibold italic">{item.act}</p>
                      <p className="text-nexus-muted text-xs uppercase tracking-tighter">{item.loc} • {item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {!user.isPro && (
                <button className="w-full bg-nexus-primary text-nexus-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs hover:bg-white shadow-lg shadow-nexus-primary/20">
                  <Crown size={18} /> Upgrade to Pro
                </button>
              )}

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