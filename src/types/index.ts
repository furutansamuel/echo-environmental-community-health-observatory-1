export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type HazardStatus = 'Pending' | 'Verified' | 'Partially Resolved' | 'Resolved';
export type HazardType = 'Plastic Waste' | 'Blocked Drainage' | 'Flooded Area' | 'Illegal Dumpsite' | 'Stagnant Water' | 'Damaged Drainage' | 'Roadside Waste' | 'Other';

export interface Location {
  lat: number;
  lng: number;
  state: string;
  lga: string;
  ward: string;
}

export interface Hazard {
  id: string;
  type: HazardType;
  description: string;
  severity: Severity;
  status: HazardStatus;
  location: Location;
  reporterId: string;
  reporterName: string;
  timestamp: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  state: string;
  lga: string;
  ward: string;
  points: number;
  badges: string[];
  role: 'citizen' | 'government' | 'guest';
}

export interface CleanupEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizerId: string;
  volunteers: string[];
}

export interface Verification {
  id: string;
  hazardId: string;
  userId: string;
  status: 'Still There' | 'Partially Resolved' | 'Cleaned';
  timestamp: string;
}

export interface WardHealthScore {
  ward: string;
  lga: string;
  score: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  trend: 'Improving' | 'Declining' | 'Stable';
  totalHazards: number;
}
