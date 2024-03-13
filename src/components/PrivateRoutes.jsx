import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/verify`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.status) {
        setAuth({ token: data?.token, user: data?.user });
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  }, [setAuth]);

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, [fetchData]);

  // Render the Outlet or Navigate based on auth and isLoading states
  return isLoading ? null : auth.token ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoutes;
