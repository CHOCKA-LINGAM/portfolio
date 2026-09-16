"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface InteractiveAvatarProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  className?: string;
}

export const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({
  onClick,
  size = "md",
  showBadge = true,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState("/avatars/developer-themed.png");

  const sizeClasses = {
    sm: "w-11 h-11 border-2",
    md: "w-16 h-16 border-2 sm:w-18 sm:h-18",
    lg: "w-24 h-24 sm:w-28 sm:h-28 border-3",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* ── SNAPCHAT / INSTAGRAM STYLE ANIMATED GRADIENT RING ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] via-emerald-400 to-indigo-500 opacity-90 blur-[2px] group-hover:opacity-100 group-hover:blur-[4px] transition-all"
      />

      {/* Main Developer Backend Avatar Button */}
      <button
        onClick={onClick}
        className={`relative ${sizeClasses} rounded-full overflow-hidden bg-[var(--surface-2)] border-[var(--accent)] shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95 group cursor-pointer`}
        title="Tap to watch Chockalingam's Story Highlights"
        aria-label="Watch Developer Story Highlights"
      >
        <Image
          src={imgSrc}
          alt="Chockalingam Balan - Developer Workspace"
          fill
          unoptimized={true}
          onError={() => setImgSrc("/avatars/in-workspace.png")}
          className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
          priority
        />
        
        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white shadow-lg" />
        </div>
      </button>

      {/* ── PULSING STORY BADGE OVERLAY ── */}
      {showBadge && (
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-[var(--surface-1)] border border-[var(--accent)]/50 text-[10px] font-extrabold text-[var(--accent)] shadow-xl flex items-center gap-1 cursor-pointer whitespace-nowrap backdrop-blur-md z-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>WATCH STORY</span>
        </motion.button>
      )}
    </div>
  );
};
