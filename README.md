# My Personal Website

Monorepo my personal website.

## Stack

-   [Next.js](//nextjs.org)
-   [Contentlayer](//www.contentlayer.dev)
-   [Giscus](//giscus.app)
-   [Mantine](//mantine.dev)
-   [Tabler Icons](//tabler-icons.io)

## Build

Using `pnpm`.

```bash
# Install
pnpm install

# Build remark-mdx-svg
pnpm remark-svg:build

# Build next.js
pnpm main:build

# Generate sitemap
pnpm main:sitemap

# Generate open graph image
pnpm main:scripts:og-image

# Generate rss blog
pnpm main:scripts:rss:blog

# Export static html
pnpm main:export
```
