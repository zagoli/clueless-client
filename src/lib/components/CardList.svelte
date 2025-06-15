<script lang="ts">
	import { game } from '$lib/model/game.svelte';
	import { Badge } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const { cards, color, highlightDiscoveredCards = false } = $props();
</script>

<div class="flex flex-wrap gap-2 py-2">
	{#each cards as card}
		<div transition:scale={{ duration: 500 }}>
			<Badge {color} border={highlightDiscoveredCards && !game.userAddedCards.includes(card)}>
				{card}
			</Badge>
		</div>
	{/each}
</div>
