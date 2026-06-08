# Plan de modularización — App.tsx

1924 líneas -> objetivo ~150-200 líneas

## Fase 1 — Tipos + datos puros (0 riesgo)
- `src/types/index.ts` → `Lang`, `Theme`, `Translations`, `TechDetail`
- `src/lib/TranslationManager.ts` → `TranslationManager` + objeto `translations`
- `src/models/Project.ts` → `Project` class
- `src/models/Technology.ts` → `Technology` class
- `src/config/AppConfig.ts` → `AppConfig`

## Fase 2 — Repositorios
- `src/repositories/ProjectRepository.ts` → `ProjectRepository`
- `src/repositories/TechnologyRepository.ts` → `TechnologyRepository`
- Actualizar import en `context/AppRepositoriesContext.tsx`

## Fase 3 — Utilidades
- `src/lib/NavigationManager.ts` → `NavigationManager`
- `src/hooks/usePrefersReducedMotion.ts`
- `src/hooks/useNavigation.ts`
- `src/hooks/useTranslations.ts`
- `src/hooks/useToast.ts`
- `src/hooks/useAnimatedCounter.ts`

## Fase 4 — Componentes UI
- `src/components/PS3Ribbons.tsx`
- `src/components/Modal.tsx`
- `src/components/SectionTitle.tsx`
- `src/components/TechPill.tsx`
- `src/components/RotatingImage.tsx`
- `src/lib/animations.ts` → variants (fadeUp, popIn, etc.)

## Fase 5 — Secciones
- `src/sections/AboutSection.tsx`
- `src/sections/ProjectsSection.tsx`
- `src/sections/TechnologiesSection.tsx`
- `src/sections/ContactSection.tsx`
- `src/sections/LearnMoreSection.tsx`

## Fase 6 — Limpieza final
- `src/components/ContentRenderer.tsx` (opcional)
- `src/components/Footer.tsx` (opcional)
- App.tsx queda con solo imports + OptimizedPortfolio
