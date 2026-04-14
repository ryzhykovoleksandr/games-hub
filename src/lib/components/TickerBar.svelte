<script lang="ts">
  import { TICKER_EVENTS } from '$lib/games';
  const items = [...TICKER_EVENTS, ...TICKER_EVENTS];
</script>

<div class="ticker-bar">
  <div class="ticker-label">Live</div>
  <div class="ticker-scroll" aria-hidden="true">
    <div class="ticker-inner">
      {#each items as item}
        <span class="ticker-item">{@html item}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .ticker-bar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 90;
    height: 32px;
    background: rgba(8,8,16,0.92);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .ticker-label {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent-prime);
    padding: 0 14px;
    border-right: 1px solid var(--border-subtle);
    height: 100%;
    display: flex;
    align-items: center;
  }
  .ticker-scroll {
    flex: 1;
    overflow: hidden;
    height: 100%;
  }
  .ticker-inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 48px;
    animation: ticker-move 30s linear infinite;
    white-space: nowrap;
  }
  .ticker-item {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-dim);
    flex-shrink: 0;
  }
  .ticker-item :global(strong)  { color: var(--text-secondary); }
  .ticker-item :global(.t-game) { color: var(--accent-cool); }
</style>
