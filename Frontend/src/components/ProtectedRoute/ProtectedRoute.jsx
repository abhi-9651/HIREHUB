import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const session = localStorage.getItem('hirehub_session');
  
  if (!session) {
    // User is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}
