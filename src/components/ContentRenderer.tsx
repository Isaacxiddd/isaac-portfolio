import { Lang, Theme, Translations } from "../types";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import AboutSection from "../sections/AboutSection";
import ProjectsSection from "../sections/ProjectsSection";
import TechnologiesSection from "../sections/TechnologiesSection";
import ContactSection from "../sections/ContactSection";
import LearnMoreSection from "../sections/LearnMoreSection";

const ContentRenderer: React.FC<{
  activeIndex: number;
  translations: Translations;
  lang: Lang;
  theme: Theme;
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
  onSetActive: (index: number) => void;
  onCopyEmail: () => void;
}> = ({ activeIndex, translations, lang, theme, projectRepo, techRepo, onSetActive, onCopyEmail }) => {
  switch (activeIndex) {
    case 0:
      return <AboutSection translations={translations} lang={lang} theme={theme} onSetActive={onSetActive} />;
    case 1:
      return <ProjectsSection translations={translations} lang={lang} projectRepo={projectRepo} />;
    case 2:
      return <TechnologiesSection translations={translations} lang={lang} techRepo={techRepo} />;
    case 3:
      return <ContactSection translations={translations} lang={lang} onCopyEmail={onCopyEmail} />;
    case 4:
      return <LearnMoreSection translations={translations} lang={lang} />;
    default:
      return <AboutSection translations={translations} lang={lang} theme={theme} onSetActive={onSetActive} />;
  }
};

export default ContentRenderer;
