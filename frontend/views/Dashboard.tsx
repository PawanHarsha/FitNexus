import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { fetchDashboardData } from '../services/geminiService';
import { WorkoutData } from '../types';
import { Activity, Zap, Clock, Loader2, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<WorkoutData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const metrics = await fetchDashboardData();
      setData(metrics);
      setLoading(false);
    };
    loadData();
  }, []);

  const totalCalories = data ? data.reduce((acc, curr) => acc + curr.calories, 0) : 0;
  const totalMinutes = data ? data.reduce((acc, curr) => acc + curr.duration, 0) : 0;
  const activeDays = data ? data.filter(d => d.duration > 0).length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Your Vitals</h2>
          <p className="text-nexus-muted">Last 7 Days API Sync</p>
        </div>
        <button onClick={() => window.location.reload()} className="text-nexus-primary text-xs font-bold uppercase tracking-widest hover:underline">
          Manual Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-nexus-primary" size={48} />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-nexus-dark border border-nexus-gray rounded-2xl text-nexus-muted">
          <AlertCircle size={48} className="mb-4 opacity-20" />
          <p className="text-lg italic">Dashboard data not available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-nexus-dark border border-nexus-gray rounded-xl p-8 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500/10 p-4 rounded-xl text-blue-500">
                  <Zap size={28} />
                </div>
                <div className="text-nexus-muted text-xs font-black uppercase tracking-widest">Energy Expended</div>
              </div>
              <div className="text-4xl font-black text-white italic">{totalCalories.toLocaleString()} <span className="text-sm text-nexus-muted font-normal not-italic tracking-normal lowercase ml-1">kcal</span></div>
            </div>

            <div className="bg-nexus-dark border border-nexus-gray rounded-xl p-8 hover:border-nexus-primary transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-nexus-primary/10 p-4 rounded-xl text-nexus-primary">
                  <Clock size={28} />
                </div>
                <div className="text-nexus-muted text-xs font-black uppercase tracking-widest">Temporal Usage</div>
              </div>
              <div className="text-4xl font-black text-white italic">{totalMinutes} <span className="text-sm text-nexus-muted font-normal not-italic tracking-normal lowercase ml-1">min</span></div>
            </div>

            <div className="bg-nexus-dark border border-nexus-gray rounded-xl p-8 hover:border-purple-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-500/10 p-4 rounded-xl text-purple-500">
                  <Activity size={28} />
                </div>
                <div className="text-nexus-muted text-xs font-black uppercase tracking-widest">Active Cycles</div>
              </div>
              <div className="text-4xl font-black text-white italic">{activeDays} <span className="text-sm text-nexus-muted font-normal not-italic tracking-normal lowercase ml-1">sessions</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-nexus-dark border border-nexus-gray rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest italic">Calorie Burn Curve</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="1 1" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="day" stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f0f11', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }}
                      cursor={{fill: 'rgba(163,230,53,0.05)'}}
                    />
                    <Bar dataKey="calories" fill="#a3e635" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-nexus-dark border border-nexus-gray rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest italic">Cycle Duration</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="1 1" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="day" stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" tick={{fill: '#a1a1aa', fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f0f11', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Line type="step" dataKey="duration" stroke="#3b82f6" strokeWidth={4} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};