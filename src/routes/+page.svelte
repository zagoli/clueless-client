<script lang="ts">
	import { Card, Spinner, Input, Button } from 'flowbite-svelte';
	import { API_BASE_URL } from '$lib/config';
	import { playerNames } from '$lib/stores/players.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let playerName = $state('');
	let error = $state('');
	let apiStatus = $state<Promise<boolean> | null>(null);

	onMount(() => {
		apiStatus = fetch(`${API_BASE_URL}/ping`).then(async (response) => {
			const text = await response.text();
			if (text !== 'pong') throw new Error('Invalid response');
			return true;
		});
	});

	function handleSubmitPlayerName() {
		if (!playerName.trim()) {
			error = 'Il nome non può essere vuoto';
			return;
		}
		error = '';
		playerNames.push(playerName.trim());
		goto('/players');
	}
</script>

<div class="flex h-full items-center justify-center p-4">
	<div class="w-full max-w-md">
		{#await apiStatus}
			<div class="flex items-center justify-center p-6">
				<Spinner size="8" />
			</div>
		{:then status}
			<Card class="p-6 text-center">
				<h2 class="mb-4 text-2xl font-bold dark:text-white">Iniziamo!</h2>
				<form
					onsubmit={(e) => {
						e.preventDefault();
						handleSubmitPlayerName();
					}}
					class="flex flex-col gap-4"
				>
					<Input bind:value={playerName} placeholder="Inserisci il tuo nome" />
					{#if error}
						<p class="text-sm text-red-500">{error}</p>
					{/if}
					<Button type="submit">Continua</Button>
				</form>
			</Card>
		{:catch}
			<div class="fixed inset-0 z-50 flex items-center justify-center">
				<div class="px-4 text-center">
					<p class="mb-4 text-xl">L'applicazione non è disponibile.</p>
					<p class="text-lg">Riprova tra qualche mese... o tra qualche anno.</p>
				</div>
			</div>
		{/await}
	</div>
</div>
