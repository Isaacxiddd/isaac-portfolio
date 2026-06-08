import { useState } from "react";
import { motion } from "framer-motion";

import { Lang, Translations } from "../types";
import AppConfig from "../config/AppConfig";
import SectionTitle from "../components/SectionTitle";
import { fadeUp } from "../lib/animations";

const ContactSection: React.FC<{
  translations: Translations;
  lang: Lang;
  onCopyEmail: () => void;
}> = ({ translations, lang, onCopyEmail }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: AppConfig.WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio contact from ${formData.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div>
      <SectionTitle>{translations.contact}</SectionTitle>

      <motion.div className="max-w-2xl mx-auto space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)] animate-pulse"></span>
          <span className="text-sm text-green-300 font-medium">
            {lang === "es" ? "Disponible para oportunidades remotas" : "Available for remote opportunities"}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="p-6 border border-cyberaccent/30 bg-black/30 backdrop-blur-sm rounded-xl space-y-4">
          {formStatus === 'success' ? (
            <div className="text-center py-6">
              <div className="text-green-400 text-2xl mb-2">✓</div>
              <p className="text-green-300 font-medium">{translations.formSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs opacity-70 mb-1">{translations.formName}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder={translations.formPlaceholderName}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs opacity-70 mb-1">{translations.formEmail}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder={translations.formPlaceholderEmail}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs opacity-70 mb-1">{translations.formMessage}</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder={translations.formPlaceholderMessage}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-cyberaccent/30 bg-black/30 backdrop-blur-sm focus:outline-none focus:border-cyberaccent/60 transition-colors placeholder:opacity-40 resize-none"
                />
              </div>
              {formStatus === 'error' && (
                <p className="text-red-400 text-xs">{translations.formError}</p>
              )}
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-2 text-sm border border-cyberaccent/50 rounded-lg bg-cyberaccent/20 hover:bg-cyberaccent/30 transition-colors disabled:opacity-50"
              >
                {formStatus === 'sending' ? translations.formSending : translations.formSend}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={AppConfig.openLinkedIn}
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-sm border border-cyberaccent/50 rounded bg-cyberaccent/20 hover:bg-cyberaccent/30 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.13 20.45H3.55V9h3.58v11.45z" />
            </svg>
            LinkedIn
          </button>
          <button
            onClick={AppConfig.openGitHub}
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-500/50 rounded bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.29 1.23a11.44 11.44 0 0 1 6 0C16.1 5.3 17.1 5.62 17.1 5.62c.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5z" />
            </svg>
            GitHub
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ContactSection;
