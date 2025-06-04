<script lang="ts">
	import { API_BASE_URL } from '$lib/config';
	import { isCardInOneOrMoreCategory } from '$lib/model/cards';
	import { game } from '$lib/model/game.svelte';
	import axios from 'axios';
	import {
		Badge,
		Listgroup,
		ListgroupItem,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	interface Props {
		envelope: string[];
	}

	const { envelope }: Props = $props();

	const suggestions = async () => {
		const res = await axios.get(`${API_BASE_URL}/suggestions`, { withCredentials: true });
		const cardsSuspectScore = Object.entries(res.data.cards_suspect_score)
			.sort(([, scoreA], [, scoreB]) => (scoreB as number) - (scoreA as number))
			.filter((suggestion) => isSuggestionCategoryNotDiscovered(suggestion));
		return cardsSuspectScore;
	};

	function isSuggestionCategoryNotDiscovered(suggestion: [string, unknown]): boolean {
		const discoveredCategories = game.discoveredCardCategories();
		const [card, _] = suggestion;
		return !isCardInOneOrMoreCategory(card, discoveredCategories);
	}
</script>

<div class="w-full">
	<h2 class="text-center text-xl text-white">Carte nella busta</h2>
	<div class="grid grid-cols-3 gap-2 py-4 text-center">
		<Badge large color={envelope[0] ? 'lime' : 'gray'}>
			{envelope[0] ?? '?'}
		</Badge>
		<Badge large color={envelope[1] ? 'lime' : 'gray'}>
			{envelope[1] ?? '?'}
		</Badge>
		<Badge large color={envelope[2] ? 'lime' : 'gray'}>
			{envelope[2] ?? '?'}
		</Badge>
	</div>
	<h2 class="text-center text-xl text-white">Carte sospette</h2>
	<p class="mt-2 text-center text-sm">
		Queste sono le carte che nessuno ha... o quasi! Viene indicata la carta e quanti giocatori non
		la possiedono.
	</p>
	{#await suggestions()}
		<div class="mx-auto flex items-center justify-center p-6">
			<Spinner size="8" />
		</div>
	{:then cardsSuspectScore}
		{#if cardsSuspectScore.length > 0}
			<Table class="mt-2">
				<TableBody>
					{#each cardsSuspectScore as [card, score]}
						<TableBodyRow>
							<TableBodyCell>{card}</TableBodyCell>
							<TableBodyCell>
								<Badge color="gray">
									{score}
								</Badge>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<p class="mt-2 text-center text-sm font-semibold">Non ci sono carte sospette per ora.</p>
		{/if}
	{:catch}
		<p class="mt-2 text-center text-red-500">
			Non sono riuscito a recuperare i suggerimenti... cos'hai fatto?
		</p>
	{/await}
</div>
