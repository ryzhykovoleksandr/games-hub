// ============================================================
// types.ts — shared domain types
// Single source of truth for all data shapes.
// [SCALE] These map 1:1 to API response schemas.
// ============================================================

export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: string;
  players: string;
  size: string;
  badge: 'NEW' | 'HOT' | null;
  accent: string;   // CSS color — card glow, canvas tint
  gradient: string; // CSS gradient — thumb background + preview anim
  color: string;    // Hex — canvas particle color
}

export type GameFilter = 'all' | 'action' | 'strategy' | 'rpg' | 'puzzle' | 'racing' | 'indie';

export type LaunchPhase =
  | 'idle'
  | 'loading'    // stages running
  | 'launched';  // canvas visible

export interface LaunchStage {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'done';
  fill: number; // 0–100
}

export interface WsEvent {
  type: 'player_joined' | 'achievement' | 'new_player';
  game: string;
  msg: string;
}

export interface Toast {
  id: number;
  icon: string;
  title: string;
  msg: string;
}
