<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { cards } from '$lib/stores/cards';
	import { game } from '$lib/stores/game.svelte';
	import axios from 'axios';
	import { API_BASE_URL } from '$lib/config';
	let { open = $bindable(), player } = $props();

	const allCardsInHands = $derived(game.getAllCardsInHands());
	const choosableCards = $derived(cards.filter((card) => !allCardsInHands.includes(card)));

	async function handleAddCard(card: string) {
		game.isUpdating = true;
		const playerIdx = game.players.indexOf(player);
		if (playerIdx === -1) return;

		try {
			const response = await axios.post(
				`${API_BASE_URL}/add_card`,
				{ card, player: playerIdx },
				{ withCredentials: true }
			);

			if (response.data) {
				game.updateGame(response.data);
			}
		} catch (_) {
			alert('Errore, non ho aggiunto la carta');
		} finally {
			game.isUpdating = false;
		}
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
