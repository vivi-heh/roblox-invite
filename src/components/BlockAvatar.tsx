import React, { useId } from 'react';
import {
  getHairColor,
  getSkinTone,
  getTopOption,
  getBottomOption,
  getShoeOption,
} from '../data/avatarOptions';
import { AvatarConfig } from '../types/game';

interface BlockAvatarProps {
  avatar: AvatarConfig;
  heldItems?: {
    waterBottle?: boolean;
    pencil?: boolean;
  };
  waving?: boolean;
  celebrating?: boolean;
  walking?: boolean;
  facing?: 'front' | 'left' | 'right';
  className?: string;
}

export const BlockAvatar: React.FC<BlockAvatarProps> = ({
  avatar,
  heldItems = {},
  waving = false,
  celebrating = false,
  walking = false,
  facing = 'front',
  className = 'w-64 h-auto',
}) => {
  const uid = useId().replace(/:/g, '');
  const torsoClipId = `torso-clip-${uid}`;
  const headClipId = `head-clip-${uid}`;

  const skin = getSkinTone(avatar.skinToneId);
  const hair = getHairColor(avatar.hairColorId);
  const top = getTopOption(avatar.topId);
  const bottom = getBottomOption(avatar.bottomId);
  const shoe = getShoeOption(avatar.shoeId);

  const outline = '#1E2A4A';
  const hasBottle = Boolean(heldItems.waterBottle);
  const hasPencil = Boolean(heldItems.pencil);

  const faceShiftX = facing === 'left' ? -5 : facing === 'right' ? 5 : 0;

  const getSleeveColor = () => {
    if (top.id === 'varsity-jacket') return top.secondaryHex;
    if (top.id === 'party-vest') return top.secondaryHex;
    if (top.id === 'sunny-overalls') return top.primaryHex;
    if (top.id === 'rainbow-stripes') return '#FFF8EB';
    return top.primaryHex;
  };

  const sleeveColor = getSleeveColor();

  const rootMotionClass = celebrating
    ? 'animate-avatar-celebrate'
    : walking
    ? 'animate-walk-bob'
    : 'animate-avatar-idle';

  return (
    <svg
      viewBox="0 0 260 330"
      className={`${className} select-none overflow-visible ${rootMotionClass}`}
      role="img"
      aria-label="Custom Roblox-style block character avatar"
    >
      <defs>
        <clipPath id={torsoClipId}>
          <rect x="84" y="134" width="92" height="90" rx="6" />
        </clipPath>
        <clipPath id={headClipId}>
          <rect x="80" y="38" width="100" height="86" rx="20" />
        </clipPath>
      </defs>

      {/* LAYER 0: BACK HAIR */}
      <g>
        {avatar.hairstyleId === 'long' && (
          <path
            d="M 68 70 Q 64 138 70 186 Q 130 196 190 186 Q 196 138 192 70 Q 188 34 130 34 Q 72 34 68 70 Z"
            fill={hair.shadowHex}
            stroke={outline}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
        {avatar.hairstyleId === 'bob' && (
          <path
            d="M 66 74 Q 64 124 80 136 L 180 136 Q 196 124 194 74 Q 190 34 130 34 Q 70 34 66 74 Z"
            fill={hair.shadowHex}
            stroke={outline}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
        {avatar.hairstyleId === 'ponytail' && (
          <g>
            <path
              d="M 172 62 C 214 52, 224 100, 206 142 C 194 132, 184 112, 174 86 Z"
              fill={hair.hex}
              stroke={outline}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M 185 72 C 204 76, 208 106, 198 124"
              fill="none"
              stroke={hair.highlightHex}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="169" y="60" width="12" height="16" rx="4" fill="#E95D7A" stroke={outline} strokeWidth="2.5" />
          </g>
        )}
        {avatar.hairstyleId === 'twin-ponytails' && (
          <g>
            <path
              d="M 80 70 C 42 60, 36 112, 54 148 C 68 140, 76 116, 82 88 Z"
              fill={hair.hex}
              stroke={outline}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <rect x="72" y="66" width="12" height="16" rx="4" fill="#F8C630" stroke={outline} strokeWidth="2.5" />
            <path
              d="M 180 70 C 218 60, 224 112, 206 148 C 192 140, 184 116, 178 88 Z"
              fill={hair.hex}
              stroke={outline}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <rect x="176" y="66" width="12" height="16" rx="4" fill="#F8C630" stroke={outline} strokeWidth="2.5" />
          </g>
        )}
        {avatar.hairstyleId === 'curly' && (
          <g fill={hair.shadowHex} stroke={outline} strokeWidth="3.5">
            <circle cx="72" cy="82" r="20" />
            <circle cx="188" cy="82" r="20" />
            <circle cx="74" cy="110" r="17" />
            <circle cx="186" cy="110" r="17" />
          </g>
        )}
        {avatar.hairstyleId === 'space-buns' && (
          <g>
            <circle cx="78" cy="34" r="20" fill={hair.hex} stroke={outline} strokeWidth="3.5" />
            <circle cx="74" cy="28" r="7" fill={hair.highlightHex} opacity="0.5" />
            <circle cx="182" cy="34" r="20" fill={hair.hex} stroke={outline} strokeWidth="3.5" />
            <circle cx="178" cy="28" r="7" fill={hair.highlightHex} opacity="0.5" />
          </g>
        )}
        {avatar.hairstyleId === 'braids' && (
          <g fill={hair.hex} stroke={outline} strokeWidth="3.2">
            {/* Left Braid Segments */}
            <circle cx="70" cy="102" r="11" />
            <circle cx="68" cy="122" r="10.5" />
            <circle cx="67" cy="142" r="9.5" />
            <circle cx="66" cy="160" r="8" />
            <rect x="61" y="165" width="10" height="6" rx="3" fill="#2D9CDB" stroke={outline} strokeWidth="2" />
            {/* Right Braid Segments */}
            <circle cx="190" cy="102" r="11" />
            <circle cx="192" cy="122" r="10.5" />
            <circle cx="193" cy="142" r="9.5" />
            <circle cx="194" cy="160" r="8" />
            <rect x="189" y="165" width="10" height="6" rx="3" fill="#2D9CDB" stroke={outline} strokeWidth="2" />
          </g>
        )}
        {avatar.hairstyleId === 'afro' && (
          <g fill={hair.shadowHex} stroke={outline} strokeWidth="3.5">
            <circle cx="130" cy="64" r="66" />
          </g>
        )}
      </g>

      {/* LAYER 1: GROUND SHADOW */}
      <ellipse cx="130" cy="314" rx="60" ry="10" fill="rgba(30, 42, 74, 0.16)" />

      {/* LAYER 2: ROBLOX R6 BLOCKY LEGS & INDEPENDENT SHOES */}
      <g>
        {/* LEFT LEG */}
        <g className={walking ? 'animate-walk-leg-left' : ''}>
          {bottom.category === 'trousers' && (
            <g>
              <rect x="86" y="224" width="41" height="68" rx="4" fill={bottom.primaryHex} stroke={outline} strokeWidth="3.5" />
              {bottom.id === 'starry-leggings' && (
                <>
                  <circle cx="100" cy="244" r="3" fill="#F8C630" />
                  <circle cx="110" cy="264" r="2.5" fill="#FFFFFF" />
                  <circle cx="96" cy="274" r="2" fill="#5EC8F2" />
                </>
              )}
              <rect x="116" y="227" width="8" height="62" fill={bottom.shadowHex} opacity="0.55" />
              <line x1="88" y1="280" x2="125" y2="280" stroke={outline} strokeWidth="2.5" />
            </g>
          )}
          {bottom.category === 'shorts' && (
            <g>
              <rect x="88" y="252" width="38" height="40" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
              <rect x="116" y="254" width="7" height="35" fill={skin.shadowHex} opacity="0.45" />
              <rect x="85" y="224" width="43" height="34" rx="4" fill={bottom.primaryHex} stroke={outline} strokeWidth="3.5" />
              {bottom.id === 'checker-shorts' && (
                <>
                  <rect x="88" y="227" width="12" height="12" fill="#FFFFFF" opacity="0.85" />
                  <rect x="100" y="239" width="12" height="12" fill="#FFFFFF" opacity="0.85" />
                </>
              )}
              <rect x="117" y="227" width="8" height="28" fill={bottom.shadowHex} opacity="0.55" />
            </g>
          )}
          {bottom.category === 'skirt' && (
            <g>
              <rect x="88" y="246" width="38" height="46" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
              <rect x="116" y="248" width="7" height="42" fill={skin.shadowHex} opacity="0.45" />
              <rect x="88" y="274" width="38" height="16" fill="#FFFFFF" stroke={outline} strokeWidth="3" />
            </g>
          )}

          {/* Left Independent Shoe */}
          <rect x="84" y="288" width="44" height="20" rx="4" fill={shoe.primaryHex} stroke={outline} strokeWidth="3.5" />
          <rect x="84" y="300" width="44" height="8" rx="3" fill={shoe.soleHex} stroke={outline} strokeWidth="3" />
          <line x1="94" y1="294" x2="110" y2="294" stroke={shoe.stripeHex} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* RIGHT LEG */}
        <g className={walking ? 'animate-walk-leg-right' : ''}>
          {bottom.category === 'trousers' && (
            <g>
              <rect x="133" y="224" width="41" height="68" rx="4" fill={bottom.primaryHex} stroke={outline} strokeWidth="3.5" />
              {bottom.id === 'starry-leggings' && (
                <>
                  <circle cx="150" cy="248" r="3" fill="#FFFFFF" />
                  <circle cx="143" cy="268" r="2.5" fill="#F8C630" />
                </>
              )}
              <rect x="163" y="227" width="8" height="62" fill={bottom.shadowHex} opacity="0.55" />
              <line x1="135" y1="280" x2="172" y2="280" stroke={outline} strokeWidth="2.5" />
            </g>
          )}
          {bottom.category === 'shorts' && (
            <g>
              <rect x="134" y="252" width="38" height="40" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
              <rect x="162" y="254" width="7" height="35" fill={skin.shadowHex} opacity="0.45" />
              <rect x="132" y="224" width="43" height="34" rx="4" fill={bottom.primaryHex} stroke={outline} strokeWidth="3.5" />
              {bottom.id === 'checker-shorts' && (
                <>
                  <rect x="135" y="227" width="12" height="12" fill="#FFFFFF" opacity="0.85" />
                  <rect x="147" y="239" width="12" height="12" fill="#FFFFFF" opacity="0.85" />
                </>
              )}
              <rect x="164" y="227" width="8" height="28" fill={bottom.shadowHex} opacity="0.55" />
            </g>
          )}
          {bottom.category === 'skirt' && (
            <g>
              <rect x="134" y="246" width="38" height="46" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
              <rect x="162" y="248" width="7" height="42" fill={skin.shadowHex} opacity="0.45" />
              <rect x="134" y="274" width="38" height="16" fill="#FFFFFF" stroke={outline} strokeWidth="3" />
            </g>
          )}

          {/* Right Independent Shoe */}
          <rect x="132" y="288" width="44" height="20" rx="4" fill={shoe.primaryHex} stroke={outline} strokeWidth="3.5" />
          <rect x="132" y="300" width="44" height="8" rx="3" fill={shoe.soleHex} stroke={outline} strokeWidth="3" />
          <line x1="150" y1="294" x2="166" y2="294" stroke={shoe.stripeHex} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Skirt Overlay */}
        {bottom.category === 'skirt' && (
          <g>
            <path
              d="M 82 222 L 178 222 L 189 262 Q 130 268 71 262 Z"
              fill={bottom.primaryHex}
              stroke={outline}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <line x1="112" y1="227" x2="105" y2="260" stroke={bottom.shadowHex} strokeWidth="3" strokeLinecap="round" />
            <line x1="130" y1="227" x2="130" y2="262" stroke={bottom.shadowHex} strokeWidth="3" strokeLinecap="round" />
            <line x1="148" y1="227" x2="155" y2="260" stroke={bottom.shadowHex} strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* LAYER 3: LEFT ROBLOX BLOCK ARM */}
      <g className={walking ? 'animate-walk-arm-left' : ''}>
        <rect
          x="48"
          y="136"
          width="32"
          height="60"
          rx="5"
          fill={top.longSleeve ? sleeveColor : skin.hex}
          stroke={outline}
          strokeWidth="3.5"
        />
        {!top.longSleeve && (
          <rect x="48" y="136" width="32" height="28" rx="4" fill={sleeveColor} stroke={outline} strokeWidth="3.5" />
        )}
        <rect x="70" y="139" width="7" height="54" fill={outline} opacity="0.1" />
        <rect x="48" y="194" width="32" height="24" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
        <rect x="70" y="196" width="7" height="20" fill={skin.shadowHex} opacity="0.45" />

        {hasBottle && (
          <g transform="translate(20, 152)">
            <rect x="16" y="0" width="16" height="9" rx="3" fill="#F8C630" stroke={outline} strokeWidth="2.8" />
            <rect x="19" y="-5" width="10" height="6" rx="2" fill="#E95D7A" stroke={outline} strokeWidth="2.5" />
            <rect x="10" y="9" width="28" height="44" rx="7" fill="#5EC8F2" stroke={outline} strokeWidth="3" />
            <rect x="13" y="26" width="22" height="24" rx="4" fill="#2D9CDB" />
            <rect x="15" y="14" width="5" height="26" rx="2.5" fill="#FFFFFF" opacity="0.65" />
            <rect x="12" y="22" width="24" height="10" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}
      </g>

      {/* LAYER 3B: ROBLOX BOXY TORSO */}
      <g>
        <g clipPath={`url(#${torsoClipId})`}>
          <rect x="84" y="134" width="92" height="90" rx="6" fill={top.primaryHex} />

          {top.id === 'classic-tee' && (
            <g>
              <path d="M 110 134 Q 130 150 150 134" fill="none" stroke={top.secondaryHex} strokeWidth="7" strokeLinecap="round" />
              <polygon
                points="130,158 135,171 149,171 138,179 142,193 130,185 118,193 122,179 111,171 125,171"
                fill={top.accentHex}
                stroke={outline}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          )}

          {top.id === 'cozy-hoodie' && (
            <g>
              <path d="M 102 134 Q 130 158 158 134 L 158 144 Q 130 164 102 144 Z" fill={top.secondaryHex} />
              <line x1="120" y1="148" x2="120" y2="172" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="140" y1="148" x2="140" y2="172" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="120" cy="173" r="3" fill={top.accentHex} />
              <circle cx="140" cy="173" r="3" fill={top.accentHex} />
              <path d="M 102 188 L 158 188 L 164 218 L 96 218 Z" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
            </g>
          )}

          {top.id === 'varsity-jacket' && (
            <g>
              <rect x="122" y="134" width="16" height="90" fill={top.secondaryHex} />
              <circle cx="130" cy="152" r="3" fill={outline} />
              <circle cx="130" cy="172" r="3" fill={outline} />
              <circle cx="130" cy="192" r="3" fill={outline} />
              <rect x="84" y="212" width="92" height="12" fill={top.secondaryHex} />
              <line x1="84" y1="217" x2="176" y2="217" stroke={top.accentHex} strokeWidth="3" />
              <rect x="96" y="152" width="20" height="20" rx="4" fill={top.accentHex} stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {top.id === 'sunny-overalls' && (
            <g>
              <rect x="84" y="192" width="92" height="32" fill={top.secondaryHex} />
              <rect x="102" y="156" width="56" height="44" rx="4" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <rect x="102" y="134" width="12" height="28" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <rect x="146" y="134" width="12" height="28" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <circle cx="108" cy="162" r="3.5" fill="#F8C630" stroke={outline} strokeWidth="1.5" />
              <circle cx="152" cy="162" r="3.5" fill="#F8C630" stroke={outline} strokeWidth="1.5" />
              <rect x="117" y="170" width="26" height="18" rx="3" fill="#234F8A" stroke={outline} strokeWidth="2" />
            </g>
          )}

          {top.id === 'rainbow-stripes' && (
            <g>
              <rect x="84" y="148" width="92" height="14" fill="#E95D7A" />
              <rect x="84" y="162" width="92" height="14" fill="#F8C630" />
              <rect x="84" y="176" width="92" height="14" fill="#7AC143" />
              <rect x="84" y="190" width="92" height="14" fill="#2D9CDB" />
              <rect x="84" y="204" width="92" height="14" fill="#7B4B94" />
            </g>
          )}

          {top.id === 'starry-cardigan' && (
            <g>
              <polygon points="108,134 152,134 130,174" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <line x1="130" y1="174" x2="130" y2="224" stroke={outline} strokeWidth="3" />
              <circle cx="136" cy="184" r="3" fill={top.accentHex} stroke={outline} strokeWidth="1.5" />
              <circle cx="136" cy="200" r="3" fill={top.accentHex} stroke={outline} strokeWidth="1.5" />
              <circle cx="136" cy="214" r="3" fill={top.accentHex} stroke={outline} strokeWidth="1.5" />
              <polygon points="105,176 108,183 115,183 109,187 111,194 105,190 99,194 101,187 95,183 102,183" fill={top.accentHex} />
            </g>
          )}

          {top.id === 'sporty-jersey' && (
            <g>
              <polygon points="112,134 148,134 130,152" fill={top.secondaryHex} />
              <rect x="84" y="134" width="14" height="90" fill={top.accentHex} opacity="0.9" />
              <rect x="162" y="134" width="14" height="90" fill={top.accentHex} opacity="0.9" />
              <rect x="115" y="164" width="30" height="32" rx="4" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <text x="130" y="187" textAnchor="middle" fill={top.primaryHex} fontSize="20" fontWeight="800" fontFamily="Fredoka, sans-serif">
                26
              </text>
            </g>
          )}

          {top.id === 'party-vest' && (
            <g>
              <polygon points="108,134 152,134 130,174" fill={top.secondaryHex} />
              <line x1="130" y1="174" x2="130" y2="224" stroke="#162140" strokeWidth="3" />
              <circle cx="130" cy="186" r="3" fill="#F8C630" />
              <circle cx="130" cy="204" r="3" fill="#F8C630" />
              <polygon points="114,137 130,145 114,153" fill={top.accentHex} stroke={outline} strokeWidth="2" />
              <polygon points="146,137 130,145 146,153" fill={top.accentHex} stroke={outline} strokeWidth="2" />
              <circle cx="130" cy="145" r="4.5" fill={top.accentHex} stroke={outline} strokeWidth="2" />
            </g>
          )}

          {top.id === 'dino-hoodie' && (
            <g>
              {/* Dino Belly Patch */}
              <rect x="106" y="158" width="48" height="66" rx="14" fill={top.secondaryHex} stroke={outline} strokeWidth="2.5" />
              <line x1="108" y1="176" x2="152" y2="176" stroke="#D9A31E" strokeWidth="2.5" />
              <line x1="108" y1="196" x2="152" y2="196" stroke="#D9A31E" strokeWidth="2.5" />
              {/* Dino Spikes down side */}
              <polygon points="84,150 96,158 84,166" fill={top.secondaryHex} stroke={outline} strokeWidth="2" />
              <polygon points="84,174 96,182 84,190" fill={top.secondaryHex} stroke={outline} strokeWidth="2" />
            </g>
          )}

          {top.id === 'space-tee' && (
            <g>
              <circle cx="104" cy="154" r="2.5" fill="#FFFFFF" />
              <circle cx="158" cy="158" r="2" fill="#FFFFFF" />
              <circle cx="152" cy="198" r="2.5" fill="#F8C630" />
              {/* Ringed Planet */}
              <circle cx="130" cy="176" r="15" fill={top.accentHex} stroke={outline} strokeWidth="2.5" />
              <ellipse cx="130" cy="176" rx="26" ry="7" fill="none" stroke={top.secondaryHex} strokeWidth="4" transform="rotate(-18 130 176)" />
            </g>
          )}

          {top.id === 'berry-sweater' && (
            <g>
              <path d="M 108 134 Q 130 148 152 134" fill="none" stroke={top.secondaryHex} strokeWidth="6" strokeLinecap="round" />
              {/* Cute Strawberry Emblem */}
              <path d="M 118 166 Q 130 162 142 166 Q 142 188 130 194 Q 118 188 118 166 Z" fill={top.accentHex} stroke={outline} strokeWidth="2.5" />
              <polygon points="122,165 130,157 138,165" fill="#7AC143" stroke={outline} strokeWidth="2" />
              <circle cx="126" cy="174" r="1.5" fill="#FFF8EB" />
              <circle cx="134" cy="176" r="1.5" fill="#FFF8EB" />
              <circle cx="130" cy="183" r="1.5" fill="#FFF8EB" />
            </g>
          )}

          {top.id === 'hero-tee' && (
            <g>
              <rect x="84" y="206" width="92" height="12" fill={top.accentHex} stroke={outline} strokeWidth="2" />
              <rect x="122" y="204" width="16" height="16" rx="3" fill={top.secondaryHex} stroke={outline} strokeWidth="2" />
              {/* Lightning Bolt */}
              <polygon
                points="134,148 118,176 130,176 124,198 144,168 132,168"
                fill={top.secondaryHex}
                stroke={outline}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          )}

          <rect x="84" y="134" width="10" height="90" fill="#FFFFFF" opacity="0.18" />
          <rect x="164" y="134" width="12" height="90" fill="#1E2A4A" opacity="0.14" />
          <rect x="84" y="134" width="92" height="6" fill="#FFFFFF" opacity="0.18" />
        </g>

        <rect x="84" y="134" width="92" height="90" rx="6" fill="none" stroke={outline} strokeWidth="3.5" />
      </g>

      {/* LAYER 4: RIGHT ROBLOX BLOCK ARM */}
      <g className={waving ? 'animate-arm-wave' : walking ? 'animate-walk-arm-right' : ''}>
        <rect
          x="180"
          y="136"
          width="32"
          height="60"
          rx="5"
          fill={top.longSleeve ? sleeveColor : skin.hex}
          stroke={outline}
          strokeWidth="3.5"
        />
        {!top.longSleeve && (
          <rect x="180" y="136" width="32" height="28" rx="4" fill={sleeveColor} stroke={outline} strokeWidth="3.5" />
        )}
        <rect x="202" y="139" width="7" height="54" fill={outline} opacity="0.1" />
        <rect x="180" y="194" width="32" height="24" rx="4" fill={skin.hex} stroke={outline} strokeWidth="3.5" />
        <rect x="202" y="196" width="7" height="20" fill={skin.shadowHex} opacity="0.45" />

        {hasPencil && (
          <g transform="translate(196, 138) rotate(18)">
            <rect x="0" y="52" width="14" height="10" rx="3" fill="#E95D7A" stroke={outline} strokeWidth="2.5" />
            <rect x="0" y="46" width="14" height="7" fill="#CBD5E1" stroke={outline} strokeWidth="2.5" />
            <rect x="0" y="12" width="14" height="35" fill="#F8C630" stroke={outline} strokeWidth="2.5" />
            <line x1="5" y1="13" x2="5" y2="46" stroke="#D99B16" strokeWidth="2" />
            <polygon points="0,12 14,12 7,-2" fill="#F6D5A9" stroke={outline} strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="4.5,3 9.5,3 7,-2" fill={outline} />
          </g>
        )}
      </g>

      {/* LAYER 5: ROBLOX NECK STUD, HEAD & EXPRESSIVE FACES */}
      <g>
        <rect x="114" y="121" width="32" height="16" rx="4" fill={skin.shadowHex} stroke={outline} strokeWidth="3" />

        <g clipPath={`url(#${headClipId})`}>
          <rect x="80" y="38" width="100" height="86" rx="20" fill={skin.hex} />
          <rect x="84" y="40" width="92" height="12" rx="6" fill={skin.highlightHex} opacity="0.72" />
          <rect x="82" y="44" width="11" height="74" rx="5" fill={skin.highlightHex} opacity="0.4" />
          <rect x="166" y="42" width="14" height="80" fill={skin.shadowHex} opacity="0.45" />
          <rect x="80" y="114" width="100" height="12" fill={skin.shadowHex} opacity="0.35" />
        </g>
        <rect x="80" y="38" width="100" height="86" rx="20" fill="none" stroke={outline} strokeWidth="3.5" />

        {/* EXPRESSIVE ROBLOX FACES */}
        <g transform={`translate(${faceShiftX}, 0)`}>
          {/* Eyebrows */}
          <path d="M 98 69 Q 108 64 117 69" fill="none" stroke={outline} strokeWidth="3" strokeLinecap="round" />
          <path d="M 143 69 Q 152 64 162 69" fill="none" stroke={outline} strokeWidth="3" strokeLinecap="round" />

          {/* Eyes by FaceId */}
          {avatar.faceId === 'wink' ? (
            <>
              <ellipse cx="108" cy="83" rx="6.2" ry="8.5" fill={outline} />
              <circle cx="105.5" cy="79.5" r="2.5" fill="#FFFFFF" />
              <path d="M 143 84 Q 152 76 161 84" fill="none" stroke={outline} strokeWidth="3.8" strokeLinecap="round" />
            </>
          ) : avatar.faceId === 'starry-eyes' ? (
            <>
              <polygon points="108,73 111,80 118,80 112,84 114,91 108,87 102,91 104,84 98,80 105,80" fill="#F8C630" stroke={outline} strokeWidth="2.2" />
              <polygon points="152,73 155,80 162,80 156,84 158,91 152,87 146,91 148,84 142,80 149,80" fill="#F8C630" stroke={outline} strokeWidth="2.2" />
            </>
          ) : avatar.faceId === 'sweet-blush' ? (
            <>
              <path d="M 100 84 Q 108 75 116 84" fill="none" stroke={outline} strokeWidth="3.8" strokeLinecap="round" />
              <path d="M 144 84 Q 152 75 160 84" fill="none" stroke={outline} strokeWidth="3.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="108" cy="83" rx="6.2" ry="8.5" fill={outline} />
              <circle cx="105.5" cy="79.5" r="2.5" fill="#FFFFFF" />
              <circle cx="110" cy="86" r="1.2" fill="#FFFFFF" />
              <ellipse cx="152" cy="83" rx="6.2" ry="8.5" fill={outline} />
              <circle cx="149.5" cy="79.5" r="2.5" fill="#FFFFFF" />
              <circle cx="154" cy="86" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Cheeks */}
          <ellipse
            cx="94"
            cy="96"
            rx="7.5"
            ry="4.5"
            fill="#F27A8E"
            opacity={avatar.faceId === 'sweet-blush' ? 0.72 : 0.42}
          />
          <ellipse
            cx="166"
            cy="96"
            rx="7.5"
            ry="4.5"
            fill="#F27A8E"
            opacity={avatar.faceId === 'sweet-blush' ? 0.72 : 0.42}
          />

          {/* Mouth by FaceId (or celebratory grin) */}
          {celebrating || avatar.faceId === 'big-grin' ? (
            <path d="M 113 96 Q 130 116 147 96 Z" fill="#E95D7A" stroke={outline} strokeWidth="3" strokeLinejoin="round" />
          ) : avatar.faceId === 'cool-smirk' ? (
            <path d="M 116 102 Q 134 106 146 95" fill="none" stroke={outline} strokeWidth="3.6" strokeLinecap="round" />
          ) : avatar.faceId === 'surprised' ? (
            <ellipse cx="130" cy="103" rx="7" ry="8.5" fill="#E95D7A" stroke={outline} strokeWidth="3" />
          ) : avatar.faceId === 'silly-tongue' ? (
            <g>
              <path d="M 114 98 Q 130 110 146 98" fill="none" stroke={outline} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 127 104 Q 133 117 139 103 Z" fill="#E95D7A" stroke={outline} strokeWidth="2.5" strokeLinejoin="round" />
            </g>
          ) : (
            <path d="M 113 97 Q 130 112 147 97" fill="none" stroke={outline} strokeWidth="3.6" strokeLinecap="round" />
          )}
        </g>
      </g>

      {/* LAYER 6: FRONT HAIR */}
      <g>
        {avatar.hairstyleId === 'short' && (
          <g>
            <path d="M 77 66 Q 76 28 130 28 Q 184 28 183 66 Q 170 50 154 58 Q 136 46 118 60 Q 96 48 77 66 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 98 40 Q 130 32 162 40" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {avatar.hairstyleId === 'long' && (
          <g>
            <path d="M 74 76 Q 74 28 130 28 Q 186 28 186 76 L 180 86 Q 176 54 154 56 Q 130 56 106 56 Q 84 54 80 86 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 100 38 Q 130 32 160 38" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {(avatar.hairstyleId === 'ponytail' || avatar.hairstyleId === 'space-buns' || avatar.hairstyleId === 'braids') && (
          <g>
            <path d="M 77 64 Q 78 28 130 28 Q 182 28 183 64 Q 160 46 130 54 Q 100 46 77 64 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 98 38 Q 130 32 160 38" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {avatar.hairstyleId === 'twin-ponytails' && (
          <g>
            <path d="M 77 64 Q 78 28 130 28 Q 182 28 183 64 L 168 56 L 150 62 L 130 53 L 110 62 L 92 56 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 98 38 Q 130 32 160 38" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {avatar.hairstyleId === 'bob' && (
          <g>
            <path d="M 74 84 Q 72 28 130 28 Q 188 28 186 84 L 176 88 L 174 56 L 86 56 L 84 88 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 98 39 Q 130 33 162 39" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {avatar.hairstyleId === 'curly' && (
          <g fill={hair.hex} stroke={outline} strokeWidth="3.5">
            <circle cx="84" cy="52" r="18" />
            <circle cx="106" cy="38" r="19" />
            <circle cx="132" cy="34" r="20" />
            <circle cx="158" cy="39" r="19" />
            <circle cx="177" cy="53" r="18" />
            <circle cx="98" cy="54" r="10" fill={hair.highlightHex} stroke="none" opacity="0.45" />
            <circle cx="144" cy="46" r="10" fill={hair.highlightHex} stroke="none" opacity="0.45" />
          </g>
        )}

        {avatar.hairstyleId === 'spiky' && (
          <path
            d="M 76 66 L 70 40 L 94 44 L 100 16 L 122 34 L 136 10 L 152 36 L 174 18 L 172 46 L 192 42 L 183 66 Q 160 50 130 56 Q 100 50 76 66 Z"
            fill={hair.hex}
            stroke={outline}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}

        {avatar.hairstyleId === 'side-part' && (
          <g>
            <path d="M 76 66 Q 76 26 134 27 Q 184 28 184 66 Q 176 44 156 48 Q 124 66 86 62 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 102 40 Q 136 32 164 42" fill="none" stroke={hair.highlightHex} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {avatar.hairstyleId === 'mohawk' && (
          <g>
            <path d="M 108 56 L 110 12 L 130 22 L 136 6 L 146 22 L 154 12 L 152 56 Q 130 46 108 56 Z" fill={hair.hex} stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
          </g>
        )}

        {avatar.hairstyleId === 'afro' && (
          <g fill={hair.hex} stroke={outline} strokeWidth="3.5">
            <path d="M 72 62 Q 70 16 130 14 Q 190 16 188 62 Q 162 46 130 48 Q 98 46 72 62 Z" />
            <path d="M 96 28 Q 130 20 162 28" fill="none" stroke={hair.highlightHex} strokeWidth="5" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* LAYER 7: ACCESSORIES */}
      <g>
        {avatar.accessoryId === 'glasses' && (
          <g transform={`translate(${faceShiftX}, 0)`}>
            <circle cx="108" cy="83" r="15.5" fill="rgba(255,255,255,0.22)" stroke="#2C3E6B" strokeWidth="4.5" />
            <circle cx="152" cy="83" r="15.5" fill="rgba(255,255,255,0.22)" stroke="#2C3E6B" strokeWidth="4.5" />
            <line x1="123.5" y1="83" x2="136.5" y2="83" stroke="#2C3E6B" strokeWidth="4.5" />
            <line x1="80" y1="81" x2="92.5" y2="83" stroke="#2C3E6B" strokeWidth="4" />
            <line x1="167.5" y1="83" x2="180" y2="81" stroke="#2C3E6B" strokeWidth="4" />
          </g>
        )}

        {avatar.accessoryId === 'star-shades' && (
          <g transform={`translate(${faceShiftX}, 0)`}>
            <polygon points="108,64 114,75 126,76 117,84 119,96 108,90 97,96 99,84 90,76 102,75" fill="#E95D7A" stroke="#F8C630" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="152,64 158,75 170,76 161,84 163,96 152,90 141,96 143,84 134,76 146,75" fill="#E95D7A" stroke="#F8C630" strokeWidth="3" strokeLinejoin="round" />
            <line x1="122" y1="80" x2="138" y2="80" stroke="#F8C630" strokeWidth="4" />
          </g>
        )}

        {avatar.accessoryId === 'hairband' && (
          <g>
            <path d="M 80 60 Q 130 14 180 60" fill="none" stroke="#2D9CDB" strokeWidth="10" strokeLinecap="round" />
            <path d="M 80 60 Q 130 14 180 60" fill="none" stroke="#F8C630" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" />
          </g>
        )}

        {avatar.accessoryId === 'bow' && (
          <g transform="translate(146, 20) rotate(12)">
            <polygon points="0,8 22,0 20,24" fill="#F47C20" stroke={outline} strokeWidth="3" strokeLinejoin="round" />
            <polygon points="44,8 22,0 24,24" fill="#F47C20" stroke={outline} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="22" cy="12" r="7" fill="#F8C630" stroke={outline} strokeWidth="3" />
          </g>
        )}

        {avatar.accessoryId === 'cap' && (
          <g>
            <path d="M 78 52 Q 80 18 130 18 Q 180 18 182 52 Z" fill="#7AC143" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 76 50 Q 130 42 196 52 Q 184 62 130 56 Q 86 56 76 50 Z" fill="#F8C630" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="130" cy="34" r="6" fill="#FFFFFF" stroke={outline} strokeWidth="2.5" />
          </g>
        )}

        {avatar.accessoryId === 'headphones' && (
          <g>
            <path d="M 74 76 Q 74 14 130 14 Q 186 14 186 76" fill="none" stroke="#7B4B94" strokeWidth="9" strokeLinecap="round" />
            <rect x="62" y="66" width="18" height="34" rx="6" fill="#F8C630" stroke={outline} strokeWidth="3.5" />
            <rect x="180" y="66" width="18" height="34" rx="6" fill="#F8C630" stroke={outline} strokeWidth="3.5" />
          </g>
        )}

        {avatar.accessoryId === 'crown' && (
          <g>
            <polygon points="96,40 92,14 114,26 130,8 146,26 168,14 164,40" fill="#F8C630" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="130" cy="28" r="4.5" fill="#E95D7A" stroke={outline} strokeWidth="1.5" />
            <circle cx="110" cy="31" r="3.5" fill="#2D9CDB" stroke={outline} strokeWidth="1.5" />
            <circle cx="150" cy="31" r="3.5" fill="#7AC143" stroke={outline} strokeWidth="1.5" />
          </g>
        )}

        {avatar.accessoryId === 'cat-ears' && (
          <g>
            <polygon points="84,46 78,14 110,36" fill="#E95D7A" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="88,42 84,22 103,36" fill="#FFD1DB" />
            <polygon points="176,46 182,14 150,36" fill="#E95D7A" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="172,42 176,22 157,36" fill="#FFD1DB" />
          </g>
        )}

        {avatar.accessoryId === 'bunny-ears' && (
          <g>
            <rect x="92" y="0" width="22" height="44" rx="11" fill="#FFFFFF" stroke={outline} strokeWidth="3.5" transform="rotate(-10 103 22)" />
            <rect x="98" y="8" width="10" height="26" rx="5" fill="#F48FB1" transform="rotate(-10 103 22)" />
            <rect x="146" y="0" width="22" height="44" rx="11" fill="#FFFFFF" stroke={outline} strokeWidth="3.5" transform="rotate(10 157 22)" />
            <rect x="152" y="8" width="10" height="26" rx="5" fill="#F48FB1" transform="rotate(10 157 22)" />
          </g>
        )}

        {avatar.accessoryId === 'party-hat' && (
          <g>
            <polygon points="104,42 130,-2 156,42" fill="#2D9CDB" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="114" y1="26" x2="146" y2="26" stroke="#F8C630" strokeWidth="5" />
            <circle cx="130" cy="-2" r="7" fill="#E95D7A" stroke={outline} strokeWidth="2.5" />
          </g>
        )}

        {avatar.accessoryId === 'magic-hat' && (
          <g>
            <ellipse cx="130" cy="40" rx="54" ry="11" fill="#7B4B94" stroke={outline} strokeWidth="3.5" />
            <polygon points="98,38 128,-6 162,38" fill="#7B4B94" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="103" y="28" width="54" height="8" rx="3" fill="#F8C630" stroke={outline} strokeWidth="2" />
            <polygon points="130,10 132,16 138,16 133,19 135,25 130,22 125,25 127,19 122,16 128,16" fill="#F8C630" />
          </g>
        )}
      </g>
    </svg>
  );
};
