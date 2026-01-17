import { getThought, getAllSlugs } from '$lib/server/thoughts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const thought = await getThought(params.slug);

	if (!thought) {
		throw error(404, 'Post not found');
	}

	return { thought };
};

export const entries: EntryGenerator = async () => {
	const slugs = await getAllSlugs();
	return slugs.map((slug) => ({ slug }));
};
