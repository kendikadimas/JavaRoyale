import React from 'react';

/**
 * Subtle tropical leaf SVG decorations for section backgrounds.
 * Use as a decorative backdrop — no alt text needed (decorative only).
 */

interface LeafDecoProps {
  className?: string;
}

export function LeafDecoTopRight({ className = '' }: LeafDecoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={`absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-[0.04] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M180 20 C160 40 140 80 130 120 C120 160 130 190 150 200 C170 190 190 160 195 120 C200 80 195 40 180 20Z"
        fill="#4CAF50"
      />
      <path
        d="M150 50 C140 70 130 100 125 130 C120 160 130 180 145 185 C155 175 165 150 168 125 C170 100 160 65 150 50Z"
        fill="#F6D400"
      />
      <path
        d="M160 25 L155 40 M165 35 L160 50"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LeafDecoBottomLeft({ className = '' }: LeafDecoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={`absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 pointer-events-none opacity-[0.035] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M20 180 C40 160 60 120 70 80 C80 40 70 10 50 0 C30 10 10 40 5 80 C0 120 5 160 20 180Z"
        fill="#F39C12"
      />
      <path
        d="M50 150 C60 130 70 100 75 70 C80 40 70 20 55 15 C45 25 35 50 32 75 C30 100 40 135 50 150Z"
        fill="#4CAF50"
      />
    </svg>
  );
}

export function LeafDecoBottomRight({ className = '' }: LeafDecoProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={`absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 pointer-events-none opacity-[0.03] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M140 140 C120 120 100 80 95 50 C90 20 100 -5 120 -10 C135 0 145 25 148 55 C150 85 148 120 140 140Z"
        fill="#F6D400"
      />
      <path
        d="M115 115 C100 100 85 70 82 45 C79 20 87 2 102 0 C112 10 120 30 122 52 C124 75 118 100 115 115Z"
        fill="#D62828"
      />
    </svg>
  );
}
