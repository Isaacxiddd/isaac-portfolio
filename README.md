# Isaac García Márquez — Portfolio

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat&logo=vercel&logoColor=white)

Portfolio personal de Isaac José García Márquez — estudiante de Ingeniería en Sistemas (UTN FRBA) con foco en backend, automatización de procesos e integración de sistemas.

## About Me

Software Engineering Student at UTN FRBA.

Interested in:

- Backend Development
- Process Automation
- API Integration
- Full Stack Web Applications

Currently focused on building production-oriented projects and gaining professional software development experience.

## Demo

🔗 **[isaacportafolio.vercel.app](https://isaacportafolio.vercel.app)**

---

## Sobre el proyecto

Este portfolio concentra en un solo lugar los proyectos, tecnologías y formas de contacto relevantes para recruiters y desarrolladores que evalúen mi perfil técnico. El objetivo no es un sitio de presentación genérico sino un showcase funcional que demuestra capacidad de construir productos reales con resultados medibles.

Público objetivo: tech recruiters, equipos de desarrollo y colaboradores potenciales.

---

## Características

- Tema claro inspirado en PS3 XMB + modo oscuro, con animaciones canvas de ribbons
- Diseño responsive (mobile y desktop)
- SPA con navegación por scroll en los límites de cada sección
- Soporte multilenguaje ES / EN
- Showcase de proyectos con imágenes rotativas y detalle en modal
- Showcase de tecnologías
- Descarga de CV
- Sección de contacto con links directos a email, LinkedIn y GitHub

---

## Tech Stack

**Frontend**
React · TypeScript · Tailwind CSS · Framer Motion · Vite

**Backend & Automation**
Node.js · n8n · Bitrix24 API · JavaScript

**Database**
PostgreSQL · Supabase

**Tools**
Git · GitHub · Vercel · Claude Code · VS Code

---

## Arquitectura

```
src/
├── App.tsx          # Toda la aplicación: tipos, clases de dominio, hooks, componentes y render
├── styles.css       # Variables CSS, utilidades Tailwind y overrides por tema (PS3 / dark)
└── assets/
    └── screenshots/ # Capturas de los proyectos (importadas directamente para Vercel)

public/
├── logos/           # Logotipos de tecnologías
├── avatar.jpg       # Foto de perfil
└── Curriculum_Vitae_Isaac_Jose_Garcia_Marquez.pdf
```

**Decisiones de diseño relevantes:**

- **Clases de dominio (`Project`, `Technology`, `ProjectRepository`):** el estado de la app está modelado con clases TypeScript en lugar de plain objects, lo que permite encapsular lógica de acceso (ej. `getDescription(lang)`) sin romper el modelo reactivo de React.
- **Temas via `data-theme`:** el sistema de temas usa un atributo `data-theme` en el elemento `<html>` combinado con overrides de CSS variables y clases Tailwind. Permite cambiar el tema completo sin re-render del árbol de componentes.
- **Ribbons animados (Canvas):** las partículas de fondo son ondas sinusoidales dibujadas en un `<canvas>` con `requestAnimationFrame`. Se recalculan solo al cambiar el tema, sin costo en renders de React.
- **Navegación por scroll:** la transición entre secciones se activa al llegar al límite del scroll (superior o inferior) con acumulación de delta para evitar cambios accidentales.
- **Importación directa de assets:** las imágenes se importan en `App.tsx` en lugar de usar rutas `/public`. Esto garantiza que Vite las incluya en el bundle y el deploy en Vercel no tenga rutas rotas.

---

## Proyectos destacados

### Formula Fácil UTN
> Herramienta educativa para memorización de fórmulas matemáticas mediante gamificación

- **+3.000 usuarios** alcanzados en 2026
- Módulos de Funciones, Inecuaciones, Geometría, Valor Absoluto e Intervalos
- Renderizado matemático con MathJax, gráficos SVG dinámicos
- Sistema de puntos, rachas y efectos de sonido
- **Stack:** HTML5 · CSS3 · JavaScript · MathJax · SVG
- 🔗 [formulafacilutn.neocities.org](https://formulafacilutn.neocities.org)

---

### Automatización de Reservas
> Pipeline de automatización que conecta reservas de Airbnb/Booking.com con el CRM Bitrix24

- Lectura de emails de confirmación vía IMAP (Airbnb y Booking.com)
- Clasificación automática del tipo de evento: nueva reserva, cancelación, mensaje, reseña
- Creación automática de deals en Bitrix24 con tareas vinculadas
- Validación anti-duplicados persistente con PostgreSQL/Supabase
- Fallback resiliente: crea el deal aunque el matching de propiedad falle
- **Stack:** n8n · Bitrix24 API · PostgreSQL · Supabase · JavaScript · IMAP
- 🔗 [github.com/Isaacxiddd/Reservation-automation](https://github.com/Isaacxiddd/Reservation-automation)

---

### HumanoIA
> Juego para distinguir rostros reales de generados por IA

- Interfaz responsive con sistema de puntuación en tiempo real
- Algoritmo de selección balanceado entre imágenes reales e IA
- **Stack:** HTML · CSS · JavaScript
- 🔗 [humanoia.neocities.org](https://humanoia.neocities.org)

---

## Instalación local

```bash
git clone https://github.com/Isaacxiddd/isaac-portfolio.git
cd isaac-portfolio
pnpm install
pnpm run dev
```

## Build de producción

```bash
pnpm run build
```

Output en `/dist`. El deploy en Vercel corre este comando automáticamente en cada push a `main`.

---

## Roadmap

- [ ] Más proyectos (backend y automatización)
- [ ] Blog técnico con casos de uso reales
- [ ] Optimización SEO y meta tags dinámicos
- [ ] Analytics de visitas
- [ ] Soporte para más idiomas (PT)
- [ ] Animaciones de entrada más elaboradas

---

## Technical Highlights

- React SPA construida íntegramente en TypeScript
- Sistema de temas (claro/oscuro) basado en CSS custom properties y `data-theme`, sin re-renders de React
- Internacionalización ES/EN implementada con clases de dominio y estado mínimo
- Animaciones de ribbons en Canvas con `requestAnimationFrame`, completamente fuera del ciclo de render de React
- Navegación por scroll con detección de límites y acumulación de delta para evitar cambios accidentales
- Deploy automático en Vercel desde `main`

---

## Contacto

| | |
|---|---|
| **LinkedIn** | [linkedin.com/in/isaacjosegarcia](https://www.linkedin.com/in/isaacjosegarcia) |
| **GitHub** | [github.com/Isaacxiddd](https://github.com/Isaacxiddd) |
| **Email** | isaacjosegarciamarquez@gmail.com |
| **Portfolio** | [isaacportafolio.vercel.app](https://isaacportafolio.vercel.app) |
