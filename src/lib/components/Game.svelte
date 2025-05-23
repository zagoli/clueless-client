<script lang="ts">
	import type { Game } from '$lib/stores/game.svelte';
	import { Button, Hr } from 'flowbite-svelte';
	import PlayerSection from './PlayerSection.svelte';
	import AddCardModal from './AddCardModal.svelte';

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();

	let addCardModalOpen = $state(false);
	let addCardPlayer = $state('');

	function openAddCardModal(player: string) {
		addCardPlayer = player;
		addCardModalOpen = true;
	}
</script>

<div class="w-full">
	<Button class="w-full" disabled={game.isUpdating}>Aggiungi una domanda</Button>
	<Hr />
	{#each game.players as playerName, i}
		<PlayerSection
			{playerName}
			hand={game.getHand(playerName)}
			absentCards={game.getAbsentCards(playerName)}
			canAddCard={!game.isUpdating}
			{openAddCardModal}
		/>
		{#if i < game.players.length - 1}
			<Hr />
		{/if}
	{/each}
</div>

<AddCardModal bind:open={addCardModalOpen} player={addCardPlayer} />
