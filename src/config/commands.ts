export interface CommandDef {
  name: string;
  description: { es: string; en: string };
  category: 'profile' | 'projects' | 'fun' | 'system' | 'contact';
  response?: { es: string; en: string };
}

const LANG_LIST = {
  es: `  Spanish (nativo)
  English (fluido)
  Portuguese (avanzado)
  Italian (intermedio)
  French (básico)
  Russian (básico)`,
  en: `  Spanish (native)
  English (fluent)
  Portuguese (advanced)
  Italian (intermediate)
  French (basic)
  Russian (basic)`
};

export const staticCommands: CommandDef[] = [
  {
    name: 'help',
    description: { es: 'Muestra esta ayuda', en: 'Show this help' },
    category: 'system',
  },
  {
    name: 'whoami',
    description: { es: 'Muestra mi nombre', en: 'Show my name' },
    category: 'profile',
    response: {
      es: 'Isaac José García Márquez',
      en: 'Isaac José García Márquez'
    }
  },
  {
    name: 'howold',
    description: { es: 'Muestra mi edad', en: 'Show my age' },
    category: 'profile',
    response: {
      es: '18 años.',
      en: '18 years old.'
    }
  },
  {
    name: 'location',
    description: { es: 'Muestra mi ubicación', en: 'Show my location' },
    category: 'profile',
    response: {
      es: 'Buenos Aires, Argentina.',
      en: 'Buenos Aires, Argentina.'
    }
  },
  {
    name: 'studies',
    description: { es: 'Muestra mis estudios', en: 'Show my studies' },
    category: 'profile',
    response: {
      es: 'Ingeniería en Sistemas de Información @ UTN FRBA.',
      en: 'Software Engineering Student @ UTN FRBA.'
    }
  },
  {
    name: 'university',
    description: { es: 'Info sobre mi universidad', en: 'Info about my university' },
    category: 'profile',
    response: {
      es: 'Universidad Tecnológica Nacional - Facultad Regional Buenos Aires (UTN FRBA)',
      en: 'Universidad Tecnológica Nacional - Facultad Regional Buenos Aires (UTN FRBA)'
    }
  },
  {
    name: 'languages',
    description: { es: 'Idiomas que hablo', en: 'Languages I speak' },
    category: 'profile',
    response: LANG_LIST,
  },
  {
    name: 'currentproject',
    description: { es: 'Muestra mi proyecto actual', en: 'Show my current project' },
    category: 'projects',
    response: {
      es: 'Reservation Automation — Proyecto Técnico para Gouppers.\nSistema n8n + Bitrix24 que automatiza reservas de Airbnb y Booking.',
      en: 'Reservation Automation — Technical Project for Gouppers.\nn8n + Bitrix24 system that automates Airbnb and Booking reservations.'
    }
  },
  {
    name: 'github',
    description: { es: 'Abre mi GitHub', en: 'Open my GitHub' },
    category: 'contact',
    response: {
      es: 'https://github.com/isaacxiddd',
      en: 'https://github.com/isaacxiddd'
    }
  },
  {
    name: 'linkedin',
    description: { es: 'Abre mi LinkedIn', en: 'Open my LinkedIn' },
    category: 'contact',
    response: {
      es: 'https://www.linkedin.com/in/isaacjosegarcia',
      en: 'https://www.linkedin.com/in/isaacjosegarcia'
    }
  },
  {
    name: 'contact',
    description: { es: 'Muestra mi información de contacto', en: 'Show my contact info' },
    category: 'contact',
    response: {
      es: `  Email:  isaacjosegarciamarquez@gmail.com
  GitHub: https://github.com/isaacxiddd
  LinkedIn: https://www.linkedin.com/in/isaacjosegarcia`,
      en: `  Email:  isaacjosegarciamarquez@gmail.com
  GitHub: https://github.com/isaacxiddd
  LinkedIn: https://www.linkedin.com/in/isaacjosegarcia`
    }
  },
  {
    name: 'funfact',
    description: { es: 'Un dato curioso sobre mí', en: 'A fun fact about me' },
    category: 'fun',
    response: {
      es: 'Puedo explicar un bug en tres idiomas pero igual pasar dos horas buscando un punto y coma.',
      en: 'Can explain a bug in three languages but still spend two hours finding a missing semicolon.'
    }
  },
  {
    name: 'coffee',
    description: { es: 'Multiplicador de productividad', en: 'Productivity multiplier' },
    category: 'fun',
    response: {
      es: 'Multiplicador de productividad actual: x1.8',
      en: 'Current productivity multiplier: x1.8'
    }
  },
  {
    name: 'music',
    description: { es: 'Mi música', en: 'My music taste' },
    category: 'fun',
    response: {
      es: 'Lo-fi, synthwave, y soundtracks de películas. Nada como algunos beats para concentrarse.',
      en: 'Lo-fi, synthwave, and movie soundtracks. Nothing like some beats to focus.'
    }
  },
  {
    name: 'inspiration',
    description: { es: 'Mi inspiración', en: 'My inspiration' },
    category: 'fun',
    response: {
      es: '"El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora." — Proverbio chino',
      en: '"The best time to plant a tree was 20 years ago. The second best time is now." — Chinese proverb'
    }
  },
  {
    name: 'status',
    description: { es: 'Mi estado actual', en: 'My current status' },
    category: 'profile',
    response: {
      es: 'Aprendiendo. Construyendo. Enviando.',
      en: 'Learning. Building. Shipping.'
    }
  },
  {
    name: 'cv',
    description: { es: 'Descarga mi CV', en: 'Download my CV' },
    category: 'contact',
    response: {
      es: 'Podés descargar mi CV desde el sidebar o desde: /CV_Isaac_Garcia_ES.pdf',
      en: 'You can download my CV from the sidebar or from: /CV_Isaac_Garcia_EN.pdf'
    }
  },
  {
    name: 'hireme',
    description: { es: '¿Estás listo para contratarme?', en: 'Ready to hire me?' },
    category: 'fun',
    response: {
      es: `Cargando futuro ingeniero de software...
████████████████ 100%
Listo.

  Email: isaacjosegarciamarquez@gmail.com
  LinkedIn: https://www.linkedin.com/in/isaacjosegarcia`,
      en: `Loading future software engineer...
████████████████ 100%
Ready.

  Email: isaacjosegarciamarquez@gmail.com
  LinkedIn: https://www.linkedin.com/in/isaacjosegarcia`
    }
  },
  {
    name: 'xp',
    description: { es: 'Muestra mi XP', en: 'Show my XP' },
    category: 'fun',
    response: {
      es: `  Level 18  Software Engineer
  XP: 1847/10000

  Próxima quest: Primera pasantía tech`,
      en: `  Level 18  Software Engineer
  XP: 1847/10000

  Current quest: First tech internship`
    }
  },
  {
    name: 'bossfight',
    description: { es: 'El jefe actual', en: 'Current boss fight' },
    category: 'fun',
    response: {
      es: `  ⚔️  JEFE ACTUAL
  ─────────────────────
  Getting first software engineering job

  Dificultad:    Difícil
  Persistencia:  Muy Alta
  XP al vencer:  +5000`,
      en: `  ⚔️  CURRENT BOSS
  ─────────────────────
  Getting first software engineering job

  Difficulty:          Hard
  Persistence:         Very High
  XP on defeat:        +5000`
    }
  },
  {
    name: 'future',
    description: { es: 'Mi meta', en: 'My goal' },
    category: 'profile',
    response: {
      es: 'Convertirme en ingeniero de software profesional y construir productos usados por miles de personas.',
      en: 'Become a professional software engineer and build products used by thousands of people.'
    }
  },
  {
    name: 'secret',
    description: { es: 'Shhh...', en: 'Shhh...' },
    category: 'fun',
    response: {
      es: 'El pastel es una mentira.',
      en: 'The cake is a lie.'
    }
  },
  {
    name: 'boca',
    description: { es: 'Activa el modo Boca Juniors ⚽', en: 'Activate Boca Juniors mode ⚽' },
    category: 'fun',
    response: {
      es: '🔵💛 ¡MODO BOCA ACTIVADO! 💛🔵',
      en: '🔵💛 BOCA MODE ACTIVATED! 💛🔵'
    }
  },
  {
    name: 'tree',
    description: { es: 'Muestra la arquitectura del proyecto', en: 'Show project architecture' },
    category: 'system',
    response: {
      es: `src/
├── components/        # UI reutilizable
│   ├── ContentRenderer.tsx
│   ├── ImageGallery.tsx
│   ├── Modal.tsx
│   ├── RotatingImage.tsx
│   ├── Sidebar.tsx
│   ├── TerminalConsole.tsx
│   └── ...
├── config/            # Configuración y comandos
│   ├── AppConfig.ts
│   └── commands.ts
├── hooks/             # Custom hooks
│   ├── useTerminal.ts
│   ├── useNavigation.ts
│   ├── useToast.tsx
│   └── ...
├── models/            # Clases del dominio
│   ├── Project.ts
│   └── Technology.ts
├── repositories/      # Data layer
│   ├── ProjectRepository.ts
│   └── TechnologyRepository.ts
├── sections/          # Secciones del portfolio
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── TechnologiesSection.tsx
│   └── ...
├── types/             # TypeScript types
├── lib/               # Utilidades
├── App.tsx            # Componente principal
├── main.tsx           # Entry point
└── styles.css         # Estilos globales + terminal`,
      en: `src/
├── components/        # Reusable UI
│   ├── ContentRenderer.tsx
│   ├── ImageGallery.tsx
│   ├── Modal.tsx
│   ├── RotatingImage.tsx
│   ├── Sidebar.tsx
│   ├── TerminalConsole.tsx
│   └── ...
├── config/            # Configuration & commands
│   ├── AppConfig.ts
│   └── commands.ts
├── hooks/             # Custom hooks
│   ├── useTerminal.ts
│   ├── useNavigation.ts
│   ├── useToast.tsx
│   └── ...
├── models/            # Domain classes
│   ├── Project.ts
│   └── Technology.ts
├── repositories/      # Data layer
│   ├── ProjectRepository.ts
│   └── TechnologyRepository.ts
├── sections/          # Portfolio sections
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── TechnologiesSection.tsx
│   └── ...
├── types/             # TypeScript types
├── lib/               # Utilities
├── App.tsx            # Main component
├── main.tsx           # Entry point
└── styles.css         # Global styles + terminal`
    }
  },
  {
    name: 'achievement',
    description: { es: 'Logro desbloqueado', en: 'Achievement unlocked' },
    category: 'fun',
    response: {
      es: '🏆  Construyó proyectos públicos antes de conseguir su primer trabajo tech.',
      en: '🏆  Built public projects before getting a first tech job.'
    }
  },
  {
    name: 'echo',
    description: { es: 'Repite el texto', en: 'Echo the text' },
    category: 'system',
  },
  {
    name: 'date',
    description: { es: 'Muestra la fecha y hora', en: 'Show date and time' },
    category: 'system',
  },
  {
    name: 'uptime',
    description: { es: 'Tiempo desde que abriste el portfolio', en: 'Time since you opened the portfolio' },
    category: 'system',
  },
  {
    name: 'clear',
    description: { es: 'Limpia la terminal', en: 'Clear the terminal' },
    category: 'system',
  },
];

export const dynamicCommands: CommandDef[] = [
  {
    name: 'about',
    description: { es: 'Muestra mi biografía', en: 'Show my bio' },
    category: 'profile',
  },
  {
    name: 'skills',
    description: { es: 'Muestra mis tecnologías', en: 'Show my technologies' },
    category: 'profile',
  },
  {
    name: 'projects',
    description: { es: 'Muestra mis proyectos', en: 'Show my projects' },
    category: 'projects',
  },
  {
    name: 'neofetch',
    description: { es: 'Info del sistema (como neofetch)', en: 'System info (like neofetch)' },
    category: 'system',
  },
];

export const allCommands: CommandDef[] = [...staticCommands, ...dynamicCommands];
