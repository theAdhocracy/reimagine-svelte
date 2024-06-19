<script lang="ts">
	import CardReveal from '$lib/components/CardReveal.svelte';

	export let title: string;
	export let subtitle: string;
	export let description: string | undefined;
	export let header_link:
		| [
				{
					url: string;
					label: string;
				}
		  ]
		| undefined;
	export let cards: [
		{
			_key: string;
			title: string;
			description: string;
		}
	];
</script>

<section class="grid-revelation">
	<header>
		<h2 class="u-eyebrow">{title}</h2>
		<p class="u-title">{subtitle}</p>
		<div>
			{#if description}
				<p>{description}</p>{/if}
			{#if header_link}
				<a href={header_link?.[0].url}>{header_link?.[0].label}</a>
			{/if}
		</div>
	</header>
	<div class="card-grid">
		{#each cards as card}
			<CardReveal {...card} id={card._key} />
		{/each}
	</div>
</section>

<style>
	.grid-revelation {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		h2,
		h3 {
			font-weight: 400;
		}

		header {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem 2rem;

			h2 {
				width: 100%;
			}

			p,
			div {
				flex-basis: calc(50% - 1rem);
				place-self: center;
				min-width: 20ch;
			}

			div {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}

			a {
				font-size: 0.75rem;
			}
		}

		.card-grid {
			display: grid;
			grid-template-columns: repeat(
				auto-fill,
				minmax(min(18rem, max(min(calc(50% - 2rem), 15rem), 10rem)), 1fr)
			);
			gap: 2rem;
		}
	}
</style>
