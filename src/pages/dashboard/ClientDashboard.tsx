
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import BookingCard from '@/components/bookings/BookingCard';
import SessionCard from '@/components/sessions/SessionCard';
import { useAuth } from '@/context/AuthContext';
import { mockSessions, mockBookings } from '@/utils/mockData';

const ClientDashboard = () => {
  const { user } = useAuth();
  
  // Filter data for current client
  const clientId = user?.id;
  const clientBookings = mockBookings.filter(booking => booking.clientId === clientId);
  
  // Calculate some stats
  const totalBookings = clientBookings.length;
  const upcomingBookings = clientBookings.filter(
    booking => booking.status === 'confirmed' && new Date(booking.bookingDate) > new Date()
  ).length;
  const completedBookings = clientBookings.filter(
    booking => booking.status === 'completed'
  ).length;
  
  // Recent bookings - limit to 3 for display
  const recentBookings = [...clientBookings]
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
    .slice(0, 3);
  
  // Recommended sessions - in a real app, these would be personalized
  const recommendedSessions = mockSessions.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.firstName}! Find and manage your coaching sessions.
          </p>
        </div>
        <Link to="/find-sessions">
          <Button className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Find Sessions
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={<Calendar size={18} />}
          description="Total sessions booked"
        />
        <StatCard 
          title="Upcoming Sessions" 
          value={upcomingBookings} 
          icon={<Clock size={18} />}
          description="Future scheduled sessions"
        />
        <StatCard 
          title="Completed Sessions" 
          value={completedBookings} 
          icon={<Calendar size={18} />}
          description="Past sessions attended"
        />
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled coaching sessions</CardDescription>
        </CardHeader>
        {upcomingBookings > 0 ? (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Sessions</h3>
              <p className="mb-4">Browse available sessions and book your first coaching session</p>
              <Link to="/find-sessions">
                <Button>Find Sessions</Button>
              </Link>
            </div>
          </CardContent>
        )}
        {clientBookings.length > 3 && (
          <CardFooter className="border-t px-6 py-4">
            <Link to="/my-bookings" className="w-full">
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>

      {/* Recommended Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Sessions you might be interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedSessions.map(session => (
              <SessionCard key={session.id} session={session} asClient={true} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Link to="/find-sessions" className="w-full">
            <Button variant="outline" className="w-full">
              Browse All Sessions
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientDashboard;
