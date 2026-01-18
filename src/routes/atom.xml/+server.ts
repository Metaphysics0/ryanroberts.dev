import { getThoughts } from '$lib/server/thoughts';
import type { RequestHandler } from './$types';

const siteUrl = 'https://ryanroberts.dev';

export const GET: RequestHandler = () => {
	const thoughts = getThoughts();
	const updated = thoughts.length > 0 ? new Date(thoughts[0].date).toISOString() : new Date().toISOString();

	const entries = thoughts
		.map(
			(thought) => `
	<entry>
		<title><![CDATA[${thought.title}]]></title>
		<link href="${siteUrl}/thoughts/${thought.slug}" />
		<id>${siteUrl}/thoughts/${thought.slug}</id>
		<updated>${new Date(thought.date).toISOString()}</updated>
		<summary><![CDATA[${thought.description}]]></summary>
	</entry>`
		)
		.join('');

	const atom = `<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>Ryan Roberts</title>
	<subtitle>Thoughts and writings by Ryan Roberts</subtitle>
	<link href="${siteUrl}/atom.xml" rel="self" />
	<link href="${siteUrl}" />
	<id>${siteUrl}/</id>
	<updated>${updated}</updated>
	<author>
		<name>Ryan Roberts</name>
	</author>
	${entries}
</feed>`;

	return new Response(atom.trim(), {
		headers: {
			'Content-Type': 'application/atom+xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
