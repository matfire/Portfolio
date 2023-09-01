import { defineConfig, sharpImageService } from "astro/config";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

import remarkEmbedder from "@remark-embedder/core";
import {
  CodeSandboxTransformer,
  YoutubeTransformer,
} from "./src/utils/embedTransformers";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://matteogassend.com",
  adapter: vercel(),
  image: {
    service: sharpImageService(),
  },
  markdown: {
    remarkPlugins: [
      [
        remarkEmbedder,
        { transformers: [CodeSandboxTransformer, YoutubeTransformer] },
      ],
    ],
  },
  integrations: [
    tailwind(),
    robotsTxt({ policy: [{ userAgent: "*", allow: "/" }] }),
  ],
});
