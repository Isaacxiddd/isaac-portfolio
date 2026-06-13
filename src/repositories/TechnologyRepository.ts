import { TechDetail } from "../types";
import Technology from "../models/Technology";

export class TechnologyRepository {
  private technologies: Technology[] = [];
  private detailFactories = new Map<string, () => TechDetail>();

  constructor() {
    this.initializeTechnologies();
  }

  private initializeTechnologies(): void {
    this.detailFactories.set("Python", () => ({
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
      certificate: "/certificado.webp",
      challenge: {
        es: "Limpiar y normalizar datasets con formatos inconsistentes: fechas en múltiples formatos, valores nulos y columnas con nombres distintos según la fuente.",
        en: "Cleaning and normalizing datasets with inconsistent formats: dates in multiple formats, null values and columns with different names depending on the source."
      }
    }));

    this.detailFactories.set("JavaScript", () => ({
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
    }));

    this.detailFactories.set("git", () => ({
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
    }));

    this.detailFactories.set("PostgreSQL", () => ({
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
    }));

    this.detailFactories.set("React", () => ({
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
    }));

    this.detailFactories.set("TypeScript", () => ({
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
    }));

    this.detailFactories.set("Tailwind CSS", () => ({
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
    }));

    this.detailFactories.set("Node.js", () => ({
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
    }));

    this.detailFactories.set("n8n", () => ({
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
    }));

    this.detailFactories.set("Claude Code", () => ({
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
    }));

    const masteredTechs = [
      new Technology("Python", "/logos/python.png", "mastered", true, undefined,
        { es: "Análisis de datos, automatización y scripts de procesamiento.", en: "Data analysis, automation and processing scripts." }),
      new Technology("JavaScript", "/logos/javascript.png", "mastered", true, undefined,
        { es: "Lógica de apps web, parsing de emails y automatización.", en: "Web app logic, email parsing and automation." }),
      new Technology("git", "/logos/git.png", "mastered", true, undefined,
        { es: "Control de versiones y colaboración en proyectos de software.", en: "Version control and collaboration on software projects." }),
      new Technology("PostgreSQL", "/logos/postgresql.svg", "mastered", true, undefined,
        { es: "Base de datos relacional para persistencia y consultas complejas.", en: "Relational database for persistence and complex queries." }),
    ];

    const learningTechs = [
      new Technology("Tailwind CSS", "/logos/tailwindcss.png", "learning", true, undefined,
        { es: "Framework de utilidades CSS para diseñar interfaces rápidamente.", en: "CSS utility framework for rapid interface design." }),
      new Technology("React", "/logos/react.png", "learning", true, undefined,
        { es: "Biblioteca para construir interfaces de usuario con componentes.", en: "Library for building user interfaces with components." }),
      new Technology("TypeScript", "/logos/typescript.png", "learning", true, undefined,
        { es: "JavaScript tipado para código más seguro y mantenible.", en: "Typed JavaScript for safer, more maintainable code." }),
      new Technology("Node.js", "/logos/nodejs.png", "learning", true, undefined,
        { es: "Entorno de ejecución de JavaScript del lado del servidor.", en: "JavaScript runtime environment for the server side." }),
    ];

    const toolTechs = [
      new Technology("n8n", "/logos/n8n.svg", "tool", true, undefined,
        { es: "Automatización de flujos de trabajo entre aplicaciones.", en: "No-code workflow automation between applications." }),
      new Technology("VS Code", "/logos/vscode.svg", "tool", false, undefined,
        { es: "Editor principal para todo el desarrollo.", en: "Main editor for all development." }),
      new Technology("GitHub", "/logos/github.svg", "tool", false, undefined,
        { es: "Control de versiones y hosting de repositorios.", en: "Version control and repository hosting." }),
      new Technology("Claude Code", "/logos/claude-code.svg", "tool", true, undefined,
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
    const tech = this.technologies.find(t => t.name === name);
    if (tech && tech.hasDetail && !tech.detail) {
      const factory = this.detailFactories.get(name);
      if (factory) {
        tech.detail = factory();
      }
    }
    return tech;
  }
}
