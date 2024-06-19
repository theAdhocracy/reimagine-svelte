<script>
	import Banner from '$lib/components/Banner.svelte';
	import CTA from '$lib/components/CTA.svelte';
	import PageCard from '$lib/components/CardPage.svelte';
	import GridLogo from '$lib/components/GridLogo.svelte';
	import GridRevelation from '$lib/components/GridRevelation.svelte';
	import HeroArrow from '$lib/svg/right-down-arrow.svelte';

	export let data;

	let homepage = data.homepage[0];
</script>

<svelte:head>
	<title>Appnovation</title>
	<meta name="description" content="Appnovation x Svelte POC" />
</svelte:head>

<main>
	<section class="hero">
		<HeroArrow />
		<h1 class="u-eyebrow">{homepage.title}<br />{homepage.subtitle}</h1>
		<p>{homepage.copy}</p>
		<div>
			{#each homepage.links as link, index}
				<CTA url={link.url} label={link.label} type={index === 1 ? 'highlight' : undefined} />
			{/each}
		</div>
	</section>
	<section class="highlight-grid">
		{#each homepage.highlights as highlight}
			<PageCard
				{...highlight}
				desc={highlight.description}
				url={`/${highlight.slug.current}`}
				thumb={highlight.thumbnail?.[0]}
			/>
		{/each}
	</section>
	{#each homepage.content as block}
		{#if block._type === 'revelation_grid'}
			<GridRevelation {...block} />
		{/if}
		{#if block._type === 'logo_grid'}
			<GridLogo {...block} />
		{/if}
		{#if block._type === 'banner'}
			<Banner {...block} />
		{/if}
	{/each}
</main>

<style>
	main {
		--gutter: minmax(min(2rem, 4vw), 1fr);

		display: grid;
		grid-template-columns:
			[full-start] var(--gutter) [content-start] min(
				78rem,
				max(calc(100% - 16vw), calc(100% - 8rem))
			)
			[content-end] var(--gutter) [full-end];
		gap: 6rem min(4vw, 2rem);
		padding: min(6rem, 12vw) 0;
		margin: 0;

		color: var(--c-text);
		font-family: var(--f-sans);
	}

	:where(main > *) {
		grid-column: content;
	}

	h1 {
		color: var(--c-text);
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media screen and (min-width: 500px) {
			& {
				grid-column: full;

				display: grid;
				grid-template-columns:
					[breakout-start] var(--gutter) [content-start] repeat(
						3,
						min(24.7rem, calc((100% - 12rem) / 3))
					)
					[content-end] var(--gutter) [breakout-end];
				gap: 2rem;
			}
		}

		h1 {
			grid-row: 1;
			grid-column: 2 / 3;
			margin-block-start: 1rem;
		}

		p {
			grid-column: 3 / 5;
			place-self: end;
			font-size: clamp(1.125rem, 0.125rem + 5vi, 4rem);
			line-height: 1.3;
			text-wrap: balance;
		}

		div {
			grid-column: 3 / 5;
			display: grid;
			grid-template-columns: repeat(auto-fit, 10.625rem);
			gap: 1rem 2rem;
			height: fit-content;
		}
	}

	:global(.hero svg) {
		display: none;

		@media screen and (min-width: 500px) {
			display: block;
			grid-row: 1 / 3;
			grid-column: 1 / 3;
			align-self: end;
			margin-block: 4.5rem -4rem;
		}

		@media screen and (min-width: 700px) {
			grid-row: 1 / 4;
			margin-block: 4.5rem 0;
		}

		@media screen and (min-width: 1000px) {
			grid-row: 1 / 5;
		}
	}

	:global(.hero div > *) {
		width: 100%;
	}

	.highlight-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		gap: 2rem;
	}
</style>
