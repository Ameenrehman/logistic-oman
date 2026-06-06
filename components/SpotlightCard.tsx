"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string; // e.g. "rgba(229, 169, 60, 0.15)" (amber) or "rgba(227, 27, 35, 0.15)" (crimson)
  borderColor?: string; // e.g. "rgba(229, 169, 60, 0.4)"
}

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(229, 169, 60, 0.12)",
  borderColor = "rgba(229, 169, 60, 0.3)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-lg border border-border-glass bg-chamber/80 p-8 backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        cursor: "pointer",
      }}
      {...props}
    >
      {/* Background Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-[-1px] z-1 rounded-lg transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 80%)`,
        }}
      />

      {/* Card Contents */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
