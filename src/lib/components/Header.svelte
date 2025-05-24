<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { RefreshOutline } from 'flowbite-svelte-icons';
	import { game } from '$lib/stores/game.svelte';

	let showResetModal = $state(false);

	function handleReset() {
		game.reset(); // Reset game state
		goto('/'); // Navigate back to home page
	}
</script>

<header class="border-b p-4">
	<div class="mx-auto flex max-w-6xl items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-2xl font-bold dark:text-white">Clueless</h1>
			<img src="/icon.svg" alt="Clueless icon" class="h-8 w-8" />
		</div>
		<Button
			color="light"
			type="button"
			pill
			onclick={() => (showResetModal = true)}
			data-testid="reset-button"
		>
			<RefreshOutline class="h-4 w-4" aria-label="ricomincia" />
		</Button>
	</div>
</header>

<Modal title="Reset" bind:open={showResetModal} size="sm" autoclose data-testid="reset-modal">
	<p>Sei sicuro di voler ricominciare il gioco?</p>

	{#snippet footer()}
		<Button onclick={handleReset}>Si, ricomincia</Button>
	{/snippet}
</Modal>
