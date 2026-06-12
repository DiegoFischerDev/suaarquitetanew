import confetti from "canvas-confetti";

const BRAND_CONFETTI_COLORS = [
  "#e8a83a",
  "#c8c832",
  "#7aab5a",
  "#f9f8f3",
  "#3d3834",
];

export function fireCelebrationConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const duration = 2800;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 72,
      origin: { x: 0, y: 0.55 },
      colors: BRAND_CONFETTI_COLORS,
      ticks: 220,
      gravity: 0.92,
      scalar: 1.05,
      shapes: ["square", "circle"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 72,
      origin: { x: 1, y: 0.55 },
      colors: BRAND_CONFETTI_COLORS,
      ticks: 220,
      gravity: 0.92,
      scalar: 1.05,
      shapes: ["square", "circle"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 80,
    spread: 110,
    origin: { y: 0.45, x: 0.5 },
    colors: BRAND_CONFETTI_COLORS,
    ticks: 260,
    gravity: 0.85,
    scalar: 1.1,
    shapes: ["square", "circle"],
  });

  frame();
}
