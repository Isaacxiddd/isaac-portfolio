import { lazy, Suspense } from "react";
import { Lang, Theme, Translations } from "../types";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TechnologyRepository } from "../repositories/TechnologyRepository";

const AboutSection = lazy(() => import("../sections/AboutSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const TechnologiesSection = lazy(() => import("../sections/TechnologiesSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));
const LearnMoreSection = lazy(() => import("../sections/LearnMoreSection"));

const fallback = (
  <div className="flex items-center justify-center py-24">
    <div className="w-6 h-6 border-2 border-cyberaccent/30 border-t-cyberaccent rounded-full animate-spin" />
  </div>
);

const ContentRenderer: React.FC<{
  activeIndex: number;
  translations: Translations;
  lang: Lang;
  theme: Theme;
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
  onSetActive: (index: number) => void;
}> = ({ activeIndex, translations, lang, theme, projectRepo, techRepo, onSetActive }) => {
  const section = () => {
    switch (activeIndex) {
      case 0:
        return <AboutSection translations={translations} lang={lang} theme={theme} onSetActive={onSetActive} />;
      case 1:
        return <ProjectsSection translations={translations} lang={lang} projectRepo={projectRepo} />;
      case 2:
        return <TechnologiesSection translations={translations} lang={lang} techRepo={techRepo} />;
      case 3:
        return <ContactSection translations={translations} lang={lang} />;
      case 4:
        return <LearnMoreSection translations={translations} lang={lang} />;
      default:
        return <AboutSection translations={translations} lang={lang} theme={theme} onSetActive={onSetActive} />;
    }
  };
  return <Suspense fallback={fallback}>{section()}</Suspense>;
};

export default ContentRenderer;
