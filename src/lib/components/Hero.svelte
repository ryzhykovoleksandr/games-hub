<script lang="ts">
  // ============================================================
  // Hero.svelte — landing hero strip
  // [PERF UX] Hero is CSS-animated and appears immediately,
  // masking the fact that game cards haven't loaded yet.
  // Users see meaningful content at 0ms, not a loading state.
  // ============================================================
</script>

<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-label">// No download. No install.</div>
  <h1 class="hero-title">Play anything,<br><em>right now.</em></h1>
  <p class="hero-sub">
    Every game streams instantly to your browser.
    Zero wait, zero installs — just pure play.
  </p>
</section>

<style>
  .hero {
    position: relative;
    z-index: 1;
    padding: 56px 32px 40px;
    overflow: hidden;
  }

  .hero-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent-prime);
    margin-bottom: 12px;
    opacity: 0;
    animation: fade-up var(--dur-slow) var(--ease-out) 0.1s forwards;
  }

  .hero-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    opacity: 0;
    animation: fade-up var(--dur-slow) var(--ease-out) 0.18s forwards;
  }

  .hero-title em {
    font-style: normal;
    background: linear-gradient(135deg, var(--accent-prime), var(--accent-cool));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 15px;
    color: var(--text-secondary);
    font-weight: 400;
    max-width: 480px;
    line-height: 1.6;
    opacity: 0;
    animation: fade-up var(--dur-slow) var(--ease-out) 0.26s forwards;
  }

  /* Ambient radial glow — atmosphere only */
  .hero-glow {
    position: absolute;
    top: -40px; left: 0;
    width: 100%; height: 400px;
    background:
      radial-gradient(ellipse at 30% 40%, rgba(0,245,160,0.07), transparent 70%),
      radial-gradient(ellipse at 70% 60%, rgba(123,97,255,0.06), transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
</style>
