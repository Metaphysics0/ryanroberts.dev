<script lang="ts">
	interface Props {
		title: string;
		description: string;
		url?: string;
		image?: string;
		type?: 'website' | 'article';
	}

	let { title, description, url = '', image = '', type = 'website' }: Props = $props();

	const siteUrl = 'https://ryanroberts.dev';
	const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullUrl} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- Canonical -->
	<link rel="canonical" href={fullUrl} />
</svelte:head>
