<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	interface Props {
		playerName: string;
		hand: string[];
		absent_cards: string[];
	}

	const { playerName, hand, absent_cards }: Props = $props();
</script>

<div class="w-full">
	<h2 class="text-2xl font-semibold">{playerName.toUpperCase()}</h2>

	<div class="mt-4">
		<h3 class="mb-2 text-lg font-medium">Carte in mano</h3>
		<div class="flex flex-wrap gap-2">
			{#if hand.length > 0}
				{#each hand as card}
					<Badge color="green">{card}</Badge>
				{/each}
			{:else}
				<span class="text-gray-500 italic">Nessuna carta in mano</span>
			{/if}
		</div>
	</div>

	<div class="mt-4">
		<h3 class="mb-2 text-lg font-medium">Carte assenti</h3>
		<div class="flex flex-wrap gap-2">
			{#if absent_cards.length > 0}
				{#each absent_cards as card}
					<Badge color="red">{card}</Badge>
				{/each}
			{:else}
				<span class="text-gray-500 italic">Nessuna carta assente</span>
			{/if}
		</div>
	</div>
</div>
