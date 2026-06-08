import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { Lang, Translations } from "../types";
import Project from "../models/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";
import SectionTitle from "../components/SectionTitle";
import RotatingImage from "../components/RotatingImage";
import ImageGallery from "../components/ImageGallery";
import Modal from "../components/Modal";
import { fadeUp, staggerGrid } from "../lib/animations";

const ProjectsSection = React.memo(({ translations, lang, projectRepo }: {
  translations: Translations;
  lang: Lang;
  projectRepo: ProjectRepository;
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = projectRepo.getAllProjects();

  const openProjectDetails = useCallback((proj: Project) => setSelectedProject(proj), []);
  const closeProjectDetails = useCallback(() => setSelectedProject(null), []);

  if (projects.length === 0) {
    return (
      <div>
        <SectionTitle>{translations.projectsTitle}</SectionTitle>
        <div className="text-center text-gray-400">No hay proyectos disponibles</div>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>{translations.projectsTitle}</SectionTitle>

      <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" animate="visible" variants={staggerGrid}>
        {projects.map((project, index) => (
          <motion.div key={index} variants={fadeUp} className="relative group cursor-pointer h-full" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className={`relative bg-gradient-to-br ${project.gradient} rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col`}>

              <div className="absolute top-4 right-4 z-20">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                  {project.category}
                </span>
              </div>

              <div className="absolute top-6 left-6 z-20">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">{project.icon}</span>
                </div>
              </div>

              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <RotatingImage project={project} alt={`Preview de ${project.getName(lang)}`} paused={hoveredIndex === index} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.getName(lang)}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {project.getDescription(lang)}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.getTechStack().map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => openProjectDetails(project)}
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm py-3 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    {lang === "es" ? "Ver más" : "View more"}
                  </button>
                  <div className="flex flex-col gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 text-center font-medium flex items-center justify-center gap-1.5 ${
                        project.url.includes("github.com")
                          ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                          : "bg-white text-teal-700 hover:bg-gray-100"
                      }`}
                    >
                      {project.url.includes("github.com") && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
                        </svg>
                      )}
                      {project.url.includes("github.com") ? "GitHub" : translations.openProject}
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 text-center font-medium flex items-center justify-center gap-1.5"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal open={Boolean(selectedProject)} onClose={closeProjectDetails}>
        {selectedProject && (
          <>
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProject.getName(lang)}</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Descripción" : "Description"}</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProject.getLongDescription(lang)}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Tecnologías" : "Technologies"}</h3>
                <div className="text-sm bg-gray-800 px-3 py-2 rounded border border-gray-600 inline-block">{selectedProject.tech}</div>
              </div>

              {selectedProject.galleryImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Capturas de pantalla" : "Screenshots"}</h3>
                  <ImageGallery images={selectedProject.galleryImages} projectName={selectedProject.getName(lang)} />
                </div>
              )}

              {selectedProject.getFeatures(lang).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Características principales" : "Key Features"}</h3>
                  <ul className="space-y-2">
                    {selectedProject.getFeatures(lang).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.getChallenges(lang).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Desafíos técnicos" : "Technical Challenges"}</h3>
                  <ul className="space-y-2">
                    {selectedProject.getChallenges(lang).map((challenge, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <span className="text-orange-400 mr-2 mt-1">⚡</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-gray-700 text-center">
                <a href={selectedProject.url} target="_blank" rel="noreferrer" className="inline-block px-6 py-3 border border-cyberaccent/50 rounded text-cyberaccent hover:bg-cyberaccent/10 transition-all transform hover:scale-105">
                  {lang === "es" ? "Visitar proyecto" : "Visit project"}
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
});

export default ProjectsSection;
