import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Users,
  Trophy,
  ArrowRight,
  Plus,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Link } from 'react-router-dom';
import AIIntelligencePanel from '../components/dashboard/AIIntelligencePanel';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const Dashboard = () => {
  const { user, hazards, wardHealthScores, points } = useAppContext();

  // Calculate stats
  const totalHazards = hazards.length;
  const pendingHazards = hazards.filter(h => h.status === 'Pending').length;
  const resolvedHazards = hazards.filter(h => h.status === 'Resolved').length;
  const userWard = wardHealthScores.find(w => w.ward === user?.ward) || wardHealthScores[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">Intelligence Dashboard</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Welcome, {user?.name || 'Commander'}. Monitoring Sector: {user?.ward || 'Unassigned'}.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/report">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-xl glow-3d-green rounded-2xl h-14 px-8 btn-lift font-black uppercase tracking-widest text-[10px]">
              <Plus className="mr-2 h-5 w-5" /> Deploy Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Pending Hazards', value: pendingHazards, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Resolved Vectors', value: resolvedHazards, icon: CheckCircle2, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Eco Credits', value: points, icon: Trophy, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Active Missions', value: 12, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-3d p-8 shadow-2xl relative overflow-hidden group border border-white/10"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform">
               <stat.icon className="h-24 w-24" />
            </div>
            <div className="relative z-10">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner", stat.bg, stat.color)}>
                 <stat.icon className="h-6 w-6" />
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
               <AnimatedNumber value={stat.value} className="text-3xl font-black text-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          {/* AI Intelligence Panel */}
          <AIIntelligencePanel />

          {/* Recent Hazards */}
          <div className="card-3d overflow-hidden shadow-2xl border border-white/10">
            <div className="p-8 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Recent Threat Vectors</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Latest community intelligence feeds.</p>
              </div>
              <Link to="/map">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">Interactive Grid</Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {hazards.slice(0, 5).map((hazard, i) => (
                <motion.div 
                  key={hazard.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 hover:bg-gray-50/50 transition-colors flex gap-8 items-center group/item"
                >
                  <div className="w-24 h-24 rounded-3xl bg-gray-100 overflow-hidden flex-shrink-0 shadow-lg border-4 border-white group-hover/item:border-primary/20 transition-all">
                    {hazard.imageUrl ? (
                      <img src={hazard.imageUrl} alt={hazard.type} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <AlertTriangle className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-black text-foreground uppercase tracking-tight">{hazard.type}</h4>
                      <Badge className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 border-none shadow-sm",
                        hazard.severity === 'Critical' ? "bg-red-500 text-white" : 
                        hazard.severity === 'High' ? "bg-orange-500 text-white" : 
                        hazard.severity === 'Medium' ? "bg-amber-500 text-white" : "bg-primary text-white"
                      )}>
                        {hazard.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-4 leading-relaxed">{hazard.description}</p>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> {hazard.location.ward}
                      </span>
                      <span>{formatDistanceToNow(new Date(hazard.timestamp))} AGO</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg",
                        hazard.status === 'Resolved' ? "bg-green-50 text-primary" : 
                        hazard.status === 'Verified' ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"
                      )}>
                        {hazard.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-6 bg-gray-50/30 border-t border-gray-100 text-center">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">Access Database Archive</Button>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-10">
          {/* Ward Health Score Widget */}
          <div className="card-3d p-10 shadow-2xl border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(27,94,32,0.05),transparent)] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="text-left">
                 <h3 className="text-lg font-black uppercase tracking-tight">Sector Health</h3>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{userWard.ward}</p>
              </div>
              <Badge className={cn(
                "font-black uppercase tracking-widest text-[9px] px-3 py-1 border-none shadow-sm",
                userWard.riskLevel === 'Low' ? "bg-green-50 text-primary" :
                userWard.riskLevel === 'Moderate' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
              )}>
                {userWard.riskLevel} Risk
              </Badge>
            </div>

            <div className="relative inline-flex items-center justify-center mb-10 group/status">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover/status:scale-125 transition-transform" />
              <svg className="w-48 h-48 -rotate-90 relative z-10">
                <circle className="text-gray-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                <motion.circle 
                  initial={{ strokeDashoffset: 502.4 }}
                  animate={{ strokeDashoffset: 502.4 - (502.4 * userWard.score) / 100 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className={cn(
                    userWard.score > 70 ? "text-primary" : userWard.score > 40 ? "text-amber-500" : "text-red-500"
                  )}
                  strokeWidth="12" 
                  strokeDasharray={502.4}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="80" cx="96" cy="96" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <AnimatedNumber value={userWard.score} className="text-5xl font-black text-foreground tracking-tighter" />
                <span className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black mt-1">Status Index</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-gray-50/50 py-3 rounded-2xl mb-8 relative z-10 border border-gray-100">
              {userWard.trend === 'Improving' ? <TrendingUp className="h-5 w-5 text-primary" /> : 
               userWard.trend === 'Declining' ? <TrendingDown className="h-5 w-5 text-red-500" /> : <Minus className="h-5 w-5 text-gray-400" />}
              <span className="text-xs font-black uppercase tracking-widest text-slate-600">Trajectory: {userWard.trend}</span>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-8 text-left relative overflow-hidden group/diag">
               <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover/diag:scale-150 transition-transform" />
               <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Node Diagnostics</h5>
               <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Vector Count</span>
                    <AnimatedNumber value={userWard.totalHazards} className="text-xl font-black text-white" />
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${userWard.score}%` }}
                        className="h-full bg-primary glow-3d-green"
                     />
                  </div>
               </div>
            </div>
          </div>

          {/* Eco Rewards Widget */}
          <div className="card-3d bg-primary p-1 overflow-hidden group shadow-2xl border-none">
             <div className="bg-white/10 backdrop-blur-md p-10 rounded-[18px] text-white relative">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl rotate-6 group-hover:rotate-0 transition-transform">
                      <Zap className="h-6 w-6 text-accent" />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-tight">Eco Credits</h3>
                </div>
                
                <div className="mb-10">
                   <AnimatedNumber value={points} className="text-5xl font-black mb-2 tracking-tighter" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Active Civic Capital</p>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Protocol Alignment</span>
                     <span className="text-xs font-black">75%</span>
                   </div>
                   <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="h-full bg-accent glow-3d-amber"
                      />
                   </div>
                </div>

                <Link to="/rewards">
                   <Button className="w-full bg-white text-primary hover:bg-accent hover:text-primary transition-all font-black rounded-2xl h-14 uppercase tracking-widest text-xs shadow-2xl glow-btn-accent border-none">Access Rewards Vault</Button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
