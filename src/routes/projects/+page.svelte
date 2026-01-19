<script lang="ts">
	const projects = [
		{
			name: 'Songsterr Downloader',
			description:
				"The world's most popular site for Guitar Pro files. Scaled to 500K+ daily users, ranked #1 on Google, and generates recurring revenue.",
			url: 'https://songsterr-downloader.com',
			tech: ['SvelteKit', 'Vercel']
		},
		{
			name: 'TLDR Summarizer',
			description:
				'A mobile app that summarizes lengthy content into quick, digestible takeaways. Live on the App Store',
			url: 'https://github.com/Metaphysics0/tldr-summarizer',
			tech: ['React Native', 'TypeScript']
		},
		{
			name: 'Skeleton.dev',
			description:
				'Early contributor to the most popular Svelte UI component library, helping shape the ecosystem for Svelte developers.',
			url: 'https://github.com/skeletonlabs/skeleton',
			tech: ['Svelte', 'TypeScript', 'Tailwind']
		},
		{
			name: 'RizzGPT',
			description:
				'An all-in-one dating automation platform powered by AI to help users craft better conversations.',
			url: 'https://rizzb0t.com',
			tech: ['SvelteKit', 'Gemini', 'TypeScript']
		},
		{
			name: 'Open Tunings',
			description: 'A community-driven app for discovering and sharing open tunings on the guitar.',
			url: 'https://open-tunings.vercel.app/create',
			tech: ['SvelteKit', 'TypeScript']
		}
	];
</script>

<svelte:head>
	<title>Projects | Ryan Roberts</title>
	<meta name="description" content="Projects by Ryan Roberts" />
</svelte:head>

<div class="space-y-8">
	<h1 class="text-2xl font-semibold tracking-tight text-neutral-950">Projects</h1>

	<div class="space-y-6">
		{#each projects as project (project.name)}
			<div class="group">
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-lg font-medium text-neutral-950 underline underline-offset-2 transition-colors hover:text-blue-600"
				>
					{project.name}
				</a>
				<p class="mt-1 text-neutral-700">{project.description}</p>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each project.tech as tech (tech)}
						<span class="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
							{tech}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
