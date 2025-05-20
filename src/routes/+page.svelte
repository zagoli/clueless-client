<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte';
	import { API_BASE_URL } from '$lib/config';

	const apiStatus = fetch(`${API_BASE_URL}/ping`).then(async (response) => {
		const text = await response.text();
		if (text !== 'pong') throw new Error('Invalid response');
		return { isUp: true };
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-900 p-4">
	<div class="w-full max-w-md">
		{#await apiStatus}
			<div class="flex items-center justify-center p-6">
				<Spinner size="8" />
			</div>
		{:then status}
			<Card class="!border-gray-700 !bg-gray-800">
				<div class="p-6 text-center text-white">
					<h2 class="mb-4 text-2xl font-bold">Benvenuto!</h2>
					<p>L'applicazione è attiva e funzionante.</p>
				</div>
			</Card>
		{:catch}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
				<div class="px-4 text-center">
					<p class="mb-4 text-xl">L'applicazione non è disponibile.</p>
					<p class="text-lg text-gray-400">Riprova tra qualche mese... o tra qualche anno.</p>
				</div>
			</div>
		{/await}
	</div>
</div>
