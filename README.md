# rehype-mdx-parse-html

A Rehype plugin to allow MDX to apply its component substitution to HTML tags in markdown files.

## Example Usage

Using node:
```js
import { promises as fs } from 'node:fs'
import { compile } from '@mdx-js/mdx'
import mdxParseHtml from '@kebian/rehype-mdx-parse-html'

console.log(String(await compile(await fs.readFile('example.mdx'), { rehypePlugins: [mdxParseHtml] })))
```

Using Next.js:

```js
// next.config.mjs

import mdxParseHtml from '@kebian/rehype-mdx-parse-html'
import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [mdxParseHtml]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

## Background

MDX version 2 changed the way that HTML tags are parsed in markdown files.

Let's assume we have this simple MDX file with 2 headings.

```md
# First Heading

<h1>Second Heading</h1>
```

and let's assume we want to replace all `h1` elements with `h2` elements by passing a components property to the MDX content.

```tsx
import MDXContent from './markdown.mdx'

const Page = () => {
    return (
        <MDXContent components={{
            'h1': (props) => <h2 {...props}>
        }}>
    )
}

export default Page
```

By default, MDX will change the "First Heading" element to an `h2` but will not change "Second Heading". This seems counter-intuitive and is a change from the original behavior in version 1.

You can read some discussion on the issue [here](https://github.com/mdx-js/mdx/pull/2052).
