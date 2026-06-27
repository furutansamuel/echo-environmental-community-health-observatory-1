import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { User, Mail, Lock, MapPin, ArrowLeft, Target, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { STATES, LGAS, WARDS } from '../lib/constants';
import * as Sonner from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    state: '',
    lga: '',
    ward: ''
  });
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).every(val => val)) {
      const newUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 4),
        ...formData,
        points: 50, // Welcome points
        badges: [],
        role: 'citizen' as const
      };
      setUser(newUser);
      Sonner.toast.success('Registration successful! +50 Welcome Points');
      navigate('/dashboard');
    } else {
      Sonner.toast.error('Required_Fields_Incomplete');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 py-24 relative overflow-hidden">
      {/* Background Architectural HUD Layers */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 -z-10" />
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1B5E20 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        <Link to="/login" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary mb-12 transition-all group">
          <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <ArrowLeft className="h-5 w-5" />
          </motion.div>
          Initialize_Terminal
        </Link>

        <Card className="border-none shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] rounded-[56px] overflow-hidden bg-white/95 backdrop-blur-xl group/card">
          <div className="bg-slate-900 p-16 text-center relative overflow-hidden">
             <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover/card:scale-150 transition-transform duration-1000" />
             <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: -5 }}
                  transition={{ type: "spring", delay: 0.4 }}
                  className="mx-auto w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center mb-10 shadow-2xl border border-white/10"
                >
                   <ShieldCheck className="text-white h-12 w-12" />
                </motion.div>
                <CardTitle className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Enlist_Operative</CardTitle>
                <CardDescription className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mt-5">Metropolitan Defense Force Deployment</CardDescription>
             </div>
          </div>
          
          <CardContent className="p-16">
            <form onSubmit={handleRegister} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                     <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400" htmlFor="name">Legal_Identity</Label>
                     <User className="h-3 w-3 text-slate-300" />
                  </div>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="name" 
                      placeholder="John_Doe_Unit" 
                      className="h-16 pl-16 rounded-[24px] border-slate-100 bg-slate-50/50 font-bold focus-visible:ring-primary/30 transition-all shadow-inner"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                     <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400" htmlFor="email">Comms_ID</Label>
                     <Mail className="h-3 w-3 text-slate-300" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="operative@echo.civic" 
                      className="h-16 pl-16 rounded-[24px] border-slate-100 bg-slate-50/50 font-bold focus-visible:ring-primary/30 transition-all shadow-inner"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                   <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400" htmlFor="password">Neural_Key</Label>
                   <Lock className="h-3 w-3 text-slate-300" />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="h-16 pl-16 rounded-[24px] border-slate-100 bg-slate-50/50 font-bold focus-visible:ring-primary/30 transition-all shadow-inner"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Sector_State</Label>
                  <Select onValueChange={(val) => setFormData({...formData, state: val, lga: '', ward: ''})}>
                    <SelectTrigger className="h-16 rounded-[24px] border-slate-100 font-bold bg-slate-50/50 shadow-inner">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                      {STATES.map(s => <SelectItem key={s} value={s} className="rounded-xl font-bold">{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">LGA_Node</Label>
                  <Select 
                    disabled={!formData.state}
                    onValueChange={(val) => setFormData({...formData, lga: val, ward: ''})}
                  >
                    <SelectTrigger className="h-16 rounded-[24px] border-slate-100 font-bold bg-slate-50/50 shadow-inner">
                      <SelectValue placeholder="Node" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                      {formData.state && LGAS[formData.state]?.map(l => <SelectItem key={l} value={l} className="rounded-xl font-bold">{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Ward_Sector</Label>
                  <Select 
                    disabled={!formData.lga}
                    onValueChange={(val) => setFormData({...formData, ward: val})}
                  >
                    <SelectTrigger className="h-16 rounded-[24px] border-slate-100 font-bold bg-slate-50/50 shadow-inner">
                      <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                      {formData.lga && (WARDS[formData.lga] || ['Ward 01', 'Ward 02']).map(w => <SelectItem key={w} value={w} className="rounded-xl font-bold">{w}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-6 bg-primary/5 p-8 rounded-[32px] border border-primary/10 shadow-sm"
              >
                <div className="p-3 bg-primary/20 rounded-2xl">
                   <MapPin className="h-7 w-7 text-primary" />
                </div>
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] leading-loose opacity-70">
                  Sector assignment is critical for localized intelligence relay and decentralized Eco Credit distribution.
                </p>
              </motion.div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-20 rounded-[28px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl glow-btn-primary btn-lift border border-primary/20 relative z-10">
                Register_Operative_ID
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-slate-50 p-10 flex justify-center border-t border-slate-100">
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
               Existing Operative ID? <Link to="/login" className="text-primary hover:underline ml-3 transition-all">Sign_In_Command</Link>
             </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
