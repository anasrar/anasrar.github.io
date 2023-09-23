# My Personal Website

Monorepo my personal website.

## Stack

-   [Astro](//astro.build)
-   [Giscus](//giscus.app)
-   [Tabler Icons](//tabler-icons.io)

## Build

Using `pnpm`.

```bash
# Install
pnpm install

# Build diagrams
pnpm diagrams:build

# Build blog
pnpm blog:build
```

## Vercel Project Setting

### Build & Development Settings

Framework preset: `Astro`

Build command: `pnpm turbo run build`

Development command: `pnpm -F blog astro dev --port $PORT`

## Root Directory

`packages/blog`

-   [x] Include source files outside of the Root Directory in the build step.