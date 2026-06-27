import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Camera, MapPin, AlertCircle, Upload, CheckCircle2, Loader2, ArrowRight, ShieldCheck, Target, Cpu, Activity, AlertTriangle } from 'lucide-react';
import { HazardType, Severity } from '../types';
import { cn } from '../lib/utils';
import * as Sonner from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const HAZARD_TYPES: HazardType[] = ['Plastic Waste', 'Blocked Drainage', 'Flooded Area', 'Illegal Dumpsite', 'Stagnant Water', 'Damaged Drainage', 'Roadside Waste', 'Other'];
const SEVERITY_LEVELS: Severity[] = ['Low', 'Medium', 'High', 'Critical'];
const STATES = ['Lagos', 'Ogun', 'Oyo', 'Nasarawa'];
const LGAS: Record<string, string[]> = {
  'Lagos': ['Ikeja', 'Alimosho', 'Eti-Osa', 'Lagos Island', 'Surulere'],
  'Ogun': ['Abeokuta South', 'Abeokuta North', 'Ijebu Ode'],
  'Oyo': ['Ibadan North', 'Ibadan South East', 'Ogbomosho North'],
  'Nasarawa': ['Lafia', 'Akwanga', 'Keffi', 'Karu']
};
const WARDS: Record<string, string[]> = {
  'Ikeja': ['Ward A', 'Ward B', 'Ward C', 'Ward D'],
  'Lafia': ['Ward 01', 'Ward 02', 'Ward 03', 'Ward 04'],
  'Alimosho': ['Ward 1', 'Ward 2', 'Ward 3'],
  'Eti-Osa': ['Ward 01', 'Ward 02']
};

const ReportHazard = () => {
  const { addHazard, user } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    type: '' as HazardType,
    severity: '' as Severity,
    description: '',
    state: user?.state || '',
    lga: user?.lga || '',
    ward: user?.ward || '',
    lat: 8.4900,
    lng: 8.5200
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectLocation = () => {
    Sonner.toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Interrogating Spatial Satellites...',
        success: 'Coordinates Locked: Sector Lafia_Grid_04',
        error: 'Spatial Link Failure'
      }
    );
    setFormData({ ...formData, state: 'Nasarawa', lga: 'Lafia', ward: 'Ward 01' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.severity || !formData.description) {
      Sonner.toast.error('Required Field Telemetry Missing');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      addHazard({
        type: formData.type,
        severity: formData.severity,
        description: formData.description,
        location: {
          lat: formData.lat,
          lng: formData.lng,
          state: formData.state,
          lga: formData.lga,
          ward: formData.ward
        },
        reporterId: user?.id || 'guest',
        reporterName: user?.name || 'Guest Operative',
        imageUrl: imagePreview || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800'
      });
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-16 text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center mb-8 shadow-2xl glow-3d-green border border-white/10"
        >
          <ShieldCheck className="h-10 w-10 text-primary animate-pulse" />
        </motion.div>
        <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase leading-none">Tactical Reporting</h1>
        <div className="flex items-center justify-center gap-3">
           <Cpu className="h-3 w-3 text-primary" />
           <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px]">Community Intelligence Protocol_v4.2</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex justify-center mb-20 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-3"
          >
            <motion.div 
              initial={false}
              animate={{ 
                backgroundColor: step >= i ? "var(--primary)" : "rgba(0,0,0,0.05)",
                scale: step === i ? 1.2 : 1
              }}
              className={cn(
                "h-2 w-16 rounded-full transition-all duration-500",
                step >= i && "glow-3d-green shadow-[0_0_15px_rgba(27,94,32,0.5)]"
              )}
            />
            <span className={cn("text-[9px] font-black uppercase tracking-widest", step >= i ? "text-primary" : "text-slate-300")}>Phase_0{i}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="card-3d p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-none relative overflow-hidden bg-white/95 backdrop-blur-xl"
            >
              {/* Background HUD elements */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-slate-50 rounded-tr-[48px] m-4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-slate-50 rounded-bl-[48px] m-4 pointer-events-none" />

              {step === 1 && (
                <div className="space-y-10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="p-6 bg-slate-900 rounded-[28px] shadow-2xl border border-white/10 glow-3d-green">
                      <MapPin className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Spatial Context</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Activity className="h-3 w-3" /> Pin-point threat vector node
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-20 rounded-[24px] border-2 border-primary/20 text-primary font-black uppercase tracking-[0.3em] hover:bg-primary/5 shadow-xl transition-all flex items-center justify-center gap-4 bg-white/50 backdrop-blur-sm group"
                    onClick={detectLocation}
                  >
                    <Target className="h-6 w-6 group-hover:rotate-90 transition-transform duration-700" /> Interrogate_Spatial_Satellites
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <Label className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 px-1">Sector_State</Label>
                      <Select value={formData.state} onValueChange={(val) => setFormData({...formData, state: val, lga: '', ward: ''})}>
                        <SelectTrigger className="h-16 rounded-[22px] border-slate-100 font-black shadow-inner bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                          {STATES.map(s => <SelectItem key={s} value={s} className="rounded-xl font-bold">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <Label className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 px-1">LGA_Node</Label>
                      <Select value={formData.lga} disabled={!formData.state} onValueChange={(val) => setFormData({...formData, lga: val, ward: ''})}>
                        <SelectTrigger className="h-16 rounded-[22px] border-slate-100 font-black shadow-inner bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                          {formData.state && LGAS[formData.state]?.map(l => <SelectItem key={l} value={l} className="rounded-xl font-bold">{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <Label className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 px-1">Ward_Sector</Label>
                      <Select value={formData.ward} disabled={!formData.lga} onValueChange={(val) => setFormData({...formData, ward: val})}>
                        <SelectTrigger className="h-16 rounded-[22px] border-slate-100 font-black shadow-inner bg-slate-50/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[28px] border-none shadow-2xl p-2">
                          {formData.lga && (WARDS[formData.lga] || ['Ward 01', 'Ward 02']).map(w => <SelectItem key={w} value={w} className="rounded-xl font-bold">{w}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="p-6 bg-slate-900 rounded-[28px] shadow-2xl border border-white/10 glow-3d-amber">
                      <AlertCircle className="h-10 w-10 text-accent animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Hazard Taxonomy</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Cpu className="h-3 w-3" /> Classify environmental threat
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {HAZARD_TYPES.map(type => (
                      <motion.button
                        key={type}
                        type="button"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({...formData, type})}
                        className={cn(
                          "p-8 rounded-[32px] border-2 transition-all duration-500 text-center font-black uppercase text-[10px] tracking-[0.2em] relative overflow-hidden group/btn",
                          formData.type === type 
                            ? "border-primary bg-primary/5 text-primary shadow-[0_20px_40px_-10px_rgba(27,94,32,0.2)] scale-105" 
                            : "border-slate-50 bg-slate-50/30 text-slate-400 hover:border-primary/30 hover:text-slate-600"
                        )}
                      >
                        <div className="relative z-10">{type}</div>
                        {formData.type === type && (
                          <motion.div 
                            layoutId="active-type"
                            className="absolute inset-0 bg-primary/5 pointer-events-none"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 px-1">Intelligence Intel Details</Label>
                    <Textarea 
                      placeholder="Describe tactical situation and potential flooding risk levels..."
                      className="min-h-[160px] rounded-[28px] border-slate-100 font-bold p-8 bg-slate-50/50 shadow-inner focus-visible:ring-primary/20"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="p-6 bg-slate-900 rounded-[28px] shadow-2xl border border-white/10 glow-3d-green">
                      <Camera className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Visual Telemetry</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Activity className="h-3 w-3" /> Capture high-fidelity evidence
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    {imagePreview ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] aspect-video group cursor-crosshair border-8 border-white"
                      >
                        <img src={imagePreview} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <Button 
                            type="button" 
                            variant="destructive" 
                            onClick={() => setImagePreview(null)}
                            className="rounded-[20px] font-black uppercase tracking-[0.3em] h-16 px-10 shadow-2xl glow-3d-amber border-none"
                           >
                             Reset_Telemetry_Link
                           </Button>
                        </div>
                        {/* HUD Scanlines */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
                      </motion.div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[64px] p-24 cursor-pointer hover:bg-slate-50 hover:border-primary/20 transition-all group relative overflow-hidden shadow-inner">
                         <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         <div className="p-8 bg-slate-900 rounded-[32px] mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl glow-3d-green border border-white/10">
                            <Upload className="h-14 w-14 text-primary" />
                         </div>
                         <span className="text-xl font-black uppercase tracking-[0.3em] relative z-10">Upload_Evidence</span>
                         <span className="text-sm text-slate-400 font-bold mt-3 relative z-10 uppercase tracking-widest opacity-60">Initialize Camera or Neural Link</span>
                         <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10 text-center">
                   <div className="flex flex-col items-center gap-6 mb-12">
                    <div className="p-8 bg-slate-900 rounded-[32px] shadow-2xl border border-white/10 glow-3d-amber">
                      <AlertCircle className="h-12 w-12 text-accent animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Threat Threshold</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                        <Cpu className="h-3 w-3 text-primary" /> Quantify environmental risk factor
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {SEVERITY_LEVELS.map(level => (
                      <motion.button
                        key={level}
                        type="button"
                        whileHover={{ scale: 1.05, y: -10 }}
                        onClick={() => setFormData({...formData, severity: level as Severity})}
                        className={cn(
                          "p-10 rounded-[48px] border-4 transition-all duration-500 flex flex-col items-center gap-6 relative overflow-hidden group/lvl",
                          formData.severity === level 
                            ? "border-primary bg-primary/5 shadow-2xl scale-105"
                            : "border-slate-50 bg-slate-50/30 grayscale hover:grayscale-0 hover:border-primary/20"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full shadow-2xl animate-pulse relative",
                          level === 'Low' ? "bg-green-500" : 
                          level === 'Medium' ? "bg-amber-500 shadow-amber-500/50" : 
                          level === 'High' ? "bg-orange-500 shadow-orange-500/50" : "bg-red-500 shadow-red-500/50"
                        )}>
                           <div className="absolute inset-[-8px] border-2 border-current rounded-full opacity-20 group-hover/lvl:scale-150 transition-transform duration-1000" />
                        </div>
                        <span className="font-black uppercase tracking-[0.4em] text-sm group-hover/lvl:tracking-[0.5em] transition-all">{level}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-10 text-center">
                   <div className="flex flex-col items-center gap-6 mb-12">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-10 bg-slate-900 rounded-full shadow-2xl border border-white/10 glow-3d-green relative"
                    >
                      <CheckCircle2 className="h-20 w-20 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tight">Final Verification</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Ready for metropolitan grid transmission</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[48px] p-12 border border-white/5 text-left space-y-6 shadow-2xl relative overflow-hidden group/confirm">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(27,94,32,0.1),transparent_50%)]" />
                     <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-6">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Vector_Type</span>
                        <span className="font-black text-primary uppercase text-lg tracking-tight">{formData.type}</span>
                     </div>
                     <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-6">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Spatial_Sector</span>
                        <span className="font-black text-white uppercase text-right text-lg tracking-tight">{formData.ward}, {formData.lga}</span>
                     </div>
                     <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Severity_Rating</span>
                        <span className="font-black text-red-500 uppercase text-lg tracking-tight">{formData.severity}</span>
                     </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-20 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.4em] text-xs rounded-[28px] shadow-[0_30px_60px_-12px_rgba(27,94,32,0.4)] glow-btn-primary btn-lift border border-primary/20 relative z-10 mt-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="h-8 w-8 animate-spin" /> : "Transmit_To_Neural_Grid"}
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between gap-8 pt-8">
             {step > 1 && (
               <Button 
                type="button" 
                variant="ghost" 
                onClick={prevStep}
                className="h-16 px-12 font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 hover:text-primary transition-all rounded-[22px] glass-panel"
               >
                 Back_Protocol
               </Button>
             )}
             {step < 5 && (
               <Button 
                type="button" 
                onClick={nextStep}
                disabled={!formData.type && step === 2}
                className="ml-auto h-16 px-16 bg-white border-2 border-slate-100 text-slate-900 hover:border-primary hover:text-primary font-black uppercase tracking-[0.3em] text-[10px] rounded-[24px] shadow-2xl transition-all glow-btn-primary hover:bg-white"
               >
                 Continue_Phase
               </Button>
             )}
          </div>
        </form>
      </div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="mt-20 bg-slate-900 border border-white/5 rounded-[40px] p-10 flex gap-8 shadow-2xl relative overflow-hidden group/warn"
      >
        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/warn:opacity-100 transition-opacity duration-700" />
        <div className="p-4 bg-red-500/10 rounded-2xl shrink-0 group-hover/warn:rotate-12 transition-transform duration-500">
           <AlertTriangle className="h-10 w-10 text-red-500 animate-pulse" />
        </div>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] leading-loose relative z-10">
          <p className="mb-3 text-red-500 font-black tracking-[0.4em]">OPERATIVE_COMPLIANCE_PROTOCOL</p>
          <p className="opacity-60 group-hover:opacity-100 transition-opacity">Submitting fraudulent data results in immediate ECO Credit forfeiture and node access termination. Report with total integrity for systemic defense.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportHazard;
