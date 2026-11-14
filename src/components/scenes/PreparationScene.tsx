import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Backpack,
  Compass,
  Hand,
} from 'lucide-react';
import { AvatarConfig, InventoryState } from '../../types/game';
import { BlockAvatar } from '../BlockAvatar';

interface PreparationSceneProps {
  avatar: AvatarConfig;
  inventory: InventoryState;
  onCollectWaterBottle: () => void;
  onCollectPencil: () => void;
  onBackToCustomize: () => void;
  onContinue: () => void;
}

interface Point {
  x: number;
  y: number;
}

const WATER_BOTTLE_POS: Point = { x: 20, y: 63 };
const PENCIL_POS: Point = { x: 80, y: 55 };
const START_POS: Point = { x: 50, y: 74 };

const MIN_X = 13;
const MAX_X = 87;
const MIN_Y = 46;
const MAX_Y = 87;
const WALK_SPEED = 36;
const AUTO_COLLECT_RADIUS = 11.5;
const NEAR_HINT_RADIUS = 24;

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export const PreparationScene: React.FC<PreparationSceneProps> = ({
  avatar,
  inventory,
  onCollectWaterBottle,
  onCollectPencil,
  onBackToCustomize,
  onContinue,
}) => {
  const roomRef = useRef<HTMLDivElement | null>(null);

  const [pos, setPos] = useState<Point>(START_POS);
  const [facing, setFacing] = useState<'front' | 'left' | 'right'>('front');
  const [isWalking, setIsWalking] = useState(false);
  const [targetPos, setTargetPos] = useState<Point | null>(null);
  const [recentBurst, setRecentBurst] = useState<'waterBottle' | 'pencil' | null>(null);

  const posRef = useRef<Point>(START_POS);
  const targetRef = useRef<Point | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const dpadRef = useRef<{ up: boolean; down: boolean; left: boolean; right: boolean }>({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const inventoryRef = useRef<InventoryState>(inventory);
  inventoryRef.current = inventory;

  const bothCollected = inventory.waterBottle && inventory.pencil;

  const triggerWaterBottleCollect = useCallback(() => {
    if (inventoryRef.current.waterBottle) return;
    setRecentBurst('waterBottle');
    onCollectWaterBottle();
    window.setTimeout(() => {
      setRecentBurst((prev) => (prev === 'waterBottle' ? null : prev));
    }, 700);
  }, [onCollectWaterBottle]);

  const triggerPencilCollect = useCallback(() => {
    if (inventoryRef.current.pencil) return;
    setRecentBurst('pencil');
    onCollectPencil();
    window.setTimeout(() => {
      setRecentBurst((prev) => (prev === 'pencil' ? null : prev));
    }, 700);
  }, [onCollectPencil]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
        e.preventDefault();
      }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        keysRef.current.add(key);
        targetRef.current = null;
        setTargetPos(null);
      }
      if (key === ' ' || key === 'e' || key === 'enter') {
        const current = posRef.current;
        if (!inventoryRef.current.waterBottle && dist(current, WATER_BOTTLE_POS) <= NEAR_HINT_RADIUS) {
          triggerWaterBottleCollect();
        }
        if (!inventoryRef.current.pencil && dist(current, PENCIL_POS) <= NEAR_HINT_RADIUS) {
          triggerPencilCollect();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    const handleBlur = () => {
      keysRef.current.clear();
      dpadRef.current = { up: false, down: false, left: false, right: false };
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [triggerPencilCollect, triggerWaterBottleCollect]);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const keys = keysRef.current;
      const dpad = dpadRef.current;

      let vx = 0;
      let vy = 0;

      if (keys.has('arrowleft') || keys.has('a') || dpad.left) vx -= 1;
      if (keys.has('arrowright') || keys.has('d') || dpad.right) vx += 1;
      if (keys.has('arrowup') || keys.has('w') || dpad.up) vy -= 1;
      if (keys.has('arrowdown') || keys.has('s') || dpad.down) vy += 1;

      let walkingNow = false;
      let nextPos = posRef.current;

      if (vx !== 0 || vy !== 0) {
        const mag = Math.hypot(vx, vy);
        const nx = vx / mag;
        const ny = vy / mag;

        nextPos = {
          x: clamp(nextPos.x + nx * WALK_SPEED * dt, MIN_X, MAX_X),
          y: clamp(nextPos.y + ny * WALK_SPEED * dt, MIN_Y, MAX_Y),
        };
        walkingNow = true;
        if (vx < 0) setFacing('left');
        else if (vx > 0) setFacing('right');
        else setFacing('front');
      } else if (targetRef.current) {
        const dx = targetRef.current.x - nextPos.x;
        const dy = targetRef.current.y - nextPos.y;
        const remaining = Math.hypot(dx, dy);

        if (remaining < 1.2) {
          nextPos = { ...targetRef.current };
          targetRef.current = null;
          setTargetPos(null);
          setFacing('front');
        } else {
          const moveDist = Math.min(remaining, WALK_SPEED * dt);
          nextPos = {
            x: clamp(nextPos.x + (dx / remaining) * moveDist, MIN_X, MAX_X),
            y: clamp(nextPos.y + (dy / remaining) * moveDist, MIN_Y, MAX_Y),
          };
          walkingNow = true;
          if (dx < -1.5) setFacing('left');
          else if (dx > 1.5) setFacing('right');
          else setFacing('front');
        }
      }

      if (nextPos.x !== posRef.current.x || nextPos.y !== posRef.current.y) {
        posRef.current = nextPos;
        setPos(nextPos);
      }

      setIsWalking((prev) => (prev !== walkingNow ? walkingNow : prev));

      if (!inventoryRef.current.waterBottle && dist(nextPos, WATER_BOTTLE_POS) <= AUTO_COLLECT_RADIUS) {
        triggerWaterBottleCollect();
      }
      if (!inventoryRef.current.pencil && dist(nextPos, PENCIL_POS) <= AUTO_COLLECT_RADIUS) {
        triggerPencilCollect();
      }

      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [triggerPencilCollect, triggerWaterBottleCollect]);

  const handleRoomFloorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!roomRef.current) return;
    const rect = roomRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedTarget = {
      x: clamp(clickX, MIN_X, MAX_X),
      y: clamp(clickY, MIN_Y, MAX_Y),
    };
    targetRef.current = clampedTarget;
    setTargetPos(clampedTarget);
  };

  const handleWaterBottleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inventory.waterBottle) return;
    if (dist(posRef.current, WATER_BOTTLE_POS) <= NEAR_HINT_RADIUS) {
      triggerWaterBottleCollect();
    } else {
      targetRef.current = { ...WATER_BOTTLE_POS };
      setTargetPos({ ...WATER_BOTTLE_POS });
    }
  };

  const handlePencilClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inventory.pencil) return;
    if (dist(posRef.current, PENCIL_POS) <= NEAR_HINT_RADIUS) {
      triggerPencilCollect();
    } else {
      targetRef.current = { ...PENCIL_POS };
      setTargetPos({ ...PENCIL_POS });
    }
  };

  // Supports both quick tap (smooth 6% step) and press-and-hold continuous walk!
  const setDpadDir = (dir: 'up' | 'down' | 'left' | 'right', active: boolean) => {
    dpadRef.current[dir] = active;
    if (active) {
      const stepDelta = 5.5;
      const cur = posRef.current;
      const nudged: Point = {
        x: clamp(cur.x + (dir === 'left' ? -stepDelta : dir === 'right' ? stepDelta : 0), MIN_X, MAX_X),
        y: clamp(cur.y + (dir === 'up' ? -stepDelta : dir === 'down' ? stepDelta : 0), MIN_Y, MAX_Y),
      };
      targetRef.current = nudged;
      setTargetPos(null);
    }
  };

  const nearWaterBottle = !inventory.waterBottle && dist(pos, WATER_BOTTLE_POS) <= NEAR_HINT_RADIUS;
  const nearPencil = !inventory.pencil && dist(pos, PENCIL_POS) <= NEAR_HINT_RADIUS;

  const handleGrabAction = () => {
    if (nearWaterBottle) {
      triggerWaterBottleCollect();
      return;
    }
    if (nearPencil) {
      triggerPencilCollect();
      return;
    }
    // If not near either yet, guide character toward the nearest remaining item
    if (!inventory.waterBottle && !inventory.pencil) {
      const dBottle = dist(pos, WATER_BOTTLE_POS);
      const dPencil = dist(pos, PENCIL_POS);
      const next = dBottle <= dPencil ? WATER_BOTTLE_POS : PENCIL_POS;
      targetRef.current = { ...next };
      setTargetPos({ ...next });
    } else if (!inventory.waterBottle) {
      targetRef.current = { ...WATER_BOTTLE_POS };
      setTargetPos({ ...WATER_BOTTLE_POS });
    } else if (!inventory.pencil) {
      targetRef.current = { ...PENCIL_POS };
      setTargetPos({ ...PENCIL_POS });
    }
  };

  const nearestDistance = Math.min(
    inventory.waterBottle ? Infinity : dist(pos, WATER_BOTTLE_POS),
    inventory.pencil ? Infinity : dist(pos, PENCIL_POS)
  );

  const searchHint = bothCollected
    ? 'All essentials found!'
    : nearWaterBottle || nearPencil
    ? 'Right there! Tap GRAB or walk onto it!'
    : nearestDistance <= 38
    ? 'Getting warmer — keep moving!'
    : 'Use D-Pad or tap the room to search.';

  const avatarScale = 0.76 + ((pos.y - MIN_Y) / (MAX_Y - MIN_Y)) * 0.22;

  return (
    <section
      className="relative z-10 w-full px-3.5 pt-1 pb-14 flex flex-col gap-2.5 animate-pop-in"
      aria-labelledby="prep-heading"
    >
      {/* Title */}
      <div className="text-center">
        <h1
          id="prep-heading"
          className="font-display font-bold text-xl leading-tight text-[#1E2A4A] sticker-text [text-wrap:balance]"
        >
          ALMOST READY! PACK YOUR ESSENTIALS.
        </h1>
      </div>

      {/* Compact Top Checklist + Backpack Bar */}
      <div className="bg-white border-4 border-[#1E2A4A] rounded-3xl toy-card p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Backpack className="w-4 h-4 text-[#7B4B94]" aria-hidden="true" />
            <span className="font-display font-bold text-sm text-[#1E2A4A]">
              Checklist &amp; Backpack
            </span>
          </div>
          <span className="text-xs font-extrabold text-[#475569] tabular-nums">
            {(inventory.waterBottle ? 1 : 0) + (inventory.pencil ? 1 : 0)}/2 packed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            className={`px-2.5 py-1.5 rounded-xl border-2 flex items-center gap-2 transition-colors ${
              inventory.waterBottle
                ? 'bg-[#EEF9E8] border-[#7AC143]'
                : 'bg-[#FFFDF9] border-[#CBD5E1]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-md border-2 border-[#1E2A4A] flex items-center justify-center shrink-0 ${
                inventory.waterBottle ? 'bg-[#7AC143] text-white' : 'bg-white'
              }`}
              aria-hidden="true"
            >
              {inventory.waterBottle && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
            </span>
            <span
              className={`text-xs font-extrabold leading-tight ${
                inventory.waterBottle ? 'text-[#1E2A4A] line-through' : 'text-[#1E2A4A]'
              }`}
            >
              Water bottle
            </span>
          </div>

          <div
            className={`px-2.5 py-1.5 rounded-xl border-2 flex items-center gap-2 transition-colors ${
              inventory.pencil
                ? 'bg-[#EEF9E8] border-[#7AC143]'
                : 'bg-[#FFFDF9] border-[#CBD5E1]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-md border-2 border-[#1E2A4A] flex items-center justify-center shrink-0 ${
                inventory.pencil ? 'bg-[#7AC143] text-white' : 'bg-white'
              }`}
              aria-hidden="true"
            >
              {inventory.pencil && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
            </span>
            <span
              className={`text-xs font-extrabold leading-tight ${
                inventory.pencil ? 'text-[#1E2A4A] line-through' : 'text-[#1E2A4A]'
              }`}
            >
              Pencil
            </span>
          </div>
        </div>
      </div>

      {/* Playable Roblox Bedroom Arena */}
      <div className="bg-white border-4 border-[#1E2A4A] rounded-3xl toy-card p-2.5 flex flex-col gap-2">
        {/* Search Radar Hint */}
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-[#FFF6E5] border-2 border-[#1E2A4A]/15 text-xs font-bold text-[#1E2A4A]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Compass className="w-4 h-4 text-[#7B4B94] shrink-0" aria-hidden="true" />
            <span className="truncate">{searchHint}</span>
          </div>
        </div>

        {/* 2.5D Walkable Portrait Room */}
        <div
          ref={roomRef}
          onClick={handleRoomFloorClick}
          className="relative w-full h-[255px] rounded-2xl border-3 border-[#1E2A4A] overflow-hidden bg-[#FFF6DF] select-none touch-none"
          role="application"
          aria-label="Playable bedroom arena. Tap floor or use the directional pad below to move your character and collect the water bottle and pencil."
        >
          {/* Back Wall */}
          <div
            className="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-[#E5F4FD] to-[#FFF2D4] border-b-3 border-[#1E2A4A] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-2.5 left-[8%] w-16 h-14 rounded-xl bg-[#9AD9F5] border-2 border-[#1E2A4A] overflow-hidden">
              <div className="absolute top-2 left-2 w-6 h-2.5 bg-white rounded-full opacity-90" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-[#1E2A4A]" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#1E2A4A]" />
            </div>

            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-xl bg-[#E95D7A] border-2 border-[#1E2A4A] text-white text-center">
              <span className="font-display font-bold text-[11px] block">PARTY QUEST</span>
            </div>

            <div className="absolute top-3 right-[8%] w-16 flex flex-col items-end">
              <div className="flex items-end gap-1 px-1">
                <div className="w-2.5 h-6 rounded-t-sm bg-[#7B4B94] border-2 border-[#1E2A4A]" />
                <div className="w-2.5 h-8 rounded-t-sm bg-[#F8C630] border-2 border-[#1E2A4A]" />
                <div className="w-3 h-5 rounded-t-sm bg-[#7AC143] border-2 border-[#1E2A4A]" />
              </div>
              <div className="w-full h-2 rounded-md bg-[#D99B52] border-2 border-[#1E2A4A]" />
            </div>
          </div>

          {/* Roblox Stud Floor */}
          <div
            className="absolute bottom-0 inset-x-0 h-[60%] bg-[#F2D399] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(30, 42, 74, 0.13) 2px, transparent 2px)',
              backgroundSize: '18px 18px',
            }}
            aria-hidden="true"
          />

          {/* Center Rug */}
          <div
            className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[28%] rounded-full bg-[#80C8E8] border-3 border-[#1E2A4A] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-white/80" />
          </div>

          {/* Bed + Nightstand */}
          <div
            className="absolute left-[4%] top-[36%] w-[25%] h-[21%] pointer-events-none"
            style={{ zIndex: 25 }}
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-xl bg-[#2D9CDB] border-2 border-[#1E2A4A] p-1 flex flex-col justify-between">
              <div className="w-1/2 h-2.5 rounded bg-white border border-[#1E2A4A]" />
              <div className="w-full h-3.5 rounded bg-[#E95D7A] border border-[#1E2A4A]" />
            </div>
          </div>

          <div
            className="absolute left-[12%] top-[63%] w-12 h-11 rounded-xl bg-[#F47C20] border-2 border-[#1E2A4A] p-1 flex flex-col justify-between pointer-events-none"
            style={{ zIndex: 55 }}
            aria-hidden="true"
          >
            <div className="w-full h-3 rounded bg-[#FFA259] border border-[#1E2A4A]" />
            <div className="w-full h-3 rounded bg-[#FFA259] border border-[#1E2A4A]" />
          </div>

          {/* Study Desk + Toy Chest */}
          <div
            className="absolute right-[5%] top-[43%] w-[24%] h-[18%] pointer-events-none flex flex-col"
            style={{ zIndex: 40 }}
            aria-hidden="true"
          >
            <div className="w-full h-3.5 rounded-t-lg bg-[#7B4B94] border-2 border-[#1E2A4A]" />
            <div className="flex-1 flex justify-between px-1.5">
              <div className="w-2.5 h-full bg-[#5A3170] border-x-2 border-b-2 border-[#1E2A4A]" />
              <div className="w-2.5 h-full bg-[#5A3170] border-x-2 border-b-2 border-[#1E2A4A]" />
            </div>
          </div>

          <div
            className="absolute right-[6%] top-[76%] w-12 h-8 rounded-lg bg-[#7AC143] border-2 border-[#1E2A4A] pointer-events-none flex items-center justify-center"
            style={{ zIndex: 76 }}
            aria-hidden="true"
          >
            <div className="w-4 h-1.5 rounded-full bg-[#F8C630] border border-[#1E2A4A]" />
          </div>

          {/* Tap-to-walk target ring */}
          {targetPos && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-3 rounded-full border-2 border-[#E95D7A] bg-[#F8C630]/50 pointer-events-none animate-ping"
              style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%`, zIndex: 5 }}
              aria-hidden="true"
            />
          )}

          {/* WATER BOTTLE */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{
              left: `${WATER_BOTTLE_POS.x}%`,
              top: `${WATER_BOTTLE_POS.y}%`,
              zIndex: Math.round(WATER_BOTTLE_POS.y) + 6,
            }}
          >
            {!inventory.waterBottle ? (
              <button
                type="button"
                onClick={handleWaterBottleClick}
                className="flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] rounded-xl p-1"
                aria-label="Walk to and collect water bottle"
              >
                <span className="mb-0.5 px-1.5 py-0.5 rounded-md bg-[#2D9CDB] border-2 border-[#1E2A4A] text-white text-[10px] font-extrabold whitespace-nowrap">
                  Bottle
                </span>
                <div className="animate-item-bob">
                  <svg viewBox="0 0 64 82" className="w-8 h-auto drop-shadow-md">
                    <rect x="21" y="4" width="22" height="10" rx="4" fill="#F8C630" stroke="#1E2A4A" strokeWidth="3" />
                    <rect x="25" y="0" width="14" height="6" rx="2" fill="#E95D7A" stroke="#1E2A4A" strokeWidth="2.5" />
                    <rect x="13" y="14" width="38" height="62" rx="11" fill="#5EC8F2" stroke="#1E2A4A" strokeWidth="3.2" />
                    <rect x="17" y="38" width="30" height="34" rx="7" fill="#2D9CDB" />
                    <rect x="16" y="28" width="32" height="14" fill="#FFFFFF" opacity="0.92" />
                  </svg>
                </div>
              </button>
            ) : (
              recentBurst === 'waterBottle' && (
                <div className="animate-sparkle-burst px-2 py-0.5 rounded-lg bg-[#7AC143] border-2 border-[#1E2A4A] text-white font-display font-bold text-xs whitespace-nowrap">
                  Packed!
                </div>
              )
            )}
          </div>

          {/* PENCIL */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{
              left: `${PENCIL_POS.x}%`,
              top: `${PENCIL_POS.y}%`,
              zIndex: Math.round(PENCIL_POS.y) + 6,
            }}
          >
            {!inventory.pencil ? (
              <button
                type="button"
                onClick={handlePencilClick}
                className="flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630] rounded-xl p-1"
                aria-label="Walk to and collect pencil"
              >
                <span className="mb-0.5 px-1.5 py-0.5 rounded-md bg-[#F8C630] border-2 border-[#1E2A4A] text-[#1E2A4A] text-[10px] font-extrabold whitespace-nowrap">
                  Pencil
                </span>
                <div className="animate-item-bob">
                  <svg viewBox="0 0 88 44" className="w-11 h-auto drop-shadow-md">
                    <g transform="rotate(-14 44 22)">
                      <rect x="6" y="13" width="13" height="18" rx="4" fill="#E95D7A" stroke="#1E2A4A" strokeWidth="3" />
                      <rect x="18" y="13" width="9" height="18" fill="#CBD5E1" stroke="#1E2A4A" strokeWidth="3" />
                      <rect x="27" y="13" width="38" height="18" fill="#F8C630" stroke="#1E2A4A" strokeWidth="3" />
                      <polygon points="65,13 65,31 82,22" fill="#F6D5A9" stroke="#1E2A4A" strokeWidth="3" strokeLinejoin="round" />
                      <polygon points="75,18.5 75,25.5 82,22" fill="#1E2A4A" />
                    </g>
                  </svg>
                </div>
              </button>
            ) : (
              recentBurst === 'pencil' && (
                <div className="animate-sparkle-burst px-2 py-0.5 rounded-lg bg-[#7AC143] border-2 border-[#1E2A4A] text-white font-display font-bold text-xs whitespace-nowrap">
                  Packed!
                </div>
              )
            )}
          </div>

          {/* MOVABLE ROBLOX CHARACTER */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: Math.round(pos.y) + 10,
              transform: `translate(-50%, -88%) scale(${avatarScale})`,
            }}
          >
            <BlockAvatar
              avatar={avatar}
              heldItems={{
                waterBottle: inventory.waterBottle,
                pencil: inventory.pencil,
              }}
              walking={isWalking}
              facing={facing}
              celebrating={bothCollected && !isWalking}
              className="w-24 h-auto"
            />
          </div>
        </div>

        {/* Thumb-Zone Mobile Gamepad: D-Pad (Left) + GRAB Action Button (Right) OR Continue */}
        {bothCollected ? (
          <div className="animate-pop-in bg-[#EEF9E8] border-3 border-[#7AC143] rounded-2xl p-3 flex flex-col gap-2 text-center">
            <p className="font-display font-bold text-lg text-[#1E2A4A]">
              PERFECT! YOU&apos;RE ALL SET!
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="toy-btn w-full min-h-[50px] px-6 py-2.5 rounded-2xl bg-[#7AC143] hover:bg-[#6CB236] border-3 border-[#1E2A4A] shadow-[0_5px_0_#1E2A4A] text-white font-display font-bold text-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Left Thumb: D-Pad */}
            <div className="flex items-center gap-1" role="group" aria-label="Movement controls">
              <button
                type="button"
                onPointerDown={() => setDpadDir('left', true)}
                onPointerUp={() => setDpadDir('left', false)}
                onPointerLeave={() => setDpadDir('left', false)}
                onPointerCancel={() => setDpadDir('left', false)}
                className="toy-btn w-12 h-12 rounded-xl bg-[#FFF6E5] active:bg-[#F8C630] border-3 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A] flex items-center justify-center text-[#1E2A4A] cursor-pointer touch-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
                aria-label="Walk left"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onPointerDown={() => setDpadDir('up', true)}
                  onPointerUp={() => setDpadDir('up', false)}
                  onPointerLeave={() => setDpadDir('up', false)}
                  onPointerCancel={() => setDpadDir('up', false)}
                  className="toy-btn w-12 h-11 rounded-xl bg-[#FFF6E5] active:bg-[#F8C630] border-3 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A] flex items-center justify-center text-[#1E2A4A] cursor-pointer touch-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
                  aria-label="Walk up"
                >
                  <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onPointerDown={() => setDpadDir('down', true)}
                  onPointerUp={() => setDpadDir('down', false)}
                  onPointerLeave={() => setDpadDir('down', false)}
                  onPointerCancel={() => setDpadDir('down', false)}
                  className="toy-btn w-12 h-11 rounded-xl bg-[#FFF6E5] active:bg-[#F8C630] border-3 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A] flex items-center justify-center text-[#1E2A4A] cursor-pointer touch-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
                  aria-label="Walk down"
                >
                  <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              <button
                type="button"
                onPointerDown={() => setDpadDir('right', true)}
                onPointerUp={() => setDpadDir('right', false)}
                onPointerLeave={() => setDpadDir('right', false)}
                onPointerCancel={() => setDpadDir('right', false)}
                className="toy-btn w-12 h-12 rounded-xl bg-[#FFF6E5] active:bg-[#F8C630] border-3 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A] flex items-center justify-center text-[#1E2A4A] cursor-pointer touch-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
                aria-label="Walk right"
              >
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Right Thumb: Context-Aware Grab / Walk-to-Next Action + Edit Look */}
            <div className="flex flex-col items-end gap-1.5">
              <button
                type="button"
                onClick={handleGrabAction}
                className={`toy-btn min-h-[48px] px-4 py-2 rounded-2xl border-3 border-[#1E2A4A] shadow-[0_4px_0_#1E2A4A] font-display font-bold text-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630] ${
                  nearWaterBottle || nearPencil
                    ? 'bg-[#7AC143] text-white'
                    : 'bg-[#F8C630] text-[#1E2A4A]'
                }`}
              >
                <Hand className="w-4 h-4" aria-hidden="true" />
                <span>
                  {nearWaterBottle
                    ? 'GRAB BOTTLE!'
                    : nearPencil
                    ? 'GRAB PENCIL!'
                    : 'FIND ITEM'}
                </span>
              </button>

              <button
                type="button"
                onClick={onBackToCustomize}
                className="toy-btn min-h-[40px] px-3 py-1.5 rounded-xl bg-white border-2 border-[#CBD5E1] text-[#475569] font-bold text-xs flex items-center gap-1 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit Look</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
