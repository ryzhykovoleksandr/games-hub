// ============================================================
// services/LaunchService.ts — PARALLEL launch pipeline
//
// [PERF] All stages now run in PARALLEL using Promise.all
// This reduces total launch time from sum(stages) to max(stages)
// ============================================================

export interface StageConfig {
  id: number;
  label: string;
  duration: number;
}

export interface LaunchCallbacks {
  onStart: (gameId: string) => void;
  onStageStart: (id: number) => void;
  onStageProgress: (id: number, pct: number) => void;
  onStageDone: (id: number) => void;
  onComplete: (gameId: string) => void;
}

const STAGES: StageConfig[] = [
  { id: 0, label: 'Engine',    duration: 600  },
  { id: 1, label: 'Assets',    duration: 800  },
  { id: 2, label: 'Save Data', duration: 400  },
  { id: 3, label: 'Session',   duration: 500  },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function runStageParallel(
  stage: StageConfig,
  onProgress: (pct: number) => void,
): Promise<void> {
  return new Promise(resolve => {
    const startTime = performance.now();
    const TICK_MS = 32;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const raw = Math.min(1, elapsed / stage.duration);
      const eased = easeOutQuart(raw);
      const pct = eased * 100;
      
      onProgress(pct);

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        onProgress(100);
        resolve();
      }
    };

    requestAnimationFrame(tick);
  });
}

export async function launch(
  gameId: string,
  callbacks: LaunchCallbacks,
): Promise<void> {
  callbacks.onStart(gameId);

  STAGES.forEach(s => callbacks.onStageStart(s.id));

  await Promise.all(
    STAGES.map(stage =>
      runStageParallel(stage, (pct) => {
        callbacks.onStageProgress(stage.id, pct);
        if (pct >= 100) {
          callbacks.onStageDone(stage.id);
        }
      })
    )
  );

  callbacks.onComplete(gameId);
}

export { STAGES };
