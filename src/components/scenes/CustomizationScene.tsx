import React, { useState } from 'react';
import { Shuffle, CheckCircle2 } from 'lucide-react';
import {
  ACCESSORIES,
  BOTTOMS,
  FACES,
  HAIR_COLORS,
  HAIRSTYLES,
  SHOES,
  SKIN_TONES,
  TOPS,
  getAccessoryOption,
  getBottomOption,
  getFaceOption,
  getHairColor,
  getHairstyleOption,
  getShoeOption,
  getTopOption,
} from '../../data/avatarOptions';
import { AvatarConfig } from '../../types/game';
import { BlockAvatar } from '../BlockAvatar';
import {
  AccessoryIcon,
  BottomIcon,
  FaceIcon,
  HairstyleIcon,
  ShoeIcon,
  TopIcon,
} from '../OptionPreviewIcon';

interface CustomizationSceneProps {
  avatar: AvatarConfig;
  onUpdateAvatar: (patch: Partial<AvatarConfig>) => void;
  onRandomize: () => void;
  onConfirmLook: () => void;
}

type CategoryTab =
  | 'skin'
  | 'face'
  | 'hairstyle'
  | 'hairColor'
  | 'top'
  | 'bottom'
  | 'shoe'
  | 'accessory';

const TABS: { id: CategoryTab; label: string }[] = [
  { id: 'skin', label: 'Skin' },
  { id: 'face', label: 'Faces' },
  { id: 'hairstyle', label: 'Hair' },
  { id: 'hairColor', label: 'Color' },
  { id: 'top', label: 'Tops' },
  { id: 'bottom', label: 'Bottoms' },
  { id: 'shoe', label: 'Shoes' },
  { id: 'accessory', label: 'Extras' },
];

export const CustomizationScene: React.FC<CustomizationSceneProps> = ({
  avatar,
  onUpdateAvatar,
  onRandomize,
  onConfirmLook,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('skin');

  const currentFace = getFaceOption(avatar.faceId).label;
  const currentHair = getHairstyleOption(avatar.hairstyleId).label;
  const currentHairHex = getHairColor(avatar.hairColorId).hex;
  const currentTop = getTopOption(avatar.topId).label;
  const currentBottom = getBottomOption(avatar.bottomId).label;
  const currentShoe = getShoeOption(avatar.shoeId).label;
  const currentAccessory = getAccessoryOption(avatar.accessoryId).label;

  return (
    <section
      className="relative z-10 w-full px-3.5 pt-1 pb-14 flex flex-col gap-2.5 animate-pop-in"
      aria-labelledby="customize-heading"
    >
      {/* Title */}
      <div className="text-center">
        <h1
          id="customize-heading"
          className="font-display font-bold text-xl leading-tight text-[#1E2A4A] sticker-text [text-wrap:balance]"
        >
          LET&apos;S CREATE YOUR LOOK!
        </h1>
      </div>

      {/* Compact Portrait Character Stage Card */}
      <div className="bg-white border-4 border-[#1E2A4A] rounded-3xl toy-card p-3 flex flex-col items-center gap-2">
        <div className="relative w-full h-[180px] bg-gradient-to-b from-[#E5F4FD] via-[#FFF9ED] to-[#FDEFC7] border-3 border-[#1E2A4A] rounded-2xl flex flex-col items-center justify-center overflow-hidden">
          <div
            className="absolute bottom-0 inset-x-0 h-10 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #1E2A4A 1px, transparent 1px), linear-gradient(0deg, #1E2A4A 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
            aria-hidden="true"
          />
          <BlockAvatar avatar={avatar} className="w-32 h-auto relative z-10" />
          <div
            className="w-28 h-3.5 -mt-2 rounded-full bg-[#2D9CDB] border-2 border-[#1E2A4A] relative z-0"
            aria-hidden="true"
          />
        </div>

        <p className="text-[11px] font-extrabold text-[#475569] text-center truncate w-full">
          {currentFace} · {currentHair} · {currentTop} · {currentShoe} · {currentAccessory}
        </p>
      </div>

      {/* Portrait Customization Controls */}
      <div className="bg-white border-4 border-[#1E2A4A] rounded-3xl toy-card p-3 flex flex-col gap-2.5">
        {/* 8 Category Tabs (4x2 mobile grid) */}
        <div
          role="tablist"
          aria-label="Avatar customization categories"
          className="grid grid-cols-4 gap-1.5 bg-[#FFF6E5] p-1.5 rounded-2xl border-2 border-[#E2E8F0]"
        >
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`toy-btn min-h-[38px] px-1.5 py-1.5 rounded-xl font-display font-bold text-xs whitespace-nowrap cursor-pointer border-2 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                  isSelected
                    ? 'bg-[#7B4B94] text-white border-[#1E2A4A] shadow-[0_2px_0_#1E2A4A]'
                    : 'bg-white text-[#1E2A4A] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scroll-bounded Option Grid so bottom CTAs always stay visible */}
        <div role="tabpanel" className="max-h-[215px] overflow-y-auto pr-0.5">
          {activeTab === 'skin' && (
            <div className="grid grid-cols-4 gap-2">
              {SKIN_TONES.map((tone) => {
                const selected = avatar.skinToneId === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ skinToneId: tone.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[62px] p-1.5 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#EBF7FF] border-[#2D9CDB] shadow-[0_3px_0_#2D9CDB]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-lg border-2 border-[#1E2A4A]"
                      style={{ backgroundColor: tone.hex }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-extrabold text-[#1E2A4A] text-center leading-tight">
                      {tone.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'face' && (
            <div className="grid grid-cols-2 gap-2">
              {FACES.map((face) => {
                const selected = avatar.faceId === face.id;
                return (
                  <button
                    key={face.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ faceId: face.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[48px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#FFF0F4] border-[#E95D7A] shadow-[0_3px_0_#E95D7A]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <FaceIcon id={face.id} />
                    <span className="text-xs font-extrabold text-[#1E2A4A] text-left leading-tight">
                      {face.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'hairstyle' && (
            <div className="grid grid-cols-2 gap-2">
              {HAIRSTYLES.map((style) => {
                const selected = avatar.hairstyleId === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ hairstyleId: style.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[48px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#F5EDFA] border-[#7B4B94] shadow-[0_3px_0_#7B4B94]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <HairstyleIcon id={style.id} color={currentHairHex} />
                    <span className="text-xs font-extrabold text-[#1E2A4A] text-left leading-tight">
                      {style.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'hairColor' && (
            <div className="grid grid-cols-3 gap-2">
              {HAIR_COLORS.map((color) => {
                const selected = avatar.hairColorId === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ hairColorId: color.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[52px] px-2 py-1.5 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#FFF0F4] border-[#E95D7A] shadow-[0_3px_0_#E95D7A]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-lg border-2 border-[#1E2A4A]"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-extrabold text-[#1E2A4A] text-center leading-tight">
                      {color.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'top' && (
            <div className="grid grid-cols-2 gap-2">
              {TOPS.map((top) => {
                const selected = avatar.topId === top.id;
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ topId: top.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[48px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#FFF4E6] border-[#F47C20] shadow-[0_3px_0_#F47C20]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <TopIcon
                      id={top.id}
                      primary={top.primaryHex}
                      secondary={top.secondaryHex}
                      accent={top.accentHex}
                      longSleeve={top.longSleeve}
                    />
                    <span className="text-xs font-extrabold text-[#1E2A4A] text-left leading-tight">
                      {top.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'bottom' && (
            <div className="grid grid-cols-2 gap-2">
              {BOTTOMS.map((bottom) => {
                const selected = avatar.bottomId === bottom.id;
                return (
                  <button
                    key={bottom.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ bottomId: bottom.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[50px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#EEF9E8] border-[#7AC143] shadow-[0_3px_0_#7AC143]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <BottomIcon id={bottom.id} category={bottom.category} primary={bottom.primaryHex} />
                    <div className="text-left min-w-0">
                      <span className="text-xs font-extrabold text-[#1E2A4A] block leading-tight truncate">
                        {bottom.label}
                      </span>
                      <span className="text-[10px] font-bold text-[#64748B] capitalize">
                        {bottom.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'shoe' && (
            <div className="grid grid-cols-2 gap-2">
              {SHOES.map((shoe) => {
                const selected = avatar.shoeId === shoe.id;
                return (
                  <button
                    key={shoe.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ shoeId: shoe.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[48px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#FFF9DF] border-[#F8C630] shadow-[0_3px_0_#E0AC12]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <ShoeIcon primary={shoe.primaryHex} sole={shoe.soleHex} stripe={shoe.stripeHex} />
                    <span className="text-xs font-extrabold text-[#1E2A4A] text-left leading-tight">
                      {shoe.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'accessory' && (
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES.map((acc) => {
                const selected = avatar.accessoryId === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => onUpdateAvatar({ accessoryId: acc.id })}
                    aria-pressed={selected}
                    className={`toy-btn min-h-[48px] px-2.5 py-1.5 rounded-2xl border-3 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB] ${
                      selected
                        ? 'bg-[#EBF7FF] border-[#2D9CDB] shadow-[0_3px_0_#2D9CDB]'
                        : 'bg-[#FFFDF9] border-[#CBD5E1]'
                    }`}
                  >
                    <AccessoryIcon id={acc.id} />
                    <span className="text-xs font-extrabold text-[#1E2A4A] text-left leading-tight">
                      {acc.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Thumb-Zone Actions: RANDOMIZE + CONFIRM LOOK */}
        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          <button
            type="button"
            onClick={onRandomize}
            className="toy-btn min-h-[48px] px-3 py-2.5 rounded-2xl bg-[#F8C630] hover:bg-[#EBB820] border-3 border-[#1E2A4A] shadow-[0_4px_0_#1E2A4A] text-[#1E2A4A] font-display font-bold text-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2D9CDB]"
          >
            <Shuffle className="w-4 h-4" aria-hidden="true" />
            <span>RANDOMIZE</span>
          </button>

          <button
            type="button"
            onClick={onConfirmLook}
            className="toy-btn min-h-[48px] px-3 py-2.5 rounded-2xl bg-[#7AC143] hover:bg-[#6CB236] border-3 border-[#1E2A4A] shadow-[0_4px_0_#1E2A4A] text-white font-display font-bold text-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F8C630]"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>CONFIRM LOOK</span>
          </button>
        </div>
      </div>
    </section>
  );
};
