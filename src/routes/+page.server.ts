import type { PageServerLoad } from './$types';
import { GAMES } from '$lib/games';

export const load: PageServerLoad = async () => {
  // Load games data on server for instant HTML render
  // This eliminates the client-side fetch delay
  return {
    games: GAMES,
    // Pre-compute filtered data for common filters
    gamesByGenre: GAMES.reduce((acc, game) => {
      const genre = game.genre.toLowerCase();
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(game);
      return acc;
    }, {} as Record<string, typeof GAMES>),
    onlineCount: 12847,
    timestamp: Date.now()
  };
};
