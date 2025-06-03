<script lang="ts">
	import { cards } from '$lib/stores/cards';
	import { game } from '$lib/stores/game.svelte';
	import { Modal } from 'flowbite-svelte';
	import CardsButtonGrid from './CardsButtonGrid.svelte';
	import { API_BASE_URL } from '$lib/config';
	import axios from 'axios';

	let { open = $bindable() } = $props();

	const allCardsInHands = $derived(game.getAllCardsInHands());
	const choosableCards = $derived(
		cards.filter((card) => !allCardsInHands.includes(card) && !game.revealedCards.includes(card))
	);

	async function handleRevealCard(card: string) {
		game.isUpdating = true;
		try {
			const response = await axios.post(
				`${API_BASE_URL}/reveal_card`,
				{ card },
				{ withCredentials: true }
			);

			if (response.data) {
				game.updateGame(response.data);
			}
		} catch (_) {
			alert('Errore, non ho rivelato la carta');
		} finally {
			game.isUpdating = false;
		}
	}
</script>

<Modal bind:open title="Rivela una carta!" autoclose size="sm">
	<CardsButtonGrid cards={choosableCards} onclick={handleRevealCard} />
</Modal>
