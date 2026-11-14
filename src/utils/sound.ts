class SoundController {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', delay = 0, gainVal = 0.08): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playPop(): void {
    this.playTone(520, 0.09, 'triangle', 0, 0.07);
  }

  public playSelect(): void {
    this.playTone(620, 0.08, 'sine', 0, 0.06);
  }

  public playRandomize(): void {
    this.playTone(440, 0.07, 'triangle', 0, 0.06);
    this.playTone(587, 0.07, 'triangle', 0.05, 0.06);
    this.playTone(784, 0.11, 'triangle', 0.1, 0.07);
  }

  public playCollect(): void {
    this.playTone(587, 0.1, 'triangle', 0, 0.09);
    this.playTone(880, 0.18, 'sine', 0.07, 0.09);
  }

  public playAllReady(): void {
    this.playTone(523.25, 0.12, 'triangle', 0, 0.08);
    this.playTone(659.25, 0.12, 'triangle', 0.09, 0.08);
    this.playTone(783.99, 0.14, 'triangle', 0.18, 0.08);
    this.playTone(1046.5, 0.28, 'triangle', 0.27, 0.09);
  }

  public playCelebrate(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playTone(n, idx === notes.length - 1 ? 0.42 : 0.14, 'triangle', idx * 0.075, 0.085);
    });
  }
}

export const soundFX = new SoundController();
