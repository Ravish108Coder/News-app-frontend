import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDrawer } from '../context/DrawerContext';
import Loading from './Loading';

const PrivateRoutes = () => {
  const {isLoggedIn, setIsLoggedIn, isPrivateRoutesLoading, setisPrivateRoutesLoading} = useDrawer();
  const {user, setUser} = useDrawer();

  const fetchData = useCallback(async () => {
    localStorage.getItem('token')&& localStorage.removeItem('token');
    // console.log('fetchData called');
    setisPrivateRoutesLoading(true); // Set loading state to true before fetching data
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
      } else {
        console.log(data?.message || "Something went wrong !")
      }
    } catch (error) {
    } finally {
      setisPrivateRoutesLoading(false); // Set loading state to false after fetching data
    }
  }, []);

  useEffect(() => {
      if(!user) fetchData();
  }, []);

  // Render the Outlet or Navigate based on auth and isPrivateRoutesLoading states
  // return isPrivateRoutesLoading ? null : localStorage.getItem('token') ? <Outlet /> : <Navigate to='/signin' />;
  return isPrivateRoutesLoading ? <Loading /> : localStorage.getItem('token')? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoutes;
