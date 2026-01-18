<script>
	const SOCIAL_LINKS = [
		{
			label: 'GitHub',
			href: 'https://github.com/Metaphysics0'
		},
		{
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/ryanroberts0'
		},
		{
			label: 'Email',
			href: 'https://linkedin.com/in/ryanroberts0'
		}
	];
</script>

<svelte:head>
	<title>Ryan Roberts</title>
	<meta name="description" content="Personal website and blog of Ryan Roberts" />
</svelte:head>

<div class="space-y-6">
	<h1 class="text-2xl font-semibold tracking-tight text-neutral-950">Ryan Roberts</h1>

	<div class="space-y-4 text-neutral-800">
		<p>
			Welcome to my personal website. I'm a software engineer and guitarist who enjoys building
			things for the web.
		</p>

		<p>
			Here you'll find my <a href="/thoughts" class="underline underline-offset-2">thoughts</a>
			on software, technology, and whatever else is on my mind. Check out my
			<a href="/projects" class="underline underline-offset-2">projects</a> to see what I've been working
			on.
		</p>
	</div>

	<div class="flex gap-4 pt-2">
		{#each SOCIAL_LINKS as socialLink}
			<a
				href={socialLink.href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral-600 transition-colors hover:text-neutral-950"
			>
				{socialLink.label}
			</a>
		{/each}
	</div>
</div>
