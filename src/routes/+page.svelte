<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import TopBar from '$lib/components/TopBar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import FilterBar from '$lib/components/FilterBar.svelte';
  import GamesGrid from '$lib/components/GamesGrid.svelte';
  import ToastStack from '$lib/components/ToastStack.svelte';
  import TickerBar from '$lib/components/TickerBar.svelte';
  import { games, gamesLoading, launchingGame, onlineCount, pushToast, launchStages, launchPhase, resetLaunchStages, theme } from '$lib/stores';
  import { launch } from '$lib/services/LaunchService';
  import type { Game } from '$lib/types';

  let { data } = $props();

  let LazyOverlay: any = $state(null);
  let cleanupWS: (() => void) | null = null;
  let driftInterval: ReturnType<typeof setInterval>;
  let hydrated = $state(false);

  // Use SSR data immediately - no fetch delay
  $effect(() => {
    if (data.games && !hydrated) {
      games.set(data.games);
      gamesLoading.set(false);
      onlineCount.set(data.onlineCount);
    }
  });

  // Lazy load overlay after first paint
  onMount(() => {
    hydrated = true;
    theme.init();

    // Load LaunchOverlay lazily - NOT blocking first paint
    import('$lib/components/LaunchOverlay.svelte').then(({ default: LaunchOverlay }) => {
      LazyOverlay = LaunchOverlay;
    });

    // Defer WebSocket and interval to after first paint
    setTimeout(() => {
      initRealtime();
    }, 100);

    return () => {
      cleanupWS?.();
      clearInterval(driftInterval);
    };
  });

  async function initRealtime() {
    const { connectWS } = await import('$lib/services/GameService');
    
    cleanupWS = connectWS((event: any) => {
      if (event.type === 'achievement') {
        pushToast({ icon: '🏆', title: 'Achievement Unlocked', msg: event.msg });
      }
      if (event.type === 'player_joined') {
        onlineCount.update((n: number) => n + Math.floor(Math.random() * 3 + 1));
      }
    });

    driftInterval = setInterval(() => {
      onlineCount.update((n: number) => Math.max(10000, n + Math.floor(Math.random() * 10) - 3));
    }, 5000);
  }

  function handlePlay(game: Game) {
    performance.mark('game-launch-start');
    resetLaunchStages();
    launchPhase.set('loading');
    launchingGame.set(game);
    
    launch(game.id, {
      onStart: () => launchPhase.set('loading'),
      onStageStart: (id: number) => {
        launchStages.update((stages: any[]) =>
          stages.map((s: any) => s.id === id ? { ...s, status: 'active' } : s)
        );
      },
      onStageProgress: (id: number, pct: number) => {
        launchStages.update((stages: any[]) =>
          stages.map((s: any) => s.id === id ? { ...s, fill: pct } : s)
        );
      },
      onStageDone: (id: number) => {
        launchStages.update((stages: any[]) =>
          stages.map((s: any) => s.id === id ? { ...s, status: 'done', fill: 100 } : s)
        );
      },
      onComplete: (gameId: string) => {
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
  <title>NEXUS — Instant Play Platform</title>
</svelte:head>

<TopBar />
<Hero />
<FilterBar />
<GamesGrid onplay={handlePlay} />

{#if LazyOverlay}
  <LazyOverlay onexit={exitGame} />
{/if}
<ToastStack />
<TickerBar />
