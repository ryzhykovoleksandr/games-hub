<script lang="ts">
  // ============================================================
  // App.svelte — root orchestration (Svelte 5)
  // Svelte 5: onMount/onDestroy still work fine.
  // Events from child components are now callback props.
  // ============================================================
  import { onMount, onDestroy } from 'svelte';

  import TopBar        from './components/TopBar.svelte';
  import Hero          from './components/Hero.svelte';
  import FilterBar     from './components/FilterBar.svelte';
  import GamesGrid     from './components/GamesGrid.svelte';
  import LaunchOverlay from './components/LaunchOverlay.svelte';
  import ToastStack    from './components/ToastStack.svelte';
  import TickerBar     from './components/TickerBar.svelte';

  import { fetchGames, connectWS } from './services/GameService';
  import { games, gamesLoading, launchingGame, onlineCount, pushToast } from './stores';
  import type { Game } from './types';

  let cleanupWS: (() => void) | null = null;
  let driftInterval: ReturnType<typeof setInterval>;

  onMount(async () => {
    const data = await fetchGames();
    games.set(data);
    gamesLoading.set(false);

    cleanupWS = connectWS((event) => {
      if (event.type === 'achievement') {
        pushToast({ icon: '🏆', title: 'Achievement Unlocked', msg: event.msg });
      }
      if (event.type === 'player_joined') {
        onlineCount.update(n => n + Math.floor(Math.random() * 3 + 1));
      }
    });

    driftInterval = setInterval(() => {
      onlineCount.update(n => Math.max(10000, n + Math.floor(Math.random() * 10) - 3));
    }, 5000);
  });

  onDestroy(() => {
    cleanupWS?.();
    clearInterval(driftInterval);
  });

  // Svelte 5: callback prop instead of event dispatcher
  function handlePlay(game: Game) {
    launchingGame.set(game);
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<TopBar />
<Hero />
<FilterBar />
<GamesGrid onplay={handlePlay} />

<LaunchOverlay />
<ToastStack />
<TickerBar />
