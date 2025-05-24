<script lang="ts">
	import type { Question, Questions } from '$lib/stores/game.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';

	interface Props {
		questions: Questions;
	}

	type QuestionKey = keyof Question;

	const sortByTypes: Array<{ value: QuestionKey; label: string }> = [
		{ value: 'askedBy', label: 'Chiede' },
		{ value: 'suspect', label: 'Sospettato' },
		{ value: 'weapon', label: 'Arma' },
		{ value: 'room', label: 'Stanza' },
		{ value: 'answeredBy', label: 'Risponde' }
	];

	const { questions }: Props = $props();
	let sortBy = $state<QuestionKey | ''>('');
	const sortedQuestions = $derived(
		questions.toSorted((a, b) => {
			if (sortBy) {
				return a[sortBy].localeCompare(b[sortBy]);
			}
			return 0;
		})
	);
</script>

{#if questions.length === 0}
	<p>Non hai inserito nessuna domanda.</p>
{:else}
	<div class="mb-4 flex flex-row gap-2 overflow-auto p-1">
		{#each sortByTypes as type}
			<Button
				size="xs"
				color={sortBy === type.value ? 'primary' : 'alternative'}
				pill
				onclick={() => (sortBy = type.value)}
			>
				{type.label}
			</Button>
		{/each}
	</div>
{/if}

{#each sortedQuestions as question (question)}
	<div animate:flip={{ duration: 500 }}>
		<Card class="mb-2 grid grid-cols-5 py-2 text-center">
			<span class="text-xs">{question.askedBy}</span>
			<span class="text-xs">{question.suspect}</span>
			<span class="text-xs">{question.weapon}</span>
			<span class="text-xs">{question.room}</span>
			<span class="text-xs">{question.answeredBy}</span>
		</Card>
	</div>
{/each}
