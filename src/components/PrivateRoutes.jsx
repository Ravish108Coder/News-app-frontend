import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDrawer } from '../context/DrawerContext';
import Loading from './Loading';

const PrivateRoutes = () => {
  const {isLoggedIn, setIsLoggedIn, isPrivateRoutesLoading, setisPrivateRoutesLoading} = useDrawer();
  const {user, setUser} = useDrawer();

  const fetchData = useCallback(async () => {
    localStorage.removeItem('token');
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
      } 
    } catch (error) {
    } finally {
      setisPrivateRoutesLoading(false); // Set loading state to false after fetching data
    }
  }, []);

  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    // if(localStorage.getItem('token')){
    //   // console.log('condition true')
    //   let currentUser = JSON.parse(localStorage.getItem('user'));
    //   console.log(currentUser);
    //   setUser(currentUser);
    //   setIsLoggedIn(true);
    //   setisPrivateRoutesLoading(false);
    // }else{
      fetchData();
    // }
    // fetchData(); // Call fetchData inside useEffect
  }, []);

  // Render the Outlet or Navigate based on auth and isPrivateRoutesLoading states
  // return isPrivateRoutesLoading ? null : localStorage.getItem('token') ? <Outlet /> : <Navigate to='/signin' />;
  return isPrivateRoutesLoading ? <Loading /> : localStorage.getItem('token')? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoutes;
