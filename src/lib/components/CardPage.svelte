<script lang="ts">
	import Image from '$lib/components/Image.svelte';

	export let title: string;
	export let desc: string;
	export let category: string;
	export let url: string;
	export let thumb: any | undefined;
</script>

<article class="card-page">
	{#if thumb}
		<Image image={thumb} />
	{/if}
	<p class="u-eyebrow">{category}</p>
	<h2>{title}</h2>
	<p>{desc}</p>
	<a href={url}>View case study</a>
</article>

<style>
	.card-page {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h2 {
			font-weight: 400;
			font-size: 1.25rem;
			line-height: 1.3;
		}

		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			margin-block-end: 0.5rem;
		}

		a {
			font-size: 0.75rem;
		}
	}
</style>
