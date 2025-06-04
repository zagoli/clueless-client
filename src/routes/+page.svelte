<script lang="ts">
	import { Card, Spinner, Input, Button, Helper } from 'flowbite-svelte';
	import { API_BASE_URL } from '$lib/config';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { game } from '$lib/model/game.svelte';

	let playerName = $state('');
	let error = $state('');
	const backendUp = async () => {
		const res = await axios.get(`${API_BASE_URL}/ping`);
		if (res.data !== 'pong') {
			throw new Error('Invalid response');
		}
	};

	function handleSubmitPlayerName() {
		if (!playerName.trim()) {
			error = 'Il nome non può essere vuoto';
			return;
		}
		error = '';
		game.addPlayer(playerName.trim());
		goto('/players');
	}
</script>

<div class="w-full max-w-md">
	{#await backendUp()}
		<div class="mx-auto flex items-center justify-center p-6">
			<Spinner size="8" />
		</div>
	{:then _}
		<Card class="mx-auto p-6 text-center ">
			<h2 class="mb-4 text-2xl font-bold dark:text-white">Iniziamo!</h2>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmitPlayerName();
				}}
				class="flex flex-col gap-4"
			>
				<Input bind:value={playerName} placeholder="Inserisci il tuo nome" autofocus />
				{#if error}
					<Helper class="text-sm text-red-500">{error}</Helper>
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
