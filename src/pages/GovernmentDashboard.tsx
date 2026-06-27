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
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShieldAlert, 
  Users, 
  MapPin, 
  Filter, 
  Download,
  AlertTriangle,
  FileText,
  Activity,
  Zap,
  Cpu,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const GovernmentDashboard = () => {
  const { hazards, wardHealthScores } = useAppContext();

  const data = [
    { name: 'Ikeja', hazards: 12, resolved: 8 },
    { name: 'Alimosho', hazards: 18, resolved: 10 },
    { name: 'Eti-Osa', hazards: 5, resolved: 4 },
    { name: 'Island', hazards: 9, resolved: 3 },
  ];

  const hazardTypeData = [
    { name: 'Plastic Waste', value: 35 },
    { name: 'Blocked Drain', value: 25 },
    { name: 'Flooding', value: 20 },
    { name: 'Other', value: 20 },
  ];

  const COLORS = ['#1B5E20', '#2563eb', '#F9A825', '#dc2626'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20 px-4 md:px-0"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-8">
           <motion.div 
            whileHover={{ scale: 1.1, rotate: -6 }}
            className="w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] glow-3d-green border border-white/10"
           >
              <ShieldAlert className="h-10 w-10 text-primary animate-pulse" />
           </motion.div>
           <div>
             <h1 className="text-4xl font-black tracking-tight uppercase leading-none">Command Center</h1>
             <div className="flex items-center gap-3 mt-3">
               <Cpu className="h-3 w-3 text-primary" />
               <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">State Environmental Authority_Authority_Grid</p>
             </div>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="glass-panel h-14 px-8 rounded-2xl border-white shadow-xl font-black uppercase tracking-widest text-[10px] btn-lift">
            <Filter className="mr-3 h-4 w-4" /> Sector_Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-2xl shadow-2xl glow-btn-primary font-black uppercase tracking-widest text-[10px] btn-lift border border-primary/20">
            <Download className="mr-3 h-4 w-4" /> Export_Protocol
          </Button>
        </div>
      </div>

      {/* Enterprise Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Intelligence Reports', value: hazards.length, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Extreme Hotspots', value: hazards.filter(h => h.severity === 'Critical').length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Field Mobilized', value: 3248, icon: Users, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'System Health', value: 64, suffix: '%', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-3d p-10 shadow-2xl relative overflow-hidden group border-none"
          >
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] transform group-hover:scale-125 transition-transform duration-700">
               <stat.icon className="h-32 w-32" />
            </div>
            <div className="relative z-10">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:rotate-12", stat.bg, stat.color)}>
                 <stat.icon className="h-7 w-7" />
               </div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
               <div className="text-4xl font-black text-foreground">
                 <AnimatedNumber value={stat.value} suffix={(stat as any).suffix || ''} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Analytics Engine */}
        <div className="lg:col-span-8 space-y-10">
           <div className="card-3d p-12 shadow-2xl border-none relative overflow-hidden group/chart">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(27,94,32,0.03),transparent_40%)]" />
              <div className="flex items-center justify-between mb-12 relative z-10">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Regional Intervention Velocity</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Neural Efficiency Matrix per Sector</p>
                 </div>
                 <div className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-2xl border border-primary/10 shadow-inner group-hover/chart:rotate-3 transition-transform">
                    <Zap className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Optimizing_Protocol</span>
                 </div>
              </div>
              <div className="h-96 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorHazards" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1B5E20" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)'}}
                    />
                    <Area type="monotone" dataKey="hazards" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorHazards)" name="Reports_Auth" />
                    <Area type="monotone" dataKey="resolved" stroke="#1B5E20" strokeWidth={5} fillOpacity={1} fill="url(#colorResolved)" name="Resolution_Cycle" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Live Field Feed (Table) */}
           <div className="card-3d overflow-hidden shadow-2xl border-none">
              <div className="p-10 bg-slate-900 border-b border-white/5 flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">Priority Nodes</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-2">Active Strategic Counter-Measures</p>
                 </div>
                 <Badge className="bg-red-500 text-white font-black uppercase tracking-widest text-[10px] px-5 py-2 shadow-2xl animate-pulse border-none">Immediate_Intervention_Required</Badge>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Threat_Vector</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Risk_Lvl</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Neural_Impact</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Action_Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {hazards.filter(h => h.severity === 'Critical' || h.severity === 'High').map((h, i) => (
                      <motion.tr 
                        key={h.id} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(27,94,32,0.03)' }}
                        className="transition-colors group"
                      >
                        <td className="p-8">
                          <div className="font-black text-slate-900 uppercase tracking-tight text-lg">{h.type}</div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2 mt-2 uppercase tracking-widest">
                            <MapPin className="h-3.5 w-3.5 text-primary" /> {h.location.ward} // SECTOR_{h.location.lga.toUpperCase()}
                          </div>
                        </td>
                        <td className="p-8 text-center">
                          <Badge className={cn(
                            "font-black uppercase tracking-widest text-[9px] px-4 py-1.5 border-none shadow-xl",
                            h.severity === 'Critical' ? "bg-red-500 shadow-red-500/20" : "bg-orange-500 shadow-orange-500/20"
                          )}>
                            {h.severity}
                          </Badge>
                        </td>
                        <td className="p-8">
                          <div className="flex flex-col gap-2.5">
                             <div className="flex justify-between items-end">
                                <span className="font-black text-red-600 text-[10px] tracking-widest">EXTREME_THREAT</span>
                                <span className="text-[10px] font-black opacity-30">84%</span>
                             </div>
                             <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: '84%' }}
                                  className="h-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                                />
                             </div>
                          </div>
                        </td>
                        <td className="p-8">
                           <Button className="h-12 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[9px] rounded-2xl px-6 shadow-2xl glow-3d-green transition-all group-hover:scale-105 border border-white/5">
                             Deploy_Response_Unit
                           </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                 <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all flex items-center gap-2 mx-auto">
                   <Target className="h-3 w-3" /> Access_Auth_Database_Archives
                 </Button>
              </div>
           </div>
        </div>

        {/* Secondary Intelligence */}
        <div className="lg:col-span-4 space-y-10">
           <div className="card-3d p-12 shadow-2xl border-none relative overflow-hidden group/pie">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(249,168,37,0.03),transparent_50%)]" />
              <div className="mb-12 relative z-10">
                 <h3 className="text-2xl font-black uppercase tracking-tight">Sector Composition</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Metropolitan Node Distribution Analysis</p>
              </div>
              <div className="h-72 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hazardTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {hazardTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer shadow-2xl" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)'}}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-5xl font-black text-foreground tracking-tighter leading-none">100</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Total_Mesh</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
                {hazardTypeData.map((entry, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05 }}
                    className="bg-slate-50 p-5 rounded-[24px] border border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entry.name}</span>
                    </div>
                    <p className="text-2xl font-black tracking-tight">{entry.value}%</p>
                  </motion.div>
                ))}
              </div>
           </div>

           <div className="card-3d bg-primary p-1 overflow-hidden group h-[450px] shadow-2xl border-none">
              <div className="bg-slate-900 backdrop-blur-3xl p-12 rounded-[18px] text-white h-full relative overflow-hidden flex flex-col justify-between">
                 <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                 <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                 
                 <div className="relative z-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center mb-10 border border-white/10 shadow-2xl backdrop-blur-md"
                    >
                       <ShieldAlert className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-6 leading-none">Protocol ECHO-Alpha</h3>
                    <p className="text-base text-slate-400 font-medium leading-loose opacity-80">
                      Strategic environmental containment initialized. All field telemetry sensors operational across metropolitan area.
                    </p>
                 </div>
                 
                 <Button className="w-full bg-primary hover:bg-primary/90 text-white h-16 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl glow-btn-primary btn-lift border border-primary/20 relative z-10">
                   Access_Admin_Vault_Secure
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GovernmentDashboard;
