<script lang="ts">
  // ============================================================
  // GamesGrid.svelte — two-phase grid: skeleton → real cards (Svelte 5)
  // Svelte 5: callback props replace createEventDispatcher.
  // ============================================================
  import { gamesLoading, filteredGames } from '$lib/stores';
  import SkeletonCard from './SkeletonCard.svelte';
  import GameCard from './GameCard.svelte';
  import type { Game } from '$lib/types';

  // Svelte 5 callback prop
  const { onplay }: { onplay: (game: Game) => void } = $props();

  const SKELETON_COUNT = 8;
</script>

<main class="grid-wrap">
  <div class="section-header">
    <span class="section-title">Featured &amp; Trending</span>
    <span class="section-count">
      {$gamesLoading ? 'Loading…' : `${$filteredGames.length} games`}
    </span>
  </div>

  <div class="games-grid">
    {#if $gamesLoading}
      {#each Array(SKELETON_COUNT) as _, i}
        <SkeletonCard index={i} />
      {/each}
    {:else}
      {#each $filteredGames as game, i (game.id)}
        <GameCard {game} index={i} onplay={onplay} />
      {/each}
    {/if}
  </div>
</main>

<style>
  .grid-wrap {
    position: relative;
    z-index: 1;
    padding: 0 32px 80px;
    contain: layout style;
  }
  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .section-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
  .section-count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
  }
  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    content-visibility: auto;
    contain-intrinsic-size: 0 400px;
  }
</style>
