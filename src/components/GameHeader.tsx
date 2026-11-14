import React from 'react';
import { Volume2, VolumeX, Check } from 'lucide-react';
import { GameScene } from '../types/game';

interface GameHeaderProps {
  currentScene: GameScene;
  muted: boolean;
  onToggleMute: () => void;
}

const STEPS: { id: GameScene; label: string; number: number }[] = [
  { id: 'WELCOME', label: 'Start', number: 1 },
  { id: 'CUSTOMIZATION', label: 'Look', number: 2 },
  { id: 'PREPARATION', label: 'Pack', number: 3 },
  { id: 'INVITATION', label: 'Invite', number: 4 },
  { id: 'ACCEPTED', label: 'Party', number: 5 },
];

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentScene,
  muted,
  onToggleMute,
}) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentScene);

  return (
    <header className="relative z-20 w-full px-3.5 pt-3 pb-2 flex items-center justify-between gap-2">
      {/* Compact Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="w-8 h-8 rounded-xl bg-[#F8C630] border-2 border-[#1E2A4A] shadow-[0_2px_0_#1E2A4A] flex items-center justify-center font-display font-bold text-[#1E2A4A] text-sm"
          aria-hidden="true"
        >
          CD
        </div>
        <span className="font-display font-bold text-base text-[#1E2A4A] whitespace-nowrap">
          Party Quest
        </span>
      </div>

      {/* Compact 5-Step Portrait Progress Trail */}
      <nav aria-label="Adventure progress" className="flex items-center gap-1">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;

          return (
            <div
              key={step.id}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-extrabold transition-colors ${
                isActive
                  ? 'bg-[#7B4B94] text-white border-[#1E2A4A] shadow-[0_2px_0_#1E2A4A]'
                  : isCompleted
                  ? 'bg-[#7AC143] text-white border-[#1E2A4A]'
                  : 'bg-white/85 text-[#64748B] border-[#CBD5E1]'
              }`}
              aria-current={isActive ? 'step' : undefined}
              title={step.label}
            >
              {isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
              ) : (
                <span className="tabular-nums">{step.number}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sound Toggle (44x44 minimum mobile touch target) */}
      <button
        type="button"
        onClick={onToggleMute}
        className="toy-btn w-11 h-11 rounded-xl bg-white border-2 border-[#1E2A4A] shadow-[0_2px_0_#1E2A4A] text-[#1E2A4A] flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
        aria-label={muted ? 'Unmute game sounds' : 'Mute game sounds'}
        title={muted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-[#E95D7A]" aria-hidden="true" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#2D9CDB]" aria-hidden="true" />
        )}
      </button>
    </header>
  );
};
