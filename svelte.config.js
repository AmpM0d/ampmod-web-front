import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import adapter from '@sveltejs/adapter-netlify';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, './src/mdsvex.svelte');

const config = {
	preprocess: [vitePreprocess(), mdsvex({layout: path_to_layout})],
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
