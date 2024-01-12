import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
const dev = process.argv.includes('dev');
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: mdsvexConfig.extensions?.concat('.svelte'),

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter({
      strict: true,
    }),
    alias: {
      $contents: path.resolve('./src/contents'),
    },
    prerender: {
      entries: ['/blogs/', '/projects/', '/sitemaps.xml'],
    },
    paths: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      base: dev ? '' : process.env.BASE_PATH,
    },
  },
};

export default config;
