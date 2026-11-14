import React from 'react';
import { AccessoryId, BottomId, FaceId, HairstyleId, TopId } from '../types/game';

export const FaceIcon: React.FC<{ id: FaceId }> = ({ id }) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      <rect x="7" y="8" width="26" height="24" rx="7" fill="#FFE2CE" stroke={outline} strokeWidth="2.2" />
      {id === 'wink' ? (
        <>
          <circle cx="15" cy="18" r="2" fill={outline} />
          <path d="M22 18 Q25 15 28 18" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : id === 'starry-eyes' ? (
        <>
          <circle cx="15" cy="18" r="2.5" fill="#F8C630" stroke={outline} strokeWidth="1.4" />
          <circle cx="25" cy="18" r="2.5" fill="#F8C630" stroke={outline} strokeWidth="1.4" />
        </>
      ) : id === 'sweet-blush' ? (
        <>
          <path d="M12 18 Q15 15 18 18" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 18 Q25 15 28 18" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="15" cy="18" r="2" fill={outline} />
          <circle cx="25" cy="18" r="2" fill={outline} />
        </>
      )}

      {id === 'big-grin' ? (
        <path d="M14 23 Q20 30 26 23 Z" fill="#E95D7A" stroke={outline} strokeWidth="1.6" />
      ) : id === 'cool-smirk' ? (
        <path d="M15 25 Q21 26 26 22" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
      ) : id === 'surprised' ? (
        <circle cx="20" cy="25" r="2.6" fill="#E95D7A" stroke={outline} strokeWidth="1.6" />
      ) : id === 'silly-tongue' ? (
        <>
          <path d="M15 24 Q20 28 25 24" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
          <circle cx="21" cy="27" r="2" fill="#E95D7A" />
        </>
      ) : (
        <path d="M15 24 Q20 28 25 24" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
};

export const HairstyleIcon: React.FC<{ id: HairstyleId; color: string }> = ({ id, color }) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      <rect x="10" y="12" width="20" height="19" rx="5" fill="#FFE2CE" stroke={outline} strokeWidth="2" />
      {id === 'short' && (
        <path d="M9 17 Q9 7 20 7 Q31 7 31 17 Q26 13 20 15 Q14 13 9 17 Z" fill={color} stroke={outline} strokeWidth="2" />
      )}
      {id === 'long' && (
        <>
          <path d="M7 16 Q7 7 20 7 Q33 7 33 16 L32 34 L8 34 Z" fill={color} stroke={outline} strokeWidth="2" />
          <rect x="12" y="15" width="16" height="15" rx="4" fill="#FFE2CE" stroke={outline} strokeWidth="1.5" />
        </>
      )}
      {id === 'ponytail' && (
        <>
          <path d="M27 12 C35 10, 37 22, 32 29 C29 26, 28 20, 27 16 Z" fill={color} stroke={outline} strokeWidth="2" />
          <path d="M9 17 Q9 8 20 8 Q31 8 31 17 Q25 13 20 14 Q15 13 9 17 Z" fill={color} stroke={outline} strokeWidth="2" />
        </>
      )}
      {id === 'twin-ponytails' && (
        <>
          <path d="M10 14 C4 12, 3 23, 7 29 Z" fill={color} stroke={outline} strokeWidth="2" />
          <path d="M30 14 C36 12, 37 23, 33 29 Z" fill={color} stroke={outline} strokeWidth="2" />
          <path d="M9 17 Q9 8 20 8 Q31 8 31 17 Z" fill={color} stroke={outline} strokeWidth="2" />
        </>
      )}
      {id === 'bob' && (
        <path d="M8 25 Q7 7 20 7 Q33 7 32 25 L29 25 L29 15 L11 15 L11 25 Z" fill={color} stroke={outline} strokeWidth="2" />
      )}
      {id === 'curly' && (
        <g fill={color} stroke={outline} strokeWidth="1.8">
          <circle cx="11" cy="13" r="5" />
          <circle cx="20" cy="10" r="5.5" />
          <circle cx="29" cy="13" r="5" />
        </g>
      )}
      {id === 'spiky' && (
        <path d="M9 17 L8 10 L14 12 L16 5 L20 10 L25 4 L27 12 L32 10 L31 17 Z" fill={color} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      )}
      {id === 'side-part' && (
        <path d="M9 17 Q9 7 21 7 Q31 8 31 17 Q24 12 12 16 Z" fill={color} stroke={outline} strokeWidth="2" />
      )}
      {id === 'space-buns' && (
        <>
          <circle cx="10" cy="10" r="5" fill={color} stroke={outline} strokeWidth="2" />
          <circle cx="30" cy="10" r="5" fill={color} stroke={outline} strokeWidth="2" />
          <path d="M10 17 Q10 10 20 10 Q30 10 30 17 Z" fill={color} stroke={outline} strokeWidth="2" />
        </>
      )}
      {id === 'braids' && (
        <>
          <circle cx="8" cy="22" r="3" fill={color} stroke={outline} strokeWidth="1.6" />
          <circle cx="8" cy="28" r="2.8" fill={color} stroke={outline} strokeWidth="1.6" />
          <circle cx="32" cy="22" r="3" fill={color} stroke={outline} strokeWidth="1.6" />
          <circle cx="32" cy="28" r="2.8" fill={color} stroke={outline} strokeWidth="1.6" />
          <path d="M9 17 Q9 8 20 8 Q31 8 31 17 Z" fill={color} stroke={outline} strokeWidth="2" />
        </>
      )}
      {id === 'mohawk' && (
        <path d="M16 15 L17 4 L23 4 L24 15 Z" fill={color} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      )}
      {id === 'afro' && (
        <circle cx="20" cy="14" r="11" fill={color} stroke={outline} strokeWidth="2" />
      )}
    </svg>
  );
};

export const TopIcon: React.FC<{
  id: TopId;
  primary: string;
  secondary: string;
  accent: string;
  longSleeve: boolean;
}> = ({ id, primary, secondary, accent, longSleeve }) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      <rect
        x="5"
        y="9"
        width="7"
        height={longSleeve ? 21 : 11}
        rx="2"
        fill={id === 'varsity-jacket' || id === 'party-vest' ? secondary : primary}
        stroke={outline}
        strokeWidth="2"
      />
      <rect
        x="28"
        y="9"
        width="7"
        height={longSleeve ? 21 : 11}
        rx="2"
        fill={id === 'varsity-jacket' || id === 'party-vest' ? secondary : primary}
        stroke={outline}
        strokeWidth="2"
      />
      <rect x="11" y="8" width="18" height="24" rx="3" fill={primary} stroke={outline} strokeWidth="2" />
      {id === 'sunny-overalls' && (
        <rect x="13" y="16" width="14" height="16" rx="2" fill={secondary} stroke={outline} strokeWidth="1.5" />
      )}
      {id === 'rainbow-stripes' && (
        <>
          <rect x="12" y="14" width="16" height="4" fill="#E95D7A" />
          <rect x="12" y="18" width="16" height="4" fill="#F8C630" />
          <rect x="12" y="22" width="16" height="4" fill="#2D9CDB" />
        </>
      )}
      {id === 'party-vest' && (
        <>
          <polygon points="15,8 25,8 20,17" fill={secondary} />
          <circle cx="20" cy="11" r="2.2" fill={accent} />
        </>
      )}
      {(id === 'classic-tee' || id === 'space-tee' || id === 'hero-tee' || id === 'berry-sweater') && (
        <circle cx="20" cy="19" r="3.5" fill={accent} stroke={outline} strokeWidth="1.2" />
      )}
      {id === 'dino-hoodie' && (
        <rect x="15" y="15" width="10" height="14" rx="3" fill={secondary} stroke={outline} strokeWidth="1.4" />
      )}
    </svg>
  );
};

export const BottomIcon: React.FC<{
  id: BottomId;
  category: 'trousers' | 'shorts' | 'skirt';
  primary: string;
}> = ({ id, category, primary }) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      {category === 'trousers' && (
        <>
          <rect x="10" y="7" width="9" height="26" rx="2" fill={primary} stroke={outline} strokeWidth="2" />
          <rect x="21" y="7" width="9" height="26" rx="2" fill={primary} stroke={outline} strokeWidth="2" />
          {id === 'starry-leggings' && <circle cx="14.5" cy="17" r="1.8" fill="#F8C630" />}
        </>
      )}
      {category === 'shorts' && (
        <>
          <rect x="9" y="8" width="10" height="16" rx="2" fill={primary} stroke={outline} strokeWidth="2" />
          <rect x="21" y="8" width="10" height="16" rx="2" fill={primary} stroke={outline} strokeWidth="2" />
          {id === 'checker-shorts' && <rect x="11" y="10" width="4" height="4" fill="#FFFFFF" />}
        </>
      )}
      {category === 'skirt' && (
        <path d="M11 8 L29 8 L33 27 Q20 30 7 27 Z" fill={primary} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      )}
    </svg>
  );
};

export const ShoeIcon: React.FC<{ primary: string; sole: string; stripe: string }> = ({
  primary,
  sole,
  stripe,
}) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      <rect x="6" y="14" width="28" height="14" rx="4" fill={primary} stroke={outline} strokeWidth="2" />
      <rect x="6" y="23" width="28" height="6" rx="2" fill={sole} stroke={outline} strokeWidth="2" />
      <line x1="12" y1="19" x2="24" y2="19" stroke={stripe} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export const AccessoryIcon: React.FC<{ id: AccessoryId }> = ({ id }) => {
  const outline = '#1E2A4A';
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
      {id === 'none' && (
        <circle cx="20" cy="20" r="10" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 3" />
      )}
      {id === 'glasses' && (
        <g stroke="#2C3E6B" strokeWidth="2.5" fill="rgba(45,156,219,0.2)">
          <circle cx="13" cy="20" r="6" />
          <circle cx="27" cy="20" r="6" />
          <line x1="19" y1="20" x2="21" y2="20" />
        </g>
      )}
      {id === 'star-shades' && (
        <g fill="#E95D7A" stroke="#F8C630" strokeWidth="1.8">
          <polygon points="13,12 15,17 20,17 16,21 17,26 13,23 9,26 10,21 6,17 11,17" />
          <polygon points="27,12 29,17 34,17 30,21 31,26 27,23 23,26 24,21 20,17 25,17" />
        </g>
      )}
      {id === 'hairband' && (
        <path d="M8 26 Q20 9 32 26" fill="none" stroke="#2D9CDB" strokeWidth="5" strokeLinecap="round" />
      )}
      {id === 'bow' && (
        <g stroke={outline} strokeWidth="2">
          <polygon points="8,14 20,20 8,26" fill="#F47C20" />
          <polygon points="32,14 20,20 32,26" fill="#F47C20" />
          <circle cx="20" cy="20" r="4" fill="#F8C630" />
        </g>
      )}
      {id === 'cap' && (
        <g stroke={outline} strokeWidth="2">
          <path d="M9 22 Q10 11 20 11 Q30 11 31 22 Z" fill="#7AC143" />
          <path d="M8 22 Q20 19 35 23 Q28 27 8 22 Z" fill="#F8C630" />
        </g>
      )}
      {id === 'headphones' && (
        <g>
          <path d="M10 24 Q10 10 20 10 Q30 10 30 24" fill="none" stroke="#7B4B94" strokeWidth="4" strokeLinecap="round" />
          <rect x="6" y="20" width="6" height="10" rx="2" fill="#F8C630" stroke={outline} strokeWidth="1.8" />
          <rect x="28" y="20" width="6" height="10" rx="2" fill="#F8C630" stroke={outline} strokeWidth="1.8" />
        </g>
      )}
      {id === 'crown' && (
        <polygon points="9,28 8,14 15,20 20,11 25,20 32,14 31,28" fill="#F8C630" stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      )}
      {id === 'cat-ears' && (
        <g stroke={outline} strokeWidth="2" fill="#E95D7A">
          <polygon points="8,28 7,12 18,24" />
          <polygon points="32,28 33,12 22,24" />
        </g>
      )}
      {id === 'bunny-ears' && (
        <g stroke={outline} strokeWidth="2" fill="#FFFFFF">
          <rect x="11" y="7" width="7" height="22" rx="3.5" />
          <rect x="22" y="7" width="7" height="22" rx="3.5" />
        </g>
      )}
      {id === 'party-hat' && (
        <g stroke={outline} strokeWidth="2">
          <polygon points="11,30 20,9 29,30" fill="#2D9CDB" />
          <circle cx="20" cy="9" r="3" fill="#E95D7A" />
        </g>
      )}
      {id === 'magic-hat' && (
        <g stroke={outline} strokeWidth="2" fill="#7B4B94">
          <ellipse cx="20" cy="29" rx="14" ry="4" />
          <polygon points="12,28 20,8 28,28" />
        </g>
      )}
    </svg>
  );
};
