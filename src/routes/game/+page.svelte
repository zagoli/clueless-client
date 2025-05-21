<script lang="ts">
	import { playerNames } from '$lib/stores/players.svelte';
	import { game } from '$lib/stores/game.svelte';
	import { onMount } from 'svelte';
	import { API_BASE_URL } from '$lib/config';
	import { TabItem, Tabs, Spinner } from 'flowbite-svelte';

	let newGamePromise: Promise<void> | null = null;

	onMount(() => {
		if (!game.game_started) {
			newGamePromise = fetch(`${API_BASE_URL}/new_game`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ players: playerNames.length })
			}).then(async (response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				game.game_started = true;
			});
		}
	});
</script>

<div class="flex h-full items-center justify-center p-4">
	<div class="w-full max-w-5xl px-4">
		{#if game.game_started}
			<Tabs tabStyle="full">
				<TabItem title="Partita" class="w-full" open>Lorem ipsum</TabItem>
				<TabItem title="Domande" class="w-full">Lorem ipsum</TabItem>
				<TabItem title="Suggerimenti" class="w-full">Lorem ipsum</TabItem>
			</Tabs>
		{:else}
			{#await newGamePromise}
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
</div>
