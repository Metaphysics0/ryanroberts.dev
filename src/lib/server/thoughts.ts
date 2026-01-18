import type { ThoughtMeta, ThoughtFrontmatter } from '$lib/types';
import type { Component } from 'svelte';

const thoughtModules = import.meta.glob<{ default: Component; metadata: ThoughtFrontmatter }>(
	'/src/content/thoughts/*.md',
	{ eager: true }
);

export function getThoughts(): ThoughtMeta[] {
	const thoughts: ThoughtMeta[] = [];

	for (const path in thoughtModules) {
		const module = thoughtModules[path];
		const metadata = module.metadata;

		if (metadata.published) {
			thoughts.push({
				title: metadata.title,
				date: metadata.date,
				description: metadata.description,
				slug: metadata.slug
			});
		}
	}

	return thoughts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getThoughtMeta(slug: string): ThoughtMeta | null {
	for (const path in thoughtModules) {
		const module = thoughtModules[path];
		const metadata = module.metadata;

		if (metadata.slug === slug && metadata.published) {
			return {
				title: metadata.title,
				date: metadata.date,
				description: metadata.description,
				slug: metadata.slug
			};
		}
	}

	return null;
}

export function getAllSlugs(): string[] {
	const thoughts = getThoughts();
	return thoughts.map((t) => t.slug);
}
