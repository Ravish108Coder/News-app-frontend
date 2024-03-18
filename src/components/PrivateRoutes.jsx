import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDrawer } from '../context/DrawerContext';
import Loading from './Loading';

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const {isLoggedIn, setIsLoggedIn} = useDrawer();
  const {user, setUser} = useDrawer();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/verify`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.status) {
        console.log(data?.user)
        setUser(data?.user);
        localStorage.setItem("token", data?.token);
        setIsLoggedIn(true);
      } 
    } catch (error) {
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  }, []);

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, [fetchData]);

  // Render the Outlet or Navigate based on auth and isLoading states
  // return isLoading ? null : localStorage.getItem('token') ? <Outlet /> : <Navigate to='/signin' />;
  return isLoading ? <Loading /> : localStorage.getItem('token') ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoutes;
