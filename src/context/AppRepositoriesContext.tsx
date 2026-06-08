import React, { createContext, useContext } from "react";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TechnologyRepository } from "../repositories/TechnologyRepository";

const AppRepositoriesContext = createContext<{
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
} | null>(null);

export const AppRepositoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const projectRepo = new ProjectRepository();
  const techRepo = new TechnologyRepository();

  return (
    <AppRepositoriesContext.Provider value={{ projectRepo, techRepo }}>
      {children}
    </AppRepositoriesContext.Provider>
  );
};

export function useAppRepositories() {
  const ctx = useContext(AppRepositoriesContext);
  if (!ctx) throw new Error("useAppRepositories must be used within AppRepositoriesProvider");
  return ctx;
}