<script lang="ts">
	import { cards } from '$lib/model/cards';
	import type { Game } from '$lib/model/game.svelte';
	import {
		Badge,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

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

<Table shadow>
	<TableHead>
		<TableHeadCell>Carta</TableHeadCell>
		<TableHeadCell>Posizione</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each cards as card}
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
