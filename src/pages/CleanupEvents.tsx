import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Users, 
  Plus, 
  MapPin, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Filter,
  Search,
  Trophy,
  Award,
  ShieldCheck,
  Target,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const CleanupEvents = () => {
  const { cleanupEvents, user, joinEvent, addEvent } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.location || !newEvent.date) return;
    
    addEvent({
      title: newEvent.title,
      description: newEvent.description,
      location: newEvent.location,
      date: new Date(newEvent.date).toISOString(),
      organizerId: user?.id || 'guest'
    });
    setIsDialogOpen(false);
    setNewEvent({ title: '', description: '', location: '', date: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">CLEANUP OPS_GRID</h1>
          <div className="flex items-center gap-3 mt-3">
             <Activity className="h-3 w-3 text-primary animate-pulse" />
             <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px]">Neural-Civic Mobilization Engine</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-2xl glow-btn-primary rounded-[20px] h-16 px-10 btn-lift font-black uppercase tracking-[0.3em] text-[10px] border border-primary/20">
              <Plus className="mr-3 h-5 w-5" /> Initiate_Mission_SOP
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-[48px] border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-0 overflow-hidden glass-panel bg-white/95">
             <div className="bg-slate-900 p-12 text-white relative">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <DialogHeader className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl rotate-3 border border-white/10">
                     <Target className="h-8 w-8 text-white" />
                  </div>
                  <DialogTitle className="text-3xl font-black uppercase tracking-tight">New Tactical Mission</DialogTitle>
                  <DialogDescription className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
                    Coordinate decentralized cleanup action_node.
                  </DialogDescription>
                </DialogHeader>
             </div>
            <form onSubmit={handleCreateEvent} className="space-y-8 p-12">
              <div className="space-y-3">
                <Label className="font-black uppercase tracking-widest text-[10px] text-slate-400 px-1">Mission Objective_Title</Label>
                <Input 
                  placeholder="e.g., Arterial Desilting_Sector 4-B" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="h-16 rounded-[22px] border-slate-100 font-bold focus-visible:ring-primary/20 bg-slate-50 shadow-inner"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-black uppercase tracking-widest text-[10px] text-slate-400 px-1">Spatial Sector_Loc</Label>
                  <Input 
                    placeholder="e.g., Market Arterial"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="h-16 rounded-[22px] border-slate-100 font-bold focus-visible:ring-primary/20 bg-slate-50 shadow-inner"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-black uppercase tracking-widest text-[10px] text-slate-400 px-1">Deployment Timestamp</Label>
                  <Input 
                    type="datetime-local" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="h-16 rounded-[22px] border-slate-100 font-bold focus-visible:ring-primary/20 bg-slate-50 shadow-inner"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-black uppercase tracking-widest text-[10px] text-slate-400 px-1">Intel Briefing (Optional)</Label>
                <Textarea 
                  placeholder="Describe necessary tactical gear and logistics..." 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="min-h-[120px] rounded-[24px] border-slate-100 font-bold focus-visible:ring-primary/20 bg-slate-50 shadow-inner p-6"
                />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full h-16 rounded-[22px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl glow-btn-primary border border-primary/20">
                Deploy_Mission_Grid
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input placeholder="Search Tactical Mission Streams..." className="pl-16 h-16 rounded-[28px] border-none shadow-2xl bg-white font-bold glass-panel text-sm" />
            </div>
            <Button variant="outline" size="icon" className="h-16 w-16 rounded-[28px] border-none shadow-2xl bg-white group hover:text-primary transition-all glass-panel">
              <Filter className="h-6 w-6 text-slate-400 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {cleanupEvents.map((event, i) => {
                const isJoined = user && event.volunteers.includes(user.id);
                const eventDate = new Date(event.date);
                
                return (
                  <motion.div 
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="card-3d overflow-hidden group/mission hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-none"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-48 md:h-auto bg-slate-900 border-r border-white/5 flex flex-col items-center justify-center p-10 relative overflow-hidden shrink-0">
                        <div className="absolute -right-16 -top-16 w-40 h-40 bg-primary/10 rounded-full blur-[80px] group-hover/mission:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 text-center">
                          <Calendar className="h-12 w-12 mb-6 text-primary mx-auto opacity-30 group-hover/mission:opacity-60 transition-opacity" />
                          <div className="text-4xl font-black text-primary tracking-tighter leading-none">{format(eventDate, 'MMM d')}</div>
                          <div className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-500 mt-3">{format(eventDate, 'EEEE')}</div>
                        </div>
                      </div>
                      <div className="flex-1 p-10 bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                          <div>
                            <Badge className="mb-4 bg-primary/10 text-primary font-black uppercase tracking-[0.3em] text-[9px] px-4 py-1.5 border-none shadow-sm flex items-center gap-2 w-fit">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                              Active_Mission_Node
                            </Badge>
                            <h3 className="text-3xl font-black text-slate-900 group-hover/mission:text-primary transition-colors tracking-tight leading-tight">{event.title.toUpperCase()}</h3>
                          </div>
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 bg-slate-50 px-6 py-3 rounded-[24px] border border-slate-100 shadow-inner group/vol"
                          >
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operatives</span>
                            <div className="text-3xl font-black text-primary flex items-center gap-2">
                              <AnimatedNumber value={event.volunteers.length} />
                              <Users className="h-4 w-4 opacity-30" />
                            </div>
                          </motion.div>
                        </div>
                        
                        <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg opacity-80">{event.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">
                          <div className="flex items-center gap-3 group/info">
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 group-hover/info:bg-primary/10 group-hover/info:border-primary/20 transition-colors">
                              <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 group/info">
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 group-hover/info:bg-primary/10 group-hover/info:border-primary/20 transition-colors">
                              <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <span>{format(eventDate, 'p')}</span>
                          </div>
                          <div className="flex items-center gap-3 group/info">
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 group-hover/info:bg-primary/10 group-hover/info:border-primary/20 transition-colors">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span>HQ_ECHO_CORE</span>
                          </div>
                        </div>

                        <div className="flex gap-6">
                          <Button 
                            className={cn(
                              "flex-1 h-16 rounded-[22px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all border border-transparent",
                              isJoined 
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" 
                                : "bg-primary text-white hover:bg-primary/90 glow-btn-primary btn-lift border-primary/20"
                            )}
                            onClick={() => joinEvent(event.id)}
                            disabled={isJoined}
                          >
                            {isJoined ? (
                              <><CheckCircle2 className="mr-3 h-5 w-5" /> Active_Deployment</>
                            ) : (
                              <><Users className="mr-3 h-5 w-5" /> Enlist_for_Operation</>
                            )}
                          </Button>
                          <Button variant="outline" className="h-16 w-16 rounded-[22px] border-2 border-slate-100 hover:border-primary transition-all bg-white group/btn flex items-center justify-center">
                            <ArrowRight className="h-6 w-6 text-slate-400 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="card-3d bg-slate-900 p-1 overflow-hidden group border-none shadow-2xl">
             <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[18px] text-white relative h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-md rotate-3 group-hover:rotate-0 transition-transform">
                        <Trophy className="h-7 w-7 text-primary" />
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tight">Impact Incentive</h3>
                  </div>
                  
                  <div className="space-y-8">
                     {[ 
                       { id: 1, text: 'Accrue 30 Eco Credits per engagement cycle_node.', icon: Trophy },
                       { id: 2, text: 'Unlock Level 3 First-Responder civic artifacts.', icon: Award },
                       { id: 3, text: 'Direct spatial threat reduction in regional sector.', icon: ShieldCheck }
                     ].map(item => (
                       <motion.div key={item.id} whileHover={{ x: 10 }} className="flex gap-5 group/item cursor-default">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-xl group-hover/item:bg-primary/20 group-hover/item:border-primary/30 transition-all">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-xs text-slate-300 font-bold leading-relaxed opacity-80 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest pt-1">{item.text}</p>
                       </motion.div>
                     ))}
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/10 relative z-10">
                   <div className="bg-white/5 rounded-[32px] p-8 text-center border border-white/10 shadow-inner group/mass">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Collective Mass Recovered</p>
                     <div className="text-4xl font-black flex items-baseline justify-center gap-2 tracking-tighter">
                       <AnimatedNumber value={1240} />
                       <span className="text-lg font-bold opacity-30">KG</span>
                     </div>
                     <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '75%' }}
                          className="h-full bg-primary glow-3d-green" 
                        />
                     </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="card-3d p-10 border-none shadow-2xl">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black uppercase tracking-tight">Force Multipliers</h3>
                <Activity className="h-5 w-5 text-primary animate-pulse" />
             </div>
             
             <div className="space-y-4">
               {[
                 { name: 'Oluwaseun A.', points: 1250, events: 12 },
                 { name: 'Amaka O.', points: 980, events: 9 },
                 { name: 'Musa K.', points: 850, events: 8 },
                 { name: 'Chioma E.', points: 720, events: 7 }
               ].map((v, i) => (
                 <motion.div 
                  key={i} 
                  whileHover={{ x: 10, backgroundColor: 'rgba(27,94,32,0.03)' }}
                  className="flex items-center justify-between p-5 rounded-[22px] transition-all cursor-pointer group"
                >
                   <div className="flex items-center gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-primary font-black text-sm shadow-xl glow-3d-green border border-white/5">
                       {v.name[0]}
                     </div>
                     <div>
                       <p className="text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors">{v.name}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">{v.events} MISSIONS_SOP</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-base font-black text-primary tracking-tighter">
                       <AnimatedNumber value={v.points} />
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
             <Button variant="ghost" className="w-full mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary transition-all flex items-center justify-center gap-2">
               Access_Full_Deployment_Ranking <ChevronRight className="h-3 w-3" />
             </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CleanupEvents;
