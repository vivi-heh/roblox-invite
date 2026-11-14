import React from 'react';

interface PartyDecorationsProps {
  variant?: 'welcome' | 'party';
}

export const PartyDecorations: React.FC<PartyDecorationsProps> = ({ variant = 'welcome' }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top Left Bunting */}
      <svg
        viewBox="0 0 240 100"
        className="absolute -top-1 -left-2 w-36 opacity-95"
      >
        <path d="M -10 14 Q 110 52 230 8" fill="none" stroke="#475569" strokeWidth="3" />
        <polygon points="8,18 44,28 20,62" fill="#E95D7A" />
        <polygon points="54,29 90,35 68,70" fill="#7AC143" />
        <polygon points="100,35 138,35 118,72" fill="#F47C20" />
        <polygon points="148,33 184,25 170,62" fill="#2D9CDB" />
        <polygon points="194,22 224,12 214,48" fill="#7B4B94" />
      </svg>

      {/* Top Right Bunting */}
      <svg
        viewBox="0 0 240 100"
        className="absolute -top-1 -right-2 w-36 opacity-95"
      >
        <path d="M 10 8 Q 130 52 250 14" fill="none" stroke="#475569" strokeWidth="3" />
        <polygon points="16,12 46,22 26,48" fill="#7B4B94" />
        <polygon points="56,25 92,33 70,62" fill="#F8C630" />
        <polygon points="102,35 140,35 122,72" fill="#F47C20" />
        <polygon points="150,35 186,29 172,70" fill="#2D9CDB" />
        <polygon points="196,28 232,18 220,62" fill="#E95D7A" />
      </svg>

      {/* Soft Fluffy Clouds */}
      <svg viewBox="0 0 180 90" className="absolute top-20 -left-4 w-24 opacity-80">
        <path
          d="M 35 72 Q 16 72 16 54 Q 16 38 33 36 Q 42 16 66 18 Q 86 6 108 20 Q 130 18 140 36 Q 162 38 162 56 Q 162 72 142 72 Z"
          fill="#E8F4FB"
        />
      </svg>
      <svg viewBox="0 0 180 90" className="absolute top-24 -right-4 w-24 opacity-80">
        <path
          d="M 35 72 Q 16 72 16 54 Q 16 38 33 36 Q 42 16 66 18 Q 86 6 108 20 Q 130 18 140 36 Q 162 38 162 56 Q 162 72 142 72 Z"
          fill="#E8F4FB"
        />
      </svg>

      {/* Compact Corner Floating Balloons */}
      <div className="absolute left-1.5 bottom-24 animate-balloon opacity-90">
        <svg viewBox="0 0 110 180" className="w-12 overflow-visible">
          <ellipse cx="44" cy="48" rx="28" ry="35" fill="#F8C630" stroke="#1E2A4A" strokeWidth="3" />
          <ellipse cx="34" cy="35" rx="6" ry="11" fill="#FFF3B8" opacity="0.7" transform="rotate(-15 34 35)" />
          <polygon points="39,83 49,83 44,90" fill="#F8C630" stroke="#1E2A4A" strokeWidth="2.5" />
          <path d="M 44 90 Q 34 114 46 138 Q 54 156 38 176" fill="none" stroke="#F47C20" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute right-1.5 bottom-24 animate-balloon-slow opacity-90">
        <svg viewBox="0 0 110 180" className="w-12 overflow-visible">
          <ellipse cx="66" cy="48" rx="28" ry="35" fill="#EE6A84" stroke="#1E2A4A" strokeWidth="3" />
          <ellipse cx="56" cy="35" rx="6" ry="11" fill="#FFD1DB" opacity="0.65" transform="rotate(-15 56 35)" />
          <polygon points="61,83 71,83 66,90" fill="#EE6A84" stroke="#1E2A4A" strokeWidth="2.5" />
          <path d="M 66 90 Q 76 114 64 138 Q 56 156 72 176" fill="none" stroke="#E95D7A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {variant === 'party' && (
        <>
          <svg viewBox="0 0 32 32" className="absolute top-32 left-6 w-4 h-4 text-[#F8C630]">
            <path d="M16 0 L20 12 L32 16 L20 20 L16 32 L12 20 L0 16 L12 12 Z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 32 32" className="absolute top-36 right-6 w-4 h-4 text-[#E95D7A]">
            <path d="M16 0 L20 12 L32 16 L20 20 L16 32 L12 20 L0 16 L12 12 Z" fill="currentColor" />
          </svg>
        </>
      )}

      {/* Bottom Rolling Party Waves */}
      <svg
        viewBox="0 0 440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-12"
      >
        <path d="M0,34 Q110,4 220,30 T440,22 L440,80 L0,80 Z" fill="#F9DE78" />
        <path d="M0,52 Q130,28 260,56 T440,46 L440,80 L0,80 Z" fill="#80C8E8" />
        <circle cx="52" cy="64" r="4.5" fill="#FFFFFF" opacity="0.85" />
        <circle cx="148" cy="60" r="3.5" fill="#FFFFFF" opacity="0.85" />
        <circle cx="310" cy="66" r="4.5" fill="#FFFFFF" opacity="0.85" />
        <circle cx="390" cy="60" r="3.5" fill="#FFFFFF" opacity="0.85" />
      </svg>
    </div>
  );
};
