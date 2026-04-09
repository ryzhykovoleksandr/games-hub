// ============================================================
// services/LaunchService.ts — launch pipeline orchestration
//
// Drives the staged progress UI during game launch.
// Each stage represents a real async operation in production.
//
// [SCALE] Replace each stage's setTimeout with:
//   Stage 0 (Engine)    → await loadWasmModule('/engine.wasm')
//   Stage 1 (Assets)    → await prefetchAssetBundle(gameId)
//   Stage 2 (Save Data) → await fetchSaveData(userId, gameId)
//   Stage 3 (Session)   → await openGameSession(gameId)
// ============================================================

export interface StageConfig {
  id: number;
  label: string;
  duration: number; // ms — simulated async duration
  speed: number;    // fill bar increment per tick
}

export interface LaunchCallbacks {
  onStart: (gameId: string) => void;
  onStageStart: (id: number) => void;
  onStageProgress: (id: number, pct: number) => void;
  onStageDone: (id: number) => void;
  onComplete: (gameId: string) => void;
}

// Stage definitions — order matters
const STAGES: StageConfig[] = [
  { id: 0, label: 'Engine',    duration: 600,  speed: 15 },
  { id: 1, label: 'Assets',    duration: 800,  speed: 12 },
  { id: 2, label: 'Save Data', duration: 400,  speed: 18 },
  { id: 3, label: 'Session',   duration: 500,  speed: 16 },
];

// ── runStage ─────────────────────────────────────────────────
// Animates fill bar for a single stage, resolves when done.
// [PERF UX] Randomised fill speed increment = organic feel,
// avoids the "fake progress" look of perfectly linear bars.
function runStage(
  stage: StageConfig,
  onProgress: (pct: number) => void,
): Promise<void> {
  return new Promise(resolve => {
    let progress = 0;
    const TICK_MS = 40;

    const interval = setInterval(() => {
      // Add jitter to fill speed so it doesn't look scripted
      progress = Math.min(100, progress + stage.speed + Math.random() * 8);
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(resolve, 120); // brief pause before next stage
      }
    }, TICK_MS);
  });
}

// ── launch ───────────────────────────────────────────────────
export async function launch(
  gameId: string,
  callbacks: LaunchCallbacks,
): Promise<void> {
  callbacks.onStart(gameId);

  for (const stage of STAGES) {
    callbacks.onStageStart(stage.id);
    await runStage(stage, (pct) => callbacks.onStageProgress(stage.id, pct));
    callbacks.onStageDone(stage.id);
  }

  callbacks.onComplete(gameId);
}

// Export stage labels for UI rendering
export { STAGES };
