import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/sonner';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportHazard from './pages/ReportHazard';
import HazardMap from './pages/Map';
import CleanupEvents from './pages/CleanupEvents';
import Rewards from './pages/Rewards';
import ImpactDashboard from './pages/ImpactDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected/App Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<HazardMap />} />
            <Route path="/report" element={<ReportHazard />} />
            <Route path="/events" element={<CleanupEvents />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/government" element={<GovernmentDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AppProvider>
  );
}

export default App;
