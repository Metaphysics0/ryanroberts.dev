<script lang="ts">
	import { page } from "$app/state";

	const links = [
		{ href: "/", label: "about" },
		{ href: "/thoughts", label: "thoughts" },
		{ href: "/projects", label: "projects" },
		{ href: "/random", label: "random" },
	];

	function isActive(href: string): boolean {
		if (href === "/") {
			return page.url.pathname === "/";
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<nav
	class="mb-6 flex flex-row flex-wrap gap-x-4 gap-y-1 xs:sticky xs:top-12 xs:mb-0 xs:w-32 xs:shrink-0 xs:flex-col xs:items-end xs:gap-2"
>
	{#each links as link (link.href)}
		<a
			href={link.href}
			class="font-serif italic text-neutral-600 transition-colors hover:text-neutral-950 {isActive(
				link.href,
			)
				? 'text-neutral-950'
				: ''}"
		>
			{link.label}
		</a>
	{/each}
</nav>
