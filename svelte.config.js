import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// using Netlify-specific adapter
		adapter: adapter({
			edge: false,
			split: false
		}),
		// NOTE: The following has been added purely to account for missing routes in the POC. It allows anchor elements to link to pages that would otherwise want to be prerendered, but do not have a corresponding template or route, without crashing the build.
		prerender: {
			handleHttpError: ({ status, path, referrer, message }) => {
				if (status === 404) {
					console.warn(`404 error, path does not exist: ${path}. Linked to be ${referrer}`);
					return;
				}

				throw new Error(message);
			}
		}
	}
};

export default config;
