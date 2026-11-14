import React, { useState } from 'react';
import { PartyPopper, User, X, Check } from 'lucide-react';
import {
  getAccessoryOption,
  getBottomOption,
  getFaceOption,
  getHairstyleOption,
  getShoeOption,
  getTopOption,
} from '../../data/avatarOptions';
import { AvatarConfig } from '../../types/game';
import { BlockAvatar } from '../BlockAvatar';

interface InvitationGateSceneProps {
  avatar: AvatarConfig;
  onAcceptInvitation: () => void;
}

export const InvitationGateScene: React.FC<InvitationGateSceneProps> = ({
  avatar,
  onAcceptInvitation,
}) => {
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const faceLabel = getFaceOption(avatar.faceId).label;
  const hairLabel = getHairstyleOption(avatar.hairstyleId).label;
  const topLabel = getTopOption(avatar.topId).label;
  const bottomLabel = getBottomOption(avatar.bottomId).label;
  const shoeLabel = getShoeOption(avatar.shoeId).label;
  const accessoryLabel = getAccessoryOption(avatar.accessoryId).label;

  return (
    <section
      className="relative z-10 w-full px-4 pt-2 pb-16 flex-1 flex flex-col justify-center animate-pop-in"
      aria-labelledby="invite-gate-heading"
    >
      <div className="w-full bg-white/95 border-4 border-[#1E2A4A] rounded-3xl toy-card p-5 flex flex-col items-center text-center gap-4">
        {/* Decorative Sealed Party Envelope */}
        <div
          className="w-full bg-[#FAF3E3] border-3 border-[#1E2A4A] rounded-2xl px-4 py-3 shadow-[0_4px_0_rgba(30,42,74,0.08)]"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-xs text-[#7B4B94]">
              Official Party Mail
            </span>
            <span className="w-7 h-7 rounded-full bg-[#E95D7A] border-2 border-[#1E2A4A] flex items-center justify-center text-white font-display font-bold text-xs">
              ★
            </span>
          </div>
          <div className="mt-2.5 h-2 w-3/4 rounded-full bg-[#F8C630]" />
          <div className="mt-1.5 h-2 w-1/2 rounded-full bg-[#2D9CDB]" />
        </div>

        <h1
          id="invite-gate-heading"
          className="font-display font-bold text-3xl leading-tight text-[#1E2A4A] [text-wrap:balance]"
        >
          YOUR PARTY INVITATION IS HERE!
        </h1>

        {/* Avatar Holding Collected Essentials */}
        <div className="w-full max-w-[240px] bg-gradient-to-b from-[#F5EDFA] to-[#FFF6DF] border-3 border-[#1E2A4A] rounded-3xl pt-4 pb-3 px-3 flex flex-col items-center">
          <BlockAvatar
            avatar={avatar}
            heldItems={{ waterBottle: true, pencil: true }}
            className="w-40 h-auto z-10"
          />
          <div
            className="w-36 h-4 -mt-2 rounded-full bg-[#7AC143] border-2 border-[#1E2A4A]"
            aria-hidden="true"
          />
        </div>

        <p className="text-xs font-extrabold text-[#475569]">
          Packed &amp; ready: Water Bottle · Pencil
        </p>

        {/* Thumb-Zone Stacked Buttons */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={onAcceptInvitation}
            className="toy-btn w-full min-h-[54px] px-6 py-3 rounded-2xl bg-[#E95D7A] hover:bg-[#D94B69] border-3 border-[#1E2A4A] shadow-[0_5px_0_#1E2A4A] text-white font-display font-bold text-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
          >
            <PartyPopper className="w-5 h-5" aria-hidden="true" />
            <span>ACCEPT INVITATION</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCharacterModal(true)}
            className="toy-btn w-full min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#2D9CDB] hover:bg-[#2389C4] border-3 border-[#1E2A4A] shadow-[0_4px_0_#1E2A4A] text-white font-display font-bold text-base flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
          >
            <User className="w-5 h-5" aria-hidden="true" />
            <span>VIEW MY CHARACTER</span>
          </button>
        </div>
      </div>

      {/* Portrait Character Spotlight Modal */}
      {showCharacterModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1E2A4A]/60 backdrop-blur-[2px] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="character-modal-title"
        >
          <div className="animate-pop-in w-full max-w-[380px] bg-white border-4 border-[#1E2A4A] rounded-3xl toy-card p-5 relative">
            <button
              type="button"
              onClick={() => setShowCharacterModal(false)}
              className="toy-btn absolute top-3.5 right-3.5 w-11 h-11 rounded-xl bg-[#FFF6E5] border-2 border-[#1E2A4A] flex items-center justify-center text-[#1E2A4A] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
              aria-label="Close character view"
            >
              <X className="w-5 h-5" />
            </button>

            <h2
              id="character-modal-title"
              className="font-display font-bold text-xl text-[#1E2A4A] mb-3"
            >
              My Party Character
            </h2>

            <div className="bg-gradient-to-b from-[#E5F4FD] to-[#FFF6DF] border-3 border-[#1E2A4A] rounded-2xl py-3 px-4 flex flex-col items-center mb-3">
              <BlockAvatar
                avatar={avatar}
                heldItems={{ waterBottle: true, pencil: true }}
                celebrating={true}
                className="w-32 h-auto"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#334155] mb-3">
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Face</span>
                <span className="text-[#1E2A4A] font-extrabold">{faceLabel}</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Hairstyle</span>
                <span className="text-[#1E2A4A] font-extrabold">{hairLabel}</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Top</span>
                <span className="text-[#1E2A4A] font-extrabold">{topLabel}</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Bottoms</span>
                <span className="text-[#1E2A4A] font-extrabold">{bottomLabel}</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Shoes</span>
                <span className="text-[#1E2A4A] font-extrabold">{shoeLabel}</span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block">Accessory</span>
                <span className="text-[#1E2A4A] font-extrabold">{accessoryLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#4E9229] mb-4">
              <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
              <span>Water Bottle &amp; Pencil Packed</span>
            </div>

            <button
              type="button"
              onClick={() => setShowCharacterModal(false)}
              className="toy-btn w-full min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#F8C630] border-2 border-[#1E2A4A] shadow-[0_3px_0_#1E2A4A] font-display font-bold text-[#1E2A4A] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
            >
              Back to Invitation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
