import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  MapPin, 
  Filter, 
  Search, 
  Layers, 
  ChevronRight, 
  AlertTriangle,
  Clock,
  Info,
  Maximize2,
  List,
  Activity,
  Zap,
  Globe,
  Radio
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { cn } from '../lib/utils';
import { Hazard } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const HAZARD_TYPES = ['Plastic Waste', 'Blocked Drainage', 'Flooded Area', 'Illegal Dumpsite', 'Other'];
const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const HazardMap = () => {
  const { hazards } = useAppContext();
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'map' | 'heatmap'>('map');

  const filteredHazards = hazards.filter(h => {
    const typeMatch = filterType === 'all' || h.type === filterType;
    const severityMatch = filterSeverity === 'all' || h.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-140px)] flex flex-col gap-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl glow-3d-green">
              <Globe className="h-6 w-6 text-white animate-spin-slow" />
           </div>
           <div>
             <h1 className="text-3xl font-black tracking-tight uppercase">Spatial Intelligence</h1>
             <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Real-time Environmental Vector Mapping</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="glass-panel p-1 rounded-2xl border-white/40">
            <TabsList className="bg-transparent gap-2 h-10">
              <TabsTrigger value="map" className="rounded-xl font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-primary data-[state=active]:text-white transition-all h-8">Tactical</TabsTrigger>
              <TabsTrigger value="heatmap" className="rounded-xl font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-primary data-[state=active]:text-white transition-all h-8">Thermal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-8 bg-slate-900 rounded-[40px] border-8 border-white shadow-2xl relative overflow-hidden flex flex-col group">
          {/* Heatwave Effect Layer */}
          <div className="absolute inset-0 heatwave-effect pointer-events-none z-10 opacity-30" />
          
          {/* Map Controls */}
          <div className="absolute top-8 left-8 z-30 flex flex-wrap gap-4">
            <div className="glass-panel p-2 rounded-2xl shadow-2xl border-white/60 flex items-center gap-2 group-focus-within:border-primary/40 transition-colors">
                <Search className="ml-2 h-4 w-4 text-gray-400" />
                <Input placeholder="Sector Coordinate..." className="bg-transparent border-none shadow-none focus-visible:ring-0 w-[180px] h-8 text-xs font-bold" />
            </div>
            
            <div className="glass-panel p-1 rounded-2xl shadow-2xl border-white/60 flex gap-2">
               <Select value={filterType} onValueChange={setFilterType}>
                 <SelectTrigger className="h-10 border-none focus:ring-0 w-[140px] bg-transparent text-[10px] font-black uppercase tracking-widest">
                   <SelectValue placeholder="Node Type" />
                 </SelectTrigger>
                 <SelectContent className="rounded-2xl border-none shadow-2xl">
                   <SelectItem value="all" className="font-bold text-[10px] uppercase">All Vectors</SelectItem>
                   {HAZARD_TYPES.map(t => <SelectItem key={t} value={t} className="font-bold text-[10px] uppercase">{t}</SelectItem>)}
                 </SelectContent>
               </Select>
               <div className="w-[1px] h-6 bg-white/20 self-center" />
               <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                 <SelectTrigger className="h-10 border-none focus:ring-0 w-[130px] bg-transparent text-[10px] font-black uppercase tracking-widest">
                   <SelectValue placeholder="Threat" />
                 </SelectTrigger>
                 <SelectContent className="rounded-2xl border-none shadow-2xl">
                   <SelectItem value="all" className="font-bold text-[10px] uppercase">All Levels</SelectItem>
                   {SEVERITY_LEVELS.map(s => <SelectItem key={s} value={s} className="font-bold text-[10px] uppercase">{s}</SelectItem>)}
                 </SelectContent>
               </Select>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-30 flex flex-col gap-3">
            <Button size="icon" className="h-12 w-12 rounded-2xl glass-panel shadow-2xl border-white hover:bg-white text-slate-900 btn-lift">
              <Layers className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-12 w-12 rounded-2xl glass-panel shadow-2xl border-white hover:bg-white text-slate-900 btn-lift">
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Map Representation */}
          <div className={cn(
            "flex-1 relative bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center transition-all duration-1000",
            viewMode === 'heatmap' && "grayscale contrast-[1.4] brightness-75 blur-[1px]"
          )}>
            <div className={cn(
              "absolute inset-0 transition-colors duration-1000",
              viewMode === 'heatmap' ? "bg-primary/20 mix-blend-overlay" : "bg-blue-900/10"
            )} />

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[40px] border-transparent group-hover:border-primary/5 transition-all duration-700">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary/20" />
               <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary/20" />
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary/20" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary/20" />
            </div>

            {/* Legend */}
            <div className="absolute bottom-8 left-8 glass-panel p-5 rounded-[24px] shadow-2xl border-white/40 z-30">
               <div className="space-y-4">
                  {[ 
                    { label: 'Extreme Threat', color: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
                    { label: 'High Risk', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' },
                    { label: 'Stabilized', color: 'bg-primary shadow-[0_0_15px_rgba(27,94,32,0.6)]' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={cn("w-3 h-3 rounded-full animate-pulse", item.color)} /> 
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Pins and Zones */}
            <AnimatePresence>
              {filteredHazards.map((hazard, i) => (
                <div key={hazard.id}>
                  {/* Danger Zone Ripples */}
                  <div 
                    className="absolute pointer-events-none"
                    style={{ 
                      left: `${(hazard.location.lng - 3.2) * 200 + 40}%`, 
                      top: `${(hazard.location.lat - 6.4) * 200 + 30}%` 
                    }}
                  >
                    {hazard.severity === 'Critical' && (
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 3, opacity: [0, 0.2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="w-20 h-20 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    {hazard.severity === 'High' && (
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2.5, opacity: [0, 0.15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                        className="w-16 h-16 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                  </div>

                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.4, zIndex: 40 }}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20",
                      selectedHazard?.id === hazard.id ? "scale-[1.8] z-40" : ""
                    )}
                    style={{ 
                      left: `${(hazard.location.lng - 3.2) * 200 + 40}%`, 
                      top: `${(hazard.location.lat - 6.4) * 200 + 30}%` 
                    }}
                    onClick={() => setSelectedHazard(hazard)}
                  >
                    {viewMode === 'heatmap' ? (
                      <div className={cn(
                        "w-20 h-20 rounded-full blur-2xl opacity-40 animate-pulse",
                        hazard.severity === 'Critical' ? "bg-red-600" : "bg-amber-500"
                      )} />
                    ) : (
                      <div className="relative group">
                        <div className={cn(
                          "w-6 h-6 rounded-xl border-4 border-white shadow-2xl transition-transform duration-300 flex items-center justify-center",
                          hazard.severity === 'Critical' ? "bg-red-500 glow-3d-amber" : 
                          hazard.severity === 'High' ? "bg-amber-500" : 
                          hazard.severity === 'Medium' ? "bg-amber-300" : "bg-primary glow-3d-green"
                        )}>
                           <Radio className="h-3 w-3 text-white" />
                        </div>
                        
                        {selectedHazard?.id === hazard.id && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap border border-white/10 glass-dark">
                             Vector node_{hazard.id.substring(0, 4)}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.button>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="lg:col-span-4 flex flex-col gap-8 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedHazard ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col"
              >
                <Card className="border-none shadow-2xl flex-shrink-0 card-3d overflow-hidden flex-1 flex flex-col bg-white">
                  <div className="relative h-56 flex-shrink-0">
                    <img 
                      src={selectedHazard.imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400'} 
                      alt={selectedHazard.type} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-2xl h-10 w-10 backdrop-blur-md transition-all"
                      onClick={() => setSelectedHazard(null)}
                    >
                      &times;
                    </Button>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <div>
                          <Badge className={cn(
                            "font-black uppercase tracking-widest text-[8px] px-3 py-1 border-none shadow-xl mb-2",
                            selectedHazard.severity === 'Critical' ? "bg-red-500" : "bg-amber-500"
                          )}>
                            {selectedHazard.severity} SEVERITY
                          </Badge>
                          <h2 className="text-xl font-black text-white uppercase tracking-tight">{selectedHazard.type}</h2>
                       </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 space-y-8 flex-1 overflow-auto custom-scrollbar">
                    <div className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                       <MapPin className="h-4 w-4 text-primary" /> {selectedHazard.location.ward}, {selectedHazard.location.lga}
                    </div>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{selectedHazard.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-inner">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xs font-black text-primary uppercase">{selectedHazard.status}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-inner">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Telemetry</p>
                        <p className="text-xs font-black text-slate-900 uppercase">{format(new Date(selectedHazard.timestamp), 'MMM d, p')}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Intervention Protocol</h4>
                       <div className="flex flex-col gap-3">
                         <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl glow-btn-primary btn-lift border border-primary/20">Verify Intelligence</Button>
                         <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] hover:border-primary transition-all">Enlist as Volunteer</Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col"
              >
                <div className="card-3d p-10 bg-slate-900 text-white relative overflow-hidden flex-shrink-0 group">
                   <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                   <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                         <Activity className="h-6 w-6 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Metropolitan Matrix</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-white/5 pb-3">
                           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Vectors</span>
                           <AnimatedNumber value={hazards.length} className="text-2xl font-black text-white" />
                        </div>
                        <div className="flex justify-between items-end border-b border-white/5 pb-3">
                           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Critical Hotspots</span>
                           <AnimatedNumber value={hazards.filter(h => h.severity === 'Critical').length} className="text-2xl font-black text-red-500" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex-1 mt-8 space-y-4 overflow-auto pr-2 custom-scrollbar">
                   <div className="flex items-center justify-between px-2 mb-2">
                     <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural Stream</h3>
                     <Badge className="bg-primary/10 text-primary border-none text-[8px] animate-pulse">Live Feed</Badge>
                   </div>
                   {filteredHazards.slice(0, 15).map((h, i) => (
                     <motion.div 
                       key={h.id} 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       whileHover={{ x: -5 }}
                       className={cn(
                         "p-5 rounded-[24px] border-2 transition-all cursor-pointer group relative overflow-hidden card-3d bg-white",
                         selectedHazard?.id === h.id ? "border-primary shadow-2xl ring-4 ring-primary/5" : "border-slate-50 hover:border-primary/20 hover:shadow-xl"
                       )}
                       onClick={() => setSelectedHazard(h)}
                     >
                       <div className="flex justify-between items-start mb-2 relative z-10">
                         <h4 className="text-sm font-black text-slate-900 uppercase truncate pr-4">{h.type}</h4>
                         <div className={cn(
                           "w-3 h-3 rounded-full shadow-sm flex-shrink-0 mt-1",
                           h.severity === 'Critical' ? "bg-red-500 animate-pulse glow-3d-amber" : 
                           h.severity === 'High' ? "bg-amber-500" : "bg-primary"
                         )} />
                       </div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{h.location.ward}</p>
                       <div className="flex justify-between items-center relative z-10">
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{format(new Date(h.timestamp), 'MMM d')}</span>
                          <Badge className="bg-slate-50 text-slate-500 font-black text-[8px] px-2 py-0 border-none group-hover:bg-primary group-hover:text-white transition-colors">{h.status.toUpperCase()}</Badge>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HazardMap;
