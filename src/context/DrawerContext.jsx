import React, { createContext, useContext, useState } from 'react';

// Create a context
const DrawerContext = createContext();

// Create a provider component to wrap your app and provide the drawer state
export const DrawerProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const value = {
        open: open,
        toggleDrawer: () => setOpen(prevOpen => !prevOpen),
    };

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};

// Create a hook to access the drawer state and setOpen function
export const useDrawer = () => useContext(DrawerContext);
