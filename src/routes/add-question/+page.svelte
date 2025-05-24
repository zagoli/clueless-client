<script lang="ts">
	import { Button, Card, Select, Label } from 'flowbite-svelte';
	import { suspects, weapons, rooms } from '$lib/stores/cards';
	import { game } from '$lib/stores/game.svelte';
	import { goto } from '$app/navigation';

	const NOBODY = -1;

	let askedBy = $state('');
	let suspect = $state('');
	let weapon = $state('');
	let room = $state('');
	let respondedBy = $state<string | number>('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		goto('/game');
	}
</script>

<div class="w-full max-w-md">
	<Card class="mx-auto p-6">
		<h2 class="mb-6 text-center text-2xl font-bold dark:text-white">Aggiungi una domanda</h2>
		<form class="flex flex-col gap-4" onsubmit={handleSubmit}>
			<div>
				<Label for="askedBy">Chi fa la domanda</Label>
				<Select id="askedBy" bind:value={askedBy} required placeholder="Seleziona un giocatore">
					{#each game.players as player}
						<option value={player}>{player}</option>
					{/each}
				</Select>
			</div>

			<div>
				<Label for="suspect">Sospetto</Label>
				<Select id="suspect" bind:value={suspect} required placeholder="Seleziona un sospettato">
					{#each suspects as suspectOption}
						<option value={suspectOption}>{suspectOption}</option>
					{/each}
				</Select>
			</div>

			<div>
				<Label for="weapon">Arma</Label>
				<Select id="weapon" bind:value={weapon} required placeholder="Seleziona un'arma">
					{#each weapons as weaponOption}
						<option value={weaponOption}>{weaponOption}</option>
					{/each}
				</Select>
			</div>

			<div>
				<Label for="room">Stanza</Label>
				<Select id="room" bind:value={room} required placeholder="Seleziona una stanza">
					{#each rooms as roomOption}
						<option value={roomOption}>{roomOption}</option>
					{/each}
				</Select>
			</div>

			<div>
				<Label for="respondedBy">Chi ha risposto</Label>
				<Select
					id="respondedBy"
					bind:value={respondedBy}
					required
					placeholder="Seleziona un giocatore"
				>
					{#each game.players as player}
						<option value={player}>{player}</option>
					{/each}
					<option value={NOBODY}>Nessuno</option>
				</Select>
			</div>

			<Button type="submit" class="mt-4">Aggiungi</Button>
		</form>
	</Card>
</div>
