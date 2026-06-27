import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, PlusSquare, Users, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Report', path: '/report', icon: PlusSquare },
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Cleanup', path: '/events', icon: Users },
    { name: 'Profile', path: '/rewards', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] glass-panel rounded-2xl shadow-2xl p-2 border border-white/40">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-gray-400"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "drop-shadow-[0_0_8px_rgba(27,94,32,0.5)]")} />
              <span className="text-[10px] font-medium">{item.name}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
