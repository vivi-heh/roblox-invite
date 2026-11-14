import React from 'react';
import { RotateCcw } from 'lucide-react';
import { AvatarConfig } from '../../types/game';
import { BlockAvatar } from '../BlockAvatar';
import { PartyInvitationCard } from '../PartyInvitationCard';

interface AcceptedInvitationSceneProps {
  avatar: AvatarConfig;
  onPlayAgain: () => void;
}

export const AcceptedInvitationScene: React.FC<AcceptedInvitationSceneProps> = ({
  avatar,
  onPlayAgain,
}) => {
  return (
    <section
      className="relative z-10 w-full px-4 pt-1 pb-16 flex flex-col gap-4 animate-pop-in"
      aria-labelledby="accepted-heading"
    >
      {/* Celebratory Header */}
      <div className="text-center">
        <h1
          id="accepted-heading"
          className="font-display font-bold text-2xl leading-tight text-[#1E2A4A] sticker-text [text-wrap:balance]"
        >
          HOORAY! SEE YOU AT THE PARTY!
        </h1>
        <p className="text-xs font-bold text-[#475569] mt-1">
          Your Children&apos;s Day Party invitation is officially unlocked.
        </p>
      </div>

      {/* Full Portrait Invitation Card */}
      <PartyInvitationCard />

      {/* Celebrating Character + Play Again */}
      <div className="bg-white/95 border-4 border-[#1E2A4A] rounded-3xl toy-card p-4 flex flex-col items-center gap-3.5">
        <div className="flex items-center gap-4 w-full">
          <div className="w-28 shrink-0 bg-gradient-to-b from-[#E5F4FD] to-[#FFF6DF] border-3 border-[#1E2A4A] rounded-2xl pt-3 pb-2 px-2 flex flex-col items-center">
            <BlockAvatar
              avatar={avatar}
              heldItems={{ waterBottle: true, pencil: true }}
              celebrating={true}
              className="w-24 h-auto"
            />
          </div>
          <div className="text-left space-y-1">
            <p className="font-display font-bold text-lg text-[#1E2A4A] leading-tight">
              All Packed &amp; Invited!
            </p>
            <p className="text-xs font-bold text-[#475569] leading-snug">
              Your Roblox character has their water bottle and pencil ready for 23 November 2026.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlayAgain}
          className="toy-btn w-full min-h-[52px] px-6 py-3 rounded-2xl bg-[#2D9CDB] hover:bg-[#2289C4] border-3 border-[#1E2A4A] shadow-[0_5px_0_#1E2A4A] text-white font-display font-bold text-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
        >
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          <span>PLAY AGAIN</span>
        </button>
      </div>
    </section>
  );
};
