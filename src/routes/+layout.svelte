<script lang="ts">
  import '../styles/tokens.css';
  import '../styles/global.css';
  import { theme } from '$lib/stores';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    theme.init();
  });
</script>

{@render children()}
