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
}

const TerminalConsole: React.FC<Props> = ({ lang, translations, projectRepo, techRepo, theme, onClose, onOpenUrl, onDownloadCV }) => {
  const {
    entries,
    inputValue,
    setInputValue,
    handleKeyDown,
    submitCommand,
  } = useTerminal({ lang, translations, projectRepo, techRepo, theme, onClose, onOpenUrl, onDownloadCV });

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
