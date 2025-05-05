
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminDashboard from './AdminDashboard';
import CoachDashboard from './CoachDashboard';
import ClientDashboard from './ClientDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
