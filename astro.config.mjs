import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import remarkEmbedder from "@remark-embedder/core";
import { CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer } from "./src/utils/embedTransformers";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import icon from "astro-icon";

// https://astro.build/config
import metaTags from "astro-meta-tags";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://matteogassend.com",
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    remarkPlugins: [[remarkEmbedder.default, {
      transformers: [CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer]
    }]],
    shikiConfig: {
      theme: "catppuccin-macchiato"
    }
  },
  integrations: [tailwind(), robotsTxt({
    policy: [{
      userAgent: "*",
      allow: "/"
    }],
    sitemap: `https://matteogassend.com/sitemap-index.xml`
  }), sitemap(), icon(), metaTags()]
});
