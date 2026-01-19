#!/usr/bin/env bun
import * as p from '@clack/prompts';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const THOUGHTS_DIR = join(import.meta.dir, '../src/content/thoughts');

async function main() {
	p.intro('Create a new thought');

	const result = await p.group(
		{
			title: () =>
				p.text({
					message: 'Title:',
					placeholder: 'My awesome thought',
					validate: (value) => {
						if (!value.trim()) return 'Title is required';
					}
				}),
			description: () =>
				p.text({
					message: 'Description:',
					placeholder: 'A brief description of this thought',
					validate: (value) => {
						if (!value.trim()) return 'Description is required';
					}
				}),
			slug: ({ results }) =>
				p.text({
					message: 'Slug:',
					placeholder: 'my-awesome-thought',
					initialValue: results.title
						?.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/^-|-$/g, ''),
					validate: (value) => {
						if (!value.trim()) return 'Slug is required';
						if (!/^[a-z0-9-]+$/.test(value))
							return 'Slug must be lowercase alphanumeric with hyphens';
					}
				})
		},
		{
			onCancel: () => {
				p.cancel('Cancelled');
				process.exit(0);
			}
		}
	);

	const date = new Date().toISOString().split('T')[0];
	const filename = `${result.slug}.md`;
	const filepath = join(THOUGHTS_DIR, filename);

	if (existsSync(filepath)) {
		p.cancel(`File already exists: ${filename}`);
		process.exit(1);
	}

	const content = `---
title: ${result.title}
date: ${date}
description: ${result.description}
slug: ${result.slug}
published: true
---

Write your thought here...
`;

	writeFileSync(filepath, content);

	p.outro(`Created: src/content/thoughts/${filename}`);
}

main();
