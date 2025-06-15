<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import CardList from './CardList.svelte';

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
		<CardList cards={hand} color="lime" highlightDiscoveredCards={true} />
	</div>

	<div class="mt-4">
		<h3 class="font-medium">Carte assenti</h3>
		<CardList cards={absentCards} color="red" />
	</div>
</div>
