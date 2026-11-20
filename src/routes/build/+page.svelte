<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { replaceState } from '$app/navigation';
	import headshot from '$lib/assets/headshot-portrait.jpg';
	import {
		EMAIL,
		LINKEDIN,
		GITHUB,
		CASE_STUDIES,
		CAPABILITIES,
		OFFERS,
		STEPS
	} from '$lib/build/content';

	const STRINGS = ['e', 'B', 'G', 'D', 'A', 'E'];
	const HERO_FRETS = [
		{ fret: '12', string: 0, left: 62 },
		{ fret: '10', string: 1, left: 70 },
		{ fret: '9', string: 2, left: 78 },
		{ fret: '11', string: 3, left: 86 },
		{ fret: '9', string: 2, left: 92 },
		{ fret: '10', string: 1, left: 97 }
	];

	// In-page links glide to their section instead of jumping.
	function smoothScroll(event: MouseEvent) {
		const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
		const target = link && document.getElementById(link.hash.slice(1));
		if (!link || !target) return;
		event.preventDefault();
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
		replaceState(link.hash, {});
	}

	let name = $state('');
	let email = $state('');
	let idea = $state('');
	let budget = $state('$5k–$15k');
	let start = $state('This month');
	let website = $state(''); // honeypot, hidden from people
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errorMessage = $state('');
	let copied = $state(false);

	const mailto = $derived(
		`mailto:${EMAIL}?subject=${encodeURIComponent(
			`Project inquiry${name ? ` from ${name}` : ''}`
		)}&body=${encodeURIComponent(`${idea}\n\nBudget: ${budget}\nStart: ${start}`)}`
	);

	async function sendBrief(event: SubmitEvent) {
		event.preventDefault();
		status = 'sending';
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, idea, budget, start, website })
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.error ?? 'The message didn’t go through.');
			status = 'sent';
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'The message didn’t go through.';
			status = 'error';
		}
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			copied = false;
		}
	}
</script>

<SEO
	title="Ryan Roberts · I build web apps people use every day"
	description="Senior software engineer with 10 years of experience. Web apps, mobile apps, AI features, payments, e-commerce and games."
	url="/build"
/>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
	/>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="lp" onclick={smoothScroll}>
	<div class="inner">
		<header class="nav">
			<a class="mark" href="/">ryan roberts</a>
			<nav>
				<a href="#work">Work</a>
				<a href="#services">Services</a>
				<a href="#contact">Contact</a>
			</nav>
		</header>

		<section class="hero">
			<div class="staff" aria-hidden="true">
				{#each STRINGS as s (s)}<div data-s={s}></div>{/each}
				{#each HERO_FRETS as f, i (i)}
					<span class="fret" style="top:{f.string * 20}%;left:{f.left}%;animation-delay:{i * 0.25}s"
						>{f.fret}</span
					>
				{/each}
			</div>
			<div class="hero-copy">
				<h1><span>I build web apps</span><br /><span class="hl">people use every day.</span></h1>
				<p class="lede">
					I’m a senior software engineer with 10 years of experience. I’ve built products that
					<strong>thousands of people use every day</strong>, from AI apps to online stores. I can
					build yours, from first sketch to launch.
				</p>
				<div class="ctas">
					<a class="btn primary" href="#contact">Tell me about your project</a>
					<a class="btn" href="#work">See my work</a>
				</div>
			</div>
		</section>

		<section class="caps" aria-label="What I build">
			{#each CAPABILITIES as c (c.name)}
				<div>
					<b>{c.name}</b>
					<ul>
						{#each c.points as p (p)}<li>{p}</li>{/each}
					</ul>
				</div>
			{/each}
		</section>

		<div id="work">
			{#each CASE_STUDIES as cs, i (cs.id)}
				<section class="case" class:flip={i % 2 === 1}>
					<div class="case-copy">
						<div class="label">{cs.label}</div>
						<h2>
							<a href={cs.href} target="_blank" rel="noopener noreferrer">{cs.name} ↗</a>
						</h2>
						<p>{cs.summary}</p>
						<div class="stack">
							{#each cs.stack as t (t)}<span>{t}</span>{/each}
						</div>
						<ul class="metrics" aria-label="Results">
							{#each cs.metrics as m (m)}<li>{m}</li>{/each}
						</ul>
						{#if cs.quote}
							<figure class="quote">
								<blockquote>“{cs.quote.text}”</blockquote>
								<figcaption>{cs.quote.author}</figcaption>
							</figure>
						{/if}
					</div>
					<a class="shot" href={cs.href} target="_blank" rel="noopener noreferrer">
						<img src={cs.image.src} alt={cs.image.alt} loading="lazy" />
					</a>
				</section>
			{/each}
		</div>

		<section class="section" id="services">
			<header>
				<h2>Ways to work with me</h2>
				<p>Fixed scope and a fixed quote before any work starts. You own the code.</p>
			</header>
			<div class="offers">
				{#each OFFERS as o (o.name)}
					<article class="offer">
						<h3>{o.name}</h3>
						<p>{o.summary}</p>
						<ul>
							{#each o.points as p (p)}<li>{p}</li>{/each}
						</ul>
						<div class="price"><span>{o.price}</span><em>{o.time}</em></div>
					</article>
				{/each}
			</div>
		</section>

		<section class="section">
			<header><h2>How a project runs</h2></header>
			<ol class="steps">
				{#each STEPS as s, i (s.name)}
					<li><i>{i + 1}</i><b>{s.name}</b><span>{s.detail}</span></li>
				{/each}
			</ol>
		</section>

		<section class="section about">
			<img src={headshot} alt="Ryan Roberts" width="160" height="200" />
			<div>
				<p>
					<strong>I’m Ryan.</strong> I’ve spent 10 years shipping web and mobile products, mostly TypeScript
					front to back. In my current role I built an AI product from zero to market-leading. I also
					play guitar, which is where Songsterr Downloader and Fretwise started.
				</p>
				<p class="muted">
					I take on a small number of projects at a time so each one gets real attention.
				</p>
				<a class="more" href={LINKEDIN} target="_blank" rel="noopener noreferrer"
					>Full work history on LinkedIn →</a
				>
			</div>
		</section>

		<section class="section contact" id="contact">
			<div class="direct">
				<h2>Tell me what you want to build</h2>
				<p>I reply within one business day. Or email me directly:</p>
				<div class="email-row">
					<span class="email">{EMAIL}</span>
					<button type="button" class="copy" onclick={copyEmail}
						>{copied ? 'Copied' : 'Copy'}</button
					>
				</div>
			</div>
			{#if status === 'sent'}
				<div class="brief sent" role="status">
					<h3>Thanks, {name.split(' ')[0]}. Your message is in my inbox.</h3>
					<p>I’ll reply to {email} within one business day.</p>
				</div>
			{:else}
				<form class="brief" onsubmit={sendBrief}>
					<div class="row">
						<label for="f-name"
							>Name<input id="f-name" bind:value={name} autocomplete="name" required /></label
						>
						<label for="f-email"
							>Email<input
								id="f-email"
								type="email"
								bind:value={email}
								autocomplete="email"
								required
							/></label
						>
					</div>
					<label for="f-idea"
						>What are you building?<textarea
							id="f-idea"
							bind:value={idea}
							required
							placeholder="A booking app for my studio. Clients pick a time, pay, and get a reminder."
						></textarea></label
					>
					<div class="row">
						<label for="f-budget"
							>Budget<select id="f-budget" bind:value={budget}>
								<option>Under $5k</option>
								<option>$5k–$15k</option>
								<option>$15k–$40k</option>
								<option>$40k+</option>
							</select></label
						>
						<label for="f-start"
							>Start<select id="f-start" bind:value={start}>
								<option>This month</option>
								<option>Next 3 months</option>
								<option>Just exploring</option>
							</select></label
						>
					</div>
					<label class="honeypot" aria-hidden="true"
						>Website<input bind:value={website} tabindex="-1" autocomplete="off" /></label
					>
					<button class="btn primary" type="submit" disabled={status === 'sending'}>
						{status === 'sending' ? 'Sending…' : 'Send project details'}
					</button>
					{#if status === 'error'}
						<p class="error" role="alert">
							{errorMessage} Please try again, or <a href={mailto}>send it from your email app</a>.
						</p>
					{/if}
				</form>
			{/if}
		</section>

		<footer class="foot">
			<span>© {new Date().getFullYear()} Ryan Roberts</span>
			<span class="links">
				<a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
				<a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
				<a href="/thoughts">Blog</a>
			</span>
		</footer>
	</div>
</div>

<style>
	/* Layout: one column set on a six-string tab staff. Case studies alternate sides. */
	.lp {
		--paper: #f6f7f9;
		--ink: #121826;
		--muted: #5b667a;
		--string: #c9d0db;
		--accent: #2343e8;
		--accent-ink: #ffffff;
		--card: #ffffff;
		--display: 'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif;
		--body: 'Instrument Sans', 'Helvetica Neue', Arial, sans-serif;
		--mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;

		min-height: 100vh;
		background: var(--paper);
		color: var(--ink);
		font-family: var(--body);
		font-size: 16px;
		line-height: 1.55;
	}
	@media (prefers-color-scheme: dark) {
		.lp {
			--paper: #12161f;
			--ink: #eef1f6;
			--muted: #98a3b7;
			--string: #2c3445;
			--accent: #6c84ff;
			--accent-ink: #0b0f18;
			--card: #1a202c;
		}
	}

	.lp :global(*) {
		box-sizing: border-box;
	}
	h1,
	h2,
	h3 {
		margin: 0;
		text-wrap: balance;
	}
	a:focus-visible,
	button:focus-visible,
	input:focus-visible,
	textarea:focus-visible,
	select:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.inner {
		max-width: 1000px;
		margin: 0 auto;
		padding-inline: max(20px, env(safe-area-inset-left, 0px))
			max(20px, env(safe-area-inset-right, 0px));
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		padding-block: 24px;
		font-size: 15px;
	}
	.mark {
		font-family: var(--display);
		font-weight: 800;
		font-size: 19px;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-decoration: none;
	}
	.nav nav {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}
	.nav nav a {
		color: var(--muted);
		text-decoration: none;
	}
	.nav nav a:hover {
		color: var(--ink);
	}

	/* hero */
	.hero {
		position: relative;
		padding-block: 48px 64px;
	}
	.staff {
		position: absolute;
		inset: 42px 0 auto 0;
		height: 270px;
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		pointer-events: none;
	}
	.staff div {
		border-top: 1px solid var(--string);
		position: relative;
	}
	.staff div::before {
		content: attr(data-s);
		position: absolute;
		left: 0;
		top: -10px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--muted);
		background: var(--paper);
		padding-right: 6px;
	}
	.fret {
		position: absolute;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--accent);
		background: var(--paper);
		padding: 0 3px;
		transform: translateY(-50%);
		animation: pluck 3.2s ease-in-out infinite;
	}
	@keyframes pluck {
		0%,
		100% {
			opacity: 0.35;
		}
		12% {
			opacity: 1;
		}
		40% {
			opacity: 0.35;
		}
	}
	.hero-copy {
		position: relative;
		display: grid;
		gap: 24px;
		padding-top: 24px;
	}
	.hero h1 {
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(40px, 7vw, 78px);
		line-height: 0.96;
		letter-spacing: -0.035em;
	}
	.hero h1 span {
		background: var(--paper);
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		padding-right: 0.15em;
	}
	.hero h1 .hl {
		color: var(--accent);
	}
	.lede {
		max-width: 54ch;
		font-size: 19px;
		color: var(--muted);
		margin: 0;
		background: var(--paper);
	}
	.lede strong {
		color: var(--ink);
		font-weight: 600;
	}
	.ctas {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.btn {
		font-family: var(--body);
		font-weight: 600;
		font-size: 15px;
		padding: 13px 20px;
		border-radius: 6px;
		text-decoration: none;
		border: 1.5px solid var(--ink);
		color: var(--ink);
		background: var(--paper);
		cursor: pointer;
		transition: transform 0.15s;
	}
	.btn:hover {
		transform: translateY(-1px);
	}
	.btn.primary {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
	}

	/* capabilities */
	.caps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px 24px;
		padding-block: 28px 44px;
	}
	.caps div {
		display: grid;
		align-content: start;
		gap: 4px;
		border-top: 2px solid var(--ink);
		padding-top: 10px;
	}
	.caps ul {
		margin: 4px 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 2px;
		color: var(--muted);
		font-size: 14px;
	}
	.caps b {
		font-family: var(--display);
		font-weight: 600;
		font-size: 17px;
	}

	/* case studies */
	.case {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: clamp(24px, 4vw, 56px);
		align-items: center;
		padding-block: 48px;
		border-top: 1px solid var(--string);
	}
	.case > * {
		min-width: 0;
	}
	.case-copy {
		display: grid;
		gap: 12px;
		justify-items: start;
	}
	.case.flip .case-copy {
		order: 2;
	}
	.label {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.case h2 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(28px, 3.6vw, 38px);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.case h2 a {
		color: var(--ink);
		text-decoration: none;
	}
	.case h2 a:hover {
		color: var(--accent);
	}
	.case p {
		margin: 0;
		color: var(--muted);
		max-width: 52ch;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.stack span {
		font-family: var(--mono);
		font-size: 12px;
		border: 1px solid var(--string);
		padding: 3px 8px;
		border-radius: 4px;
		color: var(--muted);
	}
	.metrics {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.metrics li {
		font-size: 13px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 999px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
	}
	.quote {
		margin: 8px 0 0;
		padding-left: 14px;
		border-left: 2px solid var(--accent);
	}
	.quote blockquote {
		margin: 0;
		font-size: 17px;
		color: var(--ink);
	}
	.quote figcaption {
		margin-top: 4px;
		font-size: 14px;
		color: var(--muted);
	}
	.shot {
		display: block;
		border: 1px solid var(--string);
		border-radius: 8px;
		overflow: hidden;
		background: var(--card);
		box-shadow: 0 18px 40px -24px rgb(18 24 38 / 0.45);
		transition: transform 0.2s;
	}
	.shot:hover {
		transform: translateY(-2px);
	}
	.shot img {
		display: block;
		width: 100%;
		height: auto;
	}
	#work,
	.section {
		scroll-margin-top: 16px;
	}

	/* sections */
	.section {
		padding-block: 48px;
		border-top: 1px solid var(--string);
		display: grid;
		gap: 24px;
	}
	.section > header {
		display: grid;
		gap: 6px;
		max-width: 60ch;
	}
	.section h2 {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(28px, 3.6vw, 38px);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.section header p {
		color: var(--muted);
		margin: 0;
	}

	.offers {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
	}
	.offer {
		background: var(--card);
		border: 1px solid var(--string);
		border-radius: 8px;
		padding: 22px;
		display: grid;
		gap: 10px;
		grid-template-rows: auto auto 1fr auto;
	}
	.offer h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: 21px;
		letter-spacing: -0.01em;
	}
	.offer p {
		margin: 0;
		color: var(--muted);
		font-size: 15px;
	}
	.offer ul {
		margin: 0;
		padding-left: 18px;
		color: var(--muted);
		font-size: 14.5px;
		list-style: disc;
	}
	.price {
		font-family: var(--mono);
		font-size: 13px;
		border-top: 1px dashed var(--string);
		padding-top: 10px;
		display: flex;
		justify-content: space-between;
		gap: 8px;
		flex-wrap: wrap;
	}
	.price em {
		color: var(--muted);
		font-style: normal;
		font-family: var(--mono);
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}
	.steps li {
		display: grid;
		gap: 6px;
		align-content: start;
	}
	.steps i {
		font-style: normal;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--accent-ink);
		background: var(--accent);
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: grid;
		place-items: center;
	}
	.steps b {
		font-family: var(--display);
		font-weight: 600;
		font-size: 18px;
	}
	.steps span {
		color: var(--muted);
		font-size: 15px;
	}

	.about {
		grid-template-columns: 160px 1fr;
		align-items: start;
	}
	.about > * {
		min-width: 0;
	}
	.about img {
		width: 160px;
		max-width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: 8px;
		filter: grayscale(1);
	}
	.about p {
		margin: 0 0 12px;
		max-width: 60ch;
		font-size: 17px;
	}
	.about strong {
		font-weight: 600;
	}
	.muted {
		color: var(--muted);
	}
	.more {
		color: var(--accent);
		font-weight: 600;
		text-decoration: none;
	}
	.more:hover {
		text-decoration: underline;
	}

	.contact {
		grid-template-columns: 1fr 1.2fr;
		gap: clamp(24px, 4vw, 56px);
	}
	.contact > * {
		min-width: 0;
	}
	.direct {
		display: grid;
		gap: 12px;
		align-content: start;
	}
	.direct p {
		margin: 0;
		color: var(--muted);
	}
	.email-row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.email {
		font-family: var(--mono);
		font-size: 15px;
		user-select: all;
	}
	.copy {
		font: inherit;
		font-size: 13px;
		padding: 4px 10px;
		border-radius: 4px;
		border: 1px solid var(--string);
		background: transparent;
		color: var(--muted);
		cursor: pointer;
	}
	.copy:hover {
		color: var(--ink);
		border-color: var(--ink);
	}
	.brief {
		display: grid;
		gap: 14px;
		background: var(--card);
		border: 1px solid var(--string);
		border-radius: 8px;
		padding: 22px;
	}
	.brief label {
		display: grid;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
	}
	.brief input,
	.brief textarea,
	.brief select {
		font: inherit;
		font-weight: 400;
		font-size: 15px;
		padding: 10px 12px;
		border-radius: 6px;
		border: 1px solid var(--string);
		background: var(--paper);
		color: var(--ink);
		width: 100%;
	}
	.brief textarea {
		min-height: 104px;
		resize: vertical;
	}
	.brief .row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.brief button:disabled {
		opacity: 0.6;
		cursor: wait;
	}
	.error {
		margin: 0;
		font-size: 14px;
		color: #c2410c;
	}
	.error a {
		color: inherit;
	}
	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	.sent {
		align-content: center;
		min-height: 260px;
	}
	.sent h3 {
		font-family: var(--display);
		font-weight: 600;
		font-size: 24px;
		letter-spacing: -0.01em;
	}
	.sent p {
		margin: 0;
		color: var(--muted);
	}

	.foot {
		padding-block: 28px 40px;
		border-top: 1px solid var(--string);
		color: var(--muted);
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
	}
	.foot .links {
		display: flex;
		gap: 16px;
	}
	.foot a {
		color: inherit;
		text-decoration: none;
	}
	.foot a:hover {
		color: var(--ink);
	}

	@media (max-width: 760px) {
		.case,
		.contact {
			grid-template-columns: 1fr;
		}
		.case.flip .case-copy {
			order: 0;
		}
		.about {
			grid-template-columns: 1fr;
		}
		.caps {
			grid-template-columns: repeat(2, 1fr);
		}
		.brief .row {
			grid-template-columns: 1fr;
		}
		.staff {
			height: 210px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.fret {
			animation: none;
		}
		.btn,
		.shot {
			transition: none;
		}
	}
</style>
