import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  AlertTriangle, 
  Map as MapIcon, 
  Zap, 
  Users, 
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldAlert,
  Activity,
  Globe,
  Target,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import AnimatedNumber from '../components/ui/AnimatedNumber';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-primary selection:text-white overflow-x-hidden">
      {/* HUD System Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[20px] border-transparent opacity-20">
         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
      </div>

      <nav className="flex items-center justify-between px-12 py-8 glass-panel sticky top-4 z-[100] mx-8 rounded-[32px]">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-14 h-14 bg-slate-900 rounded-[22px] flex items-center justify-center shadow-2xl glow-3d-green"
          >
            <Target className="text-white h-8 w-8" />
          </motion.div>
          <div>
            <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none block">ECHO</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Intelligence</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <Link to="/login" className="text-[10px] font-black text-slate-500 hover:text-primary uppercase tracking-[0.3em] transition-all hidden md:flex items-center gap-2 group">
            <Cpu className="h-3 w-3 group-hover:rotate-90 transition-transform" />
            Operator_Auth
          </Link>
          <Link to="/register">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-2xl glow-btn-primary rounded-[20px] px-10 h-14 font-black uppercase tracking-[0.2em] text-[10px] border border-primary/20">
              Initialize_System
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-40 px-12 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-full lg:w-3/5 h-[1000px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-[#FAFAFA] via-transparent to-[#FAFAFA] z-10" />
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/echo-hero-bg-e74d1384-1782557141371.webp" 
            alt="ECHO Intelligence Grid" 
            className="object-cover w-full h-full grayscale floating-3d"
          />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-10">
               <span className="w-16 h-[3px] bg-primary rounded-full" />
               <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">Environmental Defense Protocol_v4.2</span>
            </div>
            
            <h1 className="text-8xl md:text-9xl font-black text-slate-900 mb-10 leading-[0.85] tracking-tighter">
              COGNITIVE <br/> <span className="text-primary italic">CIVIC</span> <br/> MONITORING.
            </h1>
            
            <p className="text-2xl text-slate-500 mb-14 max-w-2xl font-medium leading-relaxed opacity-80">
              Deploying real-time metropolitan intelligence to neutralize environmental hazards and prevent urban inundation through decentralized civic action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white h-20 px-12 text-xs font-black uppercase tracking-[0.3em] rounded-[24px] shadow-2xl glow-btn-primary btn-lift border border-primary/20">
                  Deploy_Intelligence <ArrowRight className="ml-4 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="h-20 px-12 text-xs font-black uppercase tracking-[0.3em] rounded-[24px] border-2 border-slate-200 hover:border-primary transition-all bg-white shadow-xl hover:shadow-2xl">
                  Observer_Mode
                </Button>
              </Link>
            </div>

            <div className="mt-24 flex items-center gap-12">
               <div className="flex -space-x-5">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10, zIndex: 10 }}
                      className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-2xl relative cursor-pointer"
                    >
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </motion.div>
                  ))}
               </div>
               <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <AnimatedNumber value={3500} suffix="+" /> OPERATIVES
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Active across 85 metropolitan sectors_Lafia</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Impact Grid */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="max-w-7xl mx-auto px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[ 
              { label: 'Hazards Neutralized', val: 1420, suffix: '', sub: '+12% system_uptick' },
              { label: 'Resolution Velocity', val: 65, suffix: '%', sub: 'Optimized_Cycle' },
              { label: 'Sector Health Index', val: 88, suffix: '/100', sub: 'System_Threshold' },
              { label: 'Civic Workforce', val: 3.5, suffix: 'k', sub: 'Verified_Operatives' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="text-7xl font-black mb-4 tracking-tighter text-primary group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} decimals={stat.val % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.4em] mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Analysis */}
      <section className="py-48 px-12 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-32 items-center">
            <div className="flex-1">
               <Badge className="bg-red-500/10 text-red-600 font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full mb-10 border-none shadow-none text-[10px]">
                  System_Threat_Level: Elevated
               </Badge>
               <h2 className="text-6xl font-black text-slate-900 mb-10 leading-[1] tracking-tighter">
                  METROPOLITAN <br/> DRAINAGE <span className="text-red-600 underline decoration-8 underline-offset-[12px]">FAILURE</span>.
               </h2>
               <p className="text-xl text-slate-500 mb-14 leading-relaxed font-medium opacity-80">
                  Unmanaged plastic matrix and obstructed arterial systems are the primary catalysts for urban inundation. Static monitoring is obsolete; real-time cognitive intervention is required.
               </p>
               
               <div className="space-y-8">
                  {[
                    { title: "Waste Displacement_Node", icon: Target, desc: "Systemic plastic accumulation in open-water arteries." },
                    { title: "Arterial Blockage_Detected", icon: AlertTriangle, desc: "Critical culvert failure leading to flash inundation events." },
                    { title: "Bio-Hazard Proliferation", icon: Activity, desc: "Stagnant vector breeding thresholds exceeded." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 20 }}
                      className="flex gap-8 p-8 rounded-[32px] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100 cursor-default"
                    >
                       <div className="w-16 h-16 bg-slate-100 rounded-[20px] flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500 shadow-lg">
                          <item.icon className="h-8 w-8 text-slate-400 group-hover:text-white transition-colors" />
                       </div>
                       <div>
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="text-base text-slate-500 font-medium leading-relaxed opacity-70">{item.desc}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-8 relative">
               <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
               <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="rounded-[40px] shadow-2xl h-72 w-full overflow-hidden border-8 border-white glow-3d-green"
               >
                 <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-plastic-waste-2834c889-1782557142423.webp" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
               </motion.div>
               <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="rounded-[40px] shadow-2xl h-72 w-full mt-16 overflow-hidden border-8 border-white glow-3d-amber"
               >
                 <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-blocked-drainage-57e50bdc-1782557141553.webp" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
               </motion.div>
               <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="rounded-[40px] shadow-2xl h-72 w-full overflow-hidden border-8 border-white glow-3d-green"
               >
                 <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-flooded-area-091c6519-1782557142462.webp" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
               </motion.div>
               <motion.div 
                whileHover={{ scale: 1.1 }}
                className="bg-slate-900 rounded-[40px] flex flex-col items-center justify-center p-10 text-white mt-16 shadow-2xl glow-3d-green border border-white/10 group cursor-pointer"
               >
                 <BarChart3 className="h-16 w-16 mb-6 text-primary group-hover:scale-125 transition-transform duration-500 animate-pulse" />
                 <span className="text-center font-black uppercase tracking-[0.3em] text-[10px] opacity-60">Neural_Data_Grid</span>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Protocol */}
      <section className="py-48 px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(27,94,32,0.03),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">THE CORE PROTOCOL</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-primary/30" />
              <p className="text-primary font-bold uppercase tracking-[0.5em] text-xs">Synchronized Metropolitan Defense_Grid</p>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: AlertTriangle, title: "Detection", color: "text-red-500", desc: "Citizen-driven telemetry identifying environmental threat vectors." },
              { icon: Globe, title: "Spatial Grid", color: "text-blue-500", desc: "Real-time vector mapping across the metromatrix." },
              { icon: Zap, title: "Cognitive AI", color: "text-amber-500", desc: "Neural synthesis for predictive risk modeling." },
              { icon: Target, title: "Neutralization", color: "text-primary", desc: "Coordinated tactical missions to eliminate verified hazards." }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -20 }}
                className="card-3d p-12 bg-white flex flex-col items-center text-center group border border-slate-100"
              >
                <div className={cn("w-24 h-24 rounded-[28px] flex items-center justify-center mb-10 bg-slate-50 group-hover:scale-110 transition-transform duration-500 shadow-inner", step.color)}>
                  <step.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest leading-none">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed opacity-70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Deployment */}
      <section className="py-48 px-12">
        <div className="max-w-6xl mx-auto text-center card-3d bg-slate-900 p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(27,94,32,0.2),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-10" />
          
          <div className="relative z-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mx-auto w-24 h-24 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mb-12"
            >
               <ShieldCheck className="h-12 w-12 text-primary" />
            </motion.div>
            <h2 className="text-6xl font-black text-white mb-10 tracking-tighter leading-[1.1]">INITIALIZE SYSTEM <br/>INTERVENTION.</h2>
            <p className="text-2xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
              Join the metropolitan intelligence network. Secure your sector and accrue Eco Credits for every verified hazard neutralization.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white h-20 px-16 text-xs font-black uppercase tracking-[0.3em] rounded-[24px] shadow-2xl glow-btn-primary btn-lift border border-primary/20">
                  Enlist_Operative_ID
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-20 px-16 text-xs font-black uppercase tracking-[0.3em] rounded-[24px] border-2 border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all glass-panel">
                  Access_Command
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-slate-100 px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center shadow-2xl">
              <Target className="text-white h-8 w-8" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">ECHO</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">EST. 2024_NODE_4.2</p>
            </div>
          </div>
          
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] text-center lg:text-left leading-loose opacity-60">
            ENVIRONMENTAL COMMUNITY HEALTH OBSERVATORY <br/>
            <span className="text-primary opacity-100">SECURE CIVIC TECHNOLOGY INITIATIVE // LAFIA_REGION</span>
          </div>
          
          <div className="flex gap-12">
            {['Privacy_Lgl', 'Protocol_SOP', 'Terminal_Logs'].map(item => (
              <a key={item} href="#" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.3em] transition-all hover:translate-y-[-2px]">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
