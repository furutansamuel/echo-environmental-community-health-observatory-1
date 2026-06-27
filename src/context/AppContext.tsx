import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hazard, User, CleanupEvent, WardHealthScore } from '../types';
import * as Sonner from 'sonner';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hazards: Hazard[];
  addHazard: (hazard: Omit<Hazard, 'id' | 'timestamp' | 'status'>) => void;
  updateHazardStatus: (id: string, status: Hazard['status']) => void;
  cleanupEvents: CleanupEvent[];
  addEvent: (event: Omit<CleanupEvent, 'id' | 'volunteers'>) => void;
  joinEvent: (eventId: string) => void;
  wardHealthScores: WardHealthScore[];
  points: number;
  isLoading: boolean;
  addPoints: (amount: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('echo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [hazards, setHazards] = useState<Hazard[]>(() => {
    const saved = localStorage.getItem('echo_hazards');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        type: 'Plastic Waste',
        description: 'Large amount of plastic bottles blocking the drain near the market.',
        severity: 'High',
        status: 'Pending',
        location: { lat: 6.5244, lng: 3.3792, state: 'Lagos', lga: 'Ikeja', ward: 'Ward A' },
        reporterId: 'user1',
        reporterName: 'John Doe',
        timestamp: new Date().toISOString(),
        imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-plastic-waste-2834c889-1782557142423.webp'
      },
      {
        id: '2',
        type: 'Blocked Drainage',
        description: 'Deep drainage system completely blocked with silt and debris.',
        severity: 'Critical',
        status: 'Verified',
        location: { lat: 6.5350, lng: 3.3850, state: 'Lagos', lga: 'Ikeja', ward: 'Ward B' },
        reporterId: 'user2',
        reporterName: 'Jane Smith',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-blocked-drainage-57e50bdc-1782557141553.webp'
      },
      {
        id: '3',
        type: 'Flooded Area',
        description: 'Road is impassable due to flooding after a 20-minute rain.',
        severity: 'Critical',
        status: 'Partially Resolved',
        location: { lat: 6.5100, lng: 3.3900, state: 'Lagos', lga: 'Alimosho', ward: 'Ward 1' },
        reporterId: 'user3',
        reporterName: 'Mike Wilson',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0a232ac-488f-4350-8fc4-1089141a22e8/hazard-flooded-area-091c6519-1782557142462.webp'
      }
    ];
  });

  const [cleanupEvents, setCleanupEvents] = useState<CleanupEvent[]>(() => {
    const saved = localStorage.getItem('echo_events');
    return saved ? JSON.parse(saved) : [
      {
        id: 'e1',
        title: 'Ikeja Market Cleanup',
        description: 'Community effort to clear plastic waste from the market drains.',
        location: 'Ikeja Main Market',
        date: new Date(Date.now() + 259200000).toISOString(),
        organizerId: 'admin',
        volunteers: ['user1', 'user2']
      }
    ];
  });

  const [points, setPoints] = useState(user?.points || 0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('echo_user', JSON.stringify(user));
    if (user) setPoints(user.points);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('echo_hazards', JSON.stringify(hazards));
  }, [hazards]);

  useEffect(() => {
    localStorage.setItem('echo_events', JSON.stringify(cleanupEvents));
  }, [cleanupEvents]);

  const addHazard = (newHazard: Omit<Hazard, 'id' | 'timestamp' | 'status'>) => {
    const hazard: Hazard = {
      ...newHazard,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    setHazards(prev => [hazard, ...prev]);
    addPoints(20);
    Sonner.toast.success('Hazard reported successfully! +20 Eco Points');
  };

  const updateHazardStatus = (id: string, status: Hazard['status']) => {
    setHazards(prev => prev.map(h => h.id === id ? { ...h, status } : h));
    if (status === 'Resolved') addPoints(50);
  };

  const addEvent = (newEvent: Omit<CleanupEvent, 'id' | 'volunteers'>) => {
    const event: CleanupEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      volunteers: [user?.id || 'guest']
    };
    setCleanupEvents(prev => [event, ...prev]);
    addPoints(100);
    Sonner.toast.success('Cleanup event created! +100 Eco Points');
  };

  const joinEvent = (eventId: string) => {
    if (!user) {
      Sonner.toast.error('Please login to join events');
      return;
    }
    setCleanupEvents(prev => prev.map(e => 
      e.id === eventId && !e.volunteers.includes(user.id) 
        ? { ...e, volunteers: [...e.volunteers, user.id] } 
        : e
    ));
    addPoints(30);
    Sonner.toast.success('Joined cleanup event! +30 Eco Points');
  };

  const addPoints = (amount: number) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      if (user) {
        setUser({ ...user, points: newPoints });
      }
      return newPoints;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echo_user');
    Sonner.toast.info('Logged out successfully');
  };

  const wardHealthScores: WardHealthScore[] = [
    { ward: 'Ward A', lga: 'Ikeja', score: 75, riskLevel: 'Moderate', trend: 'Improving', totalHazards: 12 },
    { ward: 'Ward B', lga: 'Ikeja', score: 42, riskLevel: 'High', trend: 'Declining', totalHazards: 28 },
    { ward: 'Ward 1', lga: 'Alimosho', score: 88, riskLevel: 'Low', trend: 'Stable', totalHazards: 5 }
  ];

  return (
    <AppContext.Provider value={{
      user, setUser, hazards, addHazard, updateHazardStatus, isLoading,
      cleanupEvents, addEvent, joinEvent, wardHealthScores,
      points, addPoints, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
