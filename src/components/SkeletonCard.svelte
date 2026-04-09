<script lang="ts">
  // ============================================================
  // SkeletonCard.svelte — Svelte 5
  // $props() replaces export let.
  // ============================================================
  const { index = 0 }: { index?: number } = $props();
</script>

<div class="card-skeleton" style="--i:{index}">
  <div class="skel-thumb"></div>
  <div class="skel-body">
    <div class="skel-line w-70"></div>
    <div class="skel-line w-45 h-6"></div>
    <div class="skel-btn"></div>
  </div>
</div>

<style>
  .card-skeleton {
    border-radius: var(--radius-card);
    overflow: hidden;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
  }
  .skel-thumb {
    width: 100%;
    aspect-ratio: 16/10;
    background: var(--bg-elevated);
    position: relative;
    overflow: hidden;
  }
  .skel-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  .skel-line {
    height: 10px;
    border-radius: 6px;
    background: var(--bg-elevated);
    position: relative;
    overflow: hidden;
  }
  .skel-line.w-70 { width: 70%; }
  .skel-line.w-45 { width: 45%; }
  .skel-line.h-6  { height: 6px; }
  .skel-btn {
    margin-top: 6px;
    height: 36px;
    border-radius: var(--radius-btn);
    background: var(--bg-elevated);
    position: relative;
    overflow: hidden;
  }
  /* Staggered shimmer via --i */
  .skel-thumb::after,
  .skel-line::after,
  .skel-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255,255,255,0.055) 50%,
      transparent 70%
    );
    animation: shimmer 1.6s var(--ease-in-out) infinite;
    animation-delay: calc(var(--i) * 0.15s);
  }
</style>
