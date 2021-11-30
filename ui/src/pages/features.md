---
title: Template Features
---

This template contains our essential recommendations for a modern Vue Single Page App optimal for both 
productivity and performance.

|||
|-|-|
| [Vite](https://vitejs.dev)   | Modern typed design, Lighting fast reloads, optimal builds, growing ecosystem  |
| [Vue3](https://v3.vuejs.org) | Elegant, composable reactive typed API that scales to handle small & large Apps |
| [Tailwindcss](https://tailwindcss.com) | Productive responsive-first utility-based css framework with growing [rich component ecosystem](https://tailwindcomponents.com) |
| [TypeScript](https://www.typescriptlang.org) | Advanced type-safety, static analysis and richer IDE tooling |
| [Iconify](https://iconify.design) | Unified registry to access 100k+ high quality SVG icons from 100+ icon sets |
| [Markdown](https://github.com/markdown-it/markdown-it) | Native Markdown integration with advanced featureset supporting embedding of HTML & Vue Components |
| [SWRV](https://github.com/Kong/swrv) | stale-while-revalidate library for Vue 3's composition API enabling optimal end-user UX for API integrations |
| [tailwind/typography](https://tailwindcss-typography.vercel.app) | Beautiful css typography for markdown articles & blog posts |
| [tailwind/forms](https://github.com/tailwindlabs/tailwindcss-forms) | Beautiful css form & input styles that's easy to override with utilities |
| [plugin/pages](https://github.com/hannoeru/vite-plugin-pages) | Conventional file system based routing for Vue 3 on Vite |
| [plugin/layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) | Support for multiple page layouts |
| [plugin/components](https://github.com/antfu/unplugin-vue-components) | Auto importing & registering of components on-demand |
| [plugin/auto-import](https://github.com/antfu/unplugin-auto-import) | Global imports in source files for reduced boilerplate |
| [Authentication](https://docs.servicestack.net/auth) | Simple, built-in flexible auth protected by route guards |
| [Validation](https://docs.servicestack.net/validation) | Auto form binding, submission, loading and validation |

## Vue Plugins

The Vite plugins registered in `vite.config.ts` improves productivity by adopting popular conventions that automating-away manual tasks & configurations.

### [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

For Auto Registering Vue Components, either `.vue` SFC's, `.md` Markdown components or Iconify's icons as Vue3 components.

```ts
Components({
    extensions: ['vue', 'md'],
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [
        // auto import icons without any prefix
        IconsResolver({
            componentPrefix: ''
        }),
    ],
    dts: 'src/components.d.ts', // auto-gen type definitions
})
```

### [unplugin-icons](https://github.com/antfu/unplugin-icons) 

For accessing [thousands of Iconfigy's SVG icons](https://icon-sets.iconify.design) as Vue components **on-demand** universally.

```ts
Icons({ })
```

### [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

For auto generating vue routing configurations for each Vue 3 component from 
[NuxtJS inspired File System Routing](https://github.com/hannoeru/vite-plugin-pages#file-system-routing) conventions.

```ts
Pages({
  dirs: [
    { dir: "src/pages", baseRoute: "posts" }, // at: /posts/*
    { dir: "src/views", baseRoute: "" },      // at: /*
  ],
  extensions: ['vue', 'md'],
  extendRoute(route:any) {
    // attach markdown frontmatter metadata to their routes
  },
})
```

### [vite-plugin-md](https://github.com/antfu/vite-plugin-md)

For enabling Markdown Support by converting each `.md` document into a Vue Component that's rendered using 
[markdown-it](https://github.com/markdown-it/markdown-it).

```ts
Markdown({
    markdownItOptions: {
        // html: true,
    },
    markdownItSetup(md) {
        //md.use(markdownPlugin)
    },
    wrapperComponent: 'MarkdownPage'
})
```

## App Features

### Stale While Revalidate

[stale-while-revalidate](https://web.dev/stale-while-revalidate/) is a popular UI pattern helps developers balance 
between immediacy—loading cached content right away—and freshness—ensuring updates to the cached content are used in the future.

This template includes a `swrClient` that provides a typed wrapper around [Vue3's SWVR](https://github.com/Kong/swrv) 
library for making typed API Requests with ServiceStack's typed 
[JsonServiceClient](https://docs.servicestack.net/typescript-add-servicestack-reference).

```html
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{data ? data.result :'loading...'}}</div>
</template>

<script setup lang="ts">
import { Hello } from "@/dtos"
import { swrClient } from "@/api"

const props = defineProps<{ name: string }>()

const { data, error } = swrClient.get(() => 
    new Hello({ name: props.name }))
</script>
```

This reactively sets up the UI to handle multiple states:
 - `loading` - displays the `loading...` message whilst API request is in transit
 - `data` - when completed, populated with a `HelloResponse` and displayed
 - `error` - when failed, populated with `ResponseStatus` and displayed

The primary UX benefits are realized when re-making an existing request in which a locally-cached *stale* version
is immediately returned and displayed whilst a new API Request is made behind the scenes, which updates the UI when completed.

Ultimately this provides the optimal end-user UX with the UI being immediately updated with *stale* results initially, 
before being re-updated with the latest UI when the new API Request is completed.
