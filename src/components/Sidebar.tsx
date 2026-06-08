import React from "react";

import { Lang, Theme, Translations } from "../types";
import AppConfig from "../config/AppConfig";

const sidebarIcons: React.ReactNode[] = [
  <svg key="about" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  <svg key="projects" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  <svg key="tech" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="contact" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>,
  <svg key="learn" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>,
];

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
      {sidebarIcons.map((icon, i) => (
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

export default Sidebar;
