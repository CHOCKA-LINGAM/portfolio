"use client";

import React from "react";
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
  const sizeClasses = {
    sm: "w-10 h-10 border-2",
    md: "w-14 h-14 border-2 sm:w-16 sm:h-16",
    lg: "w-20 h-20 sm:w-24 sm:h-24 border-3",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* ── SNAPCHAT / INSTAGRAM STYLE ANIMATED GRADIENT RING ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-indigo-500 opacity-90 blur-[2px] group-hover:opacity-100 group-hover:blur-[4px] transition-all"
      />

      {/* Main Avatar Button with High-Resolution Uncompressed Image Rendering */}
      <button
        onClick={onClick}
        className={`relative ${sizeClasses} rounded-full overflow-hidden bg-slate-900 border-sky-400 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95 group cursor-pointer`}
        title="Tap to watch Chockalingam's Story Highlights"
        aria-label="Watch Developer Story Highlights"
      >
        <Image
          src="/avatars/in-workspace.png"
          alt="Chockalingam Balan"
          fill
          unoptimized={true}
          className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
          priority
        />
        
        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white shadow-lg" />
        </div>
      </button>

      {/* ── PULSING STORY BADGE OVERLAY ── */}
      {showBadge && (
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-sky-400/50 text-[10px] font-extrabold text-sky-300 shadow-xl flex items-center gap-1 cursor-pointer whitespace-nowrap backdrop-blur-md z-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>WATCH STORY</span>
        </motion.button>
      )}
    </div>
  );
};
