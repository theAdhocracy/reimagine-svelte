import client from '$lib/utilities/sanityClient';

export async function load({ params }) {
	const data = await client.fetch(/* groq */ `*[_type == "global"]`);

	return {
		global: data
	};
}
