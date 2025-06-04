<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import { TabItem, Tabs, Spinner } from 'flowbite-svelte';
	import { game } from '$lib/model/game.svelte';
	import Players from '$lib/components/Players.svelte';
	import axios from 'axios';
	import Questions from '$lib/components/Questions.svelte';
	import Suggestions from '$lib/components/Suggestions.svelte';
	import CardsOwner from '$lib/components/CardsOwners.svelte';

	const newGame = async () => {
		const res = await axios.post(
			`${API_BASE_URL}/new_game`,
			{ players: game.players.length },
			{ withCredentials: true }
		);
		if (res.status !== 201) {
			throw new Error('Invalid response');
		}
		game.start();
	};
</script>

<div class="h-full w-full max-w-md">
	{#if game.isStarted()}
		<Tabs tabStyle="pill">
			<TabItem title="Giocatori" class="w-full" open>
				<Players {game} />
			</TabItem>
			<TabItem title="Carte" class="w-full">
				<CardsOwner {game} />
			</TabItem>
			<TabItem title="Domande" class="w-full">
				<Questions questions={game.questions} />
			</TabItem>
			<TabItem title="Suggerimenti" class="w-full">
				<Suggestions envelope={game.envelope} />
			</TabItem>
		</Tabs>
	{:else}
		{#await newGame()}
			<div class="flex items-center justify-center p-6">
				<Spinner size="8" />
			</div>
		{:catch}
			<div class="px-4 text-center">
				<p class="my-4 text-xl font-bold">Impossibile creare la partita.</p>
				<p>Mi dispiace! Pazienza... prova a resettare la partita.</p>
			</div>
		{/await}
	{/if}
</div>
