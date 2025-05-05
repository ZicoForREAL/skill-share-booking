
export type UserRole = 'admin' | 'coach' | 'client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  coachId: string;
  coachName: string;
  duration: number; // in minutes
  price: number;
  category: string;
  tags: string[];
  availableDates: Date[];
  maxParticipants?: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  sessionId: string;
  clientId: string;
  clientName: string;
  coachId: string;
  coachName: string;
  sessionTitle: string;
  bookingDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
}
