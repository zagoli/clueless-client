<script lang="ts">
	import { game } from '$lib/stores/game.svelte';
	import { API_BASE_URL } from '$lib/config';
	import { TabItem, Tabs, Spinner, Button } from 'flowbite-svelte';
	import Game from '$lib/components/Game.svelte';
	import axios from 'axios';
	import { PlusOutline } from 'flowbite-svelte-icons';

	const newGame = async () => {
		const res = await axios.post(`${API_BASE_URL}/new_game`, { players: game.players.length });
		if (res.status !== 201) {
			throw new Error('Invalid response');
		}
		game.start();
	};
</script>

<div class="relative h-full w-full max-w-5xl px-4">
	{#if game.isStarted()}
		<Tabs tabStyle="full">
			<TabItem title="Partita" class="w-full" open>
				<Game {game} />
			</TabItem>
			<TabItem title="Domande" class="w-full">Lorem ipsum</TabItem>
			<TabItem title="Suggerimenti" class="w-full">Lorem ipsum</TabItem>
		</Tabs>
		<Button pill class="absolute end-6 bottom-6 p-4!" title="Aggiungi una domanda">
			<PlusOutline class="h-6 w-6" />
		</Button>
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
