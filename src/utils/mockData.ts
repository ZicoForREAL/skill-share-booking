
import { User, Session, Booking, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    email: 'coach@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'coach',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Professional life coach with 10+ years of experience helping people achieve their goals.',
    createdAt: new Date('2023-01-05'),
  },
  {
    id: '3',
    email: 'coach2@example.com',
    firstName: 'Mary',
    lastName: 'Smith',
    role: 'coach',
    avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Career development specialist helping professionals find their dream jobs.',
    createdAt: new Date('2023-01-10'),
  },
  {
    id: '4',
    email: 'client@example.com',
    firstName: 'Jane',
    lastName: 'Wilson',
    role: 'client',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    createdAt: new Date('2023-01-15'),
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: '101',
    title: 'Career Transition Strategy',
    description: 'Develop a personalized strategy for switching careers or industries successfully.',
    coachId: '2',
    coachName: 'John Doe',
    duration: 60,
    price: 75,
    category: 'Career',
    tags: ['career change', 'strategy', 'planning'],
    availableDates: [
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
    ],
    maxParticipants: 1,
    createdAt: new Date('2023-02-01'),
  },
  {
    id: '102',
    title: 'Work-Life Balance Coaching',
    description: 'Learn effective strategies to balance your professional and personal life.',
    coachId: '2',
    coachName: 'John Doe',
    duration: 45,
    price: 60,
    category: 'Lifestyle',
    tags: ['work-life balance', 'stress management', 'productivity'],
    availableDates: [
      new Date(new Date().setDate(new Date().getDate() + 2)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 6)),
    ],
    maxParticipants: 1,
    createdAt: new Date('2023-02-10'),
  },
  {
    id: '103',
    title: 'Resume Review & Optimization',
    description: 'Get professional feedback and optimization tips for your resume.',
    coachId: '3',
    coachName: 'Mary Smith',
    duration: 30,
    price: 45,
    category: 'Career',
    tags: ['resume', 'job search', 'career'],
    availableDates: [
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
    ],
    maxParticipants: 1,
    createdAt: new Date('2023-02-15'),
  },
  {
    id: '104',
    title: 'Interview Preparation',
    description: 'Prepare for job interviews with mock interviews and feedback.',
    coachId: '3',
    coachName: 'Mary Smith',
    duration: 60,
    price: 85,
    category: 'Career',
    tags: ['interview', 'job search', 'career'],
    availableDates: [
      new Date(new Date().setDate(new Date().getDate() + 2)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 7)),
    ],
    maxParticipants: 1,
    createdAt: new Date('2023-02-20'),
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: '201',
    sessionId: '101',
    clientId: '4',
    clientName: 'Jane Wilson',
    coachId: '2',
    coachName: 'John Doe',
    sessionTitle: 'Career Transition Strategy',
    bookingDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    status: 'confirmed',
    createdAt: new Date('2023-03-01'),
  },
  {
    id: '202',
    sessionId: '103',
    clientId: '4',
    clientName: 'Jane Wilson',
    coachId: '3',
    coachName: 'Mary Smith',
    sessionTitle: 'Resume Review & Optimization',
    bookingDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: 'pending',
    createdAt: new Date('2023-03-05'),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '301',
    userId: '2',
    title: 'New Booking',
    message: 'Jane Wilson has booked your "Career Transition Strategy" session.',
    read: false,
    type: 'info',
    createdAt: new Date('2023-03-01'),
  },
  {
    id: '302',
    userId: '3',
    title: 'New Booking Request',
    message: 'Jane Wilson has requested to book your "Resume Review & Optimization" session.',
    read: false,
    type: 'info',
    createdAt: new Date('2023-03-05'),
  },
  {
    id: '303',
    userId: '4',
    title: 'Booking Confirmed',
    message: 'Your booking for "Career Transition Strategy" with John Doe has been confirmed.',
    read: true,
    type: 'success',
    createdAt: new Date('2023-03-01'),
  },
];
