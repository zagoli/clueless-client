<script lang="ts">
	import { Button } from 'flowbite-svelte';

	const { cards, onclick } = $props();
</script>

<div class="cards-grid">
	{#each cards as card}
		<Button
			color="alternative"
			onclick={() => onclick(card)}
			data-testid={`add-card-${card}-button`}
		>
			{card}
		</Button>
	{/each}
</div>

<style>
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
</style>
