<script lang="ts">
  import { onlineCount, theme } from '$lib/stores';

  const countDisplay = $derived($onlineCount.toLocaleString() + ' online');
</script>

<nav class="topbar">
  <div class="logo">NEX<span>US</span></div>

  <ul class="nav-links">
    <li><a href="#hub" class="active">Hub</a></li>
    <li><a href="#library">Library</a></li>
    <li><a href="#friends">Friends</a></li>
    <li><a href="#charts">Charts</a></li>
  </ul>

  <div class="nav-right">
    <div class="live-badge">
      <div class="live-dot"></div>
      <span>{countDisplay}</span>
    </div>
    <button class="theme-toggle" onclick={theme.toggle} aria-label="Toggle theme">
      {#if $theme === 'dark'}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      {:else}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      {/if}
    </button>
    <button class="btn-secondary">Sign In</button>
  </div>
</nav>

<style>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 60px;
    background: var(--bg-surface);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    contain: layout style;
    transform: translateZ(0);
    will-change: transform;
    transition: background 0.3s ease;
  }
  .logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-primary);
  }
  .logo span { color: var(--accent-prime); }
  .nav-links {
    display: flex;
    gap: 28px;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease-out);
  }
  .nav-links a:hover { color: var(--text-primary); }
  .nav-links a.active { color: var(--accent-prime); }
  .nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .live-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent-prime);
    letter-spacing: 0.08em;
  }
  .live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent-prime);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  .btn-secondary {
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 8px 20px;
    border: 1px solid var(--border-card);
    border-radius: var(--radius-btn);
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition:
      border-color var(--dur-fast) var(--ease-out),
      background   var(--dur-fast) var(--ease-out),
      color        var(--dur-fast) var(--ease-out);
  }
  .btn-secondary:hover {
    border-color: var(--accent-prime);
    color: var(--accent-prime);
    background: var(--glow-prime);
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid var(--border-card);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-out);
  }
  .theme-toggle:hover {
    color: var(--accent-prime);
    border-color: var(--accent-prime);
    background: var(--glow-prime);
  }
</style>
