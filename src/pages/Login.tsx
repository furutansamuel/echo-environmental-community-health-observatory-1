import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Lock, LogIn, ArrowLeft, ShieldAlert, Target, Cpu, Activity } from 'lucide-react';
import * as Sonner from 'sonner';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'gov@echo.gov' && password === 'admin123') {
      const govUser = {
        id: 'gov-1',
        name: 'Gov Official',
        email: 'gov@echo.gov',
        state: 'Lagos',
        lga: 'Ikeja',
        ward: 'Ward A',
        points: 0,
        badges: [],
        role: 'government' as const
      };
      setUser(govUser);
      Sonner.toast.success('Welcome back, Official');
      navigate('/government');
      return;
    }

    if (email && password) {
      const citizenUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 4),
        name: 'Citizen User',
        email: email,
        state: 'Lagos',
        lga: 'Ikeja',
        ward: 'Ward A',
        points: 150,
        badges: ['first-reporter'],
        role: 'citizen' as const
      };
      setUser(citizenUser);
      Sonner.toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      Sonner.toast.error('Please enter valid credentials');
    }
  };

  const handleGuest = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@echo.civic',
      state: 'Lagos',
      lga: 'Ikeja',
      ward: 'Ward A',
      points: 0,
      badges: [],
      role: 'citizen' as const
    });
    Sonner.toast.info('Continuing as guest');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background HUD Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(27,94,32,0.1),transparent_70%)]" />
         <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-primary mb-12 transition-all group">
          <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <ArrowLeft className="h-5 w-5" />
          </motion.div>
          Tactical_Abort
        </Link>

        <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-[48px] overflow-hidden glass-dark bg-slate-900/90 border border-white/5">
          <div className="bg-primary p-14 text-center relative overflow-hidden">
             <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-[100px] animate-pulse" />
             <div className="relative z-10">
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 3, scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="mx-auto w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mb-8 shadow-2xl border border-white/10"
                >
                   <Target className="text-slate-900 h-10 w-10" />
                </motion.div>
                <CardTitle className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Operator_Auth</CardTitle>
                <CardDescription className="text-slate-900/50 font-black uppercase tracking-[0.4em] text-[10px] mt-4">Metropolitan Intelligence Network</CardDescription>
             </div>
          </div>
          
          <CardContent className="p-12 pt-14">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                   <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400" htmlFor="email">Operative_ID</Label>
                   <Activity className="h-3 w-3 text-primary animate-pulse" />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="operative@echo.civic" 
                    className="h-16 pl-16 rounded-[22px] border-white/5 bg-white/5 text-white font-bold focus-visible:ring-primary/40 transition-all placeholder:text-slate-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400" htmlFor="password">Security_Key</Label>
                  <a href="#" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Reset_Access</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="h-16 pl-16 rounded-[22px] border-white/5 bg-white/5 text-white font-bold focus-visible:ring-primary/40 transition-all placeholder:text-slate-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-18 rounded-[24px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl glow-btn-primary btn-lift border border-primary/20 relative z-10 py-8">
                Initialize_Session
              </Button>
            </form>
            
            <div className="relative my-14">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]">
                <span className="bg-slate-900 px-6 text-slate-600 uppercase">Auxiliary_Protocol</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full h-16 rounded-[22px] border-2 border-white/5 font-black uppercase tracking-[0.3em] text-[10px] hover:border-primary/40 transition-all text-slate-500 bg-white/5 hover:bg-white/10" onClick={handleGuest}>
              Observer_Link_Guest
            </Button>
          </CardContent>
          
          <CardFooter className="bg-white/[0.02] p-10 flex justify-center border-t border-white/5">
             <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
               Unidentified Operative? <Link to="/register" className="text-primary hover:underline ml-2 transition-all">Enlist_Unit</Link>
             </p>
          </CardFooter>
        </Card>
        
        <div className="mt-12 p-8 bg-white/5 rounded-[40px] border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-md">
           <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
           <div className="flex items-center gap-5 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl">
                 <ShieldAlert className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">System_Intelligence_Brief</p>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center group/hint cursor-help">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover/hint:text-slate-400 transition-colors">Citizen_Node:</span>
                <span className="text-[10px] font-black text-slate-300 tracking-widest">ANY_ID // ANY_SEC</span>
              </div>
              <div className="flex justify-between items-center group/hint cursor-help pt-3 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover/hint:text-slate-400 transition-colors">Command_Access:</span>
                <span className="text-[10px] font-black text-white tracking-widest flex items-center gap-2">
                  gov@echo.gov <div className="h-1 w-1 rounded-full bg-slate-700" /> admin123
                </span>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
