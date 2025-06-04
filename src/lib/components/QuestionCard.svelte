<script lang="ts">
	import { game, type Question } from '$lib/model/game.svelte';
	import { Card } from 'flowbite-svelte';

	interface Props {
		question: Question;
	}

	const { question }: Props = $props();

	function getClass(card: string): string {
		let cssClass = 'text-xs';
		if (game.getHand(question.askedBy).includes(card)) {
			cssClass += ' text-primary-500';
		}
		return cssClass;
	}
</script>

<Card class="mb-2 grid grid-cols-5 py-2 text-center">
	<span class="text-xs">{question.askedBy}</span>
	<span class={getClass(question.suspect)}>{question.suspect}</span>
	<span class={getClass(question.weapon)}>{question.weapon}</span>
	<span class={getClass(question.room)}>{question.room}</span>
	<span class="text-xs">{question.answeredBy}</span>
</Card>
