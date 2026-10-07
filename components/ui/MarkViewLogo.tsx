import React from "react";

export interface MarkViewLogoProps {
  size?: number;
  className?: string;
}

export function MarkViewLogo({ size = 32, className = "" }: MarkViewLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      aria-label="MarkView Logo"
    >
      <defs>
        <linearGradient id="mvBgCanvas" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f1118" />
          <stop offset="100%" stopColor="#06070a" />
        </linearGradient>

        <linearGradient id="mvBezelBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.22)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.06)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.10)" />
        </linearGradient>

        <linearGradient id="mvMGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#7dd3fc" />
          <stop offset="65%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="mvVGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <radialGradient id="mvAmbientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
          <stop offset="70%" stopColor="#2563eb" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Squircle Silhouette */}
      <rect width="512" height="512" rx="124" fill="url(#mvBgCanvas)" />
      <rect
        width="510"
        height="510"
        x="1"
        y="1"
        rx="123"
        fill="none"
        stroke="url(#mvBezelBorder)"
        strokeWidth="2"
      />

      {/* Ambient Focal Glow */}
      <circle cx="256" cy="265" r="140" fill="url(#mvAmbientGlow)" />

      <g id="markview-mark">
        {/* The Primary 'M' Glyph */}
        <path
          d="M 130 370 V 150 L 256 270 L 382 150 V 370"
          fill="none"
          stroke="url(#mvMGradient)"
          strokeWidth="46"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The Precision 'V' Chevron */}
        <path
          d="M 218 332 L 256 370 L 294 332"
          fill="none"
          stroke="url(#mvVGradient)"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
