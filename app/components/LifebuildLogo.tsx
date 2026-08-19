"use client";

import React from "react";

interface LifebuildLogoProps {
  variant?: "icon" | "full" | "horizontal";
  className?: string;
  color?: string; // default is brand purple '#3b2262'
  size?: number;
}

export default function LifebuildLogo({
  variant = "horizontal",
  className = "",
  color = "#3b2262",
  size,
}: LifebuildLogoProps) {
  if (variant === "icon") {
    const iconSize = size || 36;
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        className={className}
        style={{ color }}
      >
        <path
          d="M 100 26 L 44 72 A 8 8 0 0 0 40 78 L 40 162 A 16 16 0 0 0 56 178 L 144 178 A 16 16 0 0 0 160 162 L 160 80 A 8 8 0 0 0 156 74 L 100 26 Z"
          stroke={color === "currentColor" ? "currentColor" : color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 100 176 L 100 106"
          stroke={color === "currentColor" ? "currentColor" : color}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 100 106 C 86 92, 86 64, 100 48 C 114 64, 114 92, 100 106 Z"
          fill={color === "currentColor" ? "currentColor" : color}
        />
        <path
          d="M 96 112 C 78 116, 52 104, 52 82 C 70 78, 92 94, 96 112 Z"
          fill={color === "currentColor" ? "currentColor" : color}
        />
        <path
          d="M 104 112 C 122 116, 148 104, 148 82 C 130 78, 108 94, 104 112 Z"
          fill={color === "currentColor" ? "currentColor" : color}
        />
      </svg>
    );
  }

  if (variant === "full") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LifebuildLogo variant="icon" color={color} size={size || 64} />
        <span
          className="font-extrabold tracking-tight mt-2 block"
          style={{
            fontSize: size ? size * 0.5 : 24,
            color: color === "currentColor" ? "currentColor" : color,
            fontFamily: "var(--font-heading, sans-serif)",
          }}
        >
          Lifebuild<span style={{ color: "#d4af37" }}>.</span>
        </span>
        <span
          className="text-[9px] font-bold tracking-[3px] uppercase block"
          style={{ color: color === "currentColor" ? "currentColor" : color, opacity: 0.85 }}
        >
          REBUILDING EVERYWHERE YOU GO
        </span>
      </div>
    );
  }

  // Default: Horizontal lockup (Icon + Wordmark)
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LifebuildLogo variant="icon" color={color} size={size || 34} />
      <div className="flex flex-col text-left leading-none">
        <span
          className="font-extrabold text-lg sm:text-xl tracking-tight text-inherit block"
          style={{
            color: color === "currentColor" ? "currentColor" : color,
            fontFamily: "var(--font-heading, sans-serif)",
          }}
        >
          lifebuild<span style={{ color: "#d4af37" }}>.</span>
        </span>
        <span
          className="text-[8px] font-mono font-bold tracking-[2px] uppercase block mt-0.5"
          style={{ color: color === "currentColor" ? "currentColor" : color, opacity: 0.75 }}
        >
          REBUILDING
        </span>
      </div>
    </div>
  );
}
