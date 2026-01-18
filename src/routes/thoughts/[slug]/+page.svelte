<script lang="ts">
	import type { Component } from 'svelte';
	import type { ThoughtFrontmatter } from '$lib/types';

	let { data } = $props();

	const modules = import.meta.glob<{ default: Component; metadata: ThoughtFrontmatter }>(
		'/src/content/thoughts/*.md',
		{ eager: true }
	);

	function getContent(slug: string): Component | null {
		for (const path in modules) {
			const module = modules[path];
			if (module.metadata.slug === slug) {
				return module.default;
			}
		}
		return null;
	}

	const Content = getContent(data.slug);

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
	<title>{data.meta.title} | Ryan Roberts</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article>
	<header class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold tracking-tight text-neutral-950">
			{data.meta.title}
		</h1>
		<time class="text-sm text-neutral-500" datetime={data.meta.date}>
			{formatDate(data.meta.date)}
		</time>
	</header>

	<div class="prose prose-neutral max-w-none">
		{#if Content}
			<Content />
		{/if}
	</div>
</article>
