// ============================================================
// stores/index.ts — Svelte 5 compatible stores
// Svelte 5 keeps writable/derived from 'svelte/store' — no change needed.
// ============================================================
import { writable, derived } from 'svelte/store';
import type { Game, GameFilter, LaunchPhase, LaunchStage, Toast } from '../types';
import { STAGES } from '../services/LaunchService';

// ── Games ────────────────────────────────────────────────────
export const games        = writable<Game[]>([]);
export const gamesLoading = writable<boolean>(true);
export const activeFilter = writable<GameFilter>('all');
export const onlineCount  = writable<number>(12847);

export const filteredGames = derived(
  [games, activeFilter],
  ([$games, $filter]) =>
    $filter === 'all'
      ? $games
      : $games.filter(g => g.genre.toLowerCase() === $filter),
);

// ── Launch ───────────────────────────────────────────────────
export const launchingGame = writable<Game | null>(null);
export const launchPhase   = writable<LaunchPhase>('idle');

const initialStages = (): LaunchStage[] =>
  STAGES.map(s => ({ id: s.id, label: s.label, status: 'pending' as const, fill: 0 }));

export const launchStages = writable<LaunchStage[]>(initialStages());

export function resetLaunchStages() {
  launchStages.set(initialStages());
}

// ── Toasts ───────────────────────────────────────────────────
let _toastId = 0;
export const toasts = writable<Toast[]>([]);

export function pushToast(t: Omit<Toast, 'id'>) {
  const id = ++_toastId;
  toasts.update(all => [{ ...t, id }, ...all]);
  setTimeout(() => {
    toasts.update(all => all.filter(x => x.id !== id));
  }, 4500);
}
