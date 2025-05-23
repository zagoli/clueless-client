<script lang="ts">
	import { Button, Modal, Spinner } from 'flowbite-svelte';
	import { cards } from '$lib/stores/cards';
	let { open = $bindable(), player, playerCards } = $props();
	const choosableCards = cards.filter((card) => !playerCards.includes(card));
</script>

<Modal bind:open title={`Aggiungi alla mano di ${player}`} autoclose size="sm">
	<div class="cards-grid">
		{#each choosableCards as card}
			<Button color="alternative">
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
