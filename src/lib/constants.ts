export const HAZARD_TYPES = [
  'Plastic Waste',
  'Blocked Drainage',
  'Flooded Area',
  'Illegal Dumpsite',
  'Stagnant Water',
  'Damaged Drainage',
  'Roadside Waste'
] as const;

export const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const;

export const STATES = ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo'];

export const LGAS: Record<string, string[]> = {
  'Lagos': ['Ikeja', 'Alimosho', 'Eti-Osa', 'Lagos Island'],
  'Abuja': ['AMAC', 'Bwari', 'Gwagwalada'],
  'Kano': ['Kano Municipal', 'Fagge', 'Gwale'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme'],
  'Oyo': ['Ibadan North', 'Ibadan South', 'Akinyele']
};

export const WARDS: Record<string, string[]> = {
  'Ikeja': ['Ward A', 'Ward B', 'Ward C'],
  'Alimosho': ['Ward 1', 'Ward 2', 'Ward 3'],
  'AMAC': ['Garki', 'Wuse', 'Asokoro']
};

export const BADGES = [
  { id: 'first-reporter', name: 'First Reporter', description: 'Reported your first hazard' },
  { id: 'cleanup-champion', name: 'Cleanup Champion', description: 'Joined 5 cleanup events' },
  { id: 'community-guardian', name: 'Community Guardian', description: 'Verified 10 hazards' },
  { id: 'environmental-hero', name: 'Environmental Hero', description: 'Points exceed 500' },
  { id: 'top-verifier', name: 'Top Verifier', description: 'Most active verifier this month' }
];
