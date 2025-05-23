<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { cards } from '$lib/stores/cards';
	import { game } from '$lib/stores/game.svelte';
	const choosableCards = cards.filter((card) => !playerCards.includes(card));
	let { open = $bindable(), player, playerCards } = $props();

	function handleAddCard(card: string) {
		game.isUpdating = true;
	}
</script>

<Modal bind:open title={`Aggiungi alla mano di ${player}`} autoclose size="sm">
	<div class="cards-grid">
		{#each choosableCards as card}
			<Button color="alternative" onclick={() => handleAddCard(card)}>
				{card}
			</Button>
		{/each}
	</div>
</Modal>

<style>
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
</style>
