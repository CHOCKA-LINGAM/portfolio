"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  tilt?: "none" | "left" | "right";
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  tilt = "none",
  spotlightColor,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const tiltClass =
    tilt === "left"
      ? "-rotate-[0.5deg]"
      : tilt === "right"
      ? "rotate-[0.6deg]"
      : "";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 350, damping: 25 } }}
      className={`relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6 transition-all duration-300 backdrop-blur-xl ${tiltClass} ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 20px 40px -12px rgba(var(--ar), 0.16), 0 0 0 1px rgba(var(--ar), 0.3)"
          : "0 4px 20px rgba(0, 0, 0, 0.4)",
      }}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightColor
            ? `radial-gradient(280px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`
            : `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(var(--ar), 0.14), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
