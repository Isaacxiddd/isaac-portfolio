import { useState, useCallback, useRef, useEffect } from "react";
import { TerminalEntry, Lang, Translations } from "../types";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import { staticCommands, dynamicCommands, allCommands, CommandDef } from "../config/commands";

export interface TerminalContext {
  lang: Lang;
  translations: Translations;
  projectRepo: ProjectRepository;
  techRepo: TechnologyRepository;
  theme: string;
  onClose: () => void;
  onOpenUrl: (url: string) => void;
  onDownloadCV: () => void;
  onBocaToggle?: () => void;
}

const WELCOME_ES = `Bienvenido a la terminal interactiva de Isaac.
Escribí 'help' para ver los comandos disponibles.`;
const WELCOME_EN = `Welcome to Isaac's interactive terminal.
Type 'help' to see available commands.`;

export default function useTerminal(context: TerminalContext) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 0,
      input: "",
      output: context.lang === "es" ? WELCOME_ES : WELCOME_EN,
      typedLength: (context.lang === "es" ? WELCOME_ES : WELCOME_EN).length,
      isTyping: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const idCounter = useRef(1);
  const openTime = useRef(0);
  useEffect(() => { openTime.current = Date.now(); }, []);

  const bocaToggleRef = useRef(context.onBocaToggle);
  bocaToggleRef.current = context.onBocaToggle;

  const reduceMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const typewriterSpeed = reduceMotion ? 0 : 12;

  const typeEntry = useCallback((entryId: number, fullOutput: string, onComplete?: () => void) => {
    if (typewriterSpeed === 0) {
      setEntries(prev => prev.map(e =>
        e.id === entryId ? { ...e, typedLength: fullOutput.length, isTyping: false } : e
      ));
      setIsTyping(false);
      onComplete?.();
      return;
    }

    let i = 0;
    const maxLen = fullOutput.length;
    const interval = setInterval(() => {
      i++;
      setEntries(prev => prev.map(e =>
        e.id === entryId ? { ...e, typedLength: i, isTyping: i < maxLen } : e
      ));
      if (i >= maxLen) {
        clearInterval(interval);
        setIsTyping(false);
        onComplete?.();
      }
    }, typewriterSpeed);
    return () => clearInterval(interval);
  }, [typewriterSpeed]);

  const addEntry = useCallback((input: string, output: string, onComplete?: () => void) => {
    const id = idCounter.current++;
    const entry: TerminalEntry = {
      id,
      input,
      output,
      typedLength: 0,
      isTyping: true,
    };
    setEntries(prev => [...prev, entry]);
    setIsTyping(true);
    setTimeout(() => typeEntry(id, output, onComplete), 20);
  }, [typeEntry]);

  const getStaticResponse = useCallback((cmd: CommandDef, _args: string[], lang: Lang): string | null => {
    if (cmd.response) {
      return cmd.response[lang];
    }
    return null;
  }, []);

  const getDynamicResponse = useCallback((cmdName: string, _args: string[], ctx: TerminalContext): string => {
    const { lang, translations, projectRepo, techRepo } = ctx;

    switch (cmdName) {
      case 'about':
        return translations.bio;

      case 'skills': {
        const mastered = techRepo.getMasteredTechnologies();
        const learning = techRepo.getLearningTechnologies();
        const tools = techRepo.getToolTechnologies();

        const fmt = (items: { name: string }[]) => items.map(t => `  - ${t.name}`).join('\n');

        if (lang === 'es') {
          return `=== Tecnologías ===\n\nManejo:\n${fmt(mastered)}\n\nAprendiendo:\n${fmt(learning)}\n\nHerramientas:\n${fmt(tools)}`;
        }
        return `=== Technologies ===\n\nMastered:\n${fmt(mastered)}\n\nLearning:\n${fmt(learning)}\n\nTools:\n${fmt(tools)}`;
      }

      case 'projects': {
        const projects = projectRepo.getAllProjects();

        const lines = projects.map((p, i) => {
          const desc = p.description[lang];
          return `  ${i + 1}. ${p.getName(lang)}\n     ${desc}`;
        });

        if (lang === 'es') {
          return `=== Proyectos ===\n\n${lines.join('\n\n')}`;
        }
        return `=== Projects ===\n\n${lines.join('\n\n')}`;
      }

      case 'neofetch': {
        return `       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\`\\
   \\___)=(___/

  Isaac Garcia
  -------------------------
  OS:        Software Engineering Student
  Host:      UTN FRBA
  Kernel:    JavaScript / TypeScript
  Runtime:   Node.js
  Database:  PostgreSQL
  Tools:     Git, Docker, Linux
  Languages: ES, EN, PT, IT
  Editor:    VS Code
  Uptime:    18 years
  Projects:  Formula Fácil, Reservation Automation
  Status:    Building and learning`;
      }

      default:
        return lang === 'es'
          ? `Comando no encontrado: ${cmdName}. Escribí 'help' para ver los comandos disponibles.`
          : `Command not found: ${cmdName}. Type 'help' for available commands.`;
    }
  }, []);

  const executeCommand = useCallback((input: string): { output: string; onComplete?: () => void } => {
    const trimmed = input.trim();
    if (!trimmed) return { output: "" };

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase().replace(/^\//, '');
    const args = parts.slice(1);

    if (cmdName === 'clear') {
      setEntries([]);
      return { output: "" };
    }

    if (cmdName === 'help') {
      const categories = [...new Set(allCommands.map(c => c.category))] as string[];
      const catLabels: Record<string, { es: string; en: string }> = {
        profile: { es: 'Perfil', en: 'Profile' },
        projects: { es: 'Proyectos', en: 'Projects' },
        fun: { es: 'Diversión', en: 'Fun' },
        system: { es: 'Sistema', en: 'System' },
        contact: { es: 'Contacto', en: 'Contact' },
      };

      const lines: string[] = [];
      const lang = context.lang;
      lines.push(lang === 'es' ? 'Comandos disponibles:\n' : 'Available commands:\n');

      for (const cat of categories) {
        const label = catLabels[cat]?.[lang] || cat;
        lines.push(`  ${label}:`);
        const cmds = allCommands.filter(c => c.category === cat);
        const maxLen = Math.max(...cmds.map(c => c.name.length));
        for (const cmd of cmds) {
          const desc = cmd.description[lang];
          lines.push(`    ${cmd.name.padEnd(maxLen + 2)}${desc}`);
        }
        lines.push('');
      }

      lines.push(lang === 'es' ? 'Sugerencia: probá /secret, /bossfight, /neofetch' : 'Tip: try /secret, /bossfight, /neofetch');
      return { output: lines.join('\n') };
    }

    if (cmdName === 'echo') {
      return { output: args.join(' ') || '' };
    }

    if (cmdName === 'date') {
      return { output: new Date().toLocaleString(context.lang === 'es' ? 'es-AR' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })};
    }

    if (cmdName === 'uptime') {
      const seconds = Math.floor((Date.now() - openTime.current) / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const hours = Math.floor(mins / 60);
      const remainMins = mins % 60;

      if (context.lang === 'es') {
        if (hours > 0) return { output: `  ${hours}h ${remainMins}m ${secs}s desde que abriste el portfolio.` };
        return { output: `  ${mins}m ${secs}s desde que abriste el portfolio.` };
      }
      if (hours > 0) return { output: `  ${hours}h ${remainMins}m ${secs}s since you opened the portfolio.` };
      return { output: `  ${mins}m ${secs}s since you opened the portfolio.` };
    }

    if (cmdName === 'github') {
      const url = "https://github.com/isaacxiddd";
      context.onOpenUrl(url);
      return { output: url };
    }

    if (cmdName === 'linkedin') {
      const url = "https://www.linkedin.com/in/isaacjosegarcia";
      context.onOpenUrl(url);
      return { output: url };
    }

    if (cmdName === 'cv') {
      const lang = context.lang;
      const output = lang === 'es'
        ? `Clonando repositorio...\nRecibiendo objetos:   ████████████████████ 100% (1847/1847)\nResolviendo deltas:   ████████████████████ 100% (1847/1847)\nCV descargado.`
        : `Cloning repository...\nReceiving objects:    ████████████████████ 100% (1847/1847)\nResolving deltas:    ████████████████████ 100% (1847/1847)\nCV downloaded.`;
      return { output, onComplete: context.onDownloadCV };
    }

    if (cmdName === 'boca') {
      bocaToggleRef.current?.();
      const isBoca = document.documentElement.classList.contains('boca-mode');
      return {
        output: isBoca
          ? (context.lang === 'es'
            ? '¡Modo Boca activado!\n\nDale Boca dale...\n\nEscribí /boca de nuevo para desactivar.'
            : 'Boca mode activated!\n\nLet\'s go Boca...\n\nType /boca again to deactivate.')
          : (context.lang === 'es'
            ? 'Modo Boca desactivado. Volviendo a la normalidad...'
            : 'Boca mode deactivated. Returning to normal...')
      };
    }

    const staticCmd = staticCommands.find(c => c.name === cmdName);
    if (staticCmd) {
      const resp = getStaticResponse(staticCmd, args, context.lang);
      if (resp !== null) return { output: resp };
    }

    const dynCmd = dynamicCommands.find(c => c.name === cmdName);
    if (dynCmd) {
      return { output: getDynamicResponse(cmdName, args, context) };
    }

    return {
      output: context.lang === 'es'
        ? `bash: ${cmdName}: comando no encontrado`
        : `bash: ${cmdName}: command not found`
    };
  }, [context, getStaticResponse, getDynamicResponse]);

  const submitCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    if (trimmed !== 'clear') {
      setCmdHistory(prev => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    const { output, onComplete } = executeCommand(trimmed);

    if (trimmed === 'clear') {
      setInputValue("");
      return;
    }

    if (output === "") return;

    addEntry(trimmed, output, onComplete);
    setInputValue("");
  }, [isTyping, executeCommand, addEntry]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitCommand(inputValue);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInputValue(cmdHistory[newIdx]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIdx = historyIndex + 1;
      if (newIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(newIdx);
        setInputValue(cmdHistory[newIdx]);
      }
      return;
    }

    if (e.key === 'Escape') {
      context.onClose();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      setEntries([]);
      return;
    }
  }, [inputValue, cmdHistory, historyIndex, submitCommand, context]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries([
      {
        id: 0,
        input: "",
        output: context.lang === "es" ? WELCOME_ES : WELCOME_EN,
        typedLength: (context.lang === "es" ? WELCOME_ES : WELCOME_EN).length,
        isTyping: false,
      },
    ]);
  }, [context.lang]);

  return {
    entries,
    inputValue,
    setInputValue: handleInputChange,
    handleKeyDown,
    cmdHistory,
    historyIndex,
    isTyping,
    submitCommand: () => submitCommand(inputValue),
  };
}
