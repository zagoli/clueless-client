<script lang="ts">
	import type { Game } from '$lib/stores/game.svelte';
	import { Hr } from 'flowbite-svelte';
	import PlayerSection from './PlayerSection.svelte';
	import AddCardModal from './AddCardModal.svelte';

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();

	let addCardModalOpen = $state(false);
	let addCardPlayer = $state('');
	let addCardPlayerCards = $state<string[]>([]);

	function openAddCardModal(player: string, playerCards: string[]) {
		addCardPlayer = player;
		addCardPlayerCards = playerCards;
		addCardModalOpen = true;
	}
</script>

<div class="w-full">
	{#each game.players as playerName, i}
		<PlayerSection
			{playerName}
			hand={game.getHand(playerName)}
			absentCards={game.getAbsentCards(playerName)}
			{openAddCardModal}
		/>
		{#if i < game.players.length - 1}
			<Hr />
		{/if}
	{/each}
</div>

<AddCardModal
	bind:open={addCardModalOpen}
	player={addCardPlayer}
	playerCards={addCardPlayerCards}
/>
