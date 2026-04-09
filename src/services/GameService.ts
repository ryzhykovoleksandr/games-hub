// ============================================================
// services/GameService.ts — data / API layer
//
// Responsibilities:
//   - Fetch game catalog (simulated network latency)
//   - Mock WebSocket for realtime events
//
// [SCALE] To connect a real backend:
//   fetchGames()  → replace body with fetch('/api/v1/games')
//   connectWS()   → replace setInterval with new WebSocket(url)
//   Both keep the same return signatures — callers don't change.
// ============================================================

import { GAMES } from '../data/games';
import type { Game, WsEvent } from '../types';

// Simulated network delay range (ms)
const LATENCY_MIN = 700;
const LATENCY_MAX = 1100;

function randomLatency(): number {
  return LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN);
}

// ── fetchGames ───────────────────────────────────────────────
export async function fetchGames(): Promise<Game[]> {
  // [PERF UX] Artificial delay simulates real network round-trip.
  // Skeleton cards are shown during this window — no blank screen.
  await new Promise(r => setTimeout(r, randomLatency()));

  // [SCALE] Real impl:
  // const res = await fetch('/api/v1/games');
  // return res.json() as Promise<Game[]>;
  return GAMES;
}

// ── connectWS ────────────────────────────────────────────────
// Returns a cleanup function (call on component destroy).
// [SCALE] Real impl: const ws = new WebSocket('wss://…'); ws.onmessage = …
export function connectWS(onEvent: (e: WsEvent) => void): () => void {
  const eventFactories: Array<(g: Game) => WsEvent> = [
    (g) => ({ type: 'player_joined', game: g.title, msg: `+1 playing ${g.title}` }),
    (g) => ({ type: 'achievement',   game: g.title, msg: `Someone unlocked "No Mercy" in ${g.title}` }),
    (g) => ({ type: 'new_player',    game: g.title, msg: `New player started ${g.title}` }),
  ];

  let timeoutId: ReturnType<typeof setTimeout>;

  const tick = () => {
    const game    = GAMES[Math.floor(Math.random() * GAMES.length)];
    const factory = eventFactories[Math.floor(Math.random() * eventFactories.length)];
    onEvent(factory(game));
    timeoutId = setTimeout(tick, 4000 + Math.random() * 4000);
  };

  timeoutId = setTimeout(tick, 2000);

  // Return cleanup
  return () => clearTimeout(timeoutId);
}
