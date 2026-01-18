import { getThoughts } from '$lib/server/thoughts';
import type { RequestHandler } from './$types';

const siteUrl = 'https://ryanroberts.dev';

export const GET: RequestHandler = () => {
	const thoughts = getThoughts();

	const feed = {
		version: 'https://jsonfeed.org/version/1.1',
		title: 'Ryan Roberts',
		home_page_url: siteUrl,
		feed_url: `${siteUrl}/feed.json`,
		description: 'Thoughts and writings by Ryan Roberts',
		authors: [
			{
				name: 'Ryan Roberts',
				url: siteUrl
			}
		],
		items: thoughts.map((thought) => ({
			id: `${siteUrl}/thoughts/${thought.slug}`,
			url: `${siteUrl}/thoughts/${thought.slug}`,
			title: thought.title,
			summary: thought.description,
			date_published: new Date(thought.date).toISOString()
		}))
	};

	return new Response(JSON.stringify(feed, null, 2), {
		headers: {
			'Content-Type': 'application/feed+json',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
