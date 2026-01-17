import type { ThoughtMeta, Thought, ThoughtFrontmatter } from '$lib/types';
import type { Component } from 'svelte';

const thoughtModules = import.meta.glob<{ default: Component; metadata: ThoughtFrontmatter }>(
	'/src/content/thoughts/*.md'
);

export async function getThoughts(): Promise<ThoughtMeta[]> {
	const thoughts: ThoughtMeta[] = [];

	for (const path in thoughtModules) {
		const module = await thoughtModules[path]();
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

export async function getThought(slug: string): Promise<Thought | null> {
	for (const path in thoughtModules) {
		const module = await thoughtModules[path]();
		const metadata = module.metadata;

		if (metadata.slug === slug && metadata.published) {
			return {
				...metadata,
				content: module.default
			};
		}
	}

	return null;
}

export async function getAllSlugs(): Promise<string[]> {
	const thoughts = await getThoughts();
	return thoughts.map((t) => t.slug);
}
