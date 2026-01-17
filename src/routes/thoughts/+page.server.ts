import { getThoughts } from '$lib/server/thoughts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const thoughts = await getThoughts();
	return { thoughts };
};
