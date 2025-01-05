import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpenState] = useState<boolean>(() => {
    const storedState = localStorage.getItem('sidebarOpen');
    return storedState ? JSON.parse(storedState) : true;
  });

  const setIsOpen = () => {
    setIsOpenState((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarOpen');
    if (storedState) {
      setIsOpenState(JSON.parse(storedState));
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarToggle = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarToggle must be used within a SidebarProvider");
  }
  return context;
};
