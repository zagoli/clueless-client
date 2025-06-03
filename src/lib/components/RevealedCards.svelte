<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import CardList from './CardList.svelte';

	const { revealedCards, canRevealCard, openRevealCardModal } = $props();
</script>

<div class="w-full">
	<div class="flex items-start justify-between">
		<h2 class="text-2xl font-semibold text-white">CARTE RIVELATE</h2>
		<Button
			color="light"
			size="xs"
			title="Rivela una carta"
			aria-label="Rivela una carta"
			pill
			disabled={!canRevealCard}
			onclick={openRevealCardModal}
		>
			<PlusOutline size="xs" />
		</Button>
	</div>
	{#if revealedCards.length > 0}
		<CardList cards={revealedCards} color="green" />
	{:else}
		<p class="my-2 text-sm">
			Le carte rivelate sono quelle che non sono state distribuite e che tutti possono vedere!
		</p>
	{/if}
</div>
