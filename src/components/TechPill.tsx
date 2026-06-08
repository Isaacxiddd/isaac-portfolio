import React from "react";
import { motion } from "framer-motion";

import { popIn } from "../lib/animations";

type TechPillProps = {
  name: string;
  logo: string;
  variant?: "ok" | "learn" | "tool";
  hasDetail?: boolean;
  shine?: boolean;
  tooltip?: string;
  onClick?: () => void;
};

const TechPill: React.FC<TechPillProps> = (props) => {
  const { name, logo, variant = "ok", hasDetail = false, shine = false, tooltip, onClick } = props;
  const base = "relative flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer min-w-[120px] min-h-[120px] justify-center group";
  const variantClasses =
    variant === "ok"
      ? "bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/25"
      : variant === "tool"
      ? "bg-slate-500/10 border border-slate-400/30 hover:bg-slate-500/20 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-500/20"
      : "bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/25";

  return (
    <motion.div variants={popIn} className="relative group">
      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 px-3 py-2 rounded-lg text-xs leading-snug text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg"
          style={{ background: 'var(--tooltip-bg, #111)', color: 'var(--tooltip-text, #fff)', border: '1px solid rgba(255,255,255,0.12)' }}>
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: 'var(--tooltip-bg, #111)' }} />
        </div>
      )}
      <div className={`${base} ${variantClasses} ${shine ? "pill-shine" : ""} ${hasDetail ? "hover:brightness-110" : ""}`} onClick={onClick}>
        <img src={logo} alt={name} loading="lazy" decoding="async" className="w-12 h-12 object-contain" />
        <span className="text-sm font-medium text-center">{name}</span>
      </div>
    </motion.div>
  );
};
export default React.memo(TechPill);
