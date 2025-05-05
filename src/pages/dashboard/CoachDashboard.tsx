
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, DollarSign, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import BookingCard from '@/components/bookings/BookingCard';
import { useAuth } from '@/context/AuthContext';
import { mockSessions, mockBookings } from '@/utils/mockData';

const CoachDashboard = () => {
  const { user } = useAuth();
  
  // Filter data for current coach
  const coachId = user?.id;
  const coachSessions = mockSessions.filter(session => session.coachId === coachId);
  const coachBookings = mockBookings.filter(booking => booking.coachId === coachId);
  
  // Calculate some stats
  const totalSessions = coachSessions.length;
  const upcomingBookings = coachBookings.filter(
    booking => booking.status === 'confirmed' && new Date(booking.bookingDate) > new Date()
  ).length;
  
  // Calculate earnings - in a real app, this would come from actual payment data
  const totalEarnings = coachBookings.reduce((sum, booking) => {
    const session = coachSessions.find(s => s.id === booking.sessionId);
    return sum + (session?.price || 0);
  }, 0);
  
  // Recent bookings - limit to 3 for display
  const recentBookings = [...coachBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coach Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.firstName}! Here's an overview of your coaching business.
          </p>
        </div>
        <Link to="/my-sessions/new">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Session
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Active Sessions" 
          value={totalSessions} 
          icon={<Calendar size={18} />}
          description="Available coaching sessions"
        />
        <StatCard 
          title="Upcoming Bookings" 
          value={upcomingBookings} 
          icon={<BookOpen size={18} />}
          description="Confirmed future bookings"
        />
        <StatCard 
          title="Total Earnings" 
          value={`$${totalEarnings}`} 
          icon={<DollarSign size={18} />}
          description="Your coaching revenue"
        />
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your most recent session bookings</CardDescription>
        </CardHeader>
        {recentBookings.length > 0 ? (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} asCoach={true} />
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              No bookings yet. Sessions you create will appear here when clients book them.
            </p>
          </CardContent>
        )}
        <CardFooter className="border-t px-6 py-4">
          <Link to="/bookings" className="w-full">
            <Button variant="outline" className="w-full">
              View All Bookings
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* My Sessions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Sessions</CardTitle>
            <CardDescription>Sessions you're currently offering</CardDescription>
          </div>
          <Link to="/my-sessions/new">
            <Button size="sm" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coachSessions.length > 0 ? (
              coachSessions.slice(0, 4).map(session => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {session.description.substring(0, 80)}...
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{session.duration} min</span>
                      <span className="mx-2">•</span>
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>${session.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-muted/50">
                    <Link to={`/my-sessions/${session.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                <PlusCircle className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No Sessions Yet</h3>
                <p className="mb-4">Create your first coaching session to get started</p>
                <Link to="/my-sessions/new">
                  <Button>Create a Session</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
        {coachSessions.length > 4 && (
          <CardFooter className="border-t px-6 py-4">
            <Link to="/my-sessions" className="w-full">
              <Button variant="outline" className="w-full">
                View All Sessions
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

// This component is missing the Clock import
import { Clock } from 'lucide-react';

export default CoachDashboard;
