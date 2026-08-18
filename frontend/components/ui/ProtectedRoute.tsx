import { apiClient } from '@/lib/api-client';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  type: 'public' | 'private';
}

export const ProtectedRoute = ({ type }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiClient.get('/sesions/me');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Todavía estamos comprobando la cookie
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  // Ruta privada + no autenticado
  if (type === 'private' && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Ruta pública + autenticado
  if (type === 'public' && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};