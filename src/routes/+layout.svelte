<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import './layout.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta name="author" content="Ryan Roberts" />
</svelte:head>

<div class="flex min-h-screen flex-col p-4 pb-12 xs:flex-row xs:p-6 sm:p-12 md:p-24">
	<Nav />
	<main class="relative w-full min-w-0 text-justify hyphens-auto xs:pl-6 sm:max-w-2xl sm:pl-8 md:pl-12">
		<div class="absolute left-0 top-0 hidden h-full border-l border-neutral-200 xs:block"></div>
		{@render children()}
	</main>
</div>
