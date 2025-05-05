
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingCardProps {
  booking: Booking;
  asCoach?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, asCoach = false }) => {
  const { sessionTitle, bookingDate, status, clientName, coachName } = booking;

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="session-card">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{sessionTitle}</h3>
        <Badge className={getStatusColor()}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      
      <div className="flex items-center mt-3 text-sm">
        <User className="h-4 w-4 mr-1 text-muted-foreground" />
        <span className="font-medium">
          {asCoach ? `Client: ${clientName}` : `Coach: ${coachName}`}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{format(bookingDate, 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{format(bookingDate, 'hh:mm a')}</span>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        {status === 'pending' && (
          <>
            {asCoach ? (
              <>
                <Button size="sm" className="bg-success-500 hover:bg-success-600">
                  Accept
                </Button>
                <Button size="sm" variant="destructive">
                  Decline
                </Button>
              </>
            ) : (
              <Button size="sm" variant="destructive">
                Cancel
              </Button>
            )}
          </>
        )}
        
        {status === 'confirmed' && (
          <>
            <Button size="sm" variant="outline">
              View Details
            </Button>
            {!asCoach && (
              <Button size="sm" variant="destructive">
                Cancel
              </Button>
            )}
          </>
        )}
        
        {status === 'completed' && (
          <Button size="sm" variant="outline">
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
