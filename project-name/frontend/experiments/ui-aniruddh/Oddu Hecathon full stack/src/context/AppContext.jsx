import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AppContext.Provider value={{ sidebarOpen, toggleSidebar, pageTitle, setPageTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
