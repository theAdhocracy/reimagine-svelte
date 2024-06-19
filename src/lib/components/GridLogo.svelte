<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import CTA from '$lib/components/CTA.svelte';

	export let title: string;
	export let subtitle: string;
	export let link: {
		label: string;
		url: string;
	}[];
	export let logos: any[];
</script>

<section class="grid-logo">
	<h2 class="u-eyebrow">{title}</h2>
	<p class="u-title">{subtitle}</p>
	<ul role="list">
		{#each logos as logo}
			<li>
				<Image image={logo} />
			</li>
		{/each}
	</ul>
	<footer>
		<CTA label={link[0]?.label} url={link[0]?.url} type="highlight" />
	</footer>
</section>

<style>
	.grid-logo {
		container-type: inline-size;
		padding: 3rem min(6.375rem, 8vw);
		background-color: var(--c-bg-block);
	}

	h2 {
		margin-block-end: 0.75rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 2rem;
		place-content: space-between;
		margin-block: 2rem;
	}

	footer {
		display: flex;
		place-content: center;
	}

	li {
		width: fit-content;
		max-width: calc(50% - 2rem);
	}

	@container (width > 40rem) {
		ul {
			display: grid;
			grid-template-columns: repeat(4, 9.375rem);
		}

		li {
			aspect-ratio: 1 / 1;
			max-width: 100%;
		}
	}
</style>
