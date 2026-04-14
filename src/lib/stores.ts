// ============================================================
// stores/index.ts — Svelte 5 optimized stores
// ============================================================
import { writable, derived } from 'svelte/store';
import type { Game, GameFilter, LaunchPhase, LaunchStage, Toast } from './types';
import { STAGES } from './services/LaunchService';

const STAGE_POOL = STAGES.map(s => ({ id: s.id, label: s.label, status: 'pending' as const, fill: 0 }));

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

export const launchingGame = writable<Game | null>(null);
export const launchPhase   = writable<LaunchPhase>('idle');
export const launchStages  = writable<LaunchStage[]>([...STAGE_POOL]);

export function resetLaunchStages() {
  launchStages.set(STAGE_POOL.map(s => ({ ...s })));
}

let _toastId = 0;
export const toasts = writable<Toast[]>([]);

export function pushToast(t: Omit<Toast, 'id'>) {
  const id = ++_toastId;
  toasts.update(all => [{ ...t, id }, ...all]);
  setTimeout(() => {
    toasts.update(all => all.filter(x => x.id !== id));
  }, 4500);
}

// Theme
export type Theme = 'dark' | 'light';

function createThemeStore() {
  const stored = typeof localStorage !== 'undefined' 
    ? (localStorage.getItem('theme') as Theme) || 'dark'
    : 'dark';
  
  const { subscribe, set, update } = writable<Theme>(stored);

  return {
    subscribe,
    toggle: () => {
      update(t => {
        const next = t === 'dark' ? 'light' : 'dark';
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', next);
        }
        document.documentElement.setAttribute('data-theme', next);
        return next;
      });
    },
    init: () => {
      if (typeof localStorage !== 'undefined') {
        document.documentElement.setAttribute('data-theme', stored);
      }
    }
  };
}

export const theme = createThemeStore();
