import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ========================= TIPOS =========================

type Lang = 'es' | 'en';

interface Translations {
menu: readonly string[];  aboutTitle: string;
  projectsTitle: string;
  techTitle: string;
  contact: string;
  learnMore: string;
  downloadCV: string;
  dowloadcv2: string;
  copyEmail: string;
  sendEmail: string;
  openProject: string;
  mastered: string;
  learning: string;
  bio: string;
  emailCopied: string;
  copyManual: string;
  developer: string;
  nanana: string;
}

interface TechDetail {
  name: string;
  logo: string;
  description: { es: string; en: string };
  learningSource: { es: string; en: string };
  skills: { es: string[]; en: string[] };
  certificate?: string;
}

// ========================= CLASES DE DOMINIO =========================

/**
 * Clase para manejar las traducciones y el idioma
 */
class TranslationManager {
  private static instance: TranslationManager;
  private currentLang: Lang = 'es';
  
  private translations = {
    es: {
      menu: ["Quién soy", "Proyectos", "Tecnologías", "Contacto", "Saber más"],
      aboutTitle: "Quién soy",
      projectsTitle: "Proyectos",
      techTitle: "Tecnologías",
      contact: "Contacto",
      learnMore: "Saber más",
      downloadCV: "Descargar CV",
      dowloadcv2: "Descargá mi CV actualizado para conocer más sobre mi experiencia.",
      copyEmail: "Copiar email",
      sendEmail: "Enviar email",
      openProject: "Abrir proyecto",
      mastered: "Manejo",
      learning: "Aprendiendo",
      bio: "Soy Isaac José García Márquez, un desarrollador apasionado por la tecnología y la programación. Me especializo en desarrollo web y análisis de datos, siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.",
      emailCopied: "Email copiado",
      copyManual: "Copia manual",
      developer: "Desarrollador Web Fullstack",
      nanana: "¡Ver mis Proyectos!",
    },
    en: {
      menu: ["About me", "Projects", "Technologies", "Contact", "Learn more"],
      aboutTitle: "About me",
      projectsTitle: "Projects",
      techTitle: "Technologies",
      contact: "Contact",
      learnMore: "Learn more",
      downloadCV: "Download CV",
      dowloadcv2: "Download my updated CV to learn more about my experience.",
      copyEmail: "Copy email",
      sendEmail: "Send email",
      openProject: "Open project",
      mastered: "Mastered",
      learning: "Learning",
      bio: "I'm Isaac José García Márquez, a developer passionate about technology and programming. I specialize in web development and data analysis, always looking to learn new technologies and improve my skills.",
      emailCopied: "Email copied",
      copyManual: "Copy manually",
      developer: "Fullstack Web Developer",
      nanana: "¡Check out my Projects!",
    },
  } as const;

  static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager();
    }
    return TranslationManager.instance;
  }

  getCurrentLang(): Lang {
    return this.currentLang;
  }

  toggleLanguage(): Lang {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    return this.currentLang;
  }

  getTranslations(): Translations {
    return this.translations[this.currentLang];
  }
}

/**
 * Clase para manejar un proyecto individual
 */
class Project {
  constructor(
    public readonly name: string,
    public readonly url: string,
    public readonly description: { es: string; en: string },
    public readonly longDescription: { es: string; en: string },
    public readonly tech: string,
    public readonly mainImage: string = "/screenshots/default.png",
    public readonly images: string[] = [],
    public readonly features: { es: string[]; en: string[] } = { es: [], en: [] },
    public readonly challenges: { es: string[]; en: string[] } = { es: [], en: [] },
    public readonly category: string = "Frontend",
    public readonly gradient: string = "from-blue-600 to-teal-600"
  ) {}

  getDescription(lang: Lang): string {
    return this.description[lang];
  }

  getLongDescription(lang: Lang): string {
    return this.longDescription[lang];
  }

  getFeatures(lang: Lang): string[] {
    return this.features[lang];
  }

  getChallenges(lang: Lang): string[] {
    return this.challenges[lang];
  }

  getTechStack(): string[] {
    return this.tech.split(' • ');
  }
}

/**
 * Repositorio de proyectos
 */
class ProjectRepository {
  private projects: Project[] = [];

  constructor() {
    this.initializeProjects();
  }

  private initializeProjects(): void {
    const humanoiaProject = new Project(
      "HumanoIA",
      "https://humanoia.neocities.org",
      {
        es: "Juego para adivinar cuál cara es real y cuál fue generada por IA.",
        en: "Game to guess which face is real and which one is AI-generated."
      },
      {
        es: "HumanoIA es un proyecto interactivo que desafía la percepción humana en la era de la inteligencia artificial. Los usuarios se enfrentan a pares de imágenes faciales donde deben identificar cuál es una fotografía real y cuál ha sido generada por algoritmos de IA.",
        en: "HumanoIA is an interactive project that challenges human perception in the age of artificial intelligence. Users face pairs of facial images where they must identify which is a real photograph and which has been generated by AI algorithms."
      },
      "HTML • CSS • JavaScript",
      "/screenshots/humanoia-preview.png",
      ["/screenshots/humanoia-1.png", "/screenshots/humanoia-2.png", "/screenshots/humanoia-3.png"],
      {
        es: ["Interfaz intuitiva y responsive", "Sistema de puntuación en tiempo real", "Diferentes niveles de dificultad"],
        en: ["Intuitive and responsive interface", "Real-time scoring system", "Different difficulty levels"]
      },
      {
        es: ["Optimización de imágenes para carga rápida", "Creación de algoritmo de selección balanceado"],
        en: ["Image optimization for fast loading", "Creation of balanced selection algorithm"]
      },
      "Frontend",
      "from-purple-500 to-pink-500"
    );

    this.projects.push(humanoiaProject);
  }

  getAllProjects(): Project[] {
    return [...this.projects];
  }

  getProjectByName(name: string): Project | undefined {
    return this.projects.find(project => project.name === name);
  }
}

/**
 * Clase para manejar una tecnología
 */
class Technology {
  constructor(
    public readonly name: string,
    public readonly logo: string,
    public readonly status: 'mastered' | 'learning',
    public readonly hasDetail: boolean = false,
    public readonly detail?: TechDetail
  ) {}

  isDetailed(): boolean {
    return this.hasDetail && !!this.detail;
  }

  getDetail(): TechDetail | undefined {
    return this.detail;
  }
}

/**
 * Repositorio de tecnologías
 */
class TechnologyRepository {
  private technologies: Technology[] = [];

  constructor() {
    this.initializeTechnologies();
  }

  private initializeTechnologies(): void {
    const pythonDetail: TechDetail = {
      name: "Python",
      logo: "/logos/python.png",
      description: {
        es: "Aprendí Python a través de un curso completo de la ciudad, donde me enfoqué en análisis de datos y visualización.",
        en: "I learned Python through a comprehensive city course, where I focused on data analysis and visualization."
      },
      learningSource: { es: "Curso de la Ciudad", en: "City Course" },
      skills: {
        es: ["Análisis de datos", "Creación de gráficos", "Pandas", "Matplotlib"],
        en: ["Data analysis", "Graph creation", "Pandas", "Matplotlib"]
      },
      certificate: "/certificado.png",
    };

    const masteredTechs = [
      new Technology("Python", "/logos/python.png", "mastered", true, pythonDetail),
      new Technology("HTML", "/logos/html5.png", "mastered"),
      new Technology("CSS", "/logos/css3.png", "mastered"),
      new Technology("JavaScript", "/logos/javascript.png", "mastered"),
      new Technology("git", "/logos/git.png", "mastered"),
    ];

    const learningTechs = [
      new Technology("Tailwind CSS", "/logos/tailwindcss.png", "learning"),
      new Technology("React", "/logos/react.png", "learning"),
      new Technology("TypeScript", "/logos/typescript.png", "learning"),
      new Technology("Node.js", "/logos/nodejs.png", "learning"),
    ];

    this.technologies = [...masteredTechs, ...learningTechs];
  }

  getMasteredTechnologies(): Technology[] {
    return this.technologies.filter(tech => tech.status === 'mastered');
  }

  getLearningTechnologies(): Technology[] {
    return this.technologies.filter(tech => tech.status === 'learning');
  }

  getTechnologyByName(name: string): Technology | undefined {
    return this.technologies.find(tech => tech.name === name);
  }
}

/**
 * Configuración de la aplicación
 */
class AppConfig {
  static readonly EMAIL = "isaacjosegarciamarquez@gmail.com";
  static readonly CV_PATH = "/Curriculum_Vitae_Isaac_Jose_Garcia_Marquez.pdf";
  static readonly MENU_KEYS = ["about", "projects", "tech", "contact", "learn"] as const;
  static readonly GITHUB_URL = "https://github.com/isaacxidd";
  static readonly LINKEDIN_URL = "https://www.linkedin.com/in/isaacjosegarcia";

    static openEmail(): void {
    window.open(`mailto:${AppConfig.EMAIL}`, "_blank");
  }

  static openGitHub(): void {
    window.open(AppConfig.GITHUB_URL, "_blank");
  }

  static openLinkedIn(): void {
    window.open(AppConfig.LINKEDIN_URL, "_blank");
  }
}

/**
 * Gestor de navegación
 */
class NavigationManager {
  private activeIndex: number = 0;
  private readonly maxIndex: number;

  constructor(maxIndex: number = AppConfig.MENU_KEYS.length) {
    this.maxIndex = maxIndex;
  }

  getCurrentIndex(): number {
    return this.activeIndex;
  }

  setIndex(index: number): number {
    if (index >= 0 && index < this.maxIndex) {
      this.activeIndex = index;
    }
    return this.activeIndex;
  }

  next(): number {
    this.activeIndex = (this.activeIndex + 1) % this.maxIndex;
    return this.activeIndex;
  }

  previous(): number {
    this.activeIndex = (this.activeIndex - 1 + this.maxIndex) % this.maxIndex;
    return this.activeIndex;
  }

  handleKeyboardNavigation(key: string): boolean {
    switch (key) {
      case "ArrowDown":
      case "ArrowRight":
        this.next();
        return true;
      case "ArrowUp":
      case "ArrowLeft":
        this.previous();
        return true;
      default:
        return false;
    }
  }
}

// ========================= HOOKS =========================

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(mediaQuery.matches);
    
    updatePreference();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }
  }, []);
  
  return reduced;
}

function useNavigation() {
  const [navigationManager] = useState(() => new NavigationManager());
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback((newIndex: number) => {
    const updatedIndex = navigationManager.setIndex(newIndex);
    setActiveIndex(updatedIndex);
  }, [navigationManager]);

  const handleNext = useCallback(() => {
    const newIndex = navigationManager.next();
    setActiveIndex(newIndex);
  }, [navigationManager]);

  const handlePrevious = useCallback(() => {
    const newIndex = navigationManager.previous();
    setActiveIndex(newIndex);
  }, [navigationManager]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (navigationManager.handleKeyboardNavigation(e.key)) {
        e.preventDefault();
        setActiveIndex(navigationManager.getCurrentIndex());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigationManager]);

  useEffect(() => {
    let touchStartX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null) return;
      
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const threshold = 60;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
      
      touchStartX = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNext, handlePrevious]);

  return {
    activeIndex,
    setActive: updateActive,
    next: handleNext,
    previous: handlePrevious
  };
}

function useTranslations() {
  const [translationManager] = useState(() => TranslationManager.getInstance());
  const [currentLang, setCurrentLang] = useState<Lang>('es');

  const toggleLanguage = useCallback(() => {
    const newLang = translationManager.toggleLanguage();
    setCurrentLang(newLang);
  }, [translationManager]);

  const translations = useMemo(() => {
    return translationManager.getTranslations();
  }, [translationManager, currentLang]);

  return {
    lang: currentLang,
    translations,
    toggleLanguage
  };
}

function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 1600);
    return () => clearTimeout(id);
  }, [message]);

  const toast = useCallback((msg: string) => setMessage(msg), []);

  const ToastNode = useCallback(() =>
    message ? (
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#071028",
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
          zIndex: 9999,
          fontFamily: "Inter, system-ui",
          fontSize: 12,
          color: "white",
        }}
      >
        {message}
      </div>
    ) : null, [message]);

  return { toast, ToastNode };
}

// ========================= COMPONENTES =========================

const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-gray-900 border border-blue-500/30 rounded max-w-4xl max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
          >
            {children}
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">{children}</h2>
);

type TechPillProps = {
  name: string;
  logo: string;
  variant?: "ok" | "learn";
  hasDetail?: boolean;
  onClick?: () => void;
};

const TechPill: React.FC<TechPillProps> = React.memo(({ name, logo, variant = "ok", hasDetail = false, onClick }) => {
  const base = "flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer min-w-[120px] min-h-[120px] justify-center";
  const variantClasses =
    variant === "ok"
      ? "bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/25"
      : "bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25";
  
  return (
    <div className={`${base} ${variantClasses} ${hasDetail ? "hover:brightness-110" : ""}`} onClick={onClick}>
      <img src={logo} alt={name} className="w-12 h-12 object-contain" />
      <span className="text-sm font-medium text-center">{name}</span>
      {hasDetail && <span className="text-xs opacity-60">ℹ️ Info</span>}
    </div>
  );
});

// ========================= SECCIONES =========================

const AboutSection: React.FC<{ 
  translations: Translations; 
  onSetActive: (i: number) => void;
}> = ({ translations, onSetActive }) => {
  return (
    <div>
      <SectionTitle>{translations.aboutTitle}</SectionTitle>
      <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="md:w-2/3">
            <div className="text-xl font-semibold mb-3 text-blue-300">Isaac José García Márquez</div>
            <div 
              className="text-xs font-bold mb-3 font-mono text-cyan-400"
              style={{
                textShadow: '0 0 5px #22d3ee, 0 0 10px #22d3ee',
              }}
            >
              {translations.developer}
            </div>
            <p className="mb-4 text-[14px] leading-6 text-gray-300">{translations.bio}</p>
            
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-all duration-300">
                <span 
                  className="text-sm font-semibold text-yellow-400 cursor-pointer"
                  onClick={() => onSetActive(1)} 
                >
                  {translations.nanana}
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <img src="/avatar.jpg" alt="avatar" className="w-full rounded-xl object-cover border border-blue-500/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC<{ 
  translations: Translations; 
  lang: Lang; 
  projectRepo: ProjectRepository;
}> = ({ translations, lang, projectRepo }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const project = projects[0]; // Por ahora solo mostramos el primer proyecto

  return (
    <div>
      <SectionTitle>{translations.projectsTitle}</SectionTitle>
      
      <div className="relative group cursor-pointer">
        <div className={`relative bg-gradient-to-br ${project.gradient} rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
              {project.category}
            </span>
          </div>

          <div className="absolute top-6 left-6 z-20">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🎮</span>
            </div>
          </div>

          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.mainImage} 
              alt={`Preview de ${project.name}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {project.getDescription(lang)}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.getTechStack().map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => openProjectDetails(project)} 
                className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm py-3 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium"
              >
                {lang === "es" ? "Ver más" : "View more"}
              </button>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 bg-white text-teal-700 text-sm py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-center font-medium"
              >
                {translations.openProject}
              </a>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      <Modal open={Boolean(selectedProject)} onClose={closeProjectDetails}>
        {selectedProject && (
          <>
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProject.name}</h2>
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

              {selectedProject.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Capturas de pantalla" : "Screenshots"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProject.images.map((image, index) => (
                      <div key={index} className="border border-gray-600 overflow-hidden rounded">
                        <img src={image} alt={`${selectedProject.name} screenshot ${index + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
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
                <a href={selectedProject.url} target="_blank" rel="noreferrer" className="inline-block px-6 py-3 border border-blue-500/50 rounded bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  {lang === "es" ? "🚀 Visitar proyecto" : "🚀 Visit project"}
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

const TechnologiesSection: React.FC<{ 
  translations: Translations; 
  lang: Lang; 
  techRepo: TechnologyRepository;
}> = ({ translations, lang, techRepo }) => {
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);
  
  const masteredTechs = techRepo.getMasteredTechnologies();
  const learningTechs = techRepo.getLearningTechnologies();

  const openTechDetails = useCallback((techName: string) => {
    const tech = techRepo.getTechnologyByName(techName);
    if (tech?.isDetailed()) {
      setSelectedTech(tech.getDetail()!);
    }
  }, [techRepo]);

  const closeTechDetails = useCallback(() => setSelectedTech(null), []);

  return (
    <div>
      <SectionTitle>{translations.techTitle}</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <div className="mb-6 text-lg font-semibold text-blue-300 text-center">{translations.mastered}</div>
          <div className="flex flex-wrap gap-4 justify-center">
            {masteredTechs.map((tech) => (
              <TechPill 
                key={tech.name} 
                name={tech.name} 
                logo={tech.logo} 
                variant="ok" 
                hasDetail={tech.hasDetail} 
                onClick={() => tech.hasDetail && openTechDetails(tech.name)} 
              />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-6 text-lg font-semibold text-orange-300 text-center">{translations.learning}</div>
          <div className="flex flex-wrap gap-4 justify-center">
            {learningTechs.map((tech) => (
              <TechPill 
                key={tech.name} 
                name={tech.name} 
                logo={tech.logo} 
                variant="learn" 
                hasDetail={tech.hasDetail} 
                onClick={() => tech.hasDetail && openTechDetails(tech.name)} 
              />
            ))}
          </div>
        </div>
      </div>

      <Modal open={Boolean(selectedTech)} onClose={closeTechDetails}>
        {selectedTech && (
          <>
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={selectedTech.logo} alt={selectedTech.name} className="w-8 h-8 object-contain" />
                <h2 className="text-xl font-bold">{selectedTech.name}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Mi experiencia" : "My experience"}</h3>
                <p className="text-gray-300 leading-relaxed">{selectedTech.description[lang]}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Dónde aprendí" : "Where I learned"}</h3>
                <div className="text-sm bg-blue-900 bg-opacity-30 px-3 py-2 rounded border border-blue-600 inline-block text-blue-200">
                  🎓 {selectedTech.learningSource[lang]}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Habilidades desarrolladas" : "Skills developed"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedTech.skills[lang].map((skill, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {selectedTech.certificate && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{lang === "es" ? "Certificado" : "Certificate"}</h3>
                  <div className="border border-gray-600 overflow-hidden rounded bg-white p-4 max-w-lg mx-auto">
                    <img src={selectedTech.certificate} alt={`Certificado de ${selectedTech.name}`} className="w-full h-auto object-contain" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

const ContactSection: React.FC<{ 
  translations: Translations; 
  onCopyEmail: () => void;
}> = ({ translations, onCopyEmail }) => {
  return (
    <div>
      <SectionTitle>{translations.contact}</SectionTitle>
      <div className="p-6 border border-blue-500/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-4 max-w-2xl mx-auto">
        <div className="mb-3 text-center">
          <div className="text-center">
            <h3>¿Querés colaborar o tenés alguna duda? Estoy a un mensaje de distancia.</h3>
          </div>
          Email: <strong className="text-blue-300">{AppConfig.EMAIL}</strong>
        </div>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={AppConfig.openEmail} 
            className="px-4 py-2 text-sm border border-blue-500/50 rounded bg-blue-600/20 hover:bg-blue-600/40 transition-colors"
          >
            {translations.sendEmail}
          </button>
          <button 
            onClick={onCopyEmail} 
            className="px-4 py-2 text-sm border border-gray-500/50 rounded hover:bg-gray-600/20 transition-colors"
          >
            {translations.copyEmail}
          </button>
        </div>
        
        <div className="pt-4 border-t border-gray-700 text-center">
          <button
            onClick={AppConfig.openLinkedIn}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm border border-blue-500/50 rounded bg-blue-600/20 hover:bg-blue-600/40 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.13 20.45H3.55V9h3.58v11.45z" />
            </svg>
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

const LearnMoreSection: React.FC<{ translations: Translations }> = ({ translations }) => {
  return (
    <div>
      <SectionTitle>{translations.learnMore}</SectionTitle>
      <div className="p-6 border border-blue-500/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-4 max-w-2xl mx-auto">
        <p className="text-sm mb-4 text-center text-gray-300">{translations.dowloadcv2}</p>
        <div className="text-center">
          <a 
            href={AppConfig.CV_PATH} 
            download 
            className="inline-block px-6 py-3 text-sm border border-blue-500/50 rounded bg-blue-600/20 hover:bg-blue-600/40 transition-colors mb-4"
          >
            {translations.downloadCV}
          </a>
        </div>

        <div className="pt-4 border-t border-gray-700 text-center">
          <button
            onClick={AppConfig.openGitHub}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm border border-gray-500/50 rounded bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<{
  translations: Translations;
  lang: Lang;
  activeIndex: number;
  onMenuClick: (index: number) => void;
  onLanguageToggle: () => void;
  onCopyEmail: () => void;
}> = ({ translations, lang, activeIndex, onMenuClick, onLanguageToggle, onCopyEmail }) => (
  <aside className="w-72 p-4 border-r border-blue-500/30 hidden md:flex flex-col gap-6 bg-black/20 backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="text-sm text-blue-400 font-mono leading-4 overflow-hidden whitespace-nowrap">
        Isaac Garcia
      </div>
      <button
        aria-label="toggle-language"
        className="ml-auto px-2 py-1 border border-blue-500/50 rounded text-xs hover:bg-blue-500/20 transition-colors"
        onClick={onLanguageToggle}
      >
        {lang === "es" ? "EN" : "ES"}
      </button>
    </div>

    <nav aria-label="main menu" className="flex-1">
      {translations.menu.map((label, i) => (
        <button
          key={label}
          onClick={() => onMenuClick(i)}
          className={`w-full text-left p-3 my-2 rounded transition-all ${
            i === activeIndex 
              ? "bg-blue-500/20 text-blue-300 border-l-4 border-blue-400" 
              : "hover:bg-blue-500/10 hover:text-blue-200"
          }`}
        >
          <div className="text-[11px] opacity-80">
            {i + 1}. {label}
          </div>
        </button>
      ))}
    </nav>

    <div className="flex flex-col gap-2">
      <a 
        href={AppConfig.CV_PATH} 
        download 
        className="px-3 py-2 text-xs border border-blue-500/50 rounded text-center hover:bg-blue-500/20 transition-colors"
      >
        {translations.downloadCV}
      </a>
      <button 
        onClick={onCopyEmail} 
        className="px-3 py-2 text-xs border border-gray-500/50 rounded hover:bg-gray-500/20 transition-colors"
      >
        {translations.copyEmail}
      </button>
    </div>
  </aside>
);

const ContentRenderer: React.FC<{
  activeIndex: number;
  translations: Translations;
  lang: Lang;
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
  onSetActive: (index: number) => void;
  onCopyEmail: () => void;
}> = ({ activeIndex, translations, lang, projectRepo, techRepo, onSetActive, onCopyEmail }) => {
  switch (activeIndex) {
    case 0: 
      return <AboutSection translations={translations} onSetActive={onSetActive} />;
    case 1: 
      return <ProjectsSection translations={translations} lang={lang} projectRepo={projectRepo} />;
    case 2: 
      return <TechnologiesSection translations={translations} lang={lang} techRepo={techRepo} />;
    case 3: 
      return <ContactSection translations={translations} onCopyEmail={onCopyEmail} />;
    case 4: 
      return <LearnMoreSection translations={translations} />;
    default: 
      return <AboutSection translations={translations} onSetActive={onSetActive} />;
  }
};

const Footer: React.FC = () => (
  <footer className="mt-auto p-4 border-t border-blue-500/30 bg-black/20 backdrop-blur-sm">
    <div className="text-center text-xs opacity-60">
      © 2024 Isaac José García Márquez - Todos los derechos reservados
    </div>
  </footer>
);

// ========================= COMPONENTE PRINCIPAL =========================

export default function OptimizedPortfolio(): JSX.Element {
  const { activeIndex, setActive } = useNavigation();
  const { lang, translations, toggleLanguage } = useTranslations();
  const reducedMotion = usePrefersReducedMotion();
  const { toast, ToastNode } = useToast();
  
  // Repositorios
  const [projectRepo] = useState(() => new ProjectRepository());
  const [techRepo] = useState(() => new TechnologyRepository());

  // Variantes de animación
  const variants = useMemo(() => {
    if (reducedMotion) {
      return {
        initial: { opacity: 1 },
        enter: { opacity: 1 },
        exit: { opacity: 1 }
      };
    }

    return {
      initial: { opacity: 0, x: 60 },
      enter: { 
        opacity: 1, 
        x: 0, 
        transition: { type: "spring", stiffness: 260, damping: 30 }
      },
      exit: { 
        opacity: 0, 
        x: -60, 
        transition: { duration: 0.25 }
      }
    };
  }, [reducedMotion]);

  // Funciones de utilidad
  const copyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(AppConfig.EMAIL);
        toast(translations.emailCopied);
      } else {
        toast(translations.copyManual);
      }
    } catch {
      toast(translations.copyManual);
    }
  }, [translations, toast]);

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Sidebar */}
      <Sidebar 
        translations={translations}
        lang={lang}
        activeIndex={activeIndex}
        onMenuClick={setActive}
        onLanguageToggle={toggleLanguage}
        onCopyEmail={copyEmail}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.section 
              key={`${activeIndex}-${lang}`} 
              initial="initial" 
              animate="enter" 
              exit="exit" 
              variants={variants} 
              className="max-w-5xl mx-auto" 
              role="main"
            >
              <ContentRenderer
                activeIndex={activeIndex}
                translations={translations}
                lang={lang}
                projectRepo={projectRepo}
                techRepo={techRepo}
                onSetActive={setActive}
                onCopyEmail={copyEmail}
              />
            </motion.section>
          </AnimatePresence>
        </div>
        <Footer />
      </main>

      {/* Toast */}
      <ToastNode />
    </div>
  );
}