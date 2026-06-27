import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  Home, 
  Map as MapIcon, 
  AlertTriangle, 
  Users, 
  Trophy, 
  BarChart3, 
  ShieldCheck, 
  LogOut,
  Menu,
  X,
  Target,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAppContext();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const navItems = [
    { name: 'Intelligence Dashboard', path: '/dashboard', icon: Home, roles: ['citizen', 'government', 'guest'] },
    { name: 'Spatial Intelligence', path: '/map', icon: MapIcon, roles: ['citizen', 'government', 'guest'] },
    { name: 'Tactical Reporting', path: '/report', icon: AlertTriangle, roles: ['citizen', 'guest'] },
    { name: 'Cleanup Operations', path: '/events', icon: Users, roles: ['citizen', 'government', 'guest'] },
    { name: 'Civic Rewards Center', path: '/rewards', icon: Trophy, roles: ['citizen', 'guest'] },
    { name: 'Impact Analytics', path: '/impact', icon: BarChart3, roles: ['citizen', 'government', 'guest'] },
  ];

  if (user?.role === 'government') {
    navItems.push({ name: 'Command Center', path: '/government', icon: ShieldCheck, roles: ['government'] });
  }

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <AnimatePresence>
        {isMobile && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-24 left-6 z-50"
          >
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar} 
              className="h-12 w-12 rounded-2xl glass-panel shadow-2xl border-none glow-3d-green"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 transition-all duration-500 ease-in-out transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:inset-0"
      )}>
        <div className="flex flex-col h-full p-8 mx-4 my-4 bg-white/95 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden group/sidebar">
          {/* Decorative background gradients */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

          <div className="mb-12 relative z-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 group/logo">
              <div className="w-14 h-14 bg-slate-900 rounded-[22px] flex items-center justify-center shadow-2xl rotate-3 group-hover/logo:rotate-0 transition-all duration-500 glow-3d-green border border-white/10">
                <Target className="text-white h-7 w-7 animate-pulse" />
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 tracking-tighter block leading-none">ECHO</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-1 block">Protocol</span>
              </div>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-10 w-10 rounded-xl">
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 space-y-2 relative z-10 custom-scrollbar overflow-y-auto pr-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2 flex items-center gap-2">
              <Activity className="h-3 w-3" /> Core Systems
            </p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-5 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group relative overflow-hidden",
                    isActive
                      ? "bg-slate-900 text-white shadow-2xl border border-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <item.icon className={cn("h-5 w-5 transition-all duration-500", isActive ? "scale-110 text-primary" : "group-hover:scale-110 group-hover:text-primary")} />
                  <span className="flex-1">{item.name}</span>
                  {isActive ? (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(27,94,32,0.5)]"
                    />
                  ) : (
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-30 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-6 pt-10 relative z-10">
             <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900 rounded-[32px] p-6 relative overflow-hidden group/credits border border-white/10 shadow-2xl"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary animate-pulse" />
                   </div>
                   <div>
                      <div className="text-xl font-black text-white tracking-tight leading-none">{user?.points || 0}</div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Available Credits</p>
                   </div>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(27,94,32,0.5)]" 
                   />
                </div>
             </motion.div>

            {user ? (
              <Button 
                variant="ghost" 
                className="w-full h-14 rounded-2xl justify-start gap-4 text-slate-400 hover:text-red-500 hover:bg-red-50/50 font-black uppercase tracking-widest text-[9px] transition-all border border-transparent hover:border-red-500/10" 
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                Terminal Log-off
              </Button>
            ) : (
              <Link to="/login">
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl glow-btn-primary btn-lift border border-white/10">Initialize Access</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-30" 
            onClick={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
