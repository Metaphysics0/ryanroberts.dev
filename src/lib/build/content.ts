// Copy for the /build hire page.
import songsterrShot from '$lib/assets/work/songsterr-downloader.jpg';
import fretwiseShot from '$lib/assets/work/fretwise.jpg';
import todaShot from '$lib/assets/work/toda.jpg';

export const LINKEDIN = 'https://linkedin.com/in/ryanroberts0';
export const GITHUB = 'https://github.com/Metaphysics0';

export type CaseStudy = {
	id: string;
	label: string;
	name: string;
	href: string;
	summary: string;
	stack: string[];
	/** Results, shown as a highlighted row under the tech chips. */
	metrics: string[];
	image: { src: string; alt: string };
	quote?: { text: string; author: string };
};

export const CASE_STUDIES: CaseStudy[] = [
	{
		id: 'songsterr-downloader',
		label: 'Open source · side project',
		name: 'Songsterr Downloader',
		href: 'https://songsterr-downloader.com',
		summary:
			'A SvelteKit app that turns any Songsterr tab into a Guitar Pro or MIDI file, entirely in the browser. When the source site started blocking servers, I rebuilt the flow around a bookmarklet within days so users never lost access.',
		stack: ['SvelteKit', 'TypeScript', 'alphaTab', 'Vercel'],
		metrics: ['10,000 daily users', '300+ GitHub stars'],
		image: {
			src: songsterrShot,
			alt: 'Songsterr Downloader with a song loaded and Guitar Pro and MIDI download buttons'
		}
	},
	{
		id: 'fretwise',
		label: 'My product · AI',
		name: 'Fretwise.ai',
		href: 'https://fretwise.ai',
		summary:
			'Audio in, tabs out. Drop in a song or paste a YouTube, Instagram or TikTok link, and Fretwise transcribes it to MIDI and Guitar Pro in seconds. I designed, built and run it, and thousands of musicians use it every day.',
		stack: ['AI', 'Modal', 'Cloudflare', 'Payments', 'TypeScript'],
		metrics: ['$5,000 monthly recurring revenue', '5,000+ daily users'],
		image: {
			src: fretwiseShot,
			alt: 'Fretwise.ai home page: Audio in. Tabs out.'
		}
	},
	{
		id: 'toda',
		label: 'Client work · e-commerce',
		name: 'todaxco.com',
		href: 'https://todaxco.com',
		summary:
			"The founder of Toda, one of Israel's largest alternative streetwear brands, asked me to build his online store. I built most of the platform on Shopify, plus my own CI/CD pipeline in Bun for the Liquid theme.",
		stack: ['Shopify', 'Liquid', 'Bun', 'CI/CD'],
		metrics: ['International payments', 'Custom Shopify theme'],
		image: {
			src: todaShot,
			alt: 'Toda store home page with men’s and women’s collections'
		},
		quote: {
			text: 'Ryan was extremely professional and helped me scale my brand to hundreds of thousands of customers.',
			author: 'Hari Levi, Toda'
		}
	}
];

export const CAPABILITIES = [
	{
		name: 'Web apps',
		points: [
			'SaaS products and MVPs',
			'Dashboards and internal tools',
			'Auth, roles and multi-tenant accounts',
			'Fast, SEO-friendly marketing sites'
		]
	},
	{
		name: 'Mobile apps',
		points: [
			'iOS and Android',
			'Native and React Native',
			'Shipped to the App Store and Google Play'
		]
	},
	{
		name: 'AI features',
		points: ['LLM features and agents', 'RAG over your own data', 'AI image and audio pipelines']
	},
	{
		name: 'Payments',
		points: [
			'Stripe, Lemon Squeezy and Paddle',
			'Subscriptions and usage billing',
			'International checkout, taxes and currencies'
		]
	},
	{
		name: 'E-commerce',
		points: ['Shopify stores and custom themes', 'Automated theme deploys', 'Store integrations']
	},
	{
		name: 'Games',
		points: ['Browser and mobile games', 'Multiplayer and leaderboards']
	}
];

// Prices are based on 2026 rates for senior freelance developers (about $100–$180 an hour).
export const OFFERS = [
	{
		name: 'MVP in weeks',
		summary: 'Turn an idea into a working product real users can sign up for.',
		points: ['Auth, payments, database', 'Deployed and monitored', 'Analytics from day one'],
		price: 'from $12,000',
		time: '3–6 weeks'
	},
	{
		name: 'AI features',
		summary: 'Add AI to a product you already have, in a way users actually rely on.',
		points: ['LLM features and agents', 'Search over your own data', 'Cost and quality monitoring'],
		price: 'from $6,000',
		time: '2–4 weeks'
	},
	{
		name: 'Senior help, by the hour',
		summary: 'An extra senior engineer for an existing codebase or a stuck project.',
		points: ['Architecture and code review', 'Performance and bug hunts', 'Frontend rescue'],
		price: '$150 / hr',
		time: '10 hr minimum'
	}
];

export const STEPS = [
	{
		name: '20-minute call',
		detail: 'You describe the problem. I tell you honestly if I’m the right fit.'
	},
	{ name: 'Written quote', detail: 'Scope, timeline and price on one page, within two days.' },
	{ name: 'Weekly demos', detail: 'A live link you can click every Friday. No surprises.' },
	{ name: 'Launch and handoff', detail: 'Deployed, documented, and 30 days of fixes included.' }
];
