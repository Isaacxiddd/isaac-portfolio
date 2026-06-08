import React from "react";
import { motion } from "framer-motion";
import { Lang, Translations } from "../types";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import useTerminal from "../hooks/useTerminal";

interface Props {
  lang: Lang;
  translations: Translations;
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
  theme: string;
  onClose: () => void;
  onOpenUrl: (url: string) => void;
  onDownloadCV: () => void;
  onBocaToggle?: () => void;
  isBocaActive?: boolean;
  isBocaPlaying?: boolean;
  onBocaPause?: () => void;
  onBocaStop?: () => void;
}

const TerminalConsole: React.FC<Props> = ({ lang, translations, projectRepo, techRepo, theme, onClose, onOpenUrl, onDownloadCV, onBocaToggle, isBocaActive, isBocaPlaying, onBocaPause, onBocaStop }) => {
  const {
    entries,
    inputValue,
    setInputValue,
    handleKeyDown,
  } = useTerminal({ lang, translations, projectRepo, techRepo, theme, onClose, onOpenUrl, onDownloadCV, onBocaToggle });

  const bodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  React.useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries]);

  const prompt = "isaac@portfolio:~$ ";

  return (
    <motion.div
      className="terminal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="terminal-container"
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header">
          <div className="terminal-dot close" />
          <div className="terminal-dot minimize" />
          <div className="terminal-dot maximize" />
          <span className="terminal-title">Terminal — bash</span>
          <button className="terminal-close-btn" onClick={onClose} aria-label="Close terminal">
            ✕
          </button>
        </div>

        {isBocaActive && (
          <div className="terminal-boca-bar">
            <svg className="terminal-boca-shield" viewBox="0 0 100 120" width="18" height="22" aria-hidden>
              <path d="M50 5 L90 25 L90 55 C90 80 70 105 50 115 C30 105 10 80 10 55 L10 25 Z" fill="#ffd700" stroke="#003da5" strokeWidth="3"/>
              <path d="M30 35 L70 35 L70 45 L55 45 L55 85 L45 85 L45 45 L30 45 Z" fill="#003da5"/>
            </svg>
            <span className="terminal-boca-label">BOCA</span>
            <button
              className="terminal-boca-btn"
              onClick={onBocaPause}
              aria-label={isBocaPlaying ? "Pause" : "Play"}
              title={isBocaPlaying ? "Pause" : "Play"}
            >
              {isBocaPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <polygon points="6,3 20,12 6,21"/>
                </svg>
              )}
            </button>
            <button
              className="terminal-boca-btn"
              onClick={onBocaStop}
              aria-label="Stop"
              title="Stop"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="4" y="4" width="16" height="16" rx="2"/>
              </svg>
            </button>
          </div>
        )}
        <div ref={bodyRef} className="terminal-body">
          {entries.map((entry) => (
            <div key={entry.id} className="terminal-entry">
              {entry.input && (
                <div className="terminal-input-line">
                  <span className="terminal-prompt">{prompt}</span>
                  <span className="terminal-input-text">{entry.input}</span>
                </div>
              )}
              {entry.output && (
                <div className="terminal-output">
                  {entry.isTyping
                    ? entry.output.slice(0, entry.typedLength)
                    : entry.output
                  }
                  {entry.isTyping && <span className="terminal-cursor" />}
                </div>
              )}
            </div>
          ))}
        </div>


        <div className="terminal-input-area">
          <span className="terminal-prompt">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TerminalConsole;
