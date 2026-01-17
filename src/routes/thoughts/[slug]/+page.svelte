<script lang="ts">
	let { data } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.thought.title} | Ryan Roberts</title>
	<meta name="description" content={data.thought.description} />
	<meta property="og:title" content={data.thought.title} />
	<meta property="og:description" content={data.thought.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article>
	<header class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold tracking-tight text-neutral-950">
			{data.thought.title}
		</h1>
		<time class="text-sm text-neutral-500" datetime={data.thought.date}>
			{formatDate(data.thought.date)}
		</time>
	</header>

	<div class="prose prose-neutral max-w-none">
		<data.thought.content />
	</div>
</article>
