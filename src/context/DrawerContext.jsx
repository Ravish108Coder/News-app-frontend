import React, { createContext, useContext, useState } from 'react';

// Create a context
const DrawerContext = createContext();

// Create a provider component to wrap your app and provide the drawer state
export const DrawerProvider = ({ children }) => {
    const [isPrivateRoutesLoading, setisPrivateRoutesLoading] = useState(false); // Added loading state
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState(null)
    const value = {
        open: open,
        toggleDrawer: () => setOpen(prevOpen => !prevOpen),
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        user: user,
        setUser: setUser,
        isPrivateRoutesLoading: isPrivateRoutesLoading, 
        setisPrivateRoutesLoading: setisPrivateRoutesLoading
    };

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};

// Create a hook to access the drawer state and setOpen function
export const useDrawer = () => useContext(DrawerContext);
