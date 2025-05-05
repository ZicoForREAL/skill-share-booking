
import React from 'react';
import { Calendar, Users, BookOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import { mockUsers, mockSessions, mockBookings } from '@/utils/mockData';

const AdminDashboard = () => {
  // Calculate some stats from mock data
  const totalUsers = mockUsers.length;
  const totalCoaches = mockUsers.filter(user => user.role === 'coach').length;
  const totalClients = mockUsers.filter(user => user.role === 'client').length;
  const totalSessions = mockSessions.length;
  const totalBookings = mockBookings.length;
  
  // Calculate revenue - in a real app, this would come from actual payment data
  const totalRevenue = mockBookings.reduce((sum, booking) => {
    const session = mockSessions.find(s => s.id === booking.sessionId);
    return sum + (session?.price || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard. Here's an overview of your platform's performance.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          icon={<Users size={18} />}
          description="Active users on the platform"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Sessions" 
          value={totalSessions} 
          icon={<Calendar size={18} />}
          description="Active coaching sessions"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={<BookOpen size={18} />}
          description="Confirmed bookings"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue}`} 
          icon={<DollarSign size={18} />}
          description="Platform revenue"
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* User Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Overview</CardTitle>
            <CardDescription>Distribution of users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Coaches</span>
                <span className="font-medium">{totalCoaches}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(totalCoaches / totalUsers) * 100}%` }} 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Clients</span>
                <span className="font-medium">{totalClients}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-success rounded-full" 
                  style={{ width: `${(totalClients / totalUsers) * 100}%` }} 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Admins</span>
                <span className="font-medium">1</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-blue-300 rounded-full" 
                  style={{ width: `${(1 / totalUsers) * 100}%` }} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      {booking.clientName} booked "{booking.sessionTitle}" with {booking.coachName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(booking.createdAt).toLocaleDateString()} at{' '}
                      {new Date(booking.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Users size={20} />
            <span>Manage Users</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <Calendar size={20} />
            <span>Manage Sessions</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
            <BookOpen size={20} />
            <span>Manage Bookings</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// This component is missing the Button import
import { Button } from '@/components/ui/button';

export default AdminDashboard;
