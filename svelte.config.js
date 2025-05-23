import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $utils: 'src/lib/utils',
      $server: 'src/lib/server',
      $stores: 'src/lib/stores',
      $assets: 'src/lib/assets',
      $types: 'src/lib/types'
    }
  }
};

export default config;
