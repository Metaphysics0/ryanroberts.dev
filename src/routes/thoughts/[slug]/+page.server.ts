import { getThoughtMeta, getAllSlugs } from '$lib/server/thoughts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const meta = getThoughtMeta(params.slug);

	if (!meta) {
		throw error(404, 'Post not found');
	}

	return { meta, slug: params.slug };
};

export const entries: EntryGenerator = () => {
	const slugs = getAllSlugs();
	return slugs.map((slug) => ({ slug }));
};
