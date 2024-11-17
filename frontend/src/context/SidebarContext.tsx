import React, { createContext, useState, useContext } from "react";

interface SidebarContextProps {
  expandedProjects: { [key: number]: boolean };
  toggleProject: (projectId: number) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expandedProjects, setExpandedProjects] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleProject = (projectId: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <SidebarContext.Provider value={{ expandedProjects, toggleProject }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
