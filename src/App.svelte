<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import TopBar     from './components/TopBar.svelte';
  import Hero       from './components/Hero.svelte';
  import FilterBar  from './components/FilterBar.svelte';
  import GamesGrid  from './components/GamesGrid.svelte';
  import ToastStack from './components/ToastStack.svelte';
  import TickerBar   from './components/TickerBar.svelte';

  import { fetchGames, connectWS } from './services/GameService';
  import { games, gamesLoading, launchingGame, onlineCount, pushToast, launchStages, launchPhase, resetLaunchStages, theme } from './stores';
  import { launch } from './services/LaunchService';
  import type { Game } from './types';

  let LazyOverlay: any = null;

  import('./components/LaunchOverlay.svelte').then(({ default: LaunchOverlay }) => {
    LazyOverlay = LaunchOverlay;
  });

  let cleanupWS: (() => void) | null = null;
  let driftInterval: ReturnType<typeof setInterval>;

  onMount(async () => {
    theme.init();
    performance.mark('app-mount');
    const data = await fetchGames();
    performance.mark('games-fetched');
    performance.measure('fetch latency', 'app-mount', 'games-fetched');
    
    games.set(data);
    gamesLoading.set(false);

    cleanupWS = connectWS(
      (event: any) => {
        if (event.type === 'achievement') {
          pushToast({ icon: '🏆', title: 'Achievement Unlocked', msg: event.msg });
        }
        if (event.type === 'player_joined') {
          onlineCount.update(n => n + Math.floor(Math.random() * 3 + 1));
        }
      }
    );

    driftInterval = setInterval(() => {
      onlineCount.update(n => Math.max(10000, n + Math.floor(Math.random() * 10) - 3));
    }, 5000);
  });

  onDestroy(() => {
    cleanupWS?.();
    clearInterval(driftInterval);
  });

  function handlePlay(game: Game) {
    performance.mark('game-launch-start');
    resetLaunchStages();
    launchPhase.set('loading');
    launchingGame.set(game);
    
    launch(game.id, {
      onStart: () => launchPhase.set('loading'),
      onStageStart: (id) => {
        launchStages.update(stages =>
          stages.map(s => s.id === id ? { ...s, status: 'active' } : s)
        );
      },
      onStageProgress: (id, pct) => {
        launchStages.update(stages =>
          stages.map(s => s.id === id ? { ...s, fill: pct } : s)
        );
      },
      onStageDone: (id) => {
        launchStages.update(stages =>
          stages.map(s => s.id === id ? { ...s, status: 'done', fill: 100 } : s)
        );
      },
      onComplete: (gameId) => {
        performance.mark('game-launched');
        performance.measure('launch duration', 'game-launch-start', 'game-launched');
        launchPhase.set('launched');
      },
    });
  }

  function exitGame() {
    launchingGame.set(null);
    launchPhase.set('idle');
    resetLaunchStages();
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<TopBar />
<Hero />
<FilterBar />
<GamesGrid onplay={handlePlay} />

{#if LazyOverlay}
  <svelte:component this={LazyOverlay} onexit={exitGame} />
{/if}
<ToastStack />
<TickerBar />
