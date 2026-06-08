import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { Lang, TechDetail, Translations } from "../types";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import SectionTitle from "../components/SectionTitle";
import TechPill from "../components/TechPill";
import Modal from "../components/Modal";
import { fadeUp, staggerPills } from "../lib/animations";

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

export default TechnologiesSection;
