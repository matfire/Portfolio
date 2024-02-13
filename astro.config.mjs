import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";
import remarkEmbedder from "@remark-embedder/core";
import { CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer } from "./src/utils/embedTransformers";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://matteogassend.com",
  adapter: cloudflare(),
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  markdown: {
    remarkPlugins: [
      [remarkEmbedder.default, 
        {
        transformers: [CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer]
        },
      ],
    ]
  },
  integrations: [tailwind(), robotsTxt({
    policy: [{
      userAgent: "*",
      allow: "/"
    }],
    sitemap: `https://matteogassend.com/sitemap-index.xml`
  }), sitemap(), icon()]
});