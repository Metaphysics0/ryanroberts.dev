<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		external?: boolean;
		children: Snippet;
	}

	let { href, external = false, children }: Props = $props();
</script>

{#if external}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700"
	>
		{@render children()}
	</a>
{:else}
	<a href={href} class="text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700">
		{@render children()}
	</a>
{/if}
