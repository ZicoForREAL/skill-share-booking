
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User, DollarSign } from 'lucide-react';
import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';

interface SessionCardProps {
  session: Session;
  asClient?: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, asClient = false }) => {
  const { id, title, description, coachName, duration, price, category, tags } = session;

  // Format duration for display (e.g. "60 minutes")
  const formatDuration = (mins: number) => {
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  };

  // Truncate description if it's too long
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="session-card">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="outline" className="bg-primary-50 text-primary-700">
          {category}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mt-2">
        {truncateText(description, 120)}
      </p>
      
      <div className="flex items-center mt-4 text-sm">
        <User className="h-4 w-4 mr-1 text-muted-foreground" />
        <span className="font-medium">{coachName}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDuration(duration)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{formatCurrency(price)}</span>
        </div>
      </div>
      
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <Link to={asClient ? `/session/${id}` : `/my-sessions/${id}`}>
          <Button variant="outline" size="sm">
            {asClient ? "View Details" : "Manage"}
          </Button>
        </Link>
        {asClient && (
          <Link to={`/book/${id}`}>
            <Button size="sm">Book Session</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
