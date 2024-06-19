import client from '$lib/utilities/sanityClient';

export async function load({ params }) {
	const homepage = await client.fetch(/* groq */ `*[_type == "homepage"]`);

	return {
		homepage: homepage
	};
}
