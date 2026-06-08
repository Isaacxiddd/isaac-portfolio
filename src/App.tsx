import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import images directly for reliable bundling
import humanoiaPreview from "./assets/screenshots/humanoia-preview.webp";
import humanoia1 from "./assets/screenshots/humanoia-1.webp";
import humanoia2 from "./assets/screenshots/humanoia-2.webp";
import humanoia3 from "./assets/screenshots/humanoia-3.webp";
import formulafacil1 from "./assets/screenshots/formulafacil.webp";
import formulafacilUtn from "./assets/screenshots/formulafacil-utn.webp";
import formulafacilClassic from "./assets/screenshots/formulafacil-classic.webp";
import formulafacilPractice from "./assets/screenshots/formulafacil-practice.webp";
import certificadoImg from "./assets/screenshots/certificado.webp";
import reservationWorkflow from "./assets/screenshots/reservation-workflow.webp";
import reservationBitrix from "./assets/screenshots/reservation-bitrix.webp";
import reservationIntermedia from "./assets/screenshots/reservation-intermedia.webp";

// ========================= TIPOS =========================

type Lang = 'es' | 'en';
type Theme = 'dark' | 'ps3';

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
  tools: string;
  bio: string;
  emailCopied: string;
  copyManual: string;
  developer: string;
  nanana: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  formPlaceholderName: string;
  formPlaceholderEmail: string;
  formPlaceholderMessage: string;
}

interface TechDetail {
  name: string;
  logo: string;
  description: { es: string; en: string };
  learningSource: { es: string; en: string };
  skills: { es: string[]; en: string[] };
  certificate?: string;
  challenge?: { es: string; en: string };
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
      openProject: "Abrir",
      mastered: "Manejo",
      learning: "Aprendiendo",
      tools: "Herramientas",
      bio: "Soy Isaac José García Márquez, un desarrollador apasionado por la tecnología y la programación. Me especializo en desarrollo web y análisis de datos, siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.",
      emailCopied: "Email copiado",
      copyManual: "Copia manual",
      developer: "Desarrollador Backend y Automatización de Sistemas",
      nanana: "¡Ver mis Proyectos!",
      formName: "Nombre",
      formEmail: "Email",
      formMessage: "Mensaje",
      formSend: "Enviar mensaje",
      formSending: "Enviando...",
      formSuccess: "¡Mensaje enviado! Te respondo pronto.",
      formError: "Error al enviar. Intentá de nuevo.",
      formPlaceholderName: "Tu nombre",
      formPlaceholderEmail: "tu@email.com",
      formPlaceholderMessage: "Contame en qué puedo ayudarte...",
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
      openProject: "Open",
      mastered: "Mastered",
      learning: "Learning",
      tools: "Tools",
      bio: "I'm Isaac José García Márquez, a developer passionate about technology and programming. I specialize in web development and data analysis, always looking to learn new technologies and improve my skills.",
      emailCopied: "Email copied",
      copyManual: "Copy manually",
      developer: "Backend Developer & Systems Automation",
      nanana: "¡Check out my Projects!",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSend: "Send message",
      formSending: "Sending...",
      formSuccess: "Message sent! I'll get back to you soon.",
      formError: "Error sending. Please try again.",
      formPlaceholderName: "Your name",
      formPlaceholderEmail: "you@email.com",
      formPlaceholderMessage: "Tell me how I can help you...",
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
    public readonly gradient: string = "from-blue-600 to-teal-600",
    public readonly icon: string = "🎮",
    public readonly githubUrl?: string
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
export class ProjectRepository {
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
      humanoiaPreview,
      [humanoia1, humanoia2, humanoia3],
      {
        es: ["Interfaz intuitiva y responsive", "Sistema de puntuación en tiempo real", "Diferentes niveles de dificultad"],
        en: ["Intuitive and responsive interface", "Real-time scoring system", "Different difficulty levels"]
      },
      {
        es: ["Optimización de imágenes para carga rápida", "Creación de algoritmo de selección balanceado"],
        en: ["Image optimization for fast loading", "Creation of balanced selection algorithm"]
      },
      "Frontend",
      "from-purple-500 to-pink-500",
      "🎮",
      "https://github.com/Isaacxiddd/HumanoIA"
    );

    const formulaFacilProject = new Project(
      "Formula Fácil UTN",
      "https://formulafacilutn.neocities.org",
      {
        es: "Herramienta educativa para estudiantes de la UTN con más de 3.000 usuarios. Memorización de fórmulas matemáticas mediante gamificación y práctica activa.",
        en: "Educational tool for UTN students with over 3,000 users. Mathematical formula memorization through gamification and active practice."
      },
      {
        es: "Herramienta educativa interactiva creada para estudiantes de la UTN que ayuda a memorizar fórmulas matemáticas mediante técnicas de gamificación y práctica activa.\n\nLa plataforma alcanzó más de 3.000 usuarios y fue utilizada por estudiantes para reforzar contenidos de Análisis Matemático y Geometría, combinando aprendizaje visual, ejercicios interactivos y seguimiento del progreso.\n\nDesarrollada íntegramente con HTML, CSS y JavaScript, incorpora renderizado matemático con MathJax, gráficos SVG dinámicos y un sistema de puntuación y rachas en tiempo real para mejorar la retención de conceptos.",
        en: "Interactive educational tool created for UTN students that helps memorize mathematical formulas through gamification techniques and active practice.\n\nThe platform reached over 3,000 users and was used by students to reinforce content from Mathematical Analysis and Geometry, combining visual learning, interactive exercises and progress tracking.\n\nBuilt entirely with HTML, CSS and JavaScript, it incorporates mathematical rendering with MathJax, dynamic SVG graphics and a real-time scoring and streak system to improve concept retention."
      },
      "HTML5 • CSS3 • JavaScript • MathJax • SVG",
      formulafacil1,
      [formulafacilUtn, formulafacilClassic, formulafacilPractice],
      {
        es: [
          "+3.000 usuarios alcanzados en 2026",
          "5 módulos temáticos: Funciones, Inecuaciones, Geometría, Valor Absoluto, Intervalos",
          "Dos modos de juego: Classic y Practice con niveles de dificultad",
          "Sistema de gamificación con puntos, rachas y efectos de sonido",
          "Galería completa de figuras y guía de fórmulas detallada",
          "Diseño responsive optimizado para celular y escritorio"
        ],
        en: [
          "+3,000 users reached in 2026",
          "5 thematic modules: Functions, Inequalities, Geometry, Absolute Value, Intervals",
          "Two game modes: Classic and Practice with difficulty levels",
          "Gamification system with points, streaks and sound effects",
          "Complete figure gallery and detailed formula guide",
          "Responsive design optimized for mobile and desktop"
        ]
      },
      {
        es: [
          "Implementación de renderizado de fórmulas matemáticas con MathJax",
          "Creación de gráficos vectoriales SVG dinámicamente",
          "Optimización del sistema de puntuación y rachas en tiempo real",
          "Diseño de interfaz intuitiva con feedback visual inmediato"
        ],
        en: [
          "Implementation of mathematical formula rendering with MathJax",
          "Dynamic creation of SVG vector graphics",
          "Optimization of real-time scoring and streak system",
          "Design of intuitive interface with immediate visual feedback"
        ]
      },
      "Frontend",
      "from-teal-600 to-blue-600",
      "🎮",
      "https://github.com/Isaacxiddd/FormulafacilUTN"
    );

    const reservationProject = new Project(
      "Automatización de Reservas",
      "https://github.com/Isaacxiddd/Reservation-automation",
      {
        es: "Sistema de automatización que conecta reservas de Airbnb/Booking con el CRM Bitrix24 usando n8n.",
        en: "Automation system that connects Airbnb/Booking reservations with Bitrix24 CRM using n8n."
      },
      {
        es: "Sistema de automatización que procesa correos de confirmación de Airbnb y Booking.com vía IMAP, clasifica el tipo de evento (nueva reserva, cancelación, mensaje, reseña), extrae los datos del huésped y la propiedad, y los registra automáticamente como deals en Bitrix24. Incluye validación anti-duplicados con PostgreSQL/Supabase y lógica de fallback: si no encuentra la propiedad, crea el deal igual y genera una tarea manual para intervención.",
        en: "Automation system that processes Airbnb and Booking.com confirmation emails via IMAP, classifies event types (new booking, cancellation, message, review), extracts guest and property data, and automatically registers them as deals in Bitrix24. Includes anti-duplication validation with PostgreSQL/Supabase and fallback logic: if the property isn't found, it still creates the deal and generates a manual task for intervention."
      },
      "n8n • Bitrix24 API • PostgreSQL • Supabase • JavaScript • IMAP",
      reservationWorkflow,
      [reservationWorkflow, reservationIntermedia, reservationBitrix],
      {
        es: [
          "Lectura de emails de confirmación vía IMAP (Airbnb y Booking)",
          "Clasificación automática del tipo de evento",
          "Extracción de datos: huésped, propiedad, fechas, código de confirmación",
          "Creación automática de deals en Bitrix24 con tareas vinculadas",
          "Validación anti-duplicados con base de datos PostgreSQL/Supabase",
          "Fallback resiliente: crea el deal aunque falle el matching de propiedad"
        ],
        en: [
          "Confirmation email reading via IMAP (Airbnb and Booking)",
          "Automatic classification of event type",
          "Data extraction: guest, property, dates, confirmation code",
          "Automatic deal creation in Bitrix24 with linked tasks",
          "Anti-duplication validation with PostgreSQL/Supabase database",
          "Resilient fallback: creates the deal even if property matching fails"
        ]
      },
      {
        es: [
          "Diseño de lógica de fallback para evitar pérdida de reservas ante fallas de matching",
          "Implementación de índice anti-duplicados persistente en Supabase",
          "Parsing robusto de emails con múltiples formatos de Airbnb y Booking"
        ],
        en: [
          "Fallback logic design to avoid losing reservations on matching failures",
          "Implementation of persistent anti-duplication index in Supabase",
          "Robust email parsing handling multiple formats from Airbnb and Booking"
        ]
      },
      "Automatización",
      "from-orange-500 to-amber-600",
      "⚡"
    );

    this.projects.push(formulaFacilProject, reservationProject, humanoiaProject);
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
    public readonly status: 'mastered' | 'learning' | 'tool',
    public readonly hasDetail: boolean = false,
    public readonly detail?: TechDetail,
    public readonly tooltip?: { es: string; en: string }
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
export class TechnologyRepository {
  private technologies: Technology[] = [];

  constructor() {
    this.initializeTechnologies();
  }

  private initializeTechnologies(): void {
    const pythonDetail: TechDetail = {
      name: "Python",
      logo: "/logos/python.png",
      description: {
        es: "Análisis de datos, visualización y procesamiento de información con Pandas y Matplotlib. Formación orientada a transformar datos crudos en información útil.",
        en: "Data analysis, visualization and information processing with Pandas and Matplotlib. Training focused on transforming raw data into useful insights."
      },
      learningSource: { es: "Curso de la Ciudad", en: "City Course" },
      skills: {
        es: ["Pandas para análisis de datos", "Matplotlib para visualización", "Scripts de procesamiento", "Automatización de tareas"],
        en: ["Pandas for data analysis", "Matplotlib for visualization", "Processing scripts", "Task automation"]
      },
      certificate: certificadoImg,
      challenge: {
        es: "Limpiar y normalizar datasets con formatos inconsistentes: fechas en múltiples formatos, valores nulos y columnas con nombres distintos según la fuente.",
        en: "Cleaning and normalizing datasets with inconsistent formats: dates in multiple formats, null values and columns with different names depending on the source."
      }
    };

    const jsDetail: TechDetail = {
      name: "JavaScript",
      logo: "/logos/javascript.png",
      description: {
        es: "Lógica principal en FormulaFacilUTN (gamificación, renderizado con MathJax), automatización de reservas (parsing de emails, transformación de datos para Bitrix24) y HumanoIA (lógica de juego, timer, selección aleatoria).",
        en: "Core logic in FormulaFacilUTN (gamification, MathJax rendering), reservation automation (email parsing, data transformation for Bitrix24) and HumanoIA (game logic, timer, random selection)."
      },
      learningSource: { es: "Proyectos propios: FormulaFacil, Automatización de Reservas, HumanoIA", en: "Own projects: FormulaFacil, Reservation Automation, HumanoIA" },
      skills: {
        es: ["Async/await y Promesas", "Regex para parsing de emails", "Array methods (map, filter, reduce)", "Clases ES6", "Manipulación del DOM"],
        en: ["Async/await and Promises", "Regex for email parsing", "Array methods (map, filter, reduce)", "ES6 classes", "DOM manipulation"]
      },
      challenge: {
        es: "Parsing robusto de emails de Airbnb y Booking: el formato cambia sin aviso. Solución: múltiples patrones regex con fallback secuencial para no perder reservas.",
        en: "Robust email parsing from Airbnb and Booking: format changes without warning. Solution: multiple regex patterns with sequential fallback to avoid losing reservations."
      }
    };

    const gitDetail: TechDetail = {
      name: "git",
      logo: "/logos/git.png",
      description: {
        es: "Control de versiones en todos mis proyectos. Trabajo con ramas para separar features, commits descriptivos y GitHub como repositorio remoto con deploy automático a Vercel.",
        en: "Version control across all my projects. Feature branches, descriptive commits and GitHub as remote with automatic deploy to Vercel."
      },
      learningSource: { es: "Práctica continua en proyectos propios", en: "Continuous practice in own projects" },
      skills: {
        es: ["Branching y merging", "Commits descriptivos", "GitHub como remote", "Integración con Vercel CI/CD", "git stash y rebase básico"],
        en: ["Branching and merging", "Descriptive commits", "GitHub as remote", "Vercel CI/CD integration", "Basic git stash and rebase"]
      }
    };

    const postgresDetail: TechDetail = {
      name: "PostgreSQL",
      logo: "/logos/postgresql.svg",
      description: {
        es: "Índice anti-duplicados para la automatización de reservas (confirmación única por código) y sincronización ClassTracker ↔ Supabase con timestamps para reconciliación de datos offline.",
        en: "Anti-duplication index for reservation automation (unique confirmation code) and ClassTracker ↔ Supabase sync with timestamps for offline data reconciliation."
      },
      learningSource: { es: "Proyectos: Automatización de Reservas + ClassTracker", en: "Projects: Reservation Automation + ClassTracker" },
      skills: {
        es: ["UNIQUE CONSTRAINT para deduplicación", "INSERT ON CONFLICT (upsert)", "Row-Level Security con Supabase", "Timestamps para reconciliación", "Índices para performance"],
        en: ["UNIQUE CONSTRAINT for deduplication", "INSERT ON CONFLICT (upsert)", "Row-Level Security with Supabase", "Timestamps for reconciliation", "Indexes for performance"]
      },
      challenge: {
        es: "Concurrencia en sincronización: si el usuario edita en dos dispositivos sin conexión, ¿cuál gana? Implementé timestamps updatedAt + estrategia last-write-wins con modal de aviso al detectar conflicto.",
        en: "Sync concurrency: if the user edits on two offline devices, which wins? Implemented updatedAt timestamps + last-write-wins strategy with a conflict warning modal."
      }
    };

    const reactDetail: TechDetail = {
      name: "React",
      logo: "/logos/react.png",
      description: {
        es: "Interfaces reactivas en el Portfolio (SPA multiidioma, temas claro/oscuro, canvas animado) y ClassTracker (PWA offline con sincronización a Supabase). También usado en VelocReader para interfaz de lectura multiplataforma.",
        en: "Reactive interfaces in the Portfolio (multilingual SPA, light/dark themes, animated canvas) and ClassTracker (offline PWA with Supabase sync). Also used in VelocReader for a cross-platform reading interface."
      },
      learningSource: { es: "Proyectos propios: Portfolio, ClassTracker, VelocReader", en: "Own projects: Portfolio, ClassTracker, VelocReader" },
      skills: {
        es: ["Hooks (useState, useEffect, useCallback)", "Custom hooks para lógica compartida", "Dexie React Hooks para IndexedDB", "React.memo y optimización de renders", "React 19 con Fast Refresh"],
        en: ["Hooks (useState, useEffect, useCallback)", "Custom hooks for shared logic", "Dexie React Hooks for IndexedDB", "React.memo and render optimization", "React 19 with Fast Refresh"]
      },
      challenge: {
        es: "Canvas de ribbons desacoplado de React: la primera versión con refs causaba re-renders lentos. Solución: requestAnimationFrame completamente independiente del ciclo de vida de React.",
        en: "Decoupling the ribbon canvas from React: the first version with refs caused slow re-renders. Solution: requestAnimationFrame fully independent from the React lifecycle."
      }
    };

    const tsDetail: TechDetail = {
      name: "TypeScript",
      logo: "/logos/typescript.png",
      description: {
        es: "Tipado fuerte en el Portfolio (clases de dominio como Project, Technology, ProjectRepository) y ClassTracker (schema de Dexie con tablas tipadas). Permite refactorizar con confianza.",
        en: "Strong typing in the Portfolio (domain classes like Project, Technology, ProjectRepository) and ClassTracker (typed Dexie schema). Enables refactoring with confidence."
      },
      learningSource: { es: "Proyectos: Portfolio + ClassTracker", en: "Projects: Portfolio + ClassTracker" },
      skills: {
        es: ["Clases TypeScript como modelo de dominio", "Tipos unión y discriminated unions", "Type guards y type narrowing", "Genéricos en componentes React", "Integración seamless con Vite"],
        en: ["TypeScript classes as domain model", "Union types and discriminated unions", "Type guards and type narrowing", "Generics in React components", "Seamless Vite integration"]
      },
      challenge: {
        es: "Tipado de encuestas con campos dinámicos en ClassTracker: los campos son configurables por el usuario. Solución: type guards combinados con validación en runtime para mantener seguridad sin sacrificar flexibilidad.",
        en: "Typing dynamic survey fields in ClassTracker: fields are user-configurable. Solution: type guards combined with runtime validation to keep safety without sacrificing flexibility."
      }
    };

    const tailwindDetail: TechDetail = {
      name: "Tailwind CSS",
      logo: "/logos/tailwindcss.png",
      description: {
        es: "Diseño responsivo en el Portfolio y ClassTracker sin escribir media queries manuales. Sistema de temas claro/oscuro implementado con CSS variables + atributo data-theme en el HTML.",
        en: "Responsive design in the Portfolio and ClassTracker without writing manual media queries. Light/dark theme system implemented with CSS variables + data-theme attribute on HTML."
      },
      learningSource: { es: "Proyectos: Portfolio + ClassTracker", en: "Projects: Portfolio + ClassTracker" },
      skills: {
        es: ["Utility-first CSS (sin BEM ni módulos)", "CSS variables con data-theme para temas", "Responsive modifiers (sm:, md:, lg:)", "@apply para componentes recurrentes", "JIT compiler con safeList para clases dinámicas"],
        en: ["Utility-first CSS (no BEM or modules)", "CSS variables with data-theme for themes", "Responsive modifiers (sm:, md:, lg:)", "@apply for recurring components", "JIT compiler with safeList for dynamic classes"]
      },
      challenge: {
        es: "Clases dinámicas generadas en JavaScript (como 'from-orange-500 to-amber-600') no se incluían en el build porque Tailwind no las detecta en tiempo de compilación. Solución: agregar las clases a safeList en la config.",
        en: "Dynamically generated classes in JavaScript (like 'from-orange-500 to-amber-600') were not included in the build because Tailwind can't detect them at compile time. Solution: add the classes to safeList in the config."
      }
    };

    const nodejsDetail: TechDetail = {
      name: "Node.js",
      logo: "/logos/nodejs.png",
      description: {
        es: "Entorno de ejecución JavaScript del lado del servidor. Actualmente en aprendizaje activo, explorando APIs con Express y herramientas CLI.",
        en: "Server-side JavaScript runtime. Currently in active learning, exploring APIs with Express and CLI tools."
      },
      learningSource: { es: "Aprendizaje activo + documentación oficial", en: "Active learning + official documentation" },
      skills: {
        es: ["CommonJS y ESM", "npm ecosystem", "Scripts CLI", "Bases de Express.js"],
        en: ["CommonJS and ESM", "npm ecosystem", "CLI scripts", "Express.js basics"]
      }
    };

    const masteredTechs = [
      new Technology("Python", "/logos/python.png", "mastered", true, pythonDetail,
        { es: "Análisis de datos, automatización y scripts de procesamiento.", en: "Data analysis, automation and processing scripts." }),
      new Technology("JavaScript", "/logos/javascript.png", "mastered", true, jsDetail,
        { es: "Lógica de apps web, parsing de emails y automatización.", en: "Web app logic, email parsing and automation." }),
      new Technology("git", "/logos/git.png", "mastered", true, gitDetail,
        { es: "Control de versiones y colaboración en proyectos de software.", en: "Version control and collaboration on software projects." }),
      new Technology("PostgreSQL", "/logos/postgresql.svg", "mastered", true, postgresDetail,
        { es: "Base de datos relacional para persistencia y consultas complejas.", en: "Relational database for persistence and complex queries." }),
    ];

    const learningTechs = [
      new Technology("Tailwind CSS", "/logos/tailwindcss.png", "learning", true, tailwindDetail,
        { es: "Framework de utilidades CSS para diseñar interfaces rápidamente.", en: "CSS utility framework for rapid interface design." }),
      new Technology("React", "/logos/react.png", "learning", true, reactDetail,
        { es: "Biblioteca para construir interfaces de usuario con componentes.", en: "Library for building user interfaces with components." }),
      new Technology("TypeScript", "/logos/typescript.png", "learning", true, tsDetail,
        { es: "JavaScript tipado para código más seguro y mantenible.", en: "Typed JavaScript for safer, more maintainable code." }),
      new Technology("Node.js", "/logos/nodejs.png", "learning", true, nodejsDetail,
        { es: "Entorno de ejecución de JavaScript del lado del servidor.", en: "JavaScript runtime environment for the server side." }),
    ];

    const n8nDetail: TechDetail = {
      name: "n8n",
      logo: "/logos/n8n.svg",
      description: {
        es: "Pipeline end-to-end para la automatización de reservas: lee emails de Airbnb y Booking vía IMAP, parsea, deduplica y crea deals en Bitrix24 sin intervención manual tras el deploy.",
        en: "End-to-end pipeline for reservation automation: reads Airbnb and Booking emails via IMAP, parses, deduplicates and creates deals in Bitrix24 without manual intervention after deploy."
      },
      learningSource: { es: "Proyecto: Automatización de Reservas", en: "Project: Reservation Automation" },
      skills: {
        es: ["Nodos IMAP, HTTP, Code y PostgreSQL", "Workflows visuales con IF y loops", "Code nodes en JavaScript para parsing complejo", "Webhooks para testing manual", "Gestión de errores con fallback a tarea manual"],
        en: ["IMAP, HTTP, Code and PostgreSQL nodes", "Visual workflows with IF and loops", "JavaScript Code nodes for complex parsing", "Webhooks for manual testing", "Error handling with fallback to manual task"]
      },
      challenge: {
        es: "Deduplicación en dos capas: n8n puede re-ejecutarse y crear duplicados. Solución: UNIQUE CONSTRAINT en PostgreSQL como guardrail + lógica n8n que busca el deal en Bitrix antes de crearlo + logging para auditoría.",
        en: "Two-layer deduplication: n8n can re-run and create duplicates. Solution: PostgreSQL UNIQUE CONSTRAINT as guardrail + n8n logic that searches for the deal in Bitrix before creating it + audit logging."
      }
    };

    const claudeCodeDetail: TechDetail = {
      name: "Claude Code",
      logo: "/logos/claude-code.svg",
      description: {
        es: "Utilizo Claude Code siguiendo prácticas orientadas a maximizar la calidad de las respuestas, reducir el consumo de tokens y mantener la consistencia técnica del proyecto.",
        en: "I use Claude Code following practices aimed at maximizing response quality, reducing token consumption, and maintaining the technical consistency of the project."
      },
      learningSource: {
        es: "Portafolio v3, ClassTracker, VelocReader y todos los proyectos activos",
        en: "Portfolio v3, ClassTracker, VelocReader and all active projects"
      },
      skills: {
        es: [
          "Definición de requerimientos y alcance antes de implementar cambios.",
          "Gestión eficiente del contexto mediante sesiones enfocadas y documentación persistente.",
          "Uso de Skills especializadas para tareas recurrentes y dominios específicos.",
          "Selección estratégica de modelos según complejidad, costo y objetivo.",
          "Integración de IA como herramienta de desarrollo, revisión y soporte arquitectónico."
        ],
        en: [
          "Requirements and scope definition before implementing changes.",
          "Efficient context management through focused sessions and persistent documentation.",
          "Use of specialized Skills for recurring tasks and specific domains.",
          "Strategic model selection based on complexity, cost, and objective.",
          "AI integration as a development, review, and architectural support tool."
        ]
      },
      challenge: {
        es: "Mantener consistencia técnica en proyectos de larga duración sin degradar la calidad del contexto disponible para la IA. Solución: documentación persistente del proyecto, sesiones orientadas a objetivos concretos y separación de responsabilidades por tarea.",
        en: "Maintaining technical consistency in long-running projects without degrading the quality of context available to the AI. Solution: persistent project documentation, sessions focused on concrete objectives, and separation of responsibilities per task."
      }
    };

    const toolTechs = [
      new Technology("n8n", "/logos/n8n.svg", "tool", true, n8nDetail,
        { es: "Automatización de flujos de trabajo entre aplicaciones.", en: "No-code workflow automation between applications." }),
      new Technology("VS Code", "/logos/vscode.svg", "tool", false, undefined,
        { es: "Editor principal para todo el desarrollo.", en: "Main editor for all development." }),
      new Technology("GitHub", "/logos/github.svg", "tool", false, undefined,
        { es: "Control de versiones y hosting de repositorios.", en: "Version control and repository hosting." }),
      new Technology("Claude Code", "/logos/claude-code.svg", "tool", true, claudeCodeDetail,
        { es: "IA para desarrollo: debugging, refactoring y arquitectura.", en: "AI for development: debugging, refactoring and architecture." }),
      new Technology("Figma", "/logos/figma.svg", "tool", false, undefined,
        { es: "Diseño de interfaces y prototipos.", en: "Interface design and prototyping." }),
      new Technology("Vercel", "/logos/vercel.svg", "tool", false, undefined,
        { es: "Deploy y hosting de proyectos web.", en: "Web project deployment and hosting." }),
      new Technology("Linux", "/logos/linux.svg", "tool", false, undefined,
        { es: "Entorno de trabajo principal para desarrollo y servidores.", en: "Main working environment for development and servers." }),
    ];

    this.technologies = [...masteredTechs, ...learningTechs, ...toolTechs];
  }

  getMasteredTechnologies(): Technology[] {
    return this.technologies.filter(tech => tech.status === 'mastered');
  }

  getLearningTechnologies(): Technology[] {
    return this.technologies.filter(tech => tech.status === 'learning');
  }

  getToolTechnologies(): Technology[] {
    return this.technologies.filter(tech => tech.status === 'tool');
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
  static readonly CV_PATH = "/CV_Isaac_Garcia_ES.pdf";
  static readonly CV_PATH_EN = "/CV_Isaac_Garcia_EN.pdf";
  static readonly WEB3FORMS_KEY = "4c48c221-ed24-4287-8176-7ba45ff628bc";
  static readonly MENU_KEYS = ["about", "projects", "tech", "contact", "learn"] as const;
  static readonly GITHUB_URL = "https://github.com/isaacxiddd";
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
  const [translationManager] = useState(() => {
    const mgr = TranslationManager.getInstance();
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en') mgr.toggleLanguage();
    return mgr;
  });
  const [currentLang, setCurrentLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'es');

  const toggleLanguage = useCallback(() => {
    const newLang = translationManager.toggleLanguage();
    localStorage.setItem('lang', newLang);
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

function useToast(theme: Theme) {
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
          background: theme === 'ps3' ? "rgba(228,240,255,0.97)" : "#071028",
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: theme === 'ps3'
            ? "0 6px 30px rgba(0,80,200,0.25)"
            : "0 6px 30px rgba(0,0,0,0.6)",
          zIndex: 9999,
          fontFamily: "Inter, system-ui",
          fontSize: 12,
          color: theme === 'ps3' ? "#0c1e42" : "white",
          border: theme === 'ps3' ? "1px solid rgba(0,80,200,0.2)" : "none",
        }}
      >
        {message}
      </div>
    ) : null, [message, theme]);

  return { toast, ToastNode };
}

// ========================= COMPONENTES =========================

const PS3Ribbons: React.FC<{ theme: Theme }> = React.memo(({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ribbons = Array.from({ length: 18 }, (_, i) => ({
      baseY: (window.innerHeight / 18) * (i + 0.5),
      amplitude: 12 + Math.random() * 65,
      wavelength: 280 + Math.random() * 620,
      speed: 0.12 + Math.random() * 0.42,
      width: 0.4 + Math.random() * 2.2,
      alpha: 0.028 + Math.random() * 0.082,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isPS3 = theme === 'ps3';
      for (const r of ribbons) {
        ctx.beginPath();
        ctx.lineWidth = r.width;
        ctx.strokeStyle = isPS3
          ? `rgba(18, 72, 178, ${r.alpha})`
          : `rgba(14, 165, 255, ${r.alpha * 0.9})`;
        const freq = (2 * Math.PI) / r.wavelength;
        for (let x = 0; x <= canvas.width + 6; x += 4) {
          const y = r.baseY + Math.sin(x * freq + t * r.speed + r.phase) * r.amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.011;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: theme === 'ps3' ? 0.85 : 0.55 }}
      aria-hidden
    />
  );
});

const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 border border-cyberaccent/30 rounded max-w-4xl max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
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
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-cyberaccent">{children}</h2>
    <div className="mt-2 mx-auto w-10 h-0.5 rounded-full bg-gradient-to-r from-cyberaccent to-neondanger" />
  </div>
);

type TechPillProps = {
  name: string;
  logo: string;
  variant?: "ok" | "learn" | "tool";
  hasDetail?: boolean;
  shine?: boolean;
  tooltip?: string;
  onClick?: () => void;
};

const TechPill: React.FC<TechPillProps> = React.memo(({ name, logo, variant = "ok", hasDetail = false, shine = false, tooltip, onClick }) => {
  const base = "relative flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer min-w-[120px] min-h-[120px] justify-center group";
  const variantClasses =
    variant === "ok"
      ? "bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/25"
      : variant === "tool"
      ? "bg-slate-500/10 border border-slate-400/30 hover:bg-slate-500/20 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-500/20"
      : "bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25";

  return (
    <motion.div variants={popIn} className="relative group">
      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 px-3 py-2 rounded-lg text-xs leading-snug text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg"
          style={{ background: 'var(--tooltip-bg, #111)', color: 'var(--tooltip-text, #fff)', border: '1px solid rgba(255,255,255,0.12)' }}>
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: 'var(--tooltip-bg, #111)' }} />
        </div>
      )}
      <div className={`${base} ${variantClasses} ${shine ? "pill-shine" : ""} ${hasDetail ? "hover:brightness-110" : ""}`} onClick={onClick}>
        <img src={logo} alt={name} loading="lazy" decoding="async" className="w-12 h-12 object-contain" />
        <span className="text-sm font-medium text-center">{name}</span>
      </div>
    </motion.div>
  );
});

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } }
};
const popIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.22 } }
};
const staggerGrid = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerPills = { visible: { transition: { staggerChildren: 0.055 } } };

const RotatingImage: React.FC<{ project: Project; alt: string; paused: boolean }> = ({ project, alt, paused }) => {
  const allImages = useMemo(() => {
    const imgs = project.images.length > 0 ? project.images : [project.mainImage];
    return project.images.includes(project.mainImage)
      ? imgs
      : [project.mainImage, ...imgs];
  }, [project]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1 || paused) return;
    const id = setInterval(() => setIndex(i => (i + 1) % allImages.length), 5000);
    return () => clearInterval(id);
  }, [allImages.length, paused]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={allImages[index]}
        src={allImages[index]}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
    </AnimatePresence>
  );
};

// ========================= SECCIONES =========================

const AboutSection: React.FC<{ 
  translations: Translations;
  lang: Lang;
  theme: Theme;
  onSetActive: (index: number) => void;
}> = ({ translations, lang, theme, onSetActive }) => {
  return (
    <div>
      <SectionTitle>{translations.aboutTitle}</SectionTitle>
      <div className="bg-black/20 backdrop-blur-[2px] p-10 rounded-xl border border-cyberaccent/30">
        <motion.div className="flex flex-col md:flex-row gap-8 items-center md:items-start" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <div className="md:w-2/3">
            <motion.div variants={fadeUp} className="text-2xl font-semibold mb-4 text-cyberaccent">Isaac José García Márquez</motion.div>
            <motion.div variants={fadeUp} className={theme === 'ps3' ? 'text-base font-semibold mb-4 text-cyan-400' : 'text-sm font-normal mb-4 text-white/70 uppercase tracking-wider'}>
              {translations.developer}
            </motion.div>
            <motion.p variants={fadeUp} className="text-[16px] leading-7 text-gray-200 mb-6">
              {lang === "es"
                ? "Estudiante de Ingeniería en Sistemas. Construyo aplicaciones web y soluciones de automatización con foco en backend, integración de sistemas y resolución de problemas mediante software."
                : "Systems Engineering student. I build web applications and automation solutions focused on backend, systems integration, and problem-solving through software."
              }
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={AppConfig.openGitHub}
                className="btn-animated btn-gh"
              >
                <span className="gh-cat">
                  <svg width="18" height="18" viewBox="0 0 98 96" fill="#e2e8f0" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                  </svg>
                </span>
                <div className="gh-label-wrap">
                  <span className="gh-in">GitHub</span>
                  <span className="gh-name">isaacxiddd</span>
                </div>
              </button>
              <button
                onClick={AppConfig.openLinkedIn}
                className="btn-animated btn-li"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="li-label-wrap">
                  <span className="li-in">LinkedIn</span>
                  <span className="li-name">isaacjosegarcia</span>
                </div>
              </button>
              <a
                href={lang === 'en' ? AppConfig.CV_PATH_EN : AppConfig.CV_PATH}
                download
                className="btn-animated btn-dl"
              >
                <div className="dl-default">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="9" y1="1.5" x2="9" y2="10" stroke="#e2e8f0" stroke-width="1.7" stroke-linecap="round"/>
                    <polyline points="5.5,7.5 9,11.5 12.5,7.5" fill="none" stroke="#e2e8f0" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
                    <polyline points="4,13.5 4,16 14,16 14,13.5" fill="none" stroke="#e2e8f0" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
                  </svg>
                  <span>{lang === "es" ? "Descargar CV" : "Download CV"}</span>
                </div>
                <div className="dl-loading">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2"/>
                    <circle cx="6" cy="6" r="1.2" fill="rgba(255,255,255,0.8)" stroke="none"/>
                    <circle cx="6" cy="18" r="1.2" fill="rgba(255,255,255,0.8)" stroke="none"/>
                  </svg>
                  <div className="dl-track">
                    <div className="dl-fill"></div>
                    <div className="dl-packet"></div>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span
                className="text-sm font-semibold text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                style={{ animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                onClick={() => onSetActive(1)}
              >
                {lang === "es" ? "Explorar proyectos →" : "Explore projects →"}
              </span>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="md:w-1/3 flex flex-col items-center md:items-end justify-center">
            <picture>
              <source srcSet="/avatar.webp" type="image/webp" />
              <img src="/avatar.jpg" alt="avatar" width={417} height={417} fetchPriority="high" className="w-full max-w-[200px] rounded-xl object-cover border border-cyberaccent/30 shadow-lg mb-4" />
            </picture>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

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
                <RotatingImage project={project} alt={`Preview de ${project.name}`} paused={hoveredIndex === index} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
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
                        <img src={image} alt={`${selectedProject.name} screenshot ${index + 1}`} loading="lazy" decoding="async" className="w-full h-48 object-cover hover:scale-105 transition-transform" />
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

const TechnologiesSection = React.memo(({ translations, lang, techRepo }: {
  translations: Translations;
  lang: Lang;
  techRepo: TechnologyRepository;
}) => {
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);
  
  const masteredTechs = techRepo.getMasteredTechnologies();
  const learningTechs = techRepo.getLearningTechnologies();
  const toolTechs = techRepo.getToolTechnologies();

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
      <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
        <motion.div variants={fadeUp}>
          <div className="mb-6 text-lg font-semibold text-cyberaccent text-center mastered-label">{translations.mastered}</div>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial="hidden" animate="visible" variants={staggerPills}>
            {masteredTechs.map((tech) => (
              <TechPill
                key={tech.name}
                name={tech.name}
                logo={tech.logo}
                variant="ok"
                hasDetail={tech.hasDetail}
                shine={tech.hasDetail}
                tooltip={tech.tooltip?.[lang]}
                onClick={() => tech.hasDetail && openTechDetails(tech.name)}
              />
            ))}
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <div className="mb-6 text-lg font-semibold text-orange-300 text-center">{translations.learning}</div>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial="hidden" animate="visible" variants={staggerPills}>
            {learningTechs.map((tech) => (
              <TechPill
                key={tech.name}
                name={tech.name}
                logo={tech.logo}
                variant="learn"
                hasDetail={tech.hasDetail}
                shine={tech.hasDetail}
                tooltip={tech.tooltip?.[lang]}
                onClick={() => tech.hasDetail && openTechDetails(tech.name)}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="mt-10 max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
        <div className="mb-6 text-lg font-semibold text-purple-300 text-center">{translations.tools}</div>
        <motion.div className="flex flex-wrap gap-4 justify-center" initial="hidden" animate="visible" variants={staggerPills}>
          {toolTechs.map((tech) => (
            <TechPill
              key={tech.name}
              name={tech.name}
              logo={tech.logo}
              variant="tool"
              hasDetail={tech.hasDetail}
              shine={tech.hasDetail}
              tooltip={tech.tooltip?.[lang]}
              onClick={() => tech.hasDetail && openTechDetails(tech.name)}
            />
          ))}
        </motion.div>
      </motion.div>

      <Modal open={Boolean(selectedTech)} onClose={closeTechDetails}>
        {selectedTech && (
          <>
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={selectedTech.logo} alt={selectedTech.name} loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                <h2 className="text-xl font-bold">{selectedTech.name}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Descripción" : "Description"}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{selectedTech.description[lang]}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Dónde lo apliqué" : "Where I applied it"}</h3>
                <div className="text-sm bg-cyberaccent/10 px-3 py-2 rounded border border-cyberaccent/30 inline-block text-cyberaccent">
                  {selectedTech.learningSource[lang]}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Conceptos y prácticas aplicadas" : "Concepts & practices applied"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {selectedTech.skills[lang].map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-cyberaccent mt-0.5 shrink-0">—</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {selectedTech.challenge && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Desafío principal" : "Main challenge"}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-cyberaccent/40 pl-3">{selectedTech.challenge[lang]}</p>
                </div>
              )}

              {selectedTech.certificate && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Certificado" : "Certificate"}</h3>
                  <div className="border border-gray-600 overflow-hidden rounded bg-white p-4 max-w-lg mx-auto">
                    <img src={selectedTech.certificate} alt={`Certificado de ${selectedTech.name}`} loading="lazy" decoding="async" className="w-full h-auto object-contain" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
});

const ContactSection: React.FC<{
  translations: Translations;
  lang: Lang;
  onCopyEmail: () => void;
}> = ({ translations, lang, onCopyEmail }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: AppConfig.WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio contact from ${formData.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div>
      <SectionTitle>{translations.contact}</SectionTitle>

      <motion.div className="max-w-2xl mx-auto space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)] animate-pulse"></span>
          <span className="text-sm text-green-300 font-medium">
            {lang === "es" ? "Disponible para oportunidades remotas" : "Available for remote opportunities"}
          </span>
        </motion.div>

        {/* Formulario de contacto */}
        <motion.div variants={fadeUp} className="p-6 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-4">
          {formStatus === 'success' ? (
            <div className="text-center py-6">
              <div className="text-green-400 text-2xl mb-2">✓</div>
              <p className="text-green-300 font-medium">{translations.formSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs opacity-70 mb-1">{translations.formName}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder={translations.formPlaceholderName}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs opacity-70 mb-1">{translations.formEmail}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder={translations.formPlaceholderEmail}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs opacity-70 mb-1">{translations.formMessage}</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder={translations.formPlaceholderMessage}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40 resize-none"
                />
              </div>
              {formStatus === 'error' && (
                <p className="text-red-400 text-xs">{translations.formError}</p>
              )}
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-2 text-sm border border-cyberaccent/50 rounded-lg bg-cyberaccent/20 hover:bg-cyberaccent/30 transition-colors disabled:opacity-50"
              >
                {formStatus === 'sending' ? translations.formSending : translations.formSend}
              </button>
            </form>
          )}
        </motion.div>

        {/* Links directos */}
        <motion.div variants={fadeUp} className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={AppConfig.openLinkedIn}
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-sm border border-cyberaccent/50 rounded bg-cyberaccent/20 hover:bg-cyberaccent/30 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.13 20.45H3.55V9h3.58v11.45z" />
            </svg>
            LinkedIn
          </button>
          <button
            onClick={AppConfig.openGitHub}
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-500/50 rounded bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
            </svg>
            GitHub
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

function useAnimatedCounter(target: number, duration: number = 2500): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) return;

    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return value;
}

const LearnMoreSection: React.FC<{ translations: Translations; lang: Lang }> = ({ translations, lang }) => {
  const interests = lang === "es"
    ? ["Desarrollo full stack", "APIs e integración de sistemas", "Automatización de procesos", "Arquitectura de software", "Herramientas de IA para desarrollo"]
    : ["Full stack development", "APIs & system integration", "Process automation", "Software architecture", "AI tools for development"];

  const [stats, setStats] = useState<{ views: number; hits: number } | null>(null);
  const animatedViews = useAnimatedCounter(stats?.views ?? 0);
  const animatedHits = useAnimatedCounter(stats?.hits ?? 0);

  useEffect(() => {
    const loadStats = (url: string) =>
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (data?.info) {
            setStats({ views: data.info.views, hits: data.info.hits });
            return true;
          }
          return false;
        });

    loadStats('/api/neocities-info').catch(() => {
      loadStats('/neocities-fallback.json');
    });
  }, []);

  const fmt = (n: number) => n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US');
  const formattedViews = stats !== null ? fmt(animatedViews) : '...';
  const formattedHits = stats !== null ? fmt(animatedHits) : '...';

  return (
    <div>
      <SectionTitle>{translations.learnMore}</SectionTitle>
      <motion.div className="max-w-3xl mx-auto space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

        {/* Bio */}
        <motion.div variants={fadeUp} className="p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl">
          <p className="text-sm text-gray-300 leading-relaxed">
            {lang === "es"
              ? "Estudiante de Ingeniería en Sistemas en UTN. Desarrollo aplicaciones web, automatizaciones e integraciones de APIs utilizando Python y JavaScript. Mis proyectos han sido utilizados por más de 3.000 usuarios. Actualmente profundizando en React, TypeScript y desarrollo full stack."
              : "Systems Engineering student at UTN. I build web applications, automations and API integrations using Python and JavaScript. My projects have been used by more than 3,000 users. Currently deepening my knowledge in React, TypeScript and full stack development."}
          </p>
        </motion.div>

        {/* Info grid */}
        <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">

          {/* Educación */}
          <a
            href="https://utn.edu.ar/es/federacion-universitaria-tecnologica/feria-de-carreras/sistemas-de-informacion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine block p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-1"
          >
            <div className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-2">{lang === "es" ? "Educación" : "Education"}</div>
            <div className="text-sm text-gray-200 font-medium">{lang === "es" ? "Ingeniería en Sistemas de Información" : "Information Systems Engineering"}</div>
            <div className="text-xs text-gray-400">UTN FRBA</div>
          </a>

          {/* Ubicación e idiomas */}
          <div className="p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-3">
            <div>
              <div className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-1">{lang === "es" ? "Ubicación" : "Location"}</div>
              <div className="text-sm text-gray-300">Argentina</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-1">{lang === "es" ? "Idiomas" : "Languages"}</div>
              <div className="text-sm text-gray-300">{lang === "es" ? "Español, Inglés, Portugués, Italiano" : "Spanish, English, Portuguese, Italian"}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="btn-shine p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl text-center space-y-3">
            <div className="text-xs font-semibold text-cyberaccent uppercase tracking-wider">{lang === "es" ? "Proyectos alcanzando más de" : "Projects reaching over"}</div>
            <div>
              <div className="text-3xl font-bold text-amber-400">+{formattedViews}</div>
              <div className="text-xs text-gray-400">{lang === "es" ? "visitas" : "visits"}</div>
            </div>
            <div className="w-3/4 mx-auto h-px bg-cyberaccent/20" />
            <div>
              <div className="text-3xl font-bold text-amber-400">+{formattedHits}</div>
              <div className="text-xs text-gray-400">{lang === "es" ? "usos" : "uses"}</div>
            </div>
          </div>

          {/* Intereses */}
          <div className="p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl">
            <div className="text-xs font-semibold text-cyberaccent uppercase tracking-wider mb-3">{lang === "es" ? "Intereses actuales" : "Current interests"}</div>
            <ul className="space-y-1">
              {interests.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-cyberaccent mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* Repo */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">{lang === "es" ? "Repositorio del portfolio" : "Portfolio repository"}</span>
          <a
            href="https://github.com/Isaacxiddd/isaac-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 text-sm border border-gray-500/50 rounded bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
            </svg>
            GitHub
          </a>
            
        </motion.div>

      </motion.div>
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
  theme: Theme;
  onThemeToggle: () => void;
}> = ({ translations, lang, activeIndex, onMenuClick, onLanguageToggle, onCopyEmail, theme, onThemeToggle }) => (
  <aside className="w-72 p-4 border-r border-cyberaccent/30 hidden md:flex flex-col gap-6 bg-black/20 backdrop-blur-sm relative z-[1]">
    <div className="flex items-center gap-2">
      <div className="text-lg font-semibold text-cyberaccent leading-4 overflow-hidden whitespace-nowrap">
        {lang === "es" ? "Portafolio" : "Portfolio"}
      </div>
      <button
        aria-label="toggle-language"
        className="ml-auto px-2 py-1 border border-cyberaccent/50 rounded text-xs hover:bg-cyberaccent/20 transition-colors"
        onClick={onLanguageToggle}
      >
        {lang === "es" ? "ES" : "EN"}
      </button>
      <button
        aria-label="toggle-theme"
        className="px-2 py-1 border border-cyberaccent/50 rounded text-xs hover:bg-cyberaccent/20 transition-colors"
        onClick={onThemeToggle}
        title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      >
        {theme === 'dark'
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/><line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/></svg>
        }
      </button>
    </div>

    <nav aria-label="main menu" className="flex-1">
      {([
        // Quién soy / About Me
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
        // Proyectos / Projects
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
        // Tecnologías / Technologies
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
        // Contacto / Contact
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>,
        // Saber más / Learn More
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>,
      ] as React.ReactNode[]).map((icon, i) => (
        <button
          key={translations.menu[i]}
          onClick={() => onMenuClick(i)}
          className={`btn-star w-full text-left p-3 my-2 rounded transition-all relative ${
            i === activeIndex
              ? "bg-cyberaccent/10 text-cyberaccent"
              : "hover:bg-cyberaccent/10 hover:text-blue-200"
          }`}
        >
          {i === activeIndex && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[85%] bg-cyberaccent rounded-full shadow-[0_0_8px_rgba(14,165,255,0.6)]"></div>
          )}
          <div className="flex items-center gap-2 ml-2">
            <span className={`shrink-0 ${i === activeIndex ? "opacity-100" : "opacity-60"}`}>{icon}</span>
            <span className="text-[12px] opacity-80">{translations.menu[i]}</span>
          </div>
        </button>
      ))}
    </nav>

    <div className="flex flex-col gap-2">
      <a
        href={lang === 'en' ? AppConfig.CV_PATH_EN : AppConfig.CV_PATH}
        download
        className="btn-shine px-3 py-2 text-xs border border-cyberaccent/50 rounded text-center hover:bg-cyberaccent/20 transition-colors"
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

const Footer: React.FC = () => (
  <footer className="mt-auto p-4 border-t border-cyberaccent/30 bg-black/20 backdrop-blur-sm">
    <div className="text-center text-xs opacity-60">
      © 2026 Isaac José García Márquez - Todos los derechos reservados
    </div>
  </footer>
);

// ========================= COMPONENTE PRINCIPAL =========================

export default function OptimizedPortfolio(): JSX.Element {
  const { activeIndex, setActive, next, previous } = useNavigation();
  const { lang, translations, toggleLanguage } = useTranslations();
  const reducedMotion = usePrefersReducedMotion();
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'ps3');
  const toggleTheme = useCallback(() => setTheme(t => {
    const next = t === 'dark' ? 'ps3' : 'dark';
    localStorage.setItem('theme', next);
    return next;
  }), []);
  const { toast, ToastNode } = useToast(theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const mainRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollOverflow = useRef(0);
  const scrollCooldown = useRef(0);
  const scrollLockUntil = useRef(0);

  const navigateTo = useCallback((fn: () => void) => {
    const scrollEl = scrollContainerRef.current;
    const now = Date.now();
    scrollOverflow.current = 0;
    scrollCooldown.current = now;
    scrollLockUntil.current = now + 700;
    if (scrollEl) {
      scrollEl.style.overflowY = 'hidden';
      scrollEl.scrollTop = 0;
    }
    // también resetear window/body por si el layout hace scroll a nivel página
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    fn();
    setTimeout(() => {
      const el = scrollContainerRef.current;
      if (el) {
        el.scrollTop = 0;
        el.style.overflowY = '';
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    setTimeout(() => {
      const el = scrollContainerRef.current;
      if (el) {
        el.scrollTop = 0;
        el.style.overflowY = '';
      }
    }, 700);
  }, []);

  // Listener en el <main> estable — nunca se desmonta, sin gap entre secciones
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();

      // Bloqueo post-navegación: absorbe residuo del gesto con preventDefault
      if (now < scrollLockUntil.current) {
        e.preventDefault();
        return;
      }

      const scrollEl = scrollContainerRef.current;
      if (!scrollEl) return;

      // Elementos scrolleables internos (modales, details): dejar pasar
      let node = e.target as HTMLElement | null;
      while (node && node !== scrollEl) {
        const oy = window.getComputedStyle(node).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && node.scrollHeight > node.clientHeight) {
          return;
        }
        node = node.parentElement;
      }

      // Cooldown: evita re-navegar inmediatamente
      if (now - scrollCooldown.current < 1200) {
        scrollOverflow.current = 0;
        return;
      }

      const atBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight < 2;
      const atTop = scrollEl.scrollTop <= 0;
      const atBoundary = (atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0);

      if (!atBoundary) {
        scrollOverflow.current = 0;
        return;
      }

      e.preventDefault();

      const hasOverflow = scrollEl.scrollHeight > scrollEl.clientHeight + 5;
      const threshold = hasOverflow ? 600 : 300;
      const delta = Math.min(Math.abs(e.deltaY), 40) * Math.sign(e.deltaY);
      scrollOverflow.current += delta;

      if (scrollOverflow.current > threshold) {
        navigateTo(next);
      } else if (scrollOverflow.current < -threshold) {
        navigateTo(previous);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [next, previous, navigateTo]);

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
    <div
      data-theme={theme}
      style={theme === 'ps3' ? { background: 'linear-gradient(160deg, #c0d8f2 0%, #b2cae6 22%, #c5dcf5 55%, #d2e8ff 100%)' } : undefined}
      className={`h-screen overflow-hidden flex relative ${theme === 'dark' ? 'bg-gradient-to-br from-[#060714] via-[#071028] to-[#060714] text-white' : 'text-[#0c1e42]'}`}
    >
      <PS3Ribbons theme={theme} />

      {/* Sidebar */}
      <Sidebar
        translations={translations}
        lang={lang}
        activeIndex={activeIndex}
        onMenuClick={setActive}
        onLanguageToggle={toggleLanguage}
        onCopyEmail={copyEmail}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {/* Mobile theme toggle */}
      <button
        aria-label="toggle-theme"
        onClick={toggleTheme}
        className="fixed top-3 right-3 z-10 md:hidden p-2 border border-cyberaccent/50 rounded bg-black/20 hover:bg-cyberaccent/20 transition-colors backdrop-blur-sm"
      >
        {theme === 'dark'
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/><line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/></svg>
        }
      </button>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 flex flex-col relative z-[1]">
        <div ref={scrollContainerRef} className="flex-1 p-6 overflow-y-auto overflow-x-hidden" style={{ overflowAnchor: 'none' }}>
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
                theme={theme}
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