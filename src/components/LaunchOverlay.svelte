<script lang="ts">
  import { onDestroy } from 'svelte';
  import { launchingGame, launchPhase, launchStages } from '../stores';
  import { startCanvasAnimation } from '../services/CanvasService';

  const { onexit }: { onexit: () => void } = $props();

  let canvasEl    = $state<HTMLCanvasElement | undefined>(undefined);
  let canvasVisible = $state(false);
  let exitVisible   = $state(false);
  let canvasHandle: { stop: () => void } | null = null;

  $effect(() => {
    if ($launchPhase === 'launched' && $launchingGame) {
      canvasVisible = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (canvasEl) {
            canvasHandle = startCanvasAnimation(canvasEl, $launchingGame!.color);
          }
        });
      });
      setTimeout(() => (exitVisible = true), 400);
    } else {
      canvasVisible = false;
      exitVisible = false;
      canvasHandle?.stop();
      canvasHandle = null;
    }
  });

  onDestroy(() => canvasHandle?.stop());
</script>

{#if $launchingGame}
<div class="overlay">
  <div class="launch-title">{$launchingGame.title}</div>
  <div class="launch-label">Launching · Instant Play</div>

  <div class="stages">
    {#each $launchStages as stage}
      <div
        class="stage-row"
        class:visible={stage.status !== 'pending'}
        class:active={stage.status === 'active'}
        class:done={stage.status === 'done'}
      >
        <span class="stage-label">{stage.label}</span>
        <div class="stage-track">
          <div class="stage-fill" style="width:{stage.fill}%"></div>
        </div>
        <span class="stage-check">✓</span>
      </div>
    {/each}
  </div>

  {#if canvasVisible}
    <div class="canvas-wrap">
      <canvas
        bind:this={canvasEl}
        width="800"
        height="500"
      ></canvas>
      <div class="canvas-overlay">
        <div class="canvas-game-title">{$launchingGame.title}</div>
        <div class="canvas-sub">game running in browser</div>
      </div>
    </div>
  {/if}

  <button
    class="exit-btn"
    class:visible={exitVisible}
    onclick={onexit}
  >← Back to Hub</button>
</div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: var(--bg-void);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    contain: layout style;
    will-change: transform, opacity;
    transform: translateZ(0);
  }

  .launch-title {
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
    opacity: 0;
    transform: translateY(10px);
    animation: fade-up var(--dur-slow) var(--ease-out) 0.1s forwards;
  }
  .launch-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 40px;
    opacity: 0;
    animation: fade-up var(--dur-slow) var(--ease-out) 0.2s forwards;
  }

  .stages {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 32px;
  }
  .stage-row {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transform: translateX(-8px);
    transition:
      opacity   var(--dur-base) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }
  .stage-row.visible { opacity: 1; transform: none; }

  .stage-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-dim);
    width: 80px;
    flex-shrink: 0;
    transition: color var(--dur-fast);
  }
  .stage-row.done .stage-label   { color: var(--accent-prime); }
  .stage-row.active .stage-label { color: var(--text-secondary); }

  .stage-track {
    flex: 1;
    height: 3px;
    background: var(--bg-elevated);
    border-radius: 99px;
    overflow: hidden;
    contain: strict;
  }
  .stage-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--accent-cool), var(--accent-prime));
    transition: width 0.05s linear;
    will-change: width;
  }
  .stage-check {
    font-size: 12px;
    width: 14px;
    text-align: center;
    opacity: 0;
    color: var(--accent-prime);
    transition: opacity var(--dur-fast);
  }
  .stage-row.done .stage-check { opacity: 1; }

  .canvas-wrap {
    position: relative;
    width: min(90vw, 480px);
    aspect-ratio: 16/10;
    border-radius: var(--radius-card);
    overflow: hidden;
    opacity: 0;
    transform: scale(0.96);
    animation: canvas-reveal var(--dur-xslow) var(--ease-spring) forwards;
  }
  @keyframes canvas-reveal {
    to { opacity: 1; transform: scale(1); }
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    contain: strict;
  }
  .canvas-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: rgba(8,8,16,0.55);
    backdrop-filter: blur(2px);
  }
  .canvas-game-title {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .canvas-sub {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .exit-btn {
    margin-top: 24px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-dim);
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity var(--dur-slow), color var(--dur-fast);
  }
  .exit-btn.visible { opacity: 1; }
  .exit-btn:hover   { color: var(--text-secondary); }
</style>
