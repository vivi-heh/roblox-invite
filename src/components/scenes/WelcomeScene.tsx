import React from 'react';
import { Play } from 'lucide-react';
import { AvatarConfig } from '../../types/game';
import { BlockAvatar } from '../BlockAvatar';

interface WelcomeSceneProps {
  avatar: AvatarConfig;
  onPlayNow: () => void;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ avatar, onPlayNow }) => {
  return (
    <section
      className="relative z-10 w-full px-4 pt-2 pb-16 flex-1 flex flex-col justify-between gap-4 animate-pop-in"
      aria-labelledby="welcome-heading"
    >
      {/* Top Hero Copy */}
      <div className="bg-white/95 border-4 border-[#1E2A4A] rounded-3xl toy-card px-5 py-6 flex flex-col items-center text-center gap-4">
        <div className="text-xs font-extrabold tracking-wide text-[#7B4B94]">
          <span>Children&apos;s Day Special</span>
          <span aria-hidden="true"> · </span>
          <span>Dress-Up Adventure</span>
        </div>

        <h1
          id="welcome-heading"
          className="font-display font-bold text-4xl leading-[1.05] text-[#1E2A4A] [text-wrap:balance]"
        >
          <span className="text-[#7B4B94]">GET</span>{' '}
          <span className="text-[#F47C20]">READY</span>{' '}
          <span className="text-[#2D9CDB]">FOR</span>{' '}
          <span className="text-[#7AC143]">THE</span>{' '}
          <span className="text-[#E95D7A]">PARTY!</span>
        </h1>

        <p className="text-base font-bold text-[#334155]">
          Your Children&apos;s Day adventure starts here.
        </p>

        {/* Centered Waving Roblox Character Stage */}
        <div className="w-full max-w-[260px] bg-gradient-to-b from-[#E6F5FC] to-[#FFF6DF] border-3 border-[#1E2A4A] rounded-3xl pt-4 pb-4 px-3 flex flex-col items-center shadow-inner">
          <BlockAvatar
            avatar={avatar}
            waving={true}
            className="w-44 h-auto z-10"
          />
          <div
            className="w-36 h-5 -mt-2.5 rounded-full bg-[#F8C630] border-3 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A]"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm font-semibold text-[#475569] leading-snug">
          Create your Roblox-style character, search your room for party essentials, and unlock your invitation!
        </p>

        {/* Bottom Thumb-Zone Primary CTA */}
        <button
          type="button"
          onClick={onPlayNow}
          className="toy-btn w-full min-h-[56px] px-6 py-3.5 rounded-2xl bg-[#7AC143] hover:bg-[#6CB236] border-3 border-[#1E2A4A] shadow-[0_5px_0_#1E2A4A] text-white font-display font-bold text-2xl tracking-wide flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
        >
          <Play className="w-6 h-6 fill-current" aria-hidden="true" />
          <span>PLAY NOW</span>
        </button>
      </div>
    </section>
  );
};
