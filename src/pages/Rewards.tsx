import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Gift, 
  Share2, 
  Download,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Flame,
  Zap,
  ShieldCheck,
  Activity,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { Progress } from '../components/ui/progress';
import { BADGES } from '../lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const Rewards = () => {
  const { user, points, wardHealthScores } = useAppContext();
  
  const userBadges = user?.badges || [];
  const nextBadge = BADGES.find(b => !userBadges.includes(b.id)) || BADGES[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none">Rewards Center</h1>
          <div className="flex items-center gap-3 mt-3">
             <Cpu className="h-3 w-3 text-primary" />
             <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Civic Merit & Deployment Records</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="glass-panel h-14 px-8 rounded-2xl border-white shadow-xl font-black uppercase tracking-widest text-[10px] btn-lift">
            <Share2 className="mr-3 h-4 w-4" /> Share_Progress
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-2xl shadow-2xl glow-btn-primary font-black uppercase tracking-widest text-[10px] btn-lift border border-primary/20">
            <Download className="mr-3 h-4 w-4" /> Certificate.pkg
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Summary */}
        <div className="lg:col-span-4 space-y-10">
          <div className="card-3d overflow-hidden text-center relative pt-24 pb-14 px-10 border-none shadow-2xl group">
            <div className="absolute top-0 left-0 w-full h-40 bg-slate-900 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-block p-2 bg-white rounded-[32px] shadow-2xl mb-8 relative border border-slate-50">
                 <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-28 h-28 rounded-[24px] bg-slate-100 flex items-center justify-center text-primary text-4xl font-black border-4 border-white overflow-hidden shadow-inner"
                 >
                    <img src={`https://i.pravatar.cc/200?u=${user?.id || 'guest'}`} alt="Operative" />
                 </motion.div>
                 <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-accent rounded-[18px] flex items-center justify-center border-4 border-white shadow-xl glow-3d-amber">
                    <Star className="h-6 w-6 text-slate-900 fill-slate-900" />
                 </div>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{user?.name || 'Commander'}</h3>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-2">
                <ShieldCheck className="h-3 w-3" /> Sector Guardian Level 4
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-inner group/stat"
                >
                  <div className="text-4xl font-black text-primary group-hover/stat:scale-110 transition-transform"><AnimatedNumber value={points} /></div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Eco Credits</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-inner group/stat"
                >
                  <div className="text-4xl font-black text-slate-900 group-hover/stat:scale-110 transition-transform"><AnimatedNumber value={userBadges.length} /></div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Artifacts</div>
                </motion.div>
              </div>

              <div className="space-y-5 text-left bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 shadow-inner">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Evolution: {nextBadge.name.toUpperCase()}</span>
                    <span className="text-xs font-black text-primary">65%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-primary glow-3d-green"
                     />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold text-center mt-4 uppercase tracking-widest opacity-60">150 credits remaining until core upgrade.</p>
              </div>
            </div>
          </div>

          <div className="card-3d p-10 shadow-2xl border-none relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(249,168,37,0.03),transparent_50%)]" />
             <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="w-14 h-14 bg-amber-50 rounded-[20px] flex items-center justify-center border border-amber-100 shadow-lg group-hover:rotate-12 transition-transform">
                   <Flame className="h-8 w-8 text-amber-500 fill-amber-500" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Active Streaks</h3>
             </div>
             
             <div className="space-y-6 relative z-10">
                {[
                  { label: 'Intelligence Reports', val: '3 Week Streak', xp: 50, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { label: 'Sector Verification', val: '12 Successful', xp: 100, icon: ShieldCheck, color: 'text-primary', bg: 'bg-green-50' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between p-6 rounded-[24px] bg-slate-50 transition-all border border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center gap-5">
                      <div className={cn("w-12 h-12 rounded-[18px] flex items-center justify-center shadow-lg", item.bg, item.color)}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">{item.label}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 opacity-70">{item.val}</p>
                      </div>
                    </div>
                    <Badge className={cn("border-none font-black text-[10px] px-4 py-1.5 shadow-xl rounded-full", item.bg, item.color)}>+<AnimatedNumber value={item.xp} /> XP</Badge>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Badges & Rewards Grid */}
        <div className="lg:col-span-8 space-y-10">
          <div className="card-3d p-12 shadow-2xl border-none relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(27,94,32,0.02),transparent_40%)]" />
            <div className="flex flex-row items-center justify-between mb-12 relative z-10">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Civic Artifacts</h3>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Neural markers of verified environmental impact.</p>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Award className="h-12 w-12 text-primary opacity-20" />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {BADGES.map((badge) => {
                const isEarned = userBadges.includes(badge.id);
                return (
                  <motion.div 
                    key={badge.id} 
                    whileHover={isEarned ? { y: -10, scale: 1.05 } : {}}
                    className={cn(
                      "flex flex-col items-center text-center p-8 rounded-[40px] border-4 transition-all duration-500 relative group/badge",
                      isEarned 
                        ? "bg-white border-primary/10 shadow-2xl glow-3d-green" 
                        : "bg-slate-50 border-slate-100 grayscale opacity-40 hover:grayscale-0 transition-all duration-700"
                    )}
                  >
                    <div className={cn(
                      "w-24 h-24 rounded-[28px] flex items-center justify-center mb-8 shadow-2xl group-hover/badge:rotate-12 transition-transform duration-500",
                      isEarned ? "bg-primary/5 text-primary border border-primary/10" : "bg-slate-200 text-slate-400"
                    )}>
                      {badge.id === 'environmental-hero' ? (
                        <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/badge-environmental-hero-1f6b380d-1782557142176.webp" alt="Hero" className="w-full h-full rounded-[24px] object-cover" />
                      ) : (
                        <Trophy className="h-12 w-12" />
                      )}
                    </div>
                    <h4 className="text-[11px] font-black text-slate-900 mb-3 uppercase tracking-[0.2em] leading-tight">{badge.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight opacity-70">{badge.description}</p>
                    
                    {isEarned && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-xl glow-3d-green"
                      >
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="card-3d overflow-hidden shadow-2xl border-none bg-white">
             <div className="p-10 bg-slate-900 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-50" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">Deployment Ranking</h3>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-2">Cross-sector comparative analytics matrix.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md relative z-10">
                   <Target className="h-8 w-8 text-primary" />
                </div>
             </div>
             
             <Tabs defaultValue="reporters" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-slate-100 h-20 bg-slate-50/50 px-10 gap-14">
                  <TabsTrigger value="reporters" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase tracking-[0.3em] text-[10px] h-full px-0 transition-all">Top_Operatives</TabsTrigger>
                  <TabsTrigger value="wards" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase tracking-[0.3em] text-[10px] h-full px-0 transition-all">Sector_Health_Mesh</TabsTrigger>
                </TabsList>
                
                <TabsContent value="reporters" className="mt-0 p-0">
                   <div className="divide-y divide-slate-50">
                     {[
                       { name: 'Emeka J.', ward: 'Ward A', score: 1420, rank: 1, trend: 'up' },
                       { name: 'Sarah W.', ward: 'Garki', score: 1280, rank: 2, trend: 'up' },
                       { name: 'Hassan B.', ward: 'Ward 1', score: 1150, rank: 3, trend: 'down' },
                       { name: 'Titi L.', ward: 'Ward B', score: 980, rank: 4, trend: 'stable' }
                     ].map((u, i) => (
                       <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(27,94,32,0.03)' }}
                        className="flex items-center justify-between p-8 transition-all group"
                      >
                          <div className="flex items-center gap-8">
                            <div className={cn(
                              "w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-sm shadow-xl relative",
                              u.rank === 1 ? "bg-amber-100 text-amber-700 glow-3d-amber shadow-amber-500/20" : 
                              u.rank === 2 ? "bg-slate-100 text-slate-700 border border-slate-200 shadow-slate-500/10" : 
                              u.rank === 3 ? "bg-orange-50 text-orange-700 border border-orange-100 shadow-orange-500/10" : "bg-slate-50 text-slate-400"
                            )}>
                              #{u.rank}
                            </div>
                            <div className="w-16 h-16 rounded-[22px] bg-slate-100 overflow-hidden shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-500">
                               <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Operative" />
                            </div>
                            <div>
                              <p className="text-lg font-black uppercase tracking-tight text-slate-900">{u.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 opacity-60">SECTOR_{u.ward.toUpperCase()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-12">
                            <div className="text-right">
                              <p className="text-2xl font-black text-slate-900 leading-none tracking-tighter">
                                <AnimatedNumber value={u.score} />
                              </p>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Credits</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                              {u.trend === 'up' ? <TrendingUp className="h-6 w-6 text-primary" /> : <Activity className="h-6 w-6 text-slate-300" />}
                            </div>
                          </div>
                       </motion.div>
                     ))}
                   </div>
                </TabsContent>
                
                <TabsContent value="wards" className="mt-0 p-0">
                   <div className="divide-y divide-slate-50">
                     {wardHealthScores.map((w, i) => (
                       <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(27,94,32,0.03)' }}
                        className="flex items-center justify-between p-8 transition-all group"
                      >
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-[22px] bg-primary/5 flex items-center justify-center text-primary shadow-inner border border-primary/10 group-hover:rotate-6 transition-all duration-500">
                              <MapPin className="h-8 w-8" />
                            </div>
                            <div>
                              <p className="text-lg font-black uppercase tracking-tight text-slate-900">{w.ward}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 opacity-60">DISTRICT_{w.lga.toUpperCase()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-14">
                            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block border border-slate-100 shadow-inner">
                               <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${w.score}%` }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  w.score > 70 ? "bg-primary glow-3d-green" : w.score > 40 ? "bg-amber-500 shadow-[0_0_10px_rgba(249,168,37,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                )}
                               />
                            </div>
                            <div className="text-right min-w-[80px]">
                              <div className={cn(
                                "text-3xl font-black leading-none tracking-tighter",
                                w.score > 70 ? "text-primary" : w.score > 40 ? "text-amber-500" : "text-red-500"
                              )}>
                                <AnimatedNumber value={w.score} />
                              </div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Health_Index</p>
                            </div>
                          </div>
                       </motion.div>
                     ))}
                   </div>
                </TabsContent>
             </Tabs>
             
             <div className="p-10 bg-slate-50 border-t border-slate-100 text-center">
                <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary transition-all flex items-center justify-center gap-3 mx-auto">
                   <Activity className="h-4 w-4" /> Query_Full_Deployment_Archives
                </Button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Rewards;
