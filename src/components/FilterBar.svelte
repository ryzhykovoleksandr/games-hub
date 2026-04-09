<script lang="ts">
  import { activeFilter } from '../stores';
  import { FILTERS } from '../data/games';
  import type { GameFilter } from '../types';

  function select(id: string) {
    activeFilter.set(id as GameFilter);
  }
</script>

<div class="filter-bar">
  {#each FILTERS as f}
    <button
      class="filter-chip"
      class:active={$activeFilter === f.id}
      onclick={() => select(f.id)}
    >
      {f.label}
    </button>
  {/each}
</div>

<style>
  .filter-bar {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 32px 28px;
    overflow-x: auto;
    scrollbar-width: none;
    opacity: 0;
    animation: fade-up var(--dur-slow) var(--ease-out) 0.34s forwards;
  }
  .filter-bar::-webkit-scrollbar { display: none; }
  .filter-chip {
    flex-shrink: 0;
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 7px 16px;
    border-radius: 100px;
    border: 1px solid var(--border-card);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--dur-fast) var(--ease-out);
  }
  .filter-chip:hover {
    border-color: rgba(255,255,255,0.2);
    color: var(--text-primary);
    background: rgba(255,255,255,0.04);
  }
  .filter-chip.active {
    border-color: var(--accent-prime);
    color: var(--accent-prime);
    background: var(--glow-prime);
  }
</style>
