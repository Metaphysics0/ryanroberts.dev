<script lang="ts">
	const projects = [
		{
			name: 'Project One',
			description: 'A brief description of the project and what it does.',
			url: 'https://github.com/ryanroberts/project-one',
			tech: ['SvelteKit', 'TypeScript']
		},
		{
			name: 'Project Two',
			description: 'Another project with a short description.',
			url: 'https://github.com/ryanroberts/project-two',
			tech: ['React', 'Node.js']
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
