<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { cards } from '$lib/stores/cards';
	import { game } from '$lib/stores/game.svelte';
	import axios from 'axios';
	import { API_BASE_URL } from '$lib/config';
	import CardsButtonGrid from './CardsButtonGrid.svelte';

	let { open = $bindable(), player } = $props();

	const choosableCards = $derived(
		cards.filter(
			(card) => !game.getAllCardsInHands().includes(card) && !game.revealedCards.includes(card)
		)
	);

	async function handleAddCard(card: string) {
		game.isUpdating = true;
		const playerIdx = game.players.indexOf(player);
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
	<CardsButtonGrid cards={choosableCards} onclick={handleAddCard} />
</Modal>
