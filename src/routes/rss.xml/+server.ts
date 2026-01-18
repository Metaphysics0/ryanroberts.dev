import { getThoughts } from '$lib/server/thoughts';
import type { RequestHandler } from './$types';

const siteUrl = 'https://ryanroberts.dev';

export const GET: RequestHandler = () => {
	const thoughts = getThoughts();

	const items = thoughts
		.map(
			(thought) => `
		<item>
			<title><![CDATA[${thought.title}]]></title>
			<link>${siteUrl}/thoughts/${thought.slug}</link>
			<guid isPermaLink="true">${siteUrl}/thoughts/${thought.slug}</guid>
			<description><![CDATA[${thought.description}]]></description>
			<pubDate>${new Date(thought.date).toUTCString()}</pubDate>
		</item>`
		)
		.join('');

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Ryan Roberts</title>
		<link>${siteUrl}</link>
		<description>Thoughts and writings by Ryan Roberts</description>
		<language>en-us</language>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
