// ============================================================
// services/GameService.ts — data / API layer
//
// Responsibilities:
//   - Fetch game catalog (simulated network latency)
//   - Mock WebSocket for realtime events with batching
//
// [SCALE] To connect a real backend:
//   fetchGames()  → replace body with fetch('/api/v1/games')
//   connectWS()   → replace interval with new WebSocket(url)
// ============================================================

import { GAMES } from '../data/games';
import type { Game, WsEvent } from '../types';

const LATENCY_MIN = 700;
const LATENCY_MAX = 1100;

function randomLatency(): number {
  return LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN);
}

export async function fetchGames(): Promise<Game[]> {
  await new Promise(r => setTimeout(r, randomLatency()));
  return GAMES;
}

// Cache for prefetched game assets
const prefetchCache = new Map<string, Promise<unknown>>();

export function prefetchGame(gameId: string): Promise<unknown> {
  if (!prefetchCache.has(gameId)) {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve({ gameId, loaded: true }), 100 + Math.random() * 200);
    });
    prefetchCache.set(gameId, promise);
  }
  return prefetchCache.get(gameId)!;
}

// ── connectWS with BATCHING ─────────────────────────────────
// Batches events to reduce store updates and prevent layout thrashing
export function connectWS(
  onEvent: (e: WsEvent) => void,
  batchWindowMs: number = 1000
): () => void {
  const eventFactories: Array<(g: Game) => WsEvent> = [
    (g) => ({ type: 'player_joined', game: g.title, msg: `+1 playing ${g.title}` }),
    (g) => ({ type: 'achievement',   game: g.title, msg: `Someone unlocked "No Mercy" in ${g.title}` }),
    (g) => ({ type: 'new_player',    game: g.title, msg: `New player started ${g.title}` }),
  ];

  let timeoutId: ReturnType<typeof setTimeout>;
  let batch: WsEvent[] = [];
  let batchTimer: ReturnType<typeof setTimeout> | null = null;

  const flushBatch = () => {
    if (batch.length > 0) {
      // Deduplicate: keep only latest event per type per game
      const latest = new Map<string, WsEvent>();
      batch.forEach(e => latest.set(`${e.type}:${e.game}`, e));
      latest.forEach(e => onEvent(e));
      batch = [];
    }
    batchTimer = null;
  };

  const tick = () => {
    const game    = GAMES[Math.floor(Math.random() * GAMES.length)];
    const factory = eventFactories[Math.floor(Math.random() * eventFactories.length)];
    batch.push(factory(game));

    if (!batchTimer) {
      batchTimer = setTimeout(flushBatch, batchWindowMs);
    }

    timeoutId = setTimeout(tick, 4000 + Math.random() * 4000);
  };

  timeoutId = setTimeout(tick, 2000);

  return () => {
    clearTimeout(timeoutId);
    if (batchTimer) clearTimeout(batchTimer);
  };
}
