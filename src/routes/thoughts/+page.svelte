<script lang="ts">
	let { data } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Thoughts | Ryan Roberts</title>
	<meta name="description" content="Thoughts and writings by Ryan Roberts" />
</svelte:head>

<div class="space-y-1">
	{#each data.thoughts as thought (thought.slug)}
		<a
			href="/thoughts/{thought.slug}"
			class="group flex items-baseline py-2 transition-colors hover:text-neutral-950"
		>
			<span class="text-neutral-800 group-hover:text-neutral-950">{thought.title}</span>
			<span class="dotted-line group-hover:border-neutral-400"></span>
			<span class="whitespace-nowrap text-neutral-500">{formatDate(thought.date)}</span>
		</a>
	{/each}
</div>

{#if data.thoughts.length === 0}
	<p class="text-neutral-600">No thoughts yet. Check back soon.</p>
{/if}
