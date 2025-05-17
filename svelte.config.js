import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex({
		layout: "src/components/mdsvex-page/MdsvexPage.svelte"
	})],
	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$components: 'src/components',
			$stores: 'src/stores'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
