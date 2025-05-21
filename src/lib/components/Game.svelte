<script lang="ts">
	import type { Game } from '$lib/stores/game.svelte';
	import PlayerSection from './PlayerSection.svelte';

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();
</script>

<div class="w-full">
	{#each game.players as playerName}
		<PlayerSection
			{playerName}
			hand={game.getHand(playerName)}
			absent_cards={game.getAbsentCards(playerName)}
		/>
	{/each}
</div>
