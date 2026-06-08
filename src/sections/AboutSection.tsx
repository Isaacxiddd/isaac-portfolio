import { motion } from "framer-motion";

import { Lang, Theme, Translations } from "../types";
import AppConfig from "../config/AppConfig";
import SectionTitle from "../components/SectionTitle";
import { fadeUp } from "../lib/animations";

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
                className="explore-link text-sm font-semibold cursor-pointer inline-block"
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

export default AboutSection;
