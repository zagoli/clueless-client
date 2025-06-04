<script lang="ts">
	import { Button, Card, Select, Label } from 'flowbite-svelte';
	import { suspects, weapons, rooms } from '$lib/model/cards';
	import { game } from '$lib/model/game.svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { API_BASE_URL } from '$lib/config';

	const NOBODY = -1;

	let askedBy = $derived(
		game.players[(game.players.indexOf(game.lastAskedByPlayer) + 1) % game.players.length]
	);
	let suspect = $state('');
	let weapon = $state('');
	let room = $state('');
	let answeredBy = $state<string | typeof NOBODY>('');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const askebByIdx = game.players.indexOf(askedBy);
		const answeredByIdx =
			typeof answeredBy === 'number' ? answeredBy : game.players.indexOf(answeredBy);
		game.isUpdating = true;
		try {
			const response = await axios.post(
				`${API_BASE_URL}/add_question`,
				{ asked_by: askebByIdx, answered_by: answeredByIdx, cards: [suspect, weapon, room] },
				{ withCredentials: true }
			);

			if (response.data) {
				game.updateGame(response.data);
				game.lastAskedByPlayer = askedBy;
				game.addQuestion({
					askedBy,
					suspect,
					weapon,
					room,
					answeredBy: answeredBy === NOBODY ? 'Nessuno' : answeredBy
				});
			}
		} catch (_) {
			alert('Errore, non ho aggiunto la domanda');
		} finally {
			game.isUpdating = false;
		}
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
					bind:value={answeredBy}
					required
					placeholder="Seleziona un giocatore"
				>
					{#each game.players as player}
						<option value={player}>{player}</option>
					{/each}
					<option value={NOBODY}>Nessuno</option>
				</Select>
			</div>

			<div class="flex gap-4">
				<Button type="button" class="flex-1" color="alternative" onclick={() => goto('/game')}
					>Annulla</Button
				>
				<Button type="submit" class="flex-1" disabled={game.isUpdating}>Aggiungi</Button>
			</div>
		</form>
	</Card>
</div>
