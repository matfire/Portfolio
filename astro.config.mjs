import { defineConfig, sharpImageService } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";
import remarkEmbedder from "@remark-embedder/core";
import { CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer  } from "./src/utils/embedTransformers";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://matteogassend.com",
  adapter: vercel(),
  image: {
    service: sharpImageService()
  },
  markdown: {
    remarkPlugins: [[remarkEmbedder, {
      transformers: [CodeSandboxTransformer, YoutubeTransformer, StackblitzTransformer]
    }]]
  },
  integrations: [tailwind(), robotsTxt({
    policy: [{
      userAgent: "*",
      allow: "/"
    }],
    sitemap: `https://matteogassend.com/sitemap-index.xml`
  }), sitemap()]
});
