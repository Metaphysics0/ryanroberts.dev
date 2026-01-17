import type { Component } from 'svelte';

export interface ThoughtFrontmatter {
	title: string;
	date: string;
	description: string;
	slug: string;
	published: boolean;
}

export interface Thought extends ThoughtFrontmatter {
	content: Component;
}

export interface ThoughtMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
}
