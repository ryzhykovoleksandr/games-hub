// ============================================================
// services/CanvasService.ts — generative canvas animation
//
// Renders a game-specific animated scene on the canvas element.
// Color/palette derived from the game's accent color.
//
// [SCALE] Replace draw() body with actual game engine bootstrap,
// e.g. PixiJS / Three.js / WASM module mounting on the canvas.
// The start/stop API stays identical.
// ============================================================

interface CanvasHandle {
  stop: () => void;
}

export function startCanvasAnimation(
  canvas: HTMLCanvasElement,
  accentColor: string,
): CanvasHandle {
  const ctx = canvas.getContext('2d')!;
  const W = canvas.width;
  const H = canvas.height;
  let frame = 0;
  let rafId = 0;

  // ── Particle system setup ──────────────────────────────────
  const PARTICLE_COUNT = 60;
  const GRID_SIZE      = 50;

  function draw() {
    // Clear with slight trail — motion blur feel
    ctx.fillStyle = 'rgba(8,8,16,0.85)';
    ctx.fillRect(0, 0, W, H);

    // ── Particles ──────────────────────────────────────────
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const seed = i * 137.5 + frame * 0.3;
      const x = (Math.sin(seed * 0.017) * 0.5 + 0.5) * W;
      const y = (Math.cos(seed * 0.013) * 0.5 + 0.5) * H;
      const r = Math.sin(seed + frame * 0.02) * 2 + 2.5;
      const a = (Math.sin(seed * 0.07 + frame * 0.015) * 0.5 + 0.5) * 0.6;

      const alpha = Math.floor(a * 255).toString(16).padStart(2, '0');

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = accentColor + alpha;
      ctx.fill();
    }

    // ── Scrolling grid ──────────────────────────────────────
    ctx.strokeStyle = accentColor + '18';
    ctx.lineWidth   = 1;
    const offset = (frame * 0.4) % GRID_SIZE;

    for (let x = -GRID_SIZE + offset; x < W + GRID_SIZE; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = -GRID_SIZE + offset; y < H + GRID_SIZE; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    frame++;
    rafId = requestAnimationFrame(draw);
  }

  draw();

  return {
    stop: () => cancelAnimationFrame(rafId),
  };
}
