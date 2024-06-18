import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/public';

const client = createClient({
	projectId: env.PUBLIC_SANITY_PROJECT_ID,
	dataset: env.PUBLIC_SANITY_DATASET,
	apiVersion: '2022-03-25',
	useCdn: false
});

export default client;
