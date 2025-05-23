<script lang="ts">
	import { Card, Input, Button, ButtonGroup, Helper, Listgroup } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { game } from '$lib/stores/game.svelte';

	let newPlayerName = $state('');
	let error = $state('');
	let otherPlayers = $state<string[]>([]);

	function handleAddPlayer() {
		if (!newPlayerName.trim()) {
			error = 'Il nome non può essere vuoto';
		} else {
			otherPlayers.push(newPlayerName.trim());
			error = '';
			newPlayerName = '';
		}
	}

	function handleContinue() {
		if (otherPlayers.length === 0) {
			error = 'Aggiungi almeno un altro giocatore';
		} else {
			game.addPlayers(otherPlayers);
			goto('/game');
		}
	}
</script>

<div class="w-full max-w-md">
	<Card class="p-6">
		<h2 class="mb-4 text-center text-2xl font-bold dark:text-white">
			Aggiungi gli altri giocatori
		</h2>
		<p class="mt-2 mb-4 text-sm">
			Aggiungi i giocatori partendo da quello seduto alla tua sinistra, e proseguendo in senso
			antiorario.
		</p>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleAddPlayer();
			}}
		>
			<ButtonGroup class="w-full">
				<Input bind:value={newPlayerName} placeholder="Nome" autofocus />
				<Button type="submit">Aggiungi</Button>
			</ButtonGroup>
			{#if error}
				<Helper class="mt-2 text-sm">{error}</Helper>
			{/if}
		</form>

		{#if otherPlayers.length > 0}
			<Listgroup class="mt-4 w-full" items={otherPlayers} />
		{/if}
		<Button onclick={handleContinue} class="mt-4">Continua</Button>
	</Card>
</div>
