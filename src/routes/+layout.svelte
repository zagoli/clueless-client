<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex h-full flex-col">
	<Header />
	<main class="flex h-full">
		<div class="flex w-full flex-1 items-start justify-center p-4">
			<slot />
		</div>
	</main>
</div>
