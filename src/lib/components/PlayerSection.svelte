<script lang="ts">
	import { game } from '$lib/stores/game.svelte';
	import { Badge, Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import { scale } from 'svelte/transition';

	interface Props {
		playerName: string;
		hand: string[];
		absentCards: string[];
		openAddCardModal: (player: string) => void;
		canAddCard: boolean;
	}

	const { playerName, hand, absentCards, canAddCard, openAddCardModal }: Props = $props();
</script>

<div class="w-full">
	<div class="flex items-start justify-between">
		<h2 class="text-2xl font-semibold text-white">{playerName.toUpperCase()}</h2>
		<Button
			disabled={!canAddCard}
			color="light"
			size="xs"
			title={`Aggiungi una carta alla mano di ${playerName}`}
			aria-label={`Aggiungi una carta alla mano di ${playerName}`}
			pill
			onclick={() => openAddCardModal(playerName)}
		>
			<PlusOutline size="xs" />
		</Button>
	</div>

	<div class="mt-4">
		<h3 class="font-medium">Carte in mano</h3>
		<div class="flex flex-wrap gap-2 py-2">
			{#each hand as card}
				<div transition:scale={{ duration: 500 }}>
					<Badge color="lime" border={!game.userAddedCards.includes(card)}>{card}</Badge>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-4">
		<h3 class="font-medium">Carte assenti</h3>
		<div class="flex flex-wrap gap-2 py-2">
			{#each absentCards as card}
				<div transition:scale={{ duration: 500 }}>
					<Badge color="red">{card}</Badge>
				</div>
			{/each}
		</div>
	</div>
</div>
