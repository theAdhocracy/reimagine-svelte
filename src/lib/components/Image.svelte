<script>
	import { sanityUrl } from '$lib/utilities/sanityImage';

	export let image;
	export let width = 960;

	const url = sanityUrl(image.image).width(width).fit('max').auto('format').url();
</script>

<img src={url} alt={image.alt || ''} />
