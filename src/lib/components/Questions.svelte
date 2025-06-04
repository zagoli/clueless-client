<script lang="ts">
	import type { Question, Questions } from '$lib/model/game.svelte';
	import { Button } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import QuestionCard from './QuestionCard.svelte';

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
		<QuestionCard {question} />
	</div>
{/each}
