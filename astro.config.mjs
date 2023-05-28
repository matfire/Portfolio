import { defineConfig } from "astro/config";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://matteogassend.com",
  adapter: vercel(),
  experimental: {
    assets: true,
  },
  image: {
    service: "astro/assets/services/sharp",
  },
  integrations: [tailwind(), robotsTxt({policy: [{ userAgent: '*', allow: '/' }]})],
});
