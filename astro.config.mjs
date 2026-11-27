// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.builttospill.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: {
    // YouTube thumbnails are downloaded and re-encoded at build time, so the
    // first paint never talks to a third party.
    domains: ['i.ytimg.com'],
  },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
