
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoCircle } from 'lucide-react';

const Login = () => {
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CoachConnect</h1>
          <p className="mt-2 text-gray-600">Login to your account</p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <InfoCircle className="h-4 w-4 text-blue-500 mr-2" />
          <AlertDescription>
            <strong>Test Accounts (all use password: password123)</strong>
            <ul className="mt-2 list-disc pl-5">
              <li>Admin: admin@example.com</li>
              <li>Coach: coach@example.com</li>
              <li>Client: client@example.com</li>
            </ul>
          </AlertDescription>
        </Alert>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
