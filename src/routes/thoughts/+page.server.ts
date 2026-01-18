import { getThoughts } from '$lib/server/thoughts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const thoughts = getThoughts();
	return { thoughts };
};
