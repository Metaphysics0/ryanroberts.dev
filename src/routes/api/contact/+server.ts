import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// The rest of the site is prerendered; this endpoint has to run on the server.
export const prerender = false;

const MAX = { name: 100, email: 200, idea: 5000, choice: 50 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: string, max: number): string {
	const value = data[key];
	return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/**
 * Sends a project inquiry from the /build page to Ryan's inbox through Resend.
 * Needs RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (an address on a domain verified in Resend).
 */
export const POST: RequestHandler = async ({ request }) => {
	let data: Record<string, unknown>;
	try {
		data = await request.json();
	} catch {
		return json({ error: 'Send the form as JSON.' }, { status: 400 });
	}

	// Honeypot: people never see this field, so anything in it came from a bot.
	if (field(data, 'website', 200)) return json({ ok: true });

	const name = field(data, 'name', MAX.name);
	const email = field(data, 'email', MAX.email);
	const idea = field(data, 'idea', MAX.idea);
	const budget = field(data, 'budget', MAX.choice);
	const start = field(data, 'start', MAX.choice);

	if (!name || !idea) {
		return json({ error: 'Add your name and a few words about the project.' }, { status: 400 });
	}
	if (!EMAIL_PATTERN.test(email)) {
		return json({ error: 'Check your email address so I can reply.' }, { status: 400 });
	}

	const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
	if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
		console.error('Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
		return json({ error: 'Email isn’t set up yet.' }, { status: 503 });
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: CONTACT_FROM_EMAIL,
			to: [CONTACT_TO_EMAIL],
			reply_to: email,
			subject: `New project inquiry from ${name}`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				`Budget: ${budget || 'not given'}`,
				`Start: ${start || 'not given'}`,
				'',
				idea
			].join('\n')
		})
	});

	if (!response.ok) {
		console.error('Resend rejected the contact email', response.status, await response.text());
		return json({ error: 'The message didn’t go through.' }, { status: 502 });
	}

	return json({ ok: true });
};
