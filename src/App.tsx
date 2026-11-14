import { useEffect, useRef, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { ConfettiBurst } from './components/ConfettiBurst';
import { GameHeader } from './components/GameHeader';
import { PartyDecorations } from './components/PartyDecorations';
import { AcceptedInvitationScene } from './components/scenes/AcceptedInvitationScene';
import { CustomizationScene } from './components/scenes/CustomizationScene';
import { InvitationGateScene } from './components/scenes/InvitationGateScene';
import { PreparationScene } from './components/scenes/PreparationScene';
import { WelcomeScene } from './components/scenes/WelcomeScene';
import { createDefaultAvatar, generateRandomAvatar } from './data/avatarOptions';
import { AvatarConfig, GameScene, InventoryState } from './types/game';
import { soundFX } from './utils/sound';

export default function App() {
  const [scene, setScene] = useState<GameScene>('WELCOME');
  const [avatar, setAvatar] = useState<AvatarConfig>(() => createDefaultAvatar());
  const [inventory, setInventory] = useState<InventoryState>({
    waterBottle: false,
    pencil: false,
  });
  const [muted, setMuted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const confettiTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current !== null) {
        window.clearTimeout(confettiTimerRef.current);
      }
    };
  }, []);

  const handleToggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      soundFX.setMuted(next);
      return next;
    });
  };

  const handlePlayNow = () => {
    if (scene !== 'WELCOME') return;
    soundFX.playPop();
    setScene('CUSTOMIZATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAvatar = (patch: Partial<AvatarConfig>) => {
    soundFX.playSelect();
    setAvatar((prev) => ({ ...prev, ...patch }));
  };

  const handleRandomizeAvatar = () => {
    soundFX.playRandomize();
    setAvatar(generateRandomAvatar());
  };

  const handleConfirmLook = () => {
    if (scene !== 'CUSTOMIZATION') return;
    soundFX.playPop();
    setScene('PREPARATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollectWaterBottle = () => {
    setInventory((prev) => {
      if (prev.waterBottle) return prev;
      const next = { ...prev, waterBottle: true };
      if (next.pencil) {
        soundFX.playAllReady();
      } else {
        soundFX.playCollect();
      }
      return next;
    });
  };

  const handleCollectPencil = () => {
    setInventory((prev) => {
      if (prev.pencil) return prev;
      const next = { ...prev, pencil: true };
      if (next.waterBottle) {
        soundFX.playAllReady();
      } else {
        soundFX.playCollect();
      }
      return next;
    });
  };

  const handleBackToCustomize = () => {
    if (scene !== 'PREPARATION') return;
    soundFX.playPop();
    setScene('CUSTOMIZATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueFromPrep = () => {
    if (scene !== 'PREPARATION') return;
    if (!inventory.waterBottle || !inventory.pencil) return;
    soundFX.playPop();
    setScene('INVITATION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptInvitation = () => {
    if (scene !== 'INVITATION') return;
    if (!inventory.waterBottle || !inventory.pencil) return;

    soundFX.playCelebrate();
    setScene('ACCEPTED');
    setShowConfetti(true);

    if (confettiTimerRef.current !== null) {
      window.clearTimeout(confettiTimerRef.current);
    }
    confettiTimerRef.current = window.setTimeout(() => {
      setShowConfetti(false);
    }, 4500);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAgain = () => {
    if (confettiTimerRef.current !== null) {
      window.clearTimeout(confettiTimerRef.current);
      confettiTimerRef.current = null;
    }
    soundFX.playPop();
    setShowConfetti(false);
    setAvatar(createDefaultAvatar());
    setInventory({ waterBottle: false, pencil: false });
    setScene('WELCOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Landscape-phone portrait-only prompt */}
      <div className="portrait-lock-overlay fixed inset-0 z-50 bg-[#FFF9ED] text-[#1E2A4A] flex-col items-center justify-center p-6 text-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-[#F8C630] border-3 border-[#1E2A4A] flex items-center justify-center">
          <Smartphone className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-2xl">Portrait Mode Only</h2>
        <p className="text-sm font-bold text-[#475569] max-w-xs">
          Please rotate your phone upright to play Children&apos;s Day Party Adventure.
        </p>
      </div>

      {/* Portrait Mobile Game Frame */}
      <div className="portrait-app-shell min-h-[100dvh] w-full flex justify-center bg-[#F4E9D2]">
        <div className="relative w-full max-w-[440px] min-h-[100dvh] bg-[#FFF9ED] text-[#1E2A4A] flex flex-col overflow-hidden sm:my-3 sm:min-h-[calc(100dvh-1.5rem)] sm:rounded-[32px] sm:border-4 sm:border-[#1E2A4A] sm:shadow-2xl">
          <PartyDecorations
            variant={scene === 'INVITATION' || scene === 'ACCEPTED' ? 'party' : 'welcome'}
          />
          <ConfettiBurst active={showConfetti} />

          <GameHeader
            currentScene={scene}
            muted={muted}
            onToggleMute={handleToggleMute}
          />

          <main className="relative z-10 flex-1 w-full flex flex-col">
            {scene === 'WELCOME' && (
              <WelcomeScene avatar={avatar} onPlayNow={handlePlayNow} />
            )}

            {scene === 'CUSTOMIZATION' && (
              <CustomizationScene
                avatar={avatar}
                onUpdateAvatar={handleUpdateAvatar}
                onRandomize={handleRandomizeAvatar}
                onConfirmLook={handleConfirmLook}
              />
            )}

            {scene === 'PREPARATION' && (
              <PreparationScene
                avatar={avatar}
                inventory={inventory}
                onCollectWaterBottle={handleCollectWaterBottle}
                onCollectPencil={handleCollectPencil}
                onBackToCustomize={handleBackToCustomize}
                onContinue={handleContinueFromPrep}
              />
            )}

            {scene === 'INVITATION' && (
              <InvitationGateScene
                avatar={avatar}
                onAcceptInvitation={handleAcceptInvitation}
              />
            )}

            {scene === 'ACCEPTED' && (
              <AcceptedInvitationScene
                avatar={avatar}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
