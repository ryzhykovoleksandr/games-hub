<script lang="ts">
  import type { Game } from '$lib/types';
  import { prefetchGame } from '$lib/services/GameService';

  const { game, index = 0, onplay }: {
    game: Game;
    index?: number;
    onplay: (game: Game) => void;
  } = $props();

  let rippling = $state(false);

  function handlePlay(e: MouseEvent) {
    e.stopPropagation();
    rippling = true;
    setTimeout(() => (rippling = false), 400);
    onplay(game);
  }

  let prefetched = false;
  function onMouseEnter() {
    if (!prefetched) {
      prefetched = true;
      prefetchGame(game.id);
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="game-card"
  style="--card-accent:{game.accent}; --card-gradient:{game.gradient}; --card-index:{index}"
  onmouseenter={onMouseEnter}
  role="article"
>
  <div class="card-thumb">
    <div class="card-thumb-bg" style="background:{game.gradient}"></div>
    <div class="card-thumb-anim"></div>
    <div class="card-thumb-fade" aria-hidden="true"></div>

    <div class="card-badges">
      {#if game.badge}
        <span class="badge badge-{game.badge.toLowerCase()}">{game.badge}</span>
      {/if}
      <span class="badge badge-genre">{game.genre}</span>
    </div>

    <div class="card-players">
      <div class="players-dot"></div>
      {game.players}
    </div>
  </div>

  <div class="card-body">
    <div class="card-title">{game.title}</div>
    <div class="card-meta">
      <span class="card-rating">{game.rating}</span>
      <span class="card-size">{game.size}</span>
    </div>

    <button
      class="btn-play"
      class:ripple={rippling}
      onclick={handlePlay}
    >
      <span class="btn-text">Play Now</span>
    </button>
  </div>
</div>

<style>
  .game-card {
    position: relative;
    border-radius: var(--radius-card);
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    overflow: hidden;
    cursor: pointer;
    will-change: transform;
    contain: layout style;
    transform: translateZ(0);
    transition:
      transform    var(--dur-base) var(--ease-spring),
      box-shadow   var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out);
    opacity: 0;
    transform: translateY(12px) translateZ(0);
    animation: card-reveal var(--dur-slow) var(--ease-out) forwards;
    animation-delay: calc(var(--card-index) * 0.055s);
  }
  @keyframes card-reveal {
    to { opacity: 1; transform: translateY(0) translateZ(0); }
  }
  .game-card:hover {
    transform: translateY(-4px) scale(1.01) translateZ(0);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
  }
  .game-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: calc(var(--radius-card) + 1px);
    background: linear-gradient(135deg, var(--card-accent), transparent);
    opacity: 0;
    z-index: -1;
    transition: opacity var(--dur-base) var(--ease-out);
  }
  .game-card:hover::before { opacity: 0.5; }

  .card-thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: var(--bg-elevated);
  }
  .card-thumb-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform var(--dur-slow) var(--ease-out);
    will-change: transform;
  }
  .game-card:hover .card-thumb-bg { transform: scale(1.06); }

  .card-thumb-anim {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: var(--card-gradient);
    background-size: 300% 300%;
    animation: gradient-pan 3s ease infinite;
    transition: opacity var(--dur-base) var(--ease-out);
    pointer-events: none;
  }
  .game-card:hover .card-thumb-anim { opacity: 1; }

  .card-thumb-fade {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60%;
    background: linear-gradient(transparent, rgba(8,8,16,0.9));
    pointer-events: none;
  }

  .card-badges {
    position: absolute;
    top: 10px; left: 10px;
    display: flex; gap: 6px; z-index: 2;
  }
  .badge {
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 7px;
    border-radius: 4px;
    backdrop-filter: blur(8px);
  }
  .badge-new   { background: rgba(0,245,160,0.18); color: var(--accent-prime); border: 1px solid rgba(0,245,160,0.3); }
  .badge-hot   { background: rgba(255,61,107,0.18); color: var(--accent-hot);  border: 1px solid rgba(255,61,107,0.3); }
  .badge-genre { background: rgba(255,255,255,0.08); color: var(--text-secondary); border: 1px solid var(--border-subtle); }

  .card-players {
    position: absolute;
    bottom: 10px; right: 10px;
    z-index: 2;
    font-family: var(--font-mono);
    font-size: 10px;
    color: rgba(255,255,255,0.6);
    display: flex; align-items: center; gap: 4px;
  }
  .players-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent-prime);
    animation: pulse-dot 2s ease infinite;
  }

  .card-body { padding: 14px 14px 12px; }
  .card-title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .card-rating { font-family: var(--font-mono); font-size: 11px; color: var(--accent-warm); }
  .card-size   { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); }

  .btn-play {
    width: 100%;
    height: 38px;
    border-radius: var(--radius-btn);
    border: 1px solid rgba(0,245,160,0.25);
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(0,245,160,0.15), rgba(123,97,255,0.15));
    color: var(--accent-prime);
    transition:
      background   var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out),
      box-shadow   var(--dur-fast) var(--ease-out),
      transform    var(--dur-instant) var(--ease-out);
  }
  .btn-play:hover {
    background: linear-gradient(135deg, rgba(0,245,160,0.25), rgba(123,97,255,0.2));
    border-color: rgba(0,245,160,0.5);
    box-shadow: 0 0 20px rgba(0,245,160,0.15);
  }
  .btn-play:active { transform: scale(0.97); }

  .btn-play::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0,245,160,0.3) 0%, transparent 70%);
    opacity: 0;
    transform: scale(0);
  }
  .btn-play.ripple::before {
    opacity: 1;
    transform: scale(2);
    transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-fast);
  }
</style>
