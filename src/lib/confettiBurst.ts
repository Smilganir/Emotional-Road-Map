import confetti from "canvas-confetti";

/** Full-viewport burst for ~`durationMs` (used when all journal stops are filled). */
export function fireCompletionConfetti(durationMs: number): void {
  const animationEnd = Date.now() + durationMs;
  const defaults = {
    startVelocity: 28,
    spread: 360,
    ticks: 90,
    zIndex: 10000,
    colors: ["#8ca474", "#b2bca0", "#e3a64d", "#d94f5f", "#689888", "#ffffff"],
  };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }
    const particleCount = Math.max(8, Math.floor(45 * (timeLeft / durationMs)));
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.08, 0.42), y: randomInRange(0.1, 0.5) },
    });
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.58, 0.92), y: randomInRange(0.1, 0.5) },
    });
    void confetti({
      ...defaults,
      particleCount: Math.floor(particleCount * 0.5),
      origin: { x: randomInRange(0.35, 0.65), y: randomInRange(0.55, 0.85) },
    });
  }, 180);
}
