import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, Search, User, Zap, Globe, Cpu } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import AnimatedNumber from '../ui/AnimatedNumber';

const Navbar = () => {
  const { user, points } = useAppContext();

  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 glass-panel sticky top-0 z-30 mx-4 mt-4 rounded-[24px]">
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Query Metropolitan Intelligence Grid..." 
            className="pl-12 bg-white/50 border-none h-12 text-xs font-bold rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/20 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-2xl border border-primary/20 shadow-[0_0_15px_rgba(27,94,32,0.1)] group cursor-pointer"
        >
           <Zap className="h-4 w-4 text-primary fill-primary animate-pulse" />
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            <AnimatedNumber value={points} /> <span className="opacity-50">ECU</span>
          </span>
        </motion.div>
        
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-gray-400 hover:text-primary hover:bg-primary/5 relative group transition-all">
          <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </Button>
        
        <div className="flex items-center gap-4 pl-2 border-l border-gray-100">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{user?.name || 'Commander'}</p>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Cpu className="h-2 w-2 text-primary" />
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{user?.role || 'Operative'}_lvl.04</p>
              </div>
           </div>
           <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-2xl glow-3d-green border-4 border-white overflow-hidden cursor-pointer"
           >
              <img src={`https://i.pravatar.cc/100?u=${user?.id || 'guest'}`} alt="Profile" className="opacity-90 group-hover:opacity-100 transition-opacity" />
           </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
