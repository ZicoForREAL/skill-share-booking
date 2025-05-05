
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Calendar, BookOpen, Settings, 
  BarChart, Users, BookOpenCheck, FileText 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    const adminLinks = [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Sessions', href: '/sessions', icon: Calendar },
      { name: 'Reports', href: '/reports', icon: FileText },
      { name: 'Settings', href: '/settings', icon: Settings },
    ];
    
    const coachLinks = [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart },
      { name: 'My Sessions', href: '/my-sessions', icon: Calendar },
      { name: 'Bookings', href: '/bookings', icon: BookOpen },
      { name: 'Profile', href: '/profile', icon: User },
    ];
    
    const clientLinks = [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart },
      { name: 'Find Sessions', href: '/find-sessions', icon: BookOpenCheck },
      { name: 'My Bookings', href: '/my-bookings', icon: Calendar },
      { name: 'Profile', href: '/profile', icon: User },
    ];
    
    switch (user.role) {
      case 'admin':
        return adminLinks;
      case 'coach':
        return coachLinks;
      case 'client':
        return clientLinks;
      default:
        return [];
    }
  };
  
  const navLinks = getNavLinks();
  
  return (
    <aside className={cn("w-64 hidden md:block bg-white border-r shadow-sm h-[calc(100vh-4rem)] sticky top-16", className)}>
      <div className="px-3 py-4">
        <div className="mb-6 px-4">
          <p className="text-sm font-medium text-muted-foreground">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
          </p>
        </div>
        
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                isActive(link.href)
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon className={cn(
                "mr-3 h-5 w-5",
                isActive(link.href) ? "text-primary-500" : "text-gray-500"
              )} />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
