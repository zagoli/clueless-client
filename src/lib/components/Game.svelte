<script lang="ts">
	import type { Game } from '$lib/stores/game.svelte';
	import { Hr } from 'flowbite-svelte';
	import PlayerSection from './PlayerSection.svelte';

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();
</script>

<div class="w-full">
	{#each game.players as playerName, i}
		<PlayerSection
			{playerName}
			hand={game.getHand(playerName)}
			absent_cards={game.getAbsentCards(playerName)}
		/>
		{#if i < game.players.length - 1}
			<Hr />
		{/if}
	{/each}
</div>
