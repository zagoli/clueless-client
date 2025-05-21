<script lang="ts">
	import type { Game } from '$lib/stores/game.svelte';
	import PlayerSection from './PlayerSection.svelte';

	interface Props {
		playerNames: string[];
		game: Game;
	}

	const { playerNames, game }: Props = $props();
</script>

<div class="w-full">
	{#each playerNames as playerName}
		<PlayerSection
			{playerName}
			hand={game.get_hand(playerName)}
			absent_cards={game.get_absent_cards(playerName)}
		/>
	{/each}
</div>
