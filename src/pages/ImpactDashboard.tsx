import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';
import { 
  Activity, 
  Users, 
  Droplets, 
  Recycle, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const ImpactDashboard = () => {
  const { hazards } = useAppContext();

  const impactData = [
    { month: 'Jan', resolved: 45, events: 12 },
    { month: 'Feb', resolved: 52, events: 15 },
    { month: 'Mar', resolved: 48, events: 18 },
    { month: 'Apr', resolved: 61, events: 22 },
    { month: 'May', resolved: 75, events: 25 },
    { month: 'Jun', resolved: 89, events: 30 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">IMPACT INTELLIGENCE</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Neural Metrics • Civic Action Effectiveness</p>
        </div>
        <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-2xl border border-white shadow-sm">
           <Activity className="h-3 w-3 text-primary animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-primary">Live Data Stream Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[ 
          { label: 'Flood Mitigation', value: 85, suffix: '%', desc: 'Net reduction in inundation risk.', icon: Droplets, color: 'bg-primary', accent: 'text-primary-foreground', stats: [{ label: 'Cleared', val: 1420 }, { label: 'Restored', val: '42km' }] },
          { label: 'Waste diversion', value: 12.5, decimals: 1, suffix: 't', desc: 'Plastic diverted from drainage.', icon: Recycle, color: 'bg-accent', accent: 'text-primary', stats: [{ label: 'Recyclers', val: 12 }, { label: 'Impact', val: 'CRITICAL' }] },
          { label: 'Public Health', value: 32, suffix: '%', desc: 'Disease vector net reduction.', icon: Activity, color: 'bg-white', accent: 'text-primary', stats: [{ label: 'Wards', val: 85 }, { label: 'Risk', val: 'MINIMAL' }] },
        ].map((card, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -12, rotateY: 5 }}
            className={cn(
              "card-3d p-10 shadow-2xl relative overflow-hidden group border-none transition-all duration-500",
              card.color === 'bg-white' ? 'bg-white' : card.color + " text-white"
            )}
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:rotate-12", card.color === 'bg-white' ? 'bg-primary/5' : 'bg-white/20')}>
                <card.icon className={cn("h-7 w-7", card.color === 'bg-white' ? 'text-primary' : 'text-white')} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 mb-3">{card.label}</h3>
              <div className="text-6xl font-black mb-3 tracking-tighter">
                <AnimatedNumber value={card.value} suffix={card.suffix} decimals={card.decimals || 0} />
              </div>
              <p className="text-xs font-bold opacity-70 mb-12 leading-relaxed">{card.desc}</p>
              
              <div className={cn("pt-8 border-t flex justify-between items-center", card.color === 'bg-white' ? 'border-slate-100' : 'border-white/10')}>
                {card.stats.map((s, si) => (
                  <div key={si}>
                    <p className={cn("text-[9px] font-black uppercase tracking-[0.2em]", card.color === 'bg-white' ? 'text-slate-400' : 'text-white/50')}>{s.label}</p>
                    <div className="text-xl font-black mt-1">
                       {typeof s.val === 'number' ? <AnimatedNumber value={s.val} /> : s.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 card-3d p-12 shadow-2xl border border-white/5 relative overflow-hidden group/chart">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(27,94,32,0.02),transparent_40%)]" />
           <div className="flex items-center justify-between mb-12 relative z-10">
              <div>
                 <h3 className="text-2xl font-black uppercase tracking-tight">Resolution Velocity</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Neural Efficiency Trend Analysis</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner group-hover/chart:rotate-12 transition-transform">
                 <TrendingUp className="h-7 w-7 text-primary" />
              </div>
           </div>
           <div className="h-80 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData}>
                  <defs>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1B5E20" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)'}}
                  />
                  <Area type="monotone" dataKey="resolved" stroke="#1B5E20" strokeWidth={5} fillOpacity={1} fill="url(#colorResolved)" name="Resolution_Index" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-5 card-3d p-12 shadow-2xl border border-white/5 flex flex-col group/bar">
           <div className="flex items-center justify-between mb-12">
              <div>
                 <h3 className="text-2xl font-black uppercase tracking-tight">Force Deployment</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Active Volunteer Mission Scale</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner group-hover/bar:scale-110 transition-transform">
                 <Users className="h-7 w-7 text-primary" />
              </div>
           </div>
           <div className="flex-1 h-80">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={impactData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                 <Tooltip 
                   contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)'}}
                 />
                 <Bar dataKey="events" fill="#1B5E20" radius={[12, 12, 0, 0]} name="Missions_Active" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="card-3d bg-slate-900 p-1 overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border-none">
         <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[18px] text-white flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(27,94,32,0.1),transparent_60%)] pointer-events-none" />
            
            <div className="lg:col-span-8 relative z-10 text-center lg:text-left">
               <div className="flex items-center gap-5 mb-8 justify-center lg:justify-start">
                  <motion.div 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-md"
                  >
                     <ShieldCheck className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Protocol Sustainability</h3>
               </div>
               <p className="text-slate-300 font-medium leading-loose max-w-2xl text-lg opacity-80">
                  ECHO impact analytics are verified through synchronized satellite telemetry and ground-truth citizen reporting. Our mission is to sustain zero-flood thresholds across all metropolitan sectors.
               </p>
            </div>

            <div className="lg:col-span-4 w-full flex flex-col items-center gap-4 bg-white/5 p-10 rounded-[40px] border border-white/10 relative z-10 shadow-inner group/stat">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" />
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">System Reliability</span>
               <div className="text-7xl font-black tracking-tighter flex items-baseline gap-1">
                 <AnimatedNumber value={99.9} decimals={1} />
                 <span className="text-2xl font-bold opacity-30">%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-primary glow-3d-green"
                  />
               </div>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2 animate-pulse">Telemetry_Verified // Status_Nominal</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default ImpactDashboard;
