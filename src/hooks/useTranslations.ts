import { useState, useCallback, useMemo } from "react";
import { Lang } from "../types";
import TranslationManager from "../lib/TranslationManager";

export default function useTranslations() {
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
