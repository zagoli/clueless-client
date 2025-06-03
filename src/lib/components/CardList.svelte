<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const { cards, color } = $props();
</script>

<div class="flex flex-wrap gap-2 py-2">
	{#each cards as card}
		<div transition:scale={{ duration: 500 }}>
			<Badge {color}>{card}</Badge>
		</div>
	{/each}
</div>
