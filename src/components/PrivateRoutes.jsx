import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3333/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.status) {
        // toast.success(data?.message || "Success Notification !");
        setAuth({ token: data?.token, user: data?.user });
      } else {
        // toast.error(data?.message || "Something went wrong !");
      }
    } catch (error) {
      // toast.error(error?.message || "Something went wrong !");
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  }, [setAuth]);

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, [fetchData]);

  useEffect(() => {
    // console.log(auth); // Log auth after it's updated
    // console.log(auth?.token, auth?.user);
  }, [auth]); // Run this effect whenever auth changes

  // Render the Outlet or Navigate based on auth and isLoading states
  return isLoading ? null : auth.token ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoutes;
