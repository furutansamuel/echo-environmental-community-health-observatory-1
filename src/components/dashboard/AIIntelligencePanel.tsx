import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, TrendingUp, ArrowRight, ShieldCheck, Zap, Brain, Loader2, BarChart3, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import AnimatedNumber from '../ui/AnimatedNumber';

const AIIntelligencePanel = () => {
  const { hazards, wardHealthScores } = useAppContext();
  const [isThinking, setIsThinking] = useState(true);
  
  const criticalHazards = hazards.filter(h => h.severity === 'Critical' || h.severity === 'High');
  const worstWard = wardHealthScores.reduce((prev, current) => (prev.score < current.score) ? prev : current);

  useEffect(() => {
    const timer = setTimeout(() => setIsThinking(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative group">
      {/* Background Pulse */}
      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <Brain className="h-48 w-40 text-primary animate-pulse" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(27,94,32,0.15),transparent_70%)]" />
      
      <CardHeader className="relative z-10 p-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(27,94,32,0.3)]">
              <Brain className={isThinking ? "h-6 w-6 text-primary animate-spin-slow" : "h-6 w-6 text-primary"} />
            </div>
            <div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Cognitive Engine 4.0</CardTitle>
              <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Neural Intelligence Feed • Sector Lafia</CardDescription>
            </div>
          </div>
          {isThinking && (
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Loader2 className="h-3 w-3 text-primary animate-spin" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Synthesizing...</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 relative z-10 p-8 pt-6">
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div 
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-[32px] animate-pulse" />
                <div className="h-24 bg-white/5 rounded-[32px] animate-pulse" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-4 bg-primary rounded-full" />
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Risk Synthesis Result</h4>
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-300">
                  Real-time grid diagnostics identify an <span className="text-red-500 font-black">EXTREME INUNDATION THRESHOLD</span> in <span className="text-white font-black">{worstWard.ward.toUpperCase()}</span>. 
                  Neural modeling detects {criticalHazards.length} high-severity vectors requiring neutralization. Predicted flood probability: <AnimatedNumber value={85} suffix="%" className="font-black text-white" /> in next 48hr cycle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 hover:border-primary/20 transition-all hover:bg-white/[0.07] group/card">
                  <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Strategic Protocol
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400 font-medium">
                    Prioritize desilting at <span className="text-white font-bold">{worstWard.ward}</span> arterial culverts. Target: Plastic matrix at Sector 4-B.
                  </p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 hover:border-amber-500/20 transition-all hover:bg-white/[0.07] group/card">
                  <h4 className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Stabilization Forecast
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400 font-medium">
                    Neutralizing active vectors will stabilize regional health index by <AnimatedNumber value={15.4} decimals={1} prefix="+" className="font-bold text-amber-500" /> points.
                  </p>
                </div>
              </div>

              {/* Future Impact Preview */}
              <div className="bg-primary/5 rounded-[32px] p-6 border border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-primary/20 rounded-lg">
                      <BarChart3 className="h-4 w-4 text-primary" />
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">System 7-Day Impact Projection</h4>
                </div>
                
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Flood Risk Reduction</p>
                         <p className="text-lg font-black text-white">-64%</p>
                      </div>
                      <div className="w-2/3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "64%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary glow-3d-green" 
                         />
                      </div>
                   </div>

                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Civic Health Recovery</p>
                         <p className="text-lg font-black text-white">+28 pts</p>
                      </div>
                      <div className="w-2/3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-accent glow-3d-amber" 
                         />
                      </div>
                   </div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl glow-btn-primary btn-lift border border-primary/20">
                Initiate Defense Protocol <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AIIntelligencePanel;
