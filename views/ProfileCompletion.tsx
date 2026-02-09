import React, { useState } from 'react';
import { User } from '../types';
import { UserCircle, Phone, Calendar, Users, ChevronRight } from 'lucide-react';

interface ProfileCompletionProps {
  user: User;
  onComplete: (updatedUser: User) => void;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: '',
    age: '',
    sex: 'Male' as 'Male' | 'Female' | 'Other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user,
      name: formData.name,
      phone: formData.phone,
      age: parseInt(formData.age),
      sex: formData.sex,
      isProfileComplete: true,
      isPro: false,
      isPhoneVerified: false // Mobile starts as unverified
    };
    onComplete(updatedUser);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-nexus-dark border border-nexus-gray rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-nexus-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-nexus-primary">
            <UserCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Final Step</h2>
          <p className="text-nexus-muted">Help us tailor your Nexus experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-nexus-muted ml-1">Full Name</label>
            <div className="relative">
              <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-nexus-muted" size={18} />
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-nexus-black border border-nexus-gray rounded-xl py-3 pl-12 pr-4 text-white focus:border-nexus-primary outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-nexus-muted ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-nexus-muted" size={18} />
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-nexus-black border border-nexus-gray rounded-xl py-3 pl-12 pr-4 text-white focus:border-nexus-primary outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-muted ml-1">Age</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-nexus-muted" size={18} />
                <input 
                  required
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-nexus-black border border-nexus-gray rounded-xl py-3 pl-12 pr-4 text-white focus:border-nexus-primary outline-none transition-all"
                  placeholder="25"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-muted ml-1">Sex</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-nexus-muted" size={18} />
                <select 
                  value={formData.sex}
                  onChange={(e) => setFormData({...formData, sex: e.target.value as any})}
                  className="w-full bg-nexus-black border border-nexus-gray rounded-xl py-3 pl-12 pr-4 text-white focus:border-nexus-primary outline-none transition-all appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-nexus-primary hover:bg-white text-nexus-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-8"
          >
            CREATE ACCOUNT <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};