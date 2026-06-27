import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Wifi } from 'lucide-react';
import { cn } from '../../lib/utils';

const SystemStatusBar = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900 text-white h-10 flex items-center px-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5 relative overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      
      <div className="flex items-center gap-6 relative z-10 w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </div>
          <span className="text-primary">System Active</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Activity className="h-3 w-3 text-accent animate-pulse" />
          <span>Real-time Sync: <span className="text-accent">Optimized</span></span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Globe className="h-3 w-3 text-blue-400" />
          <span>Region: <span className="text-white">Lafia</span></span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Wifi className="h-3 w-3 text-green-400" />
          <span>Network Latency: <span className="text-green-400">12ms</span></span>
        </div>

        <div className="ml-auto flex items-center gap-4 shrink-0">
           <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
           <span className="hidden md:block">Last Update: {now.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;
