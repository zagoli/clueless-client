<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { playerNames } from '$lib/stores/players.svelte';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-900 p-4">
	<div class="w-full max-w-md">
		<Card class="!border-gray-700 !bg-gray-800">
			<div class="p-6 text-center text-white">
				<h2 class="mb-4 text-2xl font-bold">Pagina di gioco</h2>
				<p>Benvenuto, {playerNames[playerNames.length - 1]}!</p>
				<p class="mt-4">Questa è una pagina placeholder.</p>
			</div>
		</Card>
	</div>
</div>
