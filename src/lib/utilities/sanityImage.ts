import imageUrlBuilder from '@sanity/image-url';
import type { Image } from '@sanity/types';
import client from '$lib/utilities/sanityClient';

const builder = imageUrlBuilder(client);

export function sanityUrl(source: Image) {
	return builder.image(source);
}
