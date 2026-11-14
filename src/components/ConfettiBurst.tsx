import React, { useMemo } from 'react';

interface ConfettiBurstProps {
  active: boolean;
}

const COLORS = ['#E95D7A', '#F8C630', '#2D9CDB', '#7AC143', '#7B4B94', '#F47C20'];

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active }) => {
  const pieces = useMemo(() => {
    return Array.from({ length: 42 }, (_, idx) => {
      const left = ((idx * 23 + 7) % 96) + 2;
      const delay = (idx % 9) * 0.14;
      const duration = 2.8 + (idx % 5) * 0.45;
      const size = 9 + (idx % 4) * 3;
      const color = COLORS[idx % COLORS.length];
      const isRound = idx % 3 === 0;
      return { id: idx, left, delay, duration, size, color, isRound };
    });
  }, []);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-40"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-confetti absolute -top-6 block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.isRound ? p.size : p.size * 0.55}px`,
            backgroundColor: p.color,
            borderRadius: p.isRound ? '9999px' : '3px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
