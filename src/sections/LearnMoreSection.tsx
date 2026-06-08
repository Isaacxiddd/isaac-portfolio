import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Lang, Translations } from "../types";
import SectionTitle from "../components/SectionTitle";
import useAnimatedCounter from "../hooks/useAnimatedCounter";
import { fadeUp } from "../lib/animations";

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

        <motion.div variants={fadeUp} className="p-5 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl">
          <p className="text-sm text-gray-300 leading-relaxed">
            {lang === "es"
              ? "Desarrollador Web Fullstack. Desarrollo aplicaciones web, automatizaciones e integraciones de APIs utilizando Python y JavaScript. Mis proyectos han sido utilizados por más de 3.000 usuarios. Actualmente profundizando en React, TypeScript y desarrollo full stack."
              : "Systems Engineering student at UTN. I build web applications, automations and API integrations using Python and JavaScript. My projects have been used by more than 3,000 users. Currently deepening my knowledge in React, TypeScript and full stack development."}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">

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

export default LearnMoreSection;
