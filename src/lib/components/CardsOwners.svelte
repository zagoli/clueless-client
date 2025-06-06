<script lang="ts">
	import { suspects, weapons, rooms } from '$lib/model/cards';
	import type { Game } from '$lib/model/game.svelte';
	import { Badge, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();

	function whereIsCard(card: string): string {
		if (game.envelope.includes(card)) return 'busta';
		else if (game.revealedCards.includes(card)) return 'rivelata';
		else {
			const owner = game.whichPlayerOwns(card);
			return owner ?? 'sconosciuto';
		}
	}
</script>

<h2 class="mt-2 ml-2 text-2xl font-semibold text-white">Chi?</h2>
<Table>
	<TableBody>
		{#each suspects as card}
			<TableBodyRow>
				<TableBodyCell>{card}</TableBodyCell>
				<TableBodyCell>
					<Badge color={whereIsCard(card) === 'sconosciuto' ? 'gray' : 'green'}>
						{whereIsCard(card).toLowerCase()}
					</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<h2 class="mt-2 ml-2 text-2xl font-semibold text-white">Cosa?</h2>
<Table>
	<TableBody>
		{#each weapons as card}
			<TableBodyRow>
				<TableBodyCell>{card}</TableBodyCell>
				<TableBodyCell>
					<Badge color={whereIsCard(card) === 'sconosciuto' ? 'gray' : 'green'}>
						{whereIsCard(card).toLowerCase()}
					</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<h2 class="mt-2 ml-2 text-2xl font-semibold text-white">Dove?</h2>
<Table>
	<TableBody>
		{#each rooms as card}
			<TableBodyRow>
				<TableBodyCell>{card}</TableBodyCell>
				<TableBodyCell>
					<Badge color={whereIsCard(card) === 'sconosciuto' ? 'gray' : 'green'}>
						{whereIsCard(card).toLowerCase()}
					</Badge>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
