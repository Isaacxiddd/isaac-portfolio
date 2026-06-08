import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Theme } from "./types";
import AppConfig from "./config/AppConfig";
import { ProjectRepository } from "./repositories/ProjectRepository";
import { TechnologyRepository } from "./repositories/TechnologyRepository";

import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";
import useNavigation from "./hooks/useNavigation";
import useTranslations from "./hooks/useTranslations";
import useToast from "./hooks/useToast";

import PS3Ribbons from "./components/PS3Ribbons";

import Sidebar from "./components/Sidebar";
import ContentRenderer from "./components/ContentRenderer";
import Footer from "./components/Footer";
import TerminalConsole from "./components/TerminalConsole";

// ========================= COMPONENTE PRINCIPAL =========================

export default function OptimizedPortfolio(): JSX.Element {
  const { activeIndex, setActive, next, previous } = useNavigation();
  const { lang, translations, toggleLanguage } = useTranslations();
  const reducedMotion = usePrefersReducedMotion();
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const toggleTheme = useCallback(() => setTheme(t => {
    const next = t === 'dark' ? 'ps3' : 'dark';
    localStorage.setItem('theme', next);
    return next;
  }), []);
  const { toast, ToastNode } = useToast(theme);

  const [terminalOpen, setTerminalOpen] = useState(false);
  const toggleTerminal = useCallback(() => setTerminalOpen(v => !v), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  const openUrl = useCallback((url: string) => window.open(url, '_blank', 'noopener'), []);

  const downloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = lang === 'en' ? AppConfig.CV_PATH_EN : AppConfig.CV_PATH;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [lang]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleTerminal]);

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
        onTerminalToggle={toggleTerminal}
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

      {/* Terminal (lazy-mount: solo existe en DOM cuando se abre) */}
      {terminalOpen && (
        <TerminalConsole
          lang={lang}
          translations={translations}
          projectRepo={projectRepo}
          techRepo={techRepo}
          theme={theme}
          onClose={closeTerminal}
          onOpenUrl={openUrl}
          onDownloadCV={downloadCV}
        />
      )}

      {/* Toast */}
      <ToastNode />
    </div>
  );
}