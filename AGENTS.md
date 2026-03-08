### Example Environment File Setup

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Provides concrete examples of how to structure `.env`, `.env.local`, and `.env.production` files. This demonstrates how to define public configuration, server configuration templates, local development overrides, and production-specific settings.

```bash
#.env (committed to repository):
# Public configuration
VITE_APP_NAME=My TanStack Start App
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...

# Server configuration templates
DATABASE_URL=postgresql://localhost:5432/myapp_dev
REDIS_URL=redis://localhost:6379

#.env.local (add to .gitignore):
# Override for local development
DATABASE_URL=postgresql://user:password@localhost:5432/myapp_local
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-local-secret

#.env.production:
# Production overrides
VITE_API_URL=https://api.myapp.com
DATABASE_POOL_SIZE=20
```

--------------------------------

### React Favicon and Manifest Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Configures various favicon sizes and types, along with a site manifest for web applications. This setup ensures proper icon display across different devices and browsers.

```javascript
{
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' }
```

--------------------------------

### React Root Layout and Navigation Setup

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Defines the main root layout component for a React application using TanStack Router. It includes navigation links for different routes and integrates TanStack Router Devtools for debugging.

```javascript
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Head Content and Scripts in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic

Defines the metadata for the HTML head, including favicons and manifest links, as well as external JavaScript scripts to be included. This configuration is typically part of the framework's setup.

```javascript
createRouteConfig({
    // ... other configurations
    head: () => (
      <>
        <title>My App</title>
        <meta name="description" content="My awesome app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" color="#fffff" />
        <link rel="icon" href="/favicon.ico" />
      </>
    ),
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
```

--------------------------------

### Build and Start Application with Bun

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Commands to build the application and start the production server using Bun. Assumes a custom server implementation or the reference server provided in the example repository.

```bash
bun run build
bun run server.ts
```

--------------------------------

### Initialize Project and Install Dependencies (Shell)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Commands to create a new project directory, navigate into it, initialize npm, and install core dependencies for TanStack Start, Vite, and React.

```shell
mkdir myApp
cd myApp
npm init -y
npm i @tanstack/react-start @tanstack/react-router
npm i -D vite
npm i react react-dom
npm i -D @vitejs/plugin-react
npm i -D typescript @types/react @types/react-dom @types/node vite-tsconfig-paths
```

--------------------------------

### Create TanStack Start Project and Install Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This snippet shows the bash commands to create a new TanStack Start project, navigate into its directory, install dependencies, and start the development server. It also mentions optional flags for adding extra features during project creation.

```bash
pnpx create-start-app movie-discovery
cd movie-discovery
pnpm i
pnpm dev
```

--------------------------------

### Install Netlify Vite Plugin for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Installs the Netlify Vite plugin for TanStack Start, which configures your build for Netlify deployment and enables local development emulation of the Netlify production platform. This is a prerequisite for deploying TanStack Start apps to Netlify.

```bash
npm install --save-dev @netlify/vite-plugin-tanstack-start
# or...
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
# or yarn, bun, etc.
```

--------------------------------

### React Error and Not Found Component Setup

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Configures the error and not found components for the TanStack Start framework. The error component wraps the default catch boundary with a RootLayout, while the not found component uses a simple NotFound component.

```javascript
errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />
```

--------------------------------

### React Root Component Setup with ClerkProvider

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Defines the main root component for the React application. It wraps the application's children with ClerkProvider for authentication and RootDocument for the overall document structure.

```javascript
function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}
```

--------------------------------

### Create TanStack Start Project and Install Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Initializes a new TanStack Start project named 'devjokes', navigates into the project directory, installs dependencies, and adds the 'uuid' package for generating unique IDs.

```bash
pnpm create @tanstack/start@latest devjokes
cd devjokes
pnpm i
pnpm dev

# Install uuid for generating unique IDs
pnpm add uuid
```

--------------------------------

### Install TanStack Start and Vite Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Installs the necessary packages for TanStack Start, including @tanstack/react-router and @tanstack/react-start, along with Vite and its plugins for React, Tailwind CSS, and path alias resolution.

```bash
npm i @tanstack/react-router @tanstack/react-start
npm i -D vite @vitejs/plugin-react @tailwindcss/vite tailwindcss vite-tsconfig-paths
```

--------------------------------

### Basic Server Entry Point Creation with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

Demonstrates the basic setup of a server entry point using `createServerEntry` from `@tanstack/react-start/server-entry`. It wraps the default handler to ensure type safety and proper integration.

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  },
})
```

--------------------------------

### Define Root Document Structure with Navigation in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic

Sets up the main HTML document structure, including the head and body content. It features a navigation bar with links to different routes and integrates TanStack Router Devtools for debugging.

```javascript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{
              exact: true,
            }}>
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}>
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}>
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}>
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}>
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}>
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Static Sitemap XML Example

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Provides an example of a static `sitemap.xml` file. This file can be placed in the `public` directory for simple sites where the structure is known and does not change frequently. It defines URLs, change frequency, and priority.

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://myapp.com/about</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

--------------------------------

### Install Content Collections for Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Installs the `@content-collections/core` and `@content-collections/vite` packages, which are used for processing markdown files at build time within a Vite-based TanStack Start application.

```bash
npm install @content-collections/core @content-collections/vite
```

--------------------------------

### Middleware Execution Order Example (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates the execution order of middleware in TanStack Start, demonstrating dependency-first execution starting with global middleware, followed by server function middleware. This example logs messages to show the sequence.

```tsx
import { createMiddleware, createServerFn } from '@tanstack/react-start'

const globalMiddleware1 = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('globalMiddleware1')
    return next()
  },
)

const globalMiddleware2 = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('globalMiddleware2')
    return next()
  },
)

const a = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  console.log('a')
  return next()
})

const b = createMiddleware({ type: 'function' })
  .middleware([a])
  .server(async ({ next }) => {
    console.log('b')
    return next()
  })

const c = createMiddleware({ type: 'function' })
  .middleware()
  .server(async ({ next }) => {
    console.log('c')
    return next()
  })

const d = createMiddleware({ type: 'function' })
  .middleware([b, c])
  .server(async () => {
    console.log('d')
  })

const fn = createServerFn()
  .middleware([d])
  .server(async () => {
    console.log('fn')
  })
```

--------------------------------

### React Root Route with Supabase Auth - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

Defines the root route for a TanStack Start React application. It includes server-side fetching of user authentication status from Supabase, meta tag generation for SEO, and basic navigation links. It also sets up catch boundary and not found components.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Define a Simple GET Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This snippet demonstrates how to define a basic server route that responds to GET requests with a 'Hello, World!' message. It uses `createFileRoute` and specifies a GET handler within the `server.handlers` object.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

--------------------------------

### Create Dynamic Sitemap with Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Provides an example of creating a dynamic sitemap using a server route in TanStack Start. This approach is suitable for sites with dynamic content that cannot be discovered at build time. Caching the response at the CDN is recommended for performance.

```ts
import { createFileRoute } from '@tanstack/react-router'

// Assume fetchAllPosts() is defined elsewhere and fetches post data
// async function fetchAllPosts() { ... }

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await fetchAllPosts()

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myapp.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>https://myapp.com/posts/${post.id}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('')}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Isomorphic Code Example in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates code that runs on both the server and client in TanStack Start. This includes utility functions and route loaders, highlighting the isomorphic nature of the framework.

```tsx
import { createFileRoute } from '@tanstack/react-router';

// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products');
    return response.json();
  },
});
```

--------------------------------

### React Root Route with Authentication - TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-auth

Defines the root route for a TanStack Start React application, including server-side authentication logic and head content generation. It uses `createServerFn` for fetching user data and sets up navigation links.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo.js'
import { useAppSession } from '~/utils/session.js'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.userEmail) {
    return null
  }

  return {
    email: session.data.userEmail,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Node.js Build and Start Scripts

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Defines the 'build' and 'start' npm scripts for a Node.js deployment. 'build' uses Vite to create the production build, and 'start' uses Node.js to run the server from the build output.

```json
    "build": "vite build",
    "start": "node .output/server/index.mjs"
```

--------------------------------

### React Navigation with TanStack Start Framework

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-authjs

This snippet shows a React navigation component that utilizes TanStack Start Framework's routing capabilities. It displays navigation links and conditionally renders user authentication actions (Sign In/Sign Out) based on the presence of a user session.

```jsx
const routeContext = Route.useRouteContext()

  return (
    <nav className="p-4 flex gap-4 items-center bg-gray-100">
      <Link
        to="/"
        activeProps={{ className: 'font-bold' }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ className: 'font-bold' }}>
        Protected
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {routeContext.session ? (
          <>
            <span className="text-gray-600">
              {routeContext.session?.user?.name ||
                routeContext.session?.user?.email}
            </span>
            <a
              href="/api/auth/signout"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </a>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
```

--------------------------------

### Configure Root Route and Head Content in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic

This React code configures the root route for a TanStack Router application. It defines metadata, links, and scripts to be included in the HTML head, along with error and not found components. It also sets up a shell component for the document structure.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### React Root Route Configuration with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Configures the root route for a React application using TanStack Router. It sets up head content, error handling, not found components, and the main root component. Dependencies include '@tanstack/react-router' and utility functions from '~/utils/seo'.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Initialize TanStack Router with Root Component and Auth Handling (JavaScript)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

Initializes the TanStack Router with a root component and handles authentication state retrieval. It fetches authentication status and sign-in URL, passing them as initial data to the `AuthKitProvider` to prevent flickering during authentication state loading. This setup is crucial for client-side rendering and initial state management.

```javascript
import { createRouter } from '@tanstack/react-router-server';
import { Route } from './routeTree.gen';
import { AuthKitProvider } from '@tanstack/react-auth-kit';
import { getAuthAction, getSignInUrl } from './auth';
import { RootComponent } from './rootComponent';

const router = createRouter({
  routeTree: Route,
  // getAuthAction() returns auth state without accessToken, safe for client
  // Pass to AuthKitProvider as initialAuth to avoid loading flicker
  loader: async () => {
    const auth = await getAuthAction();
    const url = await getSignInUrl();
    return {
      auth,
      url,
    };
  },
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});
```

--------------------------------

### Example Markdown Blog Post Structure

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This is an example of a markdown file that can be used as a blog post. It includes frontmatter (title, published, authors) separated by '---', an optional header image, and the main content. This structure is parsed by the 'content-collections' configuration.

```markdown
## <!-- src/blog/hello-world.md -->

title: Hello World
published: 2024-01-15
authors:

- Jane Doe
  description: My first blog post

---

![Hero Image](/images/hero.jpg)

Welcome to my blog! This is my first post.

## Getting Started

Here's some content with **bold** and _italic_ text.

```javascript
console.log('Hello, world!')
```
```

--------------------------------

### Root Document Component in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

Defines the main HTML document structure for a TanStack Start application. It includes head content, body layout, navigation links, user authentication status display, and TanStack Router Devtools. This component is rendered at the root of the application.

```jsx
function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            {user ? (
              <>
                <span className="mr-2">{user.email}</span>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Install Markdown Processing Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Installs the necessary npm packages for processing markdown content, including remark and rehype plugins for parsing, transforming, and stringifying markdown to HTML.

```bash
npm install unified remark-parse remark-gfm remark-rehype rehype-raw rehype-slug rehype-autolink-headings rehype-stringify shiki html-react-parser gray-matter
```

--------------------------------

### Database Integration with TanStack Start Server Functions (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/databases

This snippet demonstrates how to integrate a database with TanStack Start by calling database client functions from server functions. It shows examples of fetching user data and creating a new user with POST method. Assumes a `createMyDatabaseClient()` function exists to establish a database connection.

```tsx
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient() // Assume this function creates a database client

export const getUser = createServerFn().handler(async ({ context }) => {
  // Fetches a user based on userId from the context
  const user = await db.getUser(context.userId)
  return user
})

export const createUser = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    // Creates a new user with data passed in the request body
    const user = await db.createUser(data)
    return user
  },
)
```

--------------------------------

### React Clerk Authentication Setup with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

This code sets up the root route for a React application using TanStack Router and Clerk for authentication. It defines server-side functions to fetch authentication status and client-side components to render the UI based on the user's login state. It also includes meta tags and links for the document head.

```tsx
/// <reference types="vite/client" />
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-react-start'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import * as React from 'react'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import appCss from '~/styles/app.css?url'

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()

  return {
    userId,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth()

    return {
      userId,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Add Cache Headers for Production in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Sets cache control headers for CDN and browser caching to optimize production performance. This example uses `createServerFn` to define a GET request handler and sets 'Cache-Control' and 'CDN-Cache-Control' headers.

```tsx
export const fetchDocs = createServerFn({
  method: 'GET',
})
  .inputValidator((params: FetchDocsParams) => params)
  .handler(async ({ data: { repo, branch, filePath }, context }) => {
    // Set cache headers for CDN caching
    context.response.headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate',
    )
    context.response.headers.set(
      'CDN-Cache-Control',
      'max-age=300, stale-while-revalidate=300',
    )

    // ... fetch logic
  })

```

--------------------------------

### Unit Testing Server Functions with Vitest

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Illustrates unit testing for server functions, specifically `loginFn`, using Vitest. It includes setup for a test database, and tests for successful login with valid credentials and rejection with invalid credentials, ensuring the authentication logic works as expected.

```tsx
// __tests__/auth.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { loginFn } from '../server/auth'

describe('Authentication', () => {
  beforeEach(async () => {
    await setupTestDatabase()
  })

  it('should login with valid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'password123' },
    })

    expect(result.error).toBeUndefined()
    expect(result.user).toBeDefined()
  })

  it('should reject invalid credentials', async () => {
    const result = await loginFn({
      data: { email: 'test@example.com', password: 'wrongpassword' },
    })

    expect(result.error).toBe('Invalid credentials')
  })
})
```

--------------------------------

### Configure Document Head and Links in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Sets up the initial viewport meta tag and integrates SEO metadata and various favicon links for a React application. It utilizes a helper function `seo` for meta tag generation and defines an array of link tags for assets like stylesheets and icons.

```javascript
{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
```

--------------------------------

### React Root Route with Auth.js Session Management

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-authjs

Configures the root route for a TanStack Start React application, integrating Auth.js for session management. It fetches the user session on the server before the route loads and provides it to the router context. Includes meta tags, stylesheet links, and a navigation bar.

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import type { AuthSession } from 'start-authjs'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { getSession } from 'start-authjs'
import { authConfig } from '~/utils/auth'
import appCss from '~/styles/app.css?url'

interface RouterContext {
  session: AuthSession | null
}

const fetchSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  const session = await getSession(request, authConfig)
  return session
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await fetchSession()
    return {
      session,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Auth Example',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <NavBar />
        <main className="p-4">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

function NavBar() {
  const routeContext = Route.useRouteContext()

  return (
    <nav className="p-4 flex gap-4 items-center bg-gray-100">
      <Link
        to="/"
        activeProps={{ className: 'font-bold' }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ className: 'font-bold' }}>
        Protected
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {routeContext.session ? (
          <>
            <span className="text-gray-600">
              {routeContext.session?.user?.name ||
                routeContext.session?.user?.email}
            </span>
            <a
              href="/api/auth/signout"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </a>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

```

--------------------------------

### Server Function Logging with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implement detailed logging within TanStack Start server functions to track execution flow, measure performance, and capture errors. This example demonstrates logging user fetching operations.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getUser = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const startTime = Date.now()

    try {
      console.log(`[SERVER] Fetching user ${id}`)

      const user = await db.users.findUnique({ where: { id } })

      if (!user) {
        console.log(`[SERVER] User ${id} not found`)
        throw new Error('User not found')
      }

      const duration = Date.now() - startTime
      console.log(`[SERVER] User ${id} fetched in ${duration}ms`)

      return user
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(
        `[SERVER] Error fetching user ${id} after ${duration}ms`,
        error,
      )
      throw error
    }
  })
```

--------------------------------

### Run Server with Custom Port and Logging (Bun)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Demonstrates how to run the server using Bun with a custom port or enable verbose logging for asset preloading. These commands utilize environment variables to control server behavior.

```shell
PORT=8080 bun run server.ts  # Custom port
ASSET_PRELOAD_VERBOSE_LOGGING=true bun run server.ts  # See what's happening
```

--------------------------------

### React Root Route Setup with Material UI and TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-material-ui

Configures the root route for a React application using TanStack Router. It integrates Material UI components for theming and layout, and sets up global styles and fonts. Dependencies include @tanstack/react-router, @emotion/react, @emotion/cache, and @mui/material.

```tsx
/// <reference types="vite/client" />
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { CacheProvider } from '@emotion/react'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import fontsourceVariableRobotoCss from '@fontsource-variable/roboto?url'
import React from 'react'
import { theme } from '~/setup/theme'
import { Header } from '~/components/Header'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' })

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />

          <Container component="main" sx={{ paddingBlock: 4 }}>
            {children}
          </Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### React Root Component Definition

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-static

Defines the root component for the React application, which wraps the application's content within the RootLayout. This component is essential for the overall structure and routing.

```javascript
function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}
```

--------------------------------

### Deploy TanStack Start App with Netlify CLI

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Deploys a TanStack Start application using the Netlify CLI. If it's a new project, the CLI will prompt for initialization and automatically configure build settings.

```bash
npx netlify deploy
```

--------------------------------

### Custom Server Handler with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

Illustrates how to create a custom server handler by defining a callback with `defineHandlerCallback` and then using `createStartHandler` to integrate it into the server entry point. This allows for custom logic before the default stream handling.

```tsx
// src/server.ts
import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const customHandler = defineHandlerCallback((ctx) => {
  // add custom logic here
  return defaultStreamHandler(ctx)
})

const fetch = createStartHandler(customHandler)

export default createServerEntry({
  fetch,
})
```

--------------------------------

### Configure Static Prerendering with Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Illustrates how to configure static prerendering for a Vite project using the TanStack Start plugin. Static prerendering generates HTML at build time for optimal performance and crawlability. Ensure `crawlLinks` is true to discover all linkable pages.

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Configure Vite for Netlify Deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Configures the Vite build tool to integrate with Netlify by adding the '@netlify/vite-plugin-tanstack-start' plugin. This setup ensures proper build output and local development environment for Netlify deployments.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start' // ← add this
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart(),
    netlify(), // ← add this (anywhere in the array is fine)
    viteReact(),
  ],
})
```

--------------------------------

### Install Nitro Nightly for Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Installs the nightly version of the Nitro package, which is recommended for integrating with Vite environments. This is typically done by specifying the package in your `package.json` file.

```json
"nitro": "npm:nitro-nightly@latest"
```

--------------------------------

### TanStack Start Middleware Architecture

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

Shows TanStack Start's composable middleware architecture, which includes both request middleware (for all requests) and server function middleware (client and server-side execution). This example defines an authentication middleware.

```tsx
const authMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    // Run auth checks on client
    return next({
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  })
  .server(async ({ next }) => {
    // Validate auth on server
    return next({ context: { user: await getUser() } })
  })
```

--------------------------------

### Define Basic Server Route Handler (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Defines a simple server route '/hello' with a GET handler that returns a 'Hello, World!' response. This is the most basic way to set up a server route.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World! from ' + request.url)
      },
    },
  },
})
```

--------------------------------

### Install Cloudflare Vite Plugin and Wrangler

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Installs the necessary packages for deploying to Cloudflare Workers. These include the Cloudflare Vite plugin for Vite integration and Wrangler for managing Cloudflare deployments.

```bash
pnpm add -D @cloudflare/vite-plugin wrangler
```

--------------------------------

### Create Dynamic robots.txt with Server Route

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Demonstrates creating a dynamic `robots.txt` file using a server route in TanStack Start. This is useful for implementing environment-specific rules or more complex logic for controlling search engine crawler access.

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const robots = `User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml`

        return new Response(robots, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Install and Configure Vite Plugin for Path Aliases

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

Installs the `vite-tsconfig-paths` plugin and configures Vite to use the path aliases defined in `tsconfig.json`. This step is crucial for enabling path alias resolution within your TanStack Start project during the build process.

```sh
npm install -D vite-tsconfig-paths
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
```

--------------------------------

### Define Head Content for React Application

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-cloudflare

Configures meta tags, favicons, and scripts for the application's head section. This includes defining various icon sizes and types, a manifest file, and custom JavaScript files to be loaded.

```javascript
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
```

--------------------------------

### Serve Static robots.txt File

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Explains how to serve a static `robots.txt` file by placing it in the `public` directory of a TanStack Start project. This file is automatically served at `/robots.txt` and is the standard method for controlling search engine crawler access.

```txt
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml
```

--------------------------------

### React Root Document Structure and Navigation

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Renders the main HTML document structure for the React application. Includes head content, a navigation bar with links to Home and Posts, and authentication buttons. It also integrates TanStack Router Devtools and Scripts.

```javascript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Install srvx for Node.js Performance

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Installs the srvx package, which provides an optimized FastResponse class for Node.js deployments with Nitro. This can improve throughput by avoiding standard Web Response to Node.js conversion overhead.

```bash
npm install srvx
```

--------------------------------

### Environment-Specific Observability Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Provides an example of configuring observability settings differently for development and production environments. This helps manage noise in development while ensuring comprehensive monitoring in production.

```tsx
// Different strategies per environment
const observabilityConfig = {
  development: {
    logLevel: 'debug',
    enableTracing: true,
    enableMetrics: false, // Too noisy in dev
  },
  production: {
    logLevel: 'warn',
    enableTracing: true,
    enableMetrics: true,
    enableAlerting: true,
  },
}
```

--------------------------------

### Client Entry Point with Error Boundary in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This example shows how to integrate an `ErrorBoundary` component into the client entry point. This allows for graceful handling of client-side errors by wrapping the `StartClient` component.

```tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary'

hydrateRoot(
  document,
  <StrictMode>
    <ErrorBoundary>
      <StartClient />
    </ErrorBoundary>
  </StrictMode>,
)
```

--------------------------------

### Example of Using Path Aliases for Imports

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

Demonstrates how to use the configured path alias '~/' to import components from the 'src' directory. This replaces long relative paths with a concise alias, improving code readability and maintainability.

```typescript
// app/routes/posts/$postId/edit.tsx
import { Input } from '~/components/ui/input'

// instead of

import { Input } from '../../../components/ui/input'
```

--------------------------------

### Render React Component

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

This snippet demonstrates rendering a React component, specifically a Loader, within a div. It's a basic example of component integration in React.

```jsx
function App() {
  return (
    <div>
      <Loader />
    </div>
  )
}
```

--------------------------------

### Root Component for Application Structure in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

A simple React component that renders the RootDocument. It serves as the main entry point for the application's UI structure, wrapping the main content with the document layout.

```jsx
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}
```

--------------------------------

### Create TanStack Start App (npm)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Command to create a new TanStack Start application using npm. This is the initial step for setting up a new project.

```bash
npm create @tanstack/start@latest
```

--------------------------------

### Common ISR Patterns for Different Page Types (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Provides examples of configuring ISR and client-side caching for various content types, including blog posts, e-commerce products, landing pages, and user-specific dashboards. Each example adjusts `Cache-Control` headers and `staleTime` based on content volatility.

```typescript
export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => fetchPost(params.slug),
  headers: () => ({
    // Cache for 1 hour, allow stale for 7 days
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=604800',
  }),
  staleTime: 5 * 60_000, // 5 minutes client-side
})
```

```typescript
export const Route = createFileRoute('/products/$id')({
  loader: async ({ params }) => fetchProduct(params.id),
  headers: () => ({
    // Shorter cache due to inventory changes
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
  }),
  staleTime: 30_000, // 30 seconds client-side
})
```

```typescript
export const Route = createFileRoute('/landing/$campaign')({
  loader: async ({ params }) => fetchCampaign(params.campaign),
  headers: () => ({
    // Long cache for stable content
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  }),
  staleTime: 60 * 60_000, // 1 hour client-side
})
```

```typescript
export const Route = createFileRoute('/dashboard')({
  loader: async () => fetchUserData(),
  headers: () => ({
    // Private cache, no CDN caching
    'Cache-Control': 'private, max-age=60',
  }),
  staleTime: 30_000,
})
```

--------------------------------

### Manual Netlify Build Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Provides manual build and development configuration for Netlify by defining a `netlify.toml` file. This specifies the build command, publish directory, development command, and port.

```toml
[build]
  command = "vite build"
  publish = "dist/client"
[dev]
  command = "vite dev"
  port = 3000
```

--------------------------------

### Implement Custom Fetch Logic via Client Middleware

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Provides an example of how to inject a custom fetch implementation using client-side middleware. This allows for advanced request handling, such as logging request duration or implementing retry logic.

```tsx
import { createMiddleware } from '@tanstack/react-start'
import type { CustomFetch } from '@tanstack/react-start'

const customFetchMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const customFetch: CustomFetch = async (url, init) => {
      console.log('Request starting:', url)
      const start = Date.now()

      const response = await fetch(url, init)

      console.log('Request completed in', Date.now() - start, 'ms')
      return response
    }

    return next({ fetch: customFetch })
  },
)
```

--------------------------------

### Install Tailwind CSS v3 and Dependencies

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Installs Tailwind CSS version 3 along with PostCSS and Autoprefixer as development dependencies using npm.

```shell
npm install -D tailwindcss@3 postcss autoprefixer
```

--------------------------------

### Server Routes with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Replaces Next.js's server route handlers (like GET) with TanStack Start's `createFileRoute`. This approach defines routes and their server-side handlers within a file-based routing system. It allows for defining multiple HTTP method handlers within the `server.handlers` object.

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/hello')({
  server: {
     handlers: {
       GET: async () => {
         return Response.json("Hello, World!")
       }
    }
  }
})
```

--------------------------------

### Error Reporting Endpoint with TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Defines a server-side route `/admin/errors` using TanStack Start's `createFileRoute` to expose collected errors from the `errorStore`. The `GET` handler retrieves all errors and returns them as a JSON response.

```tsx
// routes/errors.ts
export const Route = createFileRoute('/admin/errors')({
  server: {
    handlers: {
      GET: async () => {
        const errors = Array.from(errorStore.entries()).map(([key, data]) => ({
          id: key,
          ...data,
        }))

        return Response.json({ errors })
      },
    },
  },
})
```

--------------------------------

### Global Fetch Configuration with createStart (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Shows how to configure a global custom fetch function using `createStart`. This global fetch serves as a default and has lower priority than middleware or call-site overrides.

```tsx
// src/start.ts
import { createStart } from '@tanstack/react-start'
import type { CustomFetch } from '@tanstack/react-start'

const globalFetch: CustomFetch = async (url, init) => {
  console.log('Global fetch:', url)
  // Add retry logic, telemetry, etc.
  return fetch(url, init)
}

export const startInstance = createStart(() => {
  return {
    serverFns: {
      fetch: globalFetch,
    },
  }
})
```

--------------------------------

### Create and Handle a Basic Route with Server Functions (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

This snippet shows how to define a new route in TanStack Start by creating a file in `src/routes`. It includes server functions (`createServerFn`) to read and write to a file, and a React component that uses loader data and client-side interaction to update the count.

```tsx
// src/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .inputValidator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state}?
    </button>
  )
}
```

--------------------------------

### Configure Vite with TanStack Start Plugin (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Sets up the Vite configuration file ('vite.config.ts') to include the TanStack Start plugin, Vite's React plugin, and tsconfig-paths for module resolution.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
```

--------------------------------

### Generate Sitemap with TanStack Start Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Demonstrates configuring TanStack Start's Vite plugin to automatically generate a sitemap. This involves enabling prerendering with `crawlLinks: true` to discover pages and enabling the `sitemap` option with a specified host. The sitemap is generated at build time.

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true, // Discovers all linkable pages
      },
      sitemap: {
        enabled: true,
        host: 'https://myapp.com',
      },
    }),
  ],
})
```

--------------------------------

### Initialize Root Route with React Query Context in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Sets up the root route for a React application using TanStack Router. It configures global SEO meta tags, stylesheets, and includes context for React Query. This function also defines custom error and not found components, and integrates TanStack Router and React Query devtools for debugging.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Appwrite Sites Deployment Build Settings

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Specifies the build commands and output directory for deploying a TanStack Start application to Appwrite Sites. These settings are crucial for a successful deployment.

```bash
# Install command: npm install
# Build command: npm run build
# Output directory: ./dist (or ./.output for Nitro v2/v3)
```

--------------------------------

### Install Tailwind CSS v4 and Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Installs Tailwind CSS version 4 and its corresponding Vite plugin using npm. This is the recommended approach for new projects.

```shell
npm install tailwindcss @tailwindcss/vite
```

--------------------------------

### Authentication Provider Setup (Server and Client)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Illustrates how to set up authentication configurations across server and client contexts. Server-side configuration (`authConfig`) can include sensitive secrets like `AUTH_SECRET` and `AUTH0_CLIENT_SECRET`. Client-side configuration (`AuthProvider`) only uses public variables like `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID`, ensuring secrets remain server-only.

```typescript
// src/lib/auth.ts (Server)
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET, // Server-only
    }
  }
}

// src/components/AuthProvider.tsx (Client)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      // No client secret here - it stays on the server
    >
      {children}
    </Auth0Provider>
  )
}
```

--------------------------------

### Cache Control Best Practices: Conservative Start and ETags (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Illustrates best practices for cache configuration, starting with shorter cache times and gradually increasing them. It also demonstrates how to implement ETags using a middleware to enable efficient content validation by CDNs.

```typescript
// Start here
'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'

// Then move to
'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
```

```typescript
import { createMiddleware } from '@tanstack/react-start'
import crypto from 'crypto'

const etagMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  // Generate ETag from response content
  const etag = crypto
    .createHash('md5')
    .update(JSON.stringify(result.data))
    .digest('hex')

  result.response.headers.set('ETag', `"${etag}" `)

  return result
})
```

--------------------------------

### General Observability Tool Integration Pattern

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Demonstrates a common pattern for integrating various observability tools with TanStack Start. This includes initializing the tool in the app's entry point and creating middleware for server functions.

```tsx
// Initialize in app entry point
import { initObservabilityTool } from 'your-tool'

initObservabilityTool({
  dsn: import.meta.env.VITE_TOOL_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server function middleware
const observabilityMiddleware = createMiddleware().handler(async ({ next }) => {
  return yourTool.withTracing('server-function', async () => {
    try {
      return await next()
    } catch (error) {
      yourTool.captureException(error)
      throw error
    }
  })
})
```

--------------------------------

### Server-Only Helper Function Example (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Provides an example of a server-only helper function (`findUserById`) intended to be imported and used within server function handlers. This function interacts with a database.

```ts
// users.server.ts - Server-only helpers
import { db } from '~/db'

export async function findUserById(id: string) {
  return db.query.users.findFirst({ where: eq(users.id, id) })
}
```

--------------------------------

### Root Application Component (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Sets up the root component for a TanStack Start application, including head content, scripts, and the main document structure using React.

```typescript
// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }> ) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Fetch GitHub Directory Contents for Navigation in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Provides a server function to fetch directory contents from a GitHub repository, filtering for markdown files to build navigation. It makes a GET request to the GitHub API and returns a processed list of file names and paths.

```ts
// src/utils/docs.server.ts
type GitHubContent = {
  name: string
  path: string
  type: 'file' | 'dir'
}

export const fetchRepoContents = createServerFn({
  method: 'GET',
})
  .inputValidator(
    (params: { repo: string; branch: string; path: string }) => params,
  )
  .handler(async ({ data: { repo, branch, path } }) => {
    const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contents: ${response.status}`)
    }

    const contents: Array<GitHubContent> = await response.json()

    return contents
      .filter((item) => item.type === 'file' && item.name.endsWith('.md'))
      .map((item) => ({
        name: item.name.replace('.md', ''),
        path: item.path,
      }))
  })

```

--------------------------------

### Basic Meta Tags with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Demonstrates how to set basic meta tags like title and description for a route using the `head` property in TanStack Start. This is essential for basic SEO and page identification.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'My App - Home' },
      {
        name: 'description',
        content: 'Welcome to My App, a platform for...',
      },
    ],
  }),
  component: HomePage,
})
```

--------------------------------

### TypeScript Configuration (JSON)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Essential TypeScript configuration for a TanStack Start project, including JSX settings, module resolution, and strict null checks.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "strictNullChecks": true
  }
}
```

--------------------------------

### Configure ISR Prerendering in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Configures TanStack Start's vite plugin to prerender specific routes and crawl links for Incremental Static Regeneration (ISR). This setup is essential for initial static generation.

```typescript
import {
  tanstackStart
} from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        routes: ['/blog', '/blog/posts/*'],
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Define Root Component and Error/Not Found Handlers in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Sets up the main `RootComponent` and defines specific components for handling errors (`errorComponent`) and not found routes (`notFoundComponent`) within a React application. It utilizes a `RootDocument` for consistent layout and `Outlet` for nested routing.

```javascript
errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}
```

--------------------------------

### Password Hashing with bcryptjs

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates how to securely hash passwords using the bcryptjs library. It emphasizes using strong hashing algorithms and adjusting the salt rounds based on security requirements. This is crucial for protecting user credentials.

```tsx
// Use strong hashing (bcrypt, scrypt, or argon2)
import bcrypt from 'bcryptjs'

const saltRounds = 12 // Adjust based on your security needs
const hashedPassword = await bcrypt.hash(password, saltRounds)
```

--------------------------------

### Set Cache Headers for API Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Configures cache headers for an API route using TanStack Start's server functions. This example sets different cache durations for general caching and CDN caching, demonstrating granular control.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const product = await db.products.findById(params.productId)

        return Response.json(
          { product },
          {
            headers: {
              'Cache-Control':
                'public, max-age=300, stale-while-revalidate=600',
              'CDN-Cache-Control': 'max-age=3600', // Cloudflare-specific
            },
          },
        )
      },
    },
  },
})
```

--------------------------------

### Configure Vite with Nitro Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Configures the Vite build process to use the Nitro plugin for TanStack Start applications. This integration allows TanStack Start to leverage Nitro's agnostic deployment capabilities with Vite.

```typescript
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteReact()],
})
```

--------------------------------

### Combine Server POST Route with React Component

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

This example shows how to define a server route that handles POST requests and also includes a React component for the client-side interaction. The server route processes JSON data from the request body, while the component provides a button to trigger the POST request.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(JSON.stringify({ message: `Hello, ${body.name}!` }))
      },
    },
  },
  component: HelloComponent,
})

function HelloComponent() {
  const [reply, setReply] = useState('')

  return (
    <div>
      <button
        onClick={() => {
          fetch('/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Tanner' }),
          })
            .then((res) => res.json())
            .then((data) => setReply(data.message))
        }}>
        Say Hello
      </button>
      <p>{reply}</p>
    </div>
  )
}
```

--------------------------------

### Dynamic Meta Tags with Loader Data in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Shows how to dynamically generate meta tags (title, description) based on data fetched by a route loader in TanStack Start. This is useful for content-driven pages like blog posts.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'description', content: loaderData.post.excerpt },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Root Component with Authentication and Navigation (React)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

The main `RootComponent` for the TanStack Router application. It uses `Route.useLoaderData` to access authentication state and sign-in URL. It wraps the application in `AuthKitProvider` and `Theme` components, sets up basic navigation links (Home, Account, Client Demo), and includes a suspense-wrapped `SignInButton`. The `Outlet` component renders the matched child routes.

```jsx
import React, { Suspense } from 'react';
import { Route } from '@tanstack/react-router-server';
import { AuthKitProvider } from '@tanstack/react-auth-kit';
import { Theme, Container, Flex, Box, Card, Button } from '@radix-ui/themes';
import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RootDocument } from './rootDocument';
import { Footer } from './footer';
import { SignInButton } from './signInButton';

function RootComponent() {
  const { auth, url } = Route.useLoaderData();
  return (
    <RootDocument>
      <AuthKitProvider initialAuth={auth}>
        <Theme accentColor="iris" panelBackground="solid" style={{ backgroundColor: 'var(--gray-1)' }}>
          <Container style={{ backgroundColor: 'var(--gray-1)' }}>
            <Flex direction="column" gap="5" p="5" height="100vh">
              <Box asChild flexGrow="1">
                <Card size="4">
                  <Flex direction="column" height="100%">
                    <Flex asChild justify="between">
                      <header>
                        <Flex gap="4">
                          <Button asChild variant="soft">
                            <Link to="/">Home</Link>
                          </Button>

                          <Button asChild variant="soft">
                            <Link to="/account">Account</Link>
                          </Button>

                          <Button asChild variant="soft">
                            <Link to="/client">Client Demo</Link>
                          </Button>
                        </Flex>

                        <Suspense fallback={<div>Loading...</div>}>
                          <SignInButton user={auth.user} url={url} />
                        </Suspense>
                      </header>
                    </Flex>

                    <Flex flexGrow="1" align="center" justify="center">
                      <main>
                        <Outlet />
                      </main>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
              <Footer />
            </Flex>
          </Container>
        </Theme>
        <TanStackRouterDevtools position="bottom-right" />
      </AuthKitProvider>
    </RootDocument>
  );
}

export default RootComponent;
```

--------------------------------

### Wildcard/Splat Param

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Server routes support wildcard parameters denoted by a `$` followed by nothing at the end of the path. For example, `routes/file/$.ts` creates an API route at `/file/$` that accepts a wildcard parameter.

```APIDOC
## GET /file/$

### Description
Fetches a file identified by a wildcard path.

### Method
GET

### Endpoint
/file/$

### Parameters
#### Path Parameters
- **_splat** (string) - Required - The wildcard path segment.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **string** - A message indicating the file path.

#### Response Example
```
File: hello.txt
```
```

--------------------------------

### Configure SPA Shell Mask Path (Vite)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This example shows how to customize the 'shell mask path' when SPA mode is enabled in TanStack Start. The shell mask path determines the base URL used for generating the SPA shell. It's configured within the `tanstackStart` plugin options in `vite.config.ts`.

```tsx
import { defineConfig } from 'vite';
import tanstackStart from '@tanstack/start-vite';

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        maskPath: '/app',
      },
    }),
  ],
});
```

--------------------------------

### Sentry Integration for Client and Server

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Integrate Sentry for real-time error tracking and performance monitoring in both client-side React applications and server functions. This setup requires Sentry's SDKs and environment variables for the DSN.

```tsx
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

--------------------------------

### Basic Email/Password Authentication Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Implements a basic email and password authentication system using `createServerFn` from TanStack Start. This includes functions for user registration, hashing passwords with bcrypt, and authenticating users by comparing provided passwords with stored hashes. It also handles session management for logged-in users.

```tsx
// server/auth.ts
import bcrypt from 'bcryptjs'
import { createServerFn } from '@tanstack/react-start'

// User registration
export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; name: string }) => data,
  )
  .handler(async ({ data }) => {
    // Check if user exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return { error: 'User already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await createUser({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    })

    // Create session
    const session = await useAppSession()
    await session.update({ userId: user.id })

    return { success: true, user: { id: user.id, email: user.email } }
  })

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}

```

--------------------------------

### Root Document Structure for HTML (React)

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

Defines the basic HTML document structure for the React application, including `<html>`, `<head>`, and `<body>` tags. It incorporates placeholders for `HeadContent` and `Scripts`, essential for SEO and client-side interactivity. This component ensures the application is rendered within a valid HTML context.

```jsx
import React, { ReactNode } from 'react';
import { HeadContent } from './headContent';
import { Scripts } from './scripts';

function RootDocument({ children }: Readonly<{ children: ReactNode }>)
{
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export { RootDocument };
```

--------------------------------

### Structured Data (JSON-LD) with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Shows how to implement structured data using JSON-LD format within the `head` property of a TanStack Start route. This helps search engines understand content and enables rich results.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.post.title }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.excerpt,
          image: loaderData.post.coverImage,
          author: {
            '@type': 'Person',
            name: loaderData.post.author.name,
          },
          datePublished: loaderData.post.publishedAt,
        }),
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Basic No-Operation Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

A fundamental example of a no-operation (no-op) function in JavaScript. This function takes no arguments and performs no actions, simply returning undefined when called.

```javascript
// basic no-op implementation
function noop() {}
```

--------------------------------

### Conditionally Render SPA Shell UI

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This example shows how to use the `isShell()` function from the router instance to conditionally render UI elements specifically for the SPA shell. It's important to handle potential flashes of unstyled content as `isShell()` returns false after hydration.

```tsx
import { useRouter } from '@tanstack/react-router';

export default function Root() {
  const isShell = useRouter().isShell();

  if (isShell) console.log('Rendering the shell!');

  // ... rest of your component
}
```

--------------------------------

### Hydrate Root with StartClient in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This code snippet demonstrates the basic client entry point for a React application using TanStack Start. It imports `StartClient` and `hydrateRoot` to initialize the application on the client side within a `StrictMode` component.

```tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

--------------------------------

### React Root Route Configuration with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

Configures the root route for a React application using TanStack Router. It sets up global meta tags, links, error handling, and not-found components. Dependencies include '@tanstack/react-router', '@tanstack/react-query', and various local utility and component imports.

```tsx
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              {/* <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Delay
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  // setExtraDelay(Number(event.currentTarget.value))
                }}
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2000">2000</option>
              </select> */}
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

function LoadingIndicator() {

```

--------------------------------

### Multiple Dynamic Path Parameters

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

You can have multiple dynamic path parameters in a single route. For example, `routes/users/$id/posts/$postId.ts` creates an API route at `/users/$id/posts/$postId` accepting two dynamic parameters.

```APIDOC
## GET /users/$id/posts/$postId

### Description
Fetches a specific post for a user, identified by user ID and post ID.

### Method
GET

### Endpoint
/users/$id/posts/$postId

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the user.
- **postId** (string) - Required - The unique identifier of the post.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **string** - A message indicating the user ID and post ID.

#### Response Example
```
User ID: 123, Post ID: 456
```
```

--------------------------------

### Define Execution Boundaries with TanStack Start Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Demonstrates how to use createServerFn, createServerOnlyFn, createClientOnlyFn, and createIsomorphicFn to define where specific code should run. These functions help manage RPC calls, server-only utilities, client-only utilities, and environment-specific logic.

```tsx
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

--------------------------------

### React Root Route Configuration with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-cloudflare

Configures the root route for a TanStack Router application in React. It sets up head content including meta tags for SEO, links to stylesheets and favicons, and scripts. It also defines error and not found components, and a shell component for the document structure.

```tsx
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{ className: 'font-bold' }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{ className: 'font-bold' }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{ className: 'font-bold' }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{ className: 'font-bold' }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{ className: 'font-bold' }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{ className: 'font-bold' }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Initialize OpenTelemetry SDK (Experimental)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Initializes the OpenTelemetry Node.js SDK with service name and version. This should be run before your application code is imported to ensure all modules are instrumented.

```tsx
// instrumentation.ts - Initialize before your app
import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'tanstack-start-app',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
})

// Initialize BEFORE importing your app
sdk.start()
```

--------------------------------

### Root Route Configuration with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

Defines the root route for a TanStack Router application in React. It includes head content for SEO, meta tags, stylesheets, and defines error and notFound components. It also sets up context for queryClient.

```javascript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Environment-Specific Implementations in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Shows how to use `createIsomorphicFn` in TanStack Start to provide different implementations for server and client environments. This allows for code that behaves uniquely based on where it's executed, such as accessing server-specific platform details or client-specific user agent information.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start';

// Different implementation per environment
const getDeviceInfo = createIsomorphicFn()
  .server(() => ({ type: 'server', platform: process.platform }))
  .client(() => ({ type: 'client', userAgent: navigator.userAgent }));
```

--------------------------------

### Apply Middleware to All Server Route Methods (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Applies middleware to all HTTP methods (GET, POST, etc.) for a server route. The middleware array is passed to the `middleware` property of the `server` configuration object.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

export const Route = createFileRoute('/foo')({
  server: {
    middleware: [loggingMiddleware],
    handlers: {
      GET: () => {
        //...
      },
      POST: () => {
        //...
      },
    },
  },
})
```

--------------------------------

### Server Entry Point with Typed Request Context

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

Shows how to define and use custom typed request context in the server entry point. This involves augmenting the `Register` interface from `@tanstack/react-start` and passing typed context data to the `handler.fetch` function.

```tsx
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

type MyRequestContext = {
  hello: string
  foo: number
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: MyRequestContext
    }
  }
}

export default createServerEntry({
  async fetch(request) {
    return handler.fetch(request, { context: { hello: 'world', foo: 123 } })
  },
})
```

--------------------------------

### Server and Client API Calls with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Demonstrates how to create server-side API functions that can access secret keys and client-side functions for public data using TanStack Start. Server functions utilize `createServerFn` for secure backend operations, while client functions use `useQuery` for fetching public data.

```typescript
// src/lib/external-api.ts
import { createServerFn } from '@tanstack/react-start'

// Server-side API calls (can use secret keys)
const fetchUserData = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const response = await fetch(
      `${process.env.EXTERNAL_API_URL}/users/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXTERNAL_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.json()
  })

// Client-side API calls (public endpoints only)
export function usePublicData() {
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  return useQuery({
    queryKey: ['public-data'],
    queryFn: () => fetch(`${apiUrl}/public/stats`).then((r) => r.json()),
  })
}
```

--------------------------------

### Update package.json for Vite (JSON)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Modifies the 'package.json' file to enable ES modules and define scripts for running the development server and building the project with Vite.

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
}
```

--------------------------------

### Configure Default Error Boundary (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries

This code snippet demonstrates how to configure a default error boundary for all routes in a React application using TanStack Start and TanStack Router. It shows the setup in `src/router.tsx` where `defaultErrorComponent` is defined to catch errors that bubble up to the router. The `ErrorComponent` is a built-in UI that can be customized.

```tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

--------------------------------

### Configure Global Request Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Sets up global request middleware that runs for every request handled by TanStack Start. This is configured in the `src/start.ts` file using `createStart` and `createMiddleware`.

```tsx
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'

const myGlobalMiddleware = createMiddleware({ type: 'function' }).server(() => {
  //...
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [myGlobalMiddleware],
  }
})
```

--------------------------------

### Configure Root Route with Context in React Router

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

Sets up the root route for the application using TanStack Router. It defines context, head content, error handling, not found components, and the main root component. It also includes meta tags, links for stylesheets and favicons, and integrates with React Query Devtools and TanStack Router Devtools.

```typescript
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### RootDocument Layout Component in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-cloudflare

A React component that serves as the root document layout for the application. It includes the HTML structure, head content, navigation links, and the main content area where routed components are rendered. It also integrates TanStack Router Devtools.

```jsx
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{
              exact: true,
            }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Environment Variable Prefixes for Client Access

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Demonstrates the correct way to define environment variables for client-side access in TanStack Start. Variables intended for the client must be prefixed with `VITE_`. Non-prefixed variables are not bundled for client code. Ensure the `.env` file is in the project root and restart the development server after changes.

```bash
# ❌ Won't work in client code
API_KEY=abc123

# ✅ Works in client code
VITE_API_KEY=abc123

# ❌ Won't bundle the variable (assuming it is not set in the environment of the build)
npm run build

# ✅ Works in client code and will bundle the variable for production
VITE_API_KEY=abc123 npm run build
```

--------------------------------

### TanStack Start Integration with TanStack Query for Caching

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

Shows how to integrate TanStack Start with TanStack Query for advanced caching scenarios. The loader ensures query data is fetched and cached, and the component automatically uses this cached data.

```tsx
import { queryOptions } from '@tanstack/react-query'

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  })

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(postQueryOptions(params.postId)),
})

function Post() {
  const { postId } = Route.useParams()
  const { data } = useQuery(postQueryOptions(postId))
  // Automatically uses cached data from loader
}
```

--------------------------------

### Preload Specific Assets (Bun)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Sets include and exclude patterns for preloading assets, allowing fine-grained control over which files are loaded into memory. This command uses Bun to run the server with these specific patterns.

```shell
# Preload only critical assets
ASSET_PRELOAD_INCLUDE_PATTERNS="*.js,*.css" \
ASSET_PRELOAD_EXCLUDE_PATTERNS="*.map,vendor-*" \
bun run server.ts
```

--------------------------------

### Using Response.json Helper

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

The `Response.json` helper function can be used to automatically set the `Content-Type` header to `application/json` and serialize the JSON object.

```APIDOC
## GET /hello (Response.json Helper)

### Description
Returns a JSON response using the `Response.json` helper function.

### Method
GET

### Endpoint
/hello

### Parameters
(No parameters)

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **message** (string) - A greeting message.

#### Response Example
```json
{
  "message": "Hello, World!"
}
```
```

--------------------------------

### Deploy to Cloudflare Workers

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Builds your TanStack Start application and then deploys it to Cloudflare Workers using the `wrangler deploy` command. This command initiates the deployment process after the build is complete.

```bash
pnpm run deploy
```

--------------------------------

### Image Optimization with Unpic React

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Replaces Next.js's Image component with Unpic's Image component for optimized image loading. Unpic offers similar functionality and is designed as a drop-in replacement. Ensure the '@unpic/react' package is installed.

```tsx
import { Image } from '@unpic/react'
function Component() {
  return (
    <Image
      src="/path/to/image.jpg"
      alt="Description"
      width={600}
      height={400}
    />
  )
}
```

--------------------------------

### Create Server Functions with HTTP Methods (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates creating server functions with specified HTTP methods. `getData` uses the default GET method, while `saveData` is configured for POST requests.

```tsx
import { createServerFn } from '@tanstack/react-start'

// GET request (default)
export const getData = createServerFn().handler(async () => {
  return { message: 'Hello from server!' }
})

// POST request
export const saveData = createServerFn({ method: 'POST' }).handler(async () => {
  // Server-only logic
  return { success: true }
})
```

--------------------------------

### Canonical URLs with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Demonstrates how to set canonical URLs for routes in TanStack Start to manage duplicate content issues. This is configured within the `head` property of a route.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  head: ({ params }) => ({
    links: [
      {
        rel: 'canonical',
        href: `https://myapp.com/posts/${params.postId}`,
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Implement FAQ Schema for FAQ Page (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This code implements FAQ schema for a '/faq' route using TanStack Router. It fetches FAQ data and includes a JSON-LD script for the FAQPage schema, making Q&A pairs easily extractable by AI.

```tsx
export const Route = createFileRoute('/faq')({
  loader: async () => {
    const faqs = await fetchFAQs()
    return { faqs }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: 'Frequently Asked Questions' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: loaderData.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
})
```

--------------------------------

### Create and Compose Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to create a basic middleware using `createMiddleware` and how to compose multiple middleware functions together. The `loggingMiddleware` is defined first, and then `authMiddleware` is created to depend on `loggingMiddleware`.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

--------------------------------

### Responding with JSON

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

When returning JSON using a `Response` object, you can manually stringify the JSON and set the `Content-Type` header.

```APIDOC
## GET /hello (JSON Response)

### Description
Returns a JSON response with a greeting message.

### Method
GET

### Endpoint
/hello

### Parameters
(No parameters)

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **message** (string) - A greeting message.

#### Response Example
```json
{
  "message": "Hello, World!"
}
```
```

--------------------------------

### Replace Next.js Link with TanStack Router Link (React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

This example shows the straightforward replacement of Next.js's `next/link` component with TanStack Router's `Link` component for client-side navigation. The `href` prop is changed to `to`.

```tsx
import { Link } from "@tanstack/react-router"

function Component() {
  return <Link to="/dashboard">Dashboard</Link>
}
```

--------------------------------

### Root Route Configuration with Workos Auth in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-workos

Configures the root route for a React application using TanStack Router and Workos authentication. It sets up meta tags, links stylesheets, and defines a loader to fetch authentication status and sign-in URL. The component renders the application's main layout, including theme settings, navigation, and the main content outlet, wrapped in an AuthKitProvider.

```tsx
import { Box, Button, Card, Container, Flex, Theme } from '@radix-ui/themes';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense } from 'react';
import { getSignInUrl } from '@workos/authkit-tanstack-react-start';
import { AuthKitProvider, getAuthAction } from '@workos/authkit-tanstack-react-start/client';
import Footer from '../components/footer';
import SignInButton from '../components/sign-in-button';
import appCssUrl from '../app.css?url';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'AuthKit Example in TanStack Start',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCssUrl }],
  }),
  loader: async () => {
    // getAuthAction() returns auth state without accessToken, safe for client
    // Pass to AuthKitProvider as initialAuth to avoid loading flicker
    const auth = await getAuthAction();
    const url = await getSignInUrl();
    return {
      auth,
      url,
    };
  },
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  const { auth, url } = Route.useLoaderData();
  return (
    <RootDocument>
      <AuthKitProvider initialAuth={auth}>
        <Theme accentColor="iris" panelBackground="solid" style={{ backgroundColor: 'var(--gray-1)' }}>
          <Container style={{ backgroundColor: 'var(--gray-1)' }}>
            <Flex direction="column" gap="5" p="5" height="100vh">
              <Box asChild flexGrow="1">
                <Card size="4">
                  <Flex direction="column" height="100%">
                    <Flex asChild justify="between">
                      <header>
                        <Flex gap="4">
                          <Button asChild variant="soft">
                            <Link to="/">Home</Link>
                          </Button>

                          <Button asChild variant="soft">
                            <Link to="/account">Account</Link>
                          </Button>

                          <Button asChild variant="soft">
                            <Link to="/client">Client Demo</Link>
                          </Button>
                        </Flex>

                        <Suspense fallback={<div>Loading...</div>}>
                          <SignInButton user={auth.user} url={url} />
                        </Suspense>
                      </header>
                    </Flex>

                    <Flex flexGrow="1" align="center" justify="center">
                      <main>
                        <Outlet />
                      </main>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
              <Footer />
            </Flex>
          </Container>
        </Theme>
        <TanStackRouterDevtools position="bottom-right" />
      </AuthKitProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }> ) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

```

--------------------------------

### Define Root Document Component in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query

Defines the main `RootDocument` component for a React application, responsible for rendering the HTML structure, including head content, body, navigation links, and routing outlets. It accepts children and integrates TanStack Router Devtools and React Query Devtools.

```javascript
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Users
          </Link>{' '}
          <Link
            to="/route-a"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Pathless Layout
          </Link>{' '}
          <Link
            to="/deferred"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Deferred
          </Link>{' '}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: 'font-bold',
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Default Server Entry Point Interface

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

Defines the expected interface for the default server entry point export, which must conform to the `ServerEntry` type and include a `fetch` handler compatible with WinterCG runtimes.

```typescript
export default {
  fetch(req: Request, opts?: RequestOptions): Response | Promise<Response> {
    // ...
  },
}
```

--------------------------------

### Conditional Rendering with Loader in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

This React component demonstrates conditional rendering. It displays a 'Loader' component with specific CSS classes based on the 'isLoading' prop. The opacity and delay of the transition are controlled by the 'isLoading' state.

```jsx
isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
      }
    >
      <Loader />
    </div>
  )
}
```

--------------------------------

### Loading Environment Variables (.env)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This snippet shows the basic structure of an .env file, including both server-only variables (like DATABASE_URL) and client-safe variables prefixed with VITE_ (like VITE_APP_NAME). These variables are automatically loaded by TanStack Start.

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

--------------------------------

### Run Server with New Relic Agent (Bash)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Command to run the server application with the New Relic agent enabled. The `-r newrelic` flag ensures the agent is loaded and configured before the application starts.

```bash
node -r newrelic .output/server/index.mjs

```

--------------------------------

### Calling Server Functions from Route Loaders and Components (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Shows examples of invoking server functions within a route loader for data fetching and within a React component using the `useServerFn` hook for dynamic data retrieval.

```tsx
// In a route loader
export const Route = createFileRoute('/posts')({
  loader: () => getPosts(),
})

// In a component
function PostList() {
  const getPosts = useServerFn(getServerPosts)

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })
}
```

--------------------------------

### Configure Static Prerendering in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering

This snippet shows how to enable and configure static prerendering within the `vite.config.ts` file using the TanStack Start plugin. It includes options for enabling prerendering, controlling output paths, concurrency, link crawling, and error handling.

```typescript
import {
  tanstackStart
} from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concurrency: 14,

        // Whether to extract links from the HTML and prerender them also
        crawlLinks: true,

        // Filter function takes the page object and returns whether it should prerender
        filter: ({ path }) => !path.startsWith('/do-not-render-me'),

        // Number of times to retry a failed prerender job
        retryCount: 2,

        // Delay between retries in milliseconds
        retryDelay: 1000,

        // Maximum number of redirects to follow during prerendering
        maxRedirects: 5,

        // Fail if an error occurs during prerendering
        failOnError: true,

        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
      // Optional configuration for specific pages
      // Note: When autoStaticPathsDiscovery is enabled (default), discovered static
      // routes will be merged with the pages specified below
      pages: [
        {
          path: '/my-page',
          prerender: { enabled: true, outputPath: '/my-page/index.html' },
        },
      ],
    }),
    viteReact(),
  ],
})
```

--------------------------------

### TanStack Start Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

Illustrates TanStack Start's Server Functions, which provide type-safe server-side logic with built-in input validation and middleware support. They can be called from anywhere with full type safety.

```tsx
export const getTodos = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(z.object({ userId: z.string() })))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    // Fully typed data and context
    return db.todos.findMany({ where: { userId: data.userId } })
  })

// Call from anywhere with full type safety
const todos = await getTodos({ data: { userId: '123' } })
```

--------------------------------

### Send Server Context to Client with Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates sending server-side data like the current time to the client using TanStack Start's `createMiddleware`. The client-side middleware can then access this data from the `result.context` object.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const serverTimer = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    return next({
      sendContext: {
        // Send the current time to the client
        timeFromServer: new Date(),
      },
    })
  },
)

const requestLogger = createMiddleware({ type: 'function' })
  .middleware([serverTimer])
  .client(async ({ next }) => {
    const result = await next()
    // Woah! We have the time from the server!
    console.log('Time from the server:', result.context.timeFromServer)

    return result
  })
```

--------------------------------

### Configure Vite for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Sets up the `vite.config.ts` file to use TanStack Start's Vite plugin, Tailwind CSS, Vite's React plugin, and `vite-tsconfig-paths` for module resolution. It configures the server port and specifies the source and routes directories.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src', // This is the default
      router: {
        // Specifies the directory TanStack Router uses for your routes.
        routesDirectory: 'app', // Defaults to "routes", relative to srcDirectory
      },
    }),
    viteReact(),
  ],
})
```

--------------------------------

### Override Error Boundary Per Route (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries

This example illustrates how to override the default error boundary for a specific route in a React application using TanStack Start. The code, located in `src/routes/posts.$postId.tsx`, defines a custom `PostError` component and assigns it to the `errorComponent` property of the route definition. This allows for route-specific error handling. The `reset()` function can be called to retry rendering after an error is fixed.

```tsx
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

function PostError({ error, reset }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  errorComponent: PostError,
})
```

--------------------------------

### Root Route Configuration with TanStack Router and React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

Configures the root route for a TanStack Router application in React. It sets up global metadata, error handling, not found components, and integrates with React Query Devtools and TanStack Router Devtools. Dependencies include '@tanstack/react-router', '@tanstack/react-query', and 'react-hot-toast'.

```tsx
/// <reference types="vite/client" />
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { IconLink } from '~/components/IconLink'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { Loader } from '~/components/Loader'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="h-screen flex flex-col min-h-0">
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <div className="flex items-center gap-4">
              <div>
                <Link to="/" className="block leading-tight">
                  <div className="font-black text-2xl text-white">Trellaux</div>
                  <div className="text-slate-500">a TanStack Demo</div>
                </Link>
              </div>
              <LoadingIndicator />
            </div>
            <div className="flex items-center gap-6">
              {/* <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              > */}
              {/*   Delay
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  // setExtraDelay(Number(event.currentTarget.value))
                }}
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2000">2000</option>
              </select> */}
              <IconLink
                href="https://github.com/TanStack/router/tree/main/examples/react/start-trellaux"
                label="Source"
                icon="/github-mark-white.png"
              />
              <IconLink
                href="https://tanstack.com"
                icon="/tanstack.png"
                label="TanStack"
              />
            </div>
          </div>

          <div className="grow min-h-0 h-full flex flex-col">
            {children}
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

```

--------------------------------

### Manual vs API-Driven Environment Detection in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Compares manual environment detection using `typeof window` with the API-driven approach using `createIsomorphicFn` for logging messages in React. The API-driven method simplifies environment-specific logic.

```tsx
// Manual: You handle the logic
function logMessage(msg: string) {
  if (typeof window === 'undefined') {
    console.log(`[SERVER]: ${msg}`)
  } else {
    console.log(`[CLIENT]: ${msg}`)
  }
}

// API: Framework handles it
const logMessage = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

--------------------------------

### Optimize Memory Usage (Bun)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Configures the server to optimize for minimal memory usage by setting a specific maximum size for preloaded assets. This command uses Bun to run the server with the specified environment variable.

```shell
# Optimize for minimal memory usage
ASSET_PRELOAD_MAX_SIZE=1048576 bun run server.ts
```

--------------------------------

### Open Graph and Twitter Card Tags in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Illustrates how to configure Open Graph and Twitter Card meta tags using route loaders in TanStack Start. These tags enhance how content appears when shared on social media platforms.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'description', content: loaderData.post.excerpt },
      // Open Graph
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:description', content: loaderData.post.excerpt },
      { property: 'og:image', content: loaderData.post.coverImage },
      { property: 'og:type', content: 'article' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: loaderData.post.title },
      { name: 'twitter:description', content: loaderData.post.excerpt },
      { name: 'twitter:image', content: loaderData.post.coverImage },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Wrap Server Function with Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to apply middleware to a specific server function by passing an array of middleware to the `middleware` property of `createServerFn`. This allows for pre-processing or post-processing of server function requests.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { loggingMiddleware } from './middleware'

const fn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    //...
  })
```

--------------------------------

### TypeScript Declarations for Environment Variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Defines TypeScript interfaces for both client-side (`ImportMetaEnv`) and server-side (`ProcessEnv`) environment variables to provide type safety. This setup leverages Vite's client environment variable handling and Node.js's process environment.

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_ENABLE_NEW_DASHBOARD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string
      readonly REDIS_URL: string
      readonly JWT_SECRET: string
      readonly AUTH0_CLIENT_SECRET: string
      readonly STRIPE_SECRET_KEY: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
```

--------------------------------

### Configure New Relic Agent for SSR (Node.js)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Configuration file for the New Relic Node.js agent. This file sets up application name, license key, and enables essential features like distributed tracing and span events for SSR monitoring.

```javascript
// newrelic.js - New Relic agent configuration
exports.config = {
  app_name: ['YourTanStackApp'], // Your application name in New Relic
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY', // Your New Relic license key
  agent_enabled: true,
  distributed_tracing: { enabled: true },
  span_events: { enabled: true },
  transaction_events: { enabled: true },
  // Additional default settings
}
```

--------------------------------

### Implement Redirects in React Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Shows how to use server functions to perform redirects, commonly used for authentication or navigation. The `redirect` function from `@tanstack/react-router` is thrown to trigger a client-side navigation to a specified route. This example redirects unauthenticated users to a login page.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const requireAuth = createServerFn().handler(async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return user
})
```

--------------------------------

### Enable Server-Side Rendering (SSR) in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Demonstrates how to enable Server-Side Rendering (SSR) by default for React routes using TanStack Start. SSR ensures search engine crawlers receive fully rendered HTML, which is crucial for SEO. This is the default behavior.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
```

--------------------------------

### Integrate New Relic Middleware into Start Instance (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Configures the TanStack Start instance to use the New Relic transaction middleware. By adding `nrTransactionMiddleware` to the `requestMiddleware` array, all server requests will be monitored by New Relic.

```typescript
// start.ts
import { createStart } from '@tanstack/react-start'
import { nrTransactionMiddleware } from './newrelic-middleware'

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [nrTransactionMiddleware],
  }
})

```

--------------------------------

### Database Configuration Pattern (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

This common pattern shows how to configure database connections using environment variables. It demonstrates accessing `DATABASE_URL` for the connection string and `DB_MAX_CONNECTIONS` for pool size, with a fallback to a default value. It also shows how to conditionally set SSL based on `NODE_ENV`.

```typescript
// src/lib/database.ts
import { createServerFn } from '@tanstack/react-start'

const getDatabaseConnection = createServerFn().handler(async () => {
  const config = {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
    ssl: process.env.NODE_ENV === 'production',
  }

  return createConnection(config)
})
```

--------------------------------

### Loading Indicator Component with TanStack Router State

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-trellaux

A React component that displays a loading indicator based on the application's loading state. It uses the `useRouterState` hook from TanStack Router to access the `isLoading` state and conditionally applies CSS classes for visibility and transitions.

```javascript
function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  return (
    <div
      className={`h-12 transition-all duration-300 ${ isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`}`}
    >
      <Loader />
    </div>
  )
}
```

--------------------------------

### Built-in Client-Side Caching with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

Demonstrates how TanStack Start's built-in SWR caching automatically caches and revalidates loader data per route. It allows configuration of staleTime and gcTime for fine-grained control over caching behavior.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  staleTime: 10_000, // Consider fresh for 10 seconds
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

--------------------------------

### Basic Error Handling in React Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates how server functions can throw errors that are automatically serialized and caught on the client. This allows for robust error management in your React application. The example shows a function that might throw an error based on a random condition.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const riskyFunction = createServerFn().handler(async () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong!')
  }
  return { success: true }
})

// Errors are serialized to the client
try {
  await riskyFunction()
} catch (error) {
  console.log(error.message) // "Something went wrong!"
}
```

--------------------------------

### Handle Not Found Responses in React Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates how to throw a 'not found' response when a requested resource is missing. This is achieved by throwing the `notFound` function from `@tanstack/react-router`. The example shows fetching a post by ID and throwing `notFound` if the post does not exist in the database.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'

export const getPost = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const post = await db.findPost(data.id)

    if (!post) {
      throw notFound()
    }

    return post
  })
```

--------------------------------

### Define Root Route Component and Layout

Source: https://tanstack.com/start/latest/docs/framework/react/guide/routing

This code defines the root route (`__root.tsx`) for a TanStack Start application. It sets up the document head with meta tags and title, and defines a `RootComponent` that renders a `RootDocument` wrapper. The `RootDocument` includes the `HeadContent` in the `<head>` and `Scripts` in the `<body>`, encapsulating the main application content rendered by `<Outlet />`.

```tsx
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }> ) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Server Functions with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Migrates server-side logic from Next.js's server functions to TanStack Start's `createServerFn`. This utility simplifies the creation and handling of server functions. The `handler` method is used to wrap the asynchronous function that performs the server-side logic.

```tsx
import { createServerFn } from "@tanstack/react-start"

export const create = createServerFn().handler(async () => {
  return true
})
```

--------------------------------

### Progress Middleware Chain with 'next' (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates how to advance the middleware execution chain by calling the `next` function within the `.server` method. This allows for short-circuiting, data passing, and accessing results from subsequent middleware.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next() // <-- This will execute the next middleware in the chain
  return result
})
```

--------------------------------

### Update package.json Scripts for Vite

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Modifies the scripts in `package.json` to use Vite for development and building, and Node.js for starting the application. This replaces Next.js specific scripts.

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs"
  }
}
```

--------------------------------

### Font Handling with Tailwind CSS and Fontsource

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Replaces Next.js's font optimization with Tailwind CSS's CSS-first approach. This involves installing font packages from Fontsource and importing them into the global CSS file, then configuring CSS variables for font families within Tailwind's theme.

```sh
npm i -D @fontsource-variable/dm-sans @fontsource-variable/jetbrains-mono
```

```css
@import 'tailwindcss' source('../');

@import '@fontsource-variable/dm-sans';
@import '@fontsource-variable/jetbrains-mono';

@theme inline {
  --font-sans: 'DM Sans Variable', sans-serif;
  --font-mono: 'JetBrains Mono Variable', monospace;
  /* ... */
}

/* ... */
```

--------------------------------

### Prevent Hydration Mismatches with State Management

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Explains and solves hydration mismatches caused by different content rendering on the server versus the client. The example shows how to use React's useState and useEffect to ensure consistent rendering of dynamic content like the current time.

```tsx
// ❌ Different content server vs client
function CurrentTime() {
  return <div>{new Date().toLocaleString()}</div>
}

// ✅ Consistent rendering
function CurrentTime() {
  const [time, setTime] = useState<string>()

  useEffect(() => {
    setTime(new Date().toLocaleString())
  }, [])

  return <div>{time || 'Loading...'}</div>
}
```

--------------------------------

### Configure Nitro Preset for Bun Deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Configures the Vite build process to use the 'bun' preset for Nitro, which is necessary for Bun deployments. This ensures that the build output is optimized for the Bun runtime environment.

```typescript
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro({ preset: 'bun' }), viteReact()],
})
```

--------------------------------

### RPC vs Direct Function Calls in React with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Illustrates the difference between RPC (Remote Procedure Call) pattern using `createServerFn` and server-only functions using `createServerOnlyFn` in React. `createServerFn` allows client-callable server functions, while `createServerOnlyFn` prevents client execution.

```tsx
// createServerFn: RPC pattern - server execution, client callable
const fetchUser = createServerFn().handler(async () => await db.users.find())

// Usage from client component:
const user = await fetchUser() // ✅ Network request

// createServerOnlyFn: Crashes if called from client
const getSecret = createServerOnlyFn(() => process.env.SECRET)

// Usage from client:
const secret = getSecret() // ❌ Throws error
```

--------------------------------

### Basic Netlify Redirect for SPA Shell

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This is a minimal Netlify `_redirects` file configuration for SPA mode. It sets up a catch-all rule to rewrite any non-matching requests to the SPA shell (`/_shell.html`), ensuring that client-side routing can take over.

```netlify
# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Create Server Function to Read Jokes (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This snippet shows how to create a server function using `createServerFn` from `@tanstack/react-start`. It defines a GET request handler that reads data from a JSON file (`jokes.json`) using Node.js's `fs` module and parses it into a `JokesData` type. This function is intended for server-side execution.

```typescript
// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import type { JokesData } from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({
  method: 'GET'
}).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})
```

--------------------------------

### Client-Only Execution APIs in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates client-only execution using `createClientOnlyFn` for browser utilities and the `<ClientOnly>` component for components requiring browser APIs. `createClientOnlyFn` ensures code runs only on the client, crashing if called from the server. The `<ClientOnly>` component renders a fallback during server rendering.

```tsx
import { createClientOnlyFn } from '@tanstack/react-start';
import { ClientOnly } from '@tanstack/react-router';

// Utility: Client-only, server crashes if called
const saveToStorage = createClientOnlyFn((key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
});

// Component: Only renders children after hydration
function Analytics() {
  return (
    <ClientOnly fallback={null}>
      <GoogleAnalyticsScript />
    </ClientOnly>
  );
}
```

--------------------------------

### Provide Custom Fetch Implementation at Call Site

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to supply a custom fetch function directly when invoking a server function. This method offers granular control over request execution for specific calls.

```tsx
import type { CustomFetch } from '@tanstack/react-start'

const myFetch: CustomFetch = async (url, init) => {
  // Add custom logic here
  return fetch(url, init)
}

await myServerFn({
  data: { name: 'John' },
  fetch: myFetch,
})
```

--------------------------------

### Request/Response Logging Middleware in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Utilize TanStack Start's middleware capabilities to log all incoming requests and outgoing responses. This pattern helps in monitoring API traffic, debugging issues, and understanding request lifecycles.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const requestLogger = createMiddleware().server(async ({ request, next }) => {
  const startTime = Date.now()
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] ${request.method} ${request.url} - Starting`)

  try {
    const result = await next()
    const duration = Date.now() - startTime

    console.log(
      `[${timestamp}] ${request.method} ${request.url} - ${result.response.status} (${duration}ms)`,
    )

    return result
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(
      `[${timestamp}] ${request.method} ${request.url} - Error (${duration}ms)`,
      error,
    )
    throw error
  }
})

// Apply to all server routes
export const Route = createFileRoute('/api/users')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async () => {
        return Response.json({ users: await getUsers() })
      },
    },
  },
})
```

--------------------------------

### Override Fetch in TanStack Start Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to provide a custom fetch implementation at the middleware level and how to override it at the call site. The call site fetch takes precedence over the middleware fetch.

```tsx
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { CustomFetch } from '@tanstack/react-start'

// Middleware sets a fetch that adds logging
const loggingMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const loggingFetch: CustomFetch = async (url, init) => {
      console.log('Middleware fetch:', url)
      return fetch(url, init)
    }
    return next({ fetch: loggingFetch })
  },
)

const myServerFn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    return { message: 'Hello' }
  })

// Uses middleware's loggingFetch
await myServerFn()

// Override with custom fetch for this specific call
const testFetch: CustomFetch = async (url, init) => {
  console.log('Test fetch:', url)
  return fetch(url, init)
}
await myServerFn({ fetch: testFetch }) // Uses testFetch, NOT loggingFetch
```

--------------------------------

### Chained Middleware Fetch Precedence in TanStack Start (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates how fetch implementations from multiple middlewares are handled. The last middleware in the chain that provides a fetch implementation takes precedence.

```tsx
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import type { CustomFetch } from '@tanstack/react-start'

const firstMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const firstFetch: CustomFetch = (url, init) => {
      const headers = new Headers(init?.headers)
      headers.set('X-From', 'first-middleware')
      return fetch(url, { ...init, headers })
    }
    return next({ fetch: firstFetch })
  },
)

const secondMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const secondFetch: CustomFetch = (url, init) => {
      const headers = new Headers(init?.headers)
      headers.set('X-From', 'second-middleware')
      return fetch(url, { ...init, headers })
    }
    return next({ fetch: secondFetch })
  },
)

const myServerFn = createServerFn()
  .middleware([firstMiddleware, secondMiddleware])
  .handler(async () => {
    // Request will have X-From: 'second-middleware'
    // because secondMiddleware's fetch overrides firstMiddleware's fetch
    return { message: 'Hello' }
  })
```

--------------------------------

### Role-Based Access Control (RBAC) Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Provides a utility for Role-Based Access Control (RBAC) in a React application. It defines user roles and a `hasPermission` function to check if a user's role meets the required hierarchy. An example demonstrates protecting a route (`/_authed/admin/`) by ensuring the logged-in user has the 'admin' role before allowing access, redirecting to an 'unauthorized' page if permissions are insufficient.

```tsx
// utils/auth.ts
export const roles = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const

type Role = (typeof roles)[keyof typeof roles]

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy = {
    [roles.USER]: 0,
    [roles.MODERATOR]: 1,
    [roles.ADMIN]: 2,
  }

  return hierarchy[userRole] >= hierarchy[requiredRole]
}

// Protected route with role check
export const Route = createFileRoute('/_authed/admin/')({
  beforeLoad: async ({ context }) => {
    if (!hasPermission(context.user.role, roles.ADMIN)) {
      throw redirect({ to: '/unauthorized' })
    }
  },
})

```

--------------------------------

### Netlify Redirects for SPA Mode

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This configuration uses Netlify's `_redirects` file to manage routing for a Single Page Application (SPA) built with TanStack Start. It prioritizes serving static assets, allows specific paths for server functions/routes, and rewrites all other 404 requests to the SPA shell (`/_shell.html`).

```netlify
# Allow requests to /_serverFn/* to be routed through to the server
/_serverFn/* /_serverFn/:splat 200

# Allow any requests to /api/* to be routed through to the server
/api/* /api/:splat 200

# Catch all other 404 requests and rewrite them to the SPA shell
/* /_shell.html 200
```

--------------------------------

### Uninstall Next.js and Remove Config Files

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Removes Next.js and related configuration files from the project. This is the first step in migrating to TanStack Start.

```bash
npm uninstall @tailwindcss/postcss next
rm postcss.config.*
rm next.config.*
```

--------------------------------

### Adapt Home Page to TanStack Start (React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

This snippet shows how to refactor the main home page component from Next.js's `page.tsx` to TanStack Start's `index.tsx` structure, including importing `createFileRoute` for route definition.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4">
      <img
        className="max-w-sm w-full"
        src="https://raw.githubusercontent.com/TanStack/tanstack.com/main/public/images/logos/splash-dark.png"
        alt="TanStack Logo"
      />
      <h1>
        <span className="line-through">Next.js</span> TanStack Start
      </h1>
      <a
        className="bg-foreground text-background rounded-full px-4 py-1 hover:opacity-90"
        href="https://tanstack.com/start/latest"
        target="_blank"
      >
        Docs
      </a>
    </main>
  )
}
```

--------------------------------

### Manage User Sessions with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Provides a utility function `useAppSession` for managing user sessions using secure HTTP-only cookies. It configures session name, password (from environment variables), and cookie settings like `secure`, `sameSite`, and `httpOnly`. This is crucial for maintaining user state across requests.

```ts
// utils/session.ts
import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  userId?: string
  email?: string
  role?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    // Session configuration
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // At least 32 characters
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  })
}

```

--------------------------------

### Set Up Environment Variable for TMDB API Token

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This section details how to create a `.env` file in the project root and add the TMDB API authentication token. It emphasizes the importance of adding `.env` to `.gitignore` for security.

```dotenv
TMDB_AUTH_TOKEN=your_bearer_token_here
```

--------------------------------

### Adapt Root Layout for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Transforms the Next.js `layout.tsx` file into `__root.tsx` for TanStack Start. It replaces Next.js specific metadata and layout structure with TanStack Router's `createRootRoute`, `HeadContent`, `Scripts`, and `Outlet` components.

```tsx
- import type { Metadata } from "next" // [!code --]
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"
import appCss from "./globals.css?url"

- export const metadata: Metadata = { // [!code --]
-   title: "Create Next App", // [!code --]
-   description: "Generated by create next app", // [!code --]
- } // [!code --]
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
})

- export default function RootLayout({
-   children,
- }: Readonly<{
-   children: React.ReactNode
- }>) {
-   return (
-     <html lang="en">
-       <body>{children}</body>
-     </html>
-   )
- }
function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Server-Only Execution APIs in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Illustrates server-only execution using `createServerFn` for RPC calls and `createServerOnlyFn` for utility functions. `createServerFn` allows client-initiated server execution, while `createServerOnlyFn` ensures code only runs on the server, crashing if called from the client.

```tsx
import { createServerFn, createServerOnlyFn } from '@tanstack/react-start';

// RPC: Server execution, callable from client
const updateUser = createServerFn({
  method: 'POST',
})
  .inputValidator((data: UserData) => data)
  .handler(async ({ data }) => {
    // Only runs on server, but client can call it
    return await db.users.update(data);
  });

// Utility: Server-only, client crashes if called
const getEnvVar = createServerOnlyFn(() => process.env.DATABASE_URL);
```

--------------------------------

### Define Static Server Function with Middleware - React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions

Demonstrates how to define a static server function using `createServerFn` and applying the `staticFunctionMiddleware`. This function will be executed at build time and its result cached.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

--------------------------------

### Implement Loading Indicator Component in React

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-convex-trellaux

A React component that displays a loading indicator. It uses the `useRouterState` hook to determine the loading state and conditionally renders a `Loader` component with opacity transitions based on the `isLoading` status. This component is intended for use within a React application, likely integrated with a routing library.

```typescript
function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  return (
    <div
      className={`h-12 transition-all duration-300 ${isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`}`}
    >
      <Loader />
    </div>
  )
}

```

--------------------------------

### Integration Testing Authentication Flow with React Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates integration testing for an authentication flow using React Router and `@testing-library/react`. It simulates navigating to a protected route (`/dashboard`) and verifies that the user is redirected to the login page, ensuring protected routes are enforced.

```tsx
// __tests__/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { router } from '../router'

describe('Authentication Flow', () => {
  it('should redirect to login when accessing protected route', async () => {
    const history = createMemoryHistory()
    history.push('/dashboard') // Protected route

    render(<RouterProvider router={router} history={history} />)

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
})
```

--------------------------------

### Environment-Specific Logging with TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Configures isomorphic logging for TanStack Start applications, differentiating between development (detailed console logs) and production (structured JSON logs) environments. It utilizes `createIsomorphicFn` to define server and client-side logging behaviors. Dependencies include `@tanstack/react-start`.

```tsx
// utils/logger.ts
import { createIsomorphicFn } from '@tanstack/react-start'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString()

    if (process.env.NODE_ENV === 'development') {
      // Development: Detailed console logging
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Structured JSON logging
      console.log(
        JSON.stringify({
          timestamp,
          level,
          message,
          data,
          service: 'tanstack-start',
          environment: process.env.NODE_ENV,
        }),
      )
    }
  })
  .client((level: LogLevel, message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data)
    } else {
      // Production: Send to analytics service
      // analytics.track('client_log', { level, message, data })
    }
  })

// Usage anywhere in your app
export { logger }

// Example usage
const fetchUserData = createServerFn().handler(async ({ data: userId }) => {
  logger('info', 'Fetching user data', { userId })

  try {
    const user = await db.users.findUnique({ where: { id: userId } })
    logger('info', 'User data fetched successfully', { userId })
    return user
  } catch (error) {
    logger('error', 'Failed to fetch user data',
      {
        userId,
        error: error.message,
      },
    )
    throw error
  }
})
```

--------------------------------

### Automatic Tracing Middleware with OpenTelemetry (Experimental)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements a middleware for TanStack Start that automatically traces incoming requests using OpenTelemetry. It captures HTTP method, URL, route, and status code, and records exceptions.

```tsx
// Middleware for automatic tracing
import { createMiddleware } from '@tanstack/react-start'
import { trace, SpanStatusCode } from '@opentelemetry/api'

const tracer = trace.getTracer('tanstack-start')

const tracingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const url = new URL(request.url)

    return tracer.startActiveSpan(
      `${request.method} ${url.pathname}`,
      async (span) => {
        span.setAttributes({
          'http.method': request.method,
          'http.url': request.url,
          'http.route': url.pathname,
        })

        try {
          const result = await next()
          span.setAttribute('http.status_code', result.response.status)
          span.setStatus({ code: SpanStatusCode.OK })
          return result
        } catch (error) {
          span.recordException(error)
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          })
          throw error
        } finally {
          span.end()
        }
      },
    )
  },
)
```

--------------------------------

### Analyzing Client Bundle for Server-Only Code (Bash)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Provides a bash command to analyze the client bundle after building the application. This helps verify that no server-only code has been inadvertently included in the client-side JavaScript, ensuring security.

```bash
# Analyze client bundle
npm run build
# Check dist/client for any server-only imports
```

--------------------------------

### Disabling Root Route SSR with `shellComponent` in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Illustrates how to disable server-side rendering for the root route component in TanStack Router while still rendering the `<html>` shell. This setup uses the `shellComponent` property to define a custom root shell that wraps the main content, ensuring the basic HTML structure is always SSRed.

```tsx
import * as React from 'react';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';

export const Route = createRootRoute({
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not found</div>,
  ssr: false, // or `defaultSsr: false` on the router
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div>
      <h1>This component will be rendered on the client</h1>
      <Outlet />
    </div>
  );
}
```

--------------------------------

### Create Machine-Readable Product API Endpoint (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This TypeScript snippet defines an API endpoint at '/api/products' using TanStack Router. It fetches products, optionally by category, and returns them as a JSON-LD 'ItemList' schema, suitable for machine consumption.

```ts
// src/routes/api/products.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const category = url.searchParams.get('category')

        const products = await fetchProducts({ category })

        return Response.json({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: product.name,
              description: product.description,
              url: `https://myapp.com/products/${product.id}`,
            },
          })),
        })
      },
    },
  },
})
```

--------------------------------

### Update Package Scripts for Cloudflare Deployment

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Modifies the `scripts` section in your `package.json` to include commands for building, previewing, and deploying your application to Cloudflare Workers. It also adds a script for generating Cloudflare types.

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build && tsc --noEmit",
    // ============ 👇 remove this line ============ 
    "start": "node .output/server/index.mjs",
    // ============ 👇 add these lines ============ 
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

--------------------------------

### TanStack Router Configuration (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Defines the router configuration for TanStack Router within a TanStack Start application, using a generated route tree and enabling scroll restoration.

```typescript
// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

--------------------------------

### Trace Server Function with OpenTelemetry (Experimental)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Adds tracing to a TanStack Start server function to monitor its execution and record any errors. It uses OpenTelemetry's tracer to create spans for the operation.

```tsx
// Server function tracing
import { trace, SpanStatusCode } from '@opentelemetry/api'

const tracer = trace.getTracer('tanstack-start')

const getUserWithTracing = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    return tracer.startActiveSpan('get-user', async (span) => {
      span.setAttributes({
        'user.id': id,
        operation: 'database.query',
      })

      try {
        const user = await db.users.findUnique({ where: { id } })
        span.setStatus({ code: SpanStatusCode.OK })
        return user
      } catch (error) {
        span.recordException(error)
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        })
        throw error
      } finally {
        span.end()
      }
    })
  })
```

--------------------------------

### Product Schema for LLMO using React and TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This code implements the Product schema using JSON-LD for e-commerce content within a TanStack Router route's head configuration. It helps AI assistants provide accurate product details such as name, price, availability, and ratings.

```tsx
export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params }) => {
    const product = await fetchProduct(params.productId)
    return { product }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.product.name }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: loaderData.product.name,
          description: loaderData.product.description,
          image: loaderData.product.images,
          brand: {
            '@type': 'Brand',
            name: loaderData.product.brand,
          },
          offers: {
            '@type': 'Offer',
            price: loaderData.product.price,
            priceCurrency: 'USD',
            availability: loaderData.product.inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
          aggregateRating: loaderData.product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: loaderData.product.rating,
                reviewCount: loaderData.product.reviewCount,
              }
            : undefined,
        }),
      },
    ],
  }),
  component: ProductPage,
})
```

--------------------------------

### Enable SPA Mode in TanStack Start (Vite)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This code snippet demonstrates how to enable Single Page Application (SPA) mode within the TanStack Start plugin for Vite projects. It involves adding a configuration option to the `tanstackStart` plugin in `vite.config.ts`.

```tsx
import { defineConfig } from 'vite';
import tanstackStart from '@tanstack/start-vite';

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
});
```

--------------------------------

### Integrate Content Collections Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This code snippet shows how to add the '@content-collections/vite' plugin to your Vite configuration file ('app.config.ts'). This integration allows Vite to process and bundle your content collections during the build process.

```typescript
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  vite: {
    plugins: [contentCollections()],
  },
})
```

--------------------------------

### Handle Dynamic Routes in TanStack Start (React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

This snippet demonstrates how to adapt dynamic route handling for a '/app/posts/$slug' route in TanStack Start. It replaces Next.js's `params` prop with TanStack Router's `useParams` hook for accessing route parameters.

```tsx
export const Route = createFileRoute('/app/posts/$slug')({
  component: Page,
})

function Page() {
  const { slug } = Route.useParams()
  return <div>My Post: {slug}</div>
}
```

--------------------------------

### Define Server Route Handler with Middleware (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Demonstrates defining a server route handler with specific middleware using `createHandlers`. This allows for more advanced control flow and pre-processing of requests for individual handlers.

```typescript
import { createFileRoute } from '@tanstack/react-router'

// Assuming loggerMiddleware is defined elsewhere
const loggerMiddleware = (handler) => async (opts) => {
  console.log('Logging request...');
  return handler(opts);
};

export const Route = createFileRoute('/hello')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: {
          middleware: [loggerMiddleware],
          handler: async ({ request }) => {
            return new Response('Hello, World! from ' + request.url)
          },
        },
      }),
  },
})
```

--------------------------------

### Implement Authentication Server Functions in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Defines server functions for handling login, logout, and fetching the current user. It uses `createServerFn` from `@tanstack/react-start` for secure server-side operations, including input validation, session management, and redirects. Assumes the existence of `authenticateUser`, `useAppSession`, and `getUserById` helper functions.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id,
      email: user.email,
    })

    // Redirect to protected area
    throw redirect({ to: '/dashboard' })
  })

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

// Get current user
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.userId

    if (!userId) {
      return null
    }

    return await getUserById(userId)
  },
)
```

--------------------------------

### Apply Cache Headers via Middleware in API Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Demonstrates using middleware in TanStack Start to dynamically set cache headers for API routes. This approach centralizes cache control logic, making it reusable across multiple API endpoints.

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

const cacheMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  // Add cache headers to the response
  result.response.headers.set(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=86400',
  )

  return result
})

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    middleware: [cacheMiddleware],
    handlers: {
      GET: async ({ params }) => {
        const product = await db.products.findById(params.productId)
        return Response.json({ product })
      },
    },
  },
})
```

--------------------------------

### Enable SSR for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Enables full Server-Side Rendering (SSR) for a specific route. This means `beforeLoad`, `loader`, and the route component will execute on the server during the initial request. Subsequent navigations will execute these on the client.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  ssr: true,
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  component: () => <div>This component is rendered on the server</div>,
})
```

--------------------------------

### Next.js Server Actions

Source: https://tanstack.com/start/latest/docs/framework/react/comparison

Demonstrates Next.js Server Actions, which allow server-side code to be executed directly from client components. This example shows a basic function to fetch todos based on a userId.

```tsx
'use server'
export async function getTodos(userId: string) {
  // Runs on server, called from client
  return db.todos.findMany({ where: { userId } })
}

// Call from client component
const todos = await getTodos('123')
```

--------------------------------

### Data Fetching with TanStack Start Route Loaders

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

Migrates data fetching from Next.js's server-side rendering to TanStack Start's `loader` function within `createFileRoute`. This loader function runs on the server before the component renders, fetching data and making it available to the component via `useLoaderData`.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Page,
  loader: async () => {
    const res = await fetch('https://api.vercel.app/blog')
    return res.json()
  },
})

function Page() {
  const posts = Route.useLoaderData()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

--------------------------------

### Create llms.txt for AI Guidance (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This TypeScript code defines a '/llms.txt' route using TanStack Router, analogous to robots.txt. It serves a plain text file providing guidance and information to AI systems, including documentation links.

```ts
// src/routes/llms[.]txt.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const content = `# My App

> My App is a platform for building modern web applications.

## Documentation
- Getting Started: https://myapp.com/docs/getting-started
- API Reference: https://myapp.com/docs/api

`
        return new Response(content, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
```

--------------------------------

### Create Request Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Shows the basic structure for creating a request middleware using `createMiddleware().server()`. Request middleware is used to customize behavior for all server requests, including server routes, SSR, and server functions.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})
```

--------------------------------

### Create Jokes JSON Data File

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Creates a 'jokes.json' file within the 'src/data' directory and populates it with sample developer-themed jokes, each having an ID, question, and answer.

```json
[
  {
    "id": "1",
    "question": "Why don't keyboards sleep?",
    "answer": "Because they have two shifts"
  },
  {
    "id": "2",
    "question": "Are you a RESTful API?",
    "answer": "Because you GET my attention, PUT some love, POST the cutest smile, and DELETE my bad day"
  },
  {
    "id": "3",
    "question": "I used to know a joke about Java",
    "answer": "But I ran out of memory."
  },
  {
    "id": "4",
    "question": "Why do Front-End Developers eat lunch alone?",
    "answer": "Because, they don't know how to join tables."
  },
  {
    "id": "5",
    "question": "I am declaring a war.",
    "answer": "var war;"
  }
]
```

--------------------------------

### Set Custom Request Headers with Middleware

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates how to add custom headers, such as Authorization, to outgoing requests using client-side middleware in TanStack Start React. This allows for dynamic header injection based on application logic.

```tsx
import { createMiddleware } from '@tanstack/react-start'
import { getToken } from 'my-auth-library'

const authMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    return next({
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  },
)
```

--------------------------------

### Environment File Hierarchy and Loading Order

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

TanStack Start loads environment variables from multiple files in a specific order to allow for local overrides and environment-specific configurations. The hierarchy ensures that `.env.local` overrides other files, followed by production/development specific files, and finally the default `.env` file.

```bash
# .env.local          # Local overrides (add to .gitignore)
# .env.production     # Production-specific variables
# .env.development    # Development-specific variables
# .env                # Default variables (commit to git)
```

--------------------------------

### Configure TanStack Router (React)

Source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

This code defines the core router configuration for TanStack Start, importing `createRouter` and `routeTree`. It enables scroll restoration and serves as a central point for router-related settings.

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

--------------------------------

### Disable SSR by Default in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Configures the TanStack Start instance to disable Server-Side Rendering (SSR) by default for all routes. This is useful when most routes do not require SSR or when you want to explicitly opt-in SSR for specific routes.

```tsx
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

--------------------------------

### Create Plain Text Response (JavaScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This snippet demonstrates how to create a plain text HTTP response using the Response object. It sets the 'Content-Type' header to 'text/plain' and returns the provided content. This is commonly used in web frameworks for serving simple text data.

```javascript
return new Response(content, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
```

--------------------------------

### Progressive Enhancement with React Search Form

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates building a search form that functions without JavaScript and enhances with client-side interactivity using React. It utilizes `useState` for query management and `ClientOnly` for conditional rendering of the search button.

```tsx
function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query)} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Create MoviesPage Component with TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This React component fetches movie data using `Route.useLoaderData()` provided by TanStack Start. It displays a list of popular movies or an error message if data fetching fails. The component utilizes Tailwind CSS for styling and includes basic accessibility attributes.

```tsx
const MoviesPage = () => {
  const { movies, error } = Route.useLoaderData()

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
      role="main"
      aria-label="Popular Movies Section"
    >
      <div className="w-full max-w-6xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-3xl mb-6 font-bold text-center">Popular Movies</h1>

        {error && (
          <div
            className="text-red-400 text-center mb-4 p-4 bg-red-900/20 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        {movies.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            aria-label="Movie List"
          >
            {movies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center text-gray-400" role="status">
              Loading movies...
            </div>
          )
        )}
      </div>
    </div>
  )
}
```

--------------------------------

### Configuring Static NODE_ENV Replacement in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Illustrates how to configure the `staticNodeEnv` option in `vite.config.ts` for TanStack Start. This setting controls whether `process.env.NODE_ENV` is statically replaced at build time in server bundles, which is crucial for dead code elimination. The default is `true`.

```typescript
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        build: {
          // Replace process.env.NODE_ENV at build time (default: true)
          staticNodeEnv: true,
        },
      },
    }),
    viteReact(),
  ],
})
```

--------------------------------

### useHydrated Hook for Client-Side Logic in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Explains the `useHydrated` hook in TanStack Start, which returns a boolean indicating if the client has been hydrated. This is useful for conditionally rendering content that depends on browser APIs or client-side data, providing a fallback for server rendering.

```tsx
import { useHydrated } from '@tanstack/react-router';

function TimeZoneDisplay() {
  const hydrated = useHydrated();
  const timeZone = hydrated
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'UTC';

  return <div>Your timezone: {timeZone}</div>;
}
```

--------------------------------

### Fetch Dynamic Markdown from Remote Sources (Server Function)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TypeScript code defines a server function using '@tanstack/react-start' to fetch markdown content from a remote source, such as a GitHub repository. It takes repository details (owner, name, branch, file path) as input, fetches the raw markdown, and uses 'gray-matter' to parse frontmatter and content. It includes error handling for fetch requests and comments for adding GitHub tokens.

```typescript
// src/utils/docs.server.ts
import { createServerFn } from '@tanstack/react-start'
import matter from 'gray-matter'

type FetchDocsParams = {
  repo: string // e.g., 'tanstack/router'
  branch: string // e.g., 'main'
  filePath: string // e.g., 'docs/guide/getting-started.md'
}

export const fetchDocs = createServerFn({ method: 'GET' })
  .inputValidator((params: FetchDocsParams) => params)
  .handler(async ({ data: { repo, branch, filePath } }) => {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`

    const response = await fetch(url, {
      headers: {
        // Add GitHub token for private repos or higher rate limits
        // Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const rawContent = await response.text()
    const { data: frontmatter, content } = matter(rawContent)

    return {
      frontmatter,
      content,
      filePath,
    }
  })
```

--------------------------------

### Add Syntax Highlighting with Shiki in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Integrates Shiki for syntax highlighting in code blocks within a React application. The `highlightCode` function takes code and language as input and returns HTML with syntax highlighting applied, using specified light and dark themes.

```tsx
// src/utils/markdown.ts
import { codeToHtml } from 'shiki'

// Process code blocks after parsing
export async function highlightCode(
  code: string,
  language: string,
): Promise<string> {
  return codeToHtml(code, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'tokyo-night',
    },
  })
}

```

```tsx
// In your Markdown component's replace function
if (domNode.name === 'pre') {
  const codeElement = domNode.children.find(
    (child) => child instanceof Element && child.name === 'code',
  )
  if (codeElement) {
    const className = codeElement.attribs.class || ''
    const language = className.replace('language-', '') || 'text'
    const code = getText(codeElement)

    return <CodeBlock code={code} language={language} />
  }
}

```

--------------------------------

### Disable Optional Features (Bun)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Disables optional features like ETag generation and Gzip compression for the server. This command uses Bun to run the server with the corresponding environment variables set to false.

```shell
# Disable optional features
ASSET_PRELOAD_ENABLE_ETAG=false \
ASSET_PRELOAD_ENABLE_GZIP=false \
bun run server.ts
```

--------------------------------

### Combine Static Prerendering with ISR (Vite)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Integrates TanStack Start's static prerendering capabilities into a Vite build process. This configuration prerenders specified routes at build time and enables ISR for subsequent updates. It uses the '@tanstack/react-start/plugin/vite' plugin to define prerenderable routes and enable link crawling.

```typescript
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        routes: ['/blog', '/blog/posts/*'],
        crawlLinks: true,
      },
    }),
  ],
})
```

--------------------------------

### Configure TanStack Router Instance

Source: https://tanstack.com/start/latest/docs/framework/react/guide/routing

This snippet shows how to create and configure a TanStack Router instance within the `router.tsx` file. It imports necessary functions from `@tanstack/react-router` and the generated `routeTree`. The `getRouter` function ensures a new router instance is returned each time, with scroll restoration enabled.

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// You must export a getRouter function that
// returns a new router instance each time
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

--------------------------------

### Define Server Route with Route-Level Middleware (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Shows how to apply middleware to all handlers within a server route using the `middleware` property at the server level. This is useful for common concerns like authentication or logging.

```typescript
import { createFileRoute } from '@tanstack/react-router'

// Assuming authMiddleware and loggerMiddleware are defined elsewhere
const authMiddleware = (handler) => async (opts) => {
  console.log('Authenticating...');
  return handler(opts);
};
const loggerMiddleware = (handler) => async (opts) => {
  console.log('Logging request...');
  return handler(opts);
};

export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware, loggerMiddleware], // Applies to all handlers
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World! from ' + request.url)
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}!`) 
      },
    },
  },
})
```

--------------------------------

### Merge and Override Request Headers Across Middleware

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates how TanStack Start React merges headers from multiple middlewares and call sites. Later middlewares or call-site headers can override values set by earlier ones, providing a clear precedence order.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const firstMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    return next({
      headers: {
        'X-Request-ID': '12345',
        'X-Source': 'first-middleware',
      },
    })
  },
)

const secondMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    return next({
      headers: {
        'X-Timestamp': Date.now().toString(),
        'X-Source': 'second-middleware', // Overrides first middleware
      },
    })
  },
)

// Final headers will include:
// - X-Request-ID: '12345' (from first)
// - X-Timestamp: '<timestamp>' (from second)
// - X-Source: 'second-middleware' (second overrides first)
```

--------------------------------

### Configure Global Server Function Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Configures global middleware to run for every server function in the application. This is achieved by adding middleware to the `functionMiddleware` array within `src/start.ts` using `createStart`.

```tsx
// src/start.ts
import { createStart } from '@tanstack/react-start'
import { loggingMiddleware } from './middleware'

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [loggingMiddleware],
  }
})
```

--------------------------------

### Custom Gzip Configuration (Bun)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Configures custom settings for Gzip compression, including the minimum file size for compression and the MIME types eligible for Gzip. This command uses Bun to run the server with these custom Gzip configurations.

```shell
# Custom Gzip configuration
ASSET_PRELOAD_GZIP_MIN_SIZE=2048 \
ASSET_PRELOAD_GZIP_MIME_TYPES="text/,application/javascript,application/json" \
bun run server.ts
```

--------------------------------

### Authenticate with Cloudflare Wrangler

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Logs you into your Cloudflare account using Wrangler, which is necessary for deploying your application. This command authenticates your local environment with your Cloudflare account.

```bash
npx wrangler login
```

```bash
pnpm dlx wrangler login
```

--------------------------------

### Use Dynamic Data in SPA Shell with Loaders

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This snippet illustrates how to fetch dynamic data using a loader on the Root Route, which runs during the SSR prerendering process. The fetched data is then accessible within the shell component, allowing for dynamic content inclusion.

```tsx
import { createRootRoute, Outlet, useLoaderData } from '@tanstack/react-router';

export const RootRoute = createRootRoute({
  loader: async () => {
    return {
      name: 'Tanner',
    };
  },
  component: Root,
});

export default function Root() {
  const { name } = useLoaderData();

  return (
    <html>
      <body>
        <h1>Hello, {name}!</h1>
        <Outlet />
      </body>
    </html>
  );
}
```

--------------------------------

### Combine Route-Level and Handler-Specific Middleware (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Illustrates combining route-level middleware (applied to all handlers) with handler-specific middleware. Route-level middleware executes first, followed by handler-specific middleware, providing granular control.

```typescript
import { createFileRoute } from '@tanstack/react-router'

// Assuming authMiddleware, validationMiddleware are defined elsewhere
const authMiddleware = (handler) => async (opts) => {
  console.log('Authenticating...');
  return handler(opts);
};
const validationMiddleware = (handler) => async (opts) => {
  console.log('Validating...');
  return handler(opts);
};

export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware], // Runs first for all handlers
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async ({ request }) => {
          return new Response('Hello, World!')
        },
        POST: {
          middleware: [validationMiddleware], // Runs after authMiddleware, only for POST
          handler: async ({ request }) => {
            const body = await request.json()
            return new Response(`Hello, ${body.name}!`) 
          },
        },
      }),
  },
})
```

--------------------------------

### Conditional Client Entry Point for Dev/Prod in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

This snippet illustrates how to implement different client-side behaviors for development and production environments. It conditionally renders a 'Development Mode' message and adjusts the `StrictMode` usage based on `import.meta.env.DEV`.

```tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

const App = (
  <>
    {import.meta.env.DEV && <div>Development Mode</div>}
    <StartClient />
  </>
)

hydrateRoot(
  document,
  import.meta.env.DEV ? <StrictMode>{App}</StrictMode> : App,
)
```

--------------------------------

### Create Server Route for Fetching Movies with TanStack Start (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This snippet demonstrates creating a server-only function to fetch popular movies from the TMDB API. It uses `createServerFn` to keep API credentials secure and defines a route loader that calls this server function before rendering the component. Error handling is included to ensure a consistent data structure for the component.

```typescript
// src/routes/fetch-movies.tsx
import { createFileRoute } from '@tanstack/react-router'
import type { Movie, TMDBResponse } from '../types/movie'
import { createServerFn } from '@tanstack/react-start'

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

const fetchPopularMovies = createServerFn().handler(
  async (): Promise<TMDBResponse> => {
    const response = await fetch(API_URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`)
    }

    return response.json()
  },
)

export const Route = createFileRoute('/fetch-movies')({
  component: MoviesPage,
  loader: async (): Promise<{ movies: Movie[]; error: string | null }> => {
    try {
      const moviesData = await fetchPopularMovies()
      return { movies: moviesData.results, error: null }
    } catch (error) {
      console.error('Error fetching movies:', error)
      return { movies: [], error: 'Failed to load movies' }
    }
  },
})
```

--------------------------------

### Dynamic Path Parameters

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Server routes support dynamic path parameters, similar to TanStack Router. A file named `routes/users/$id.ts` creates an API route at `/users/$id` that accepts a dynamic `id` parameter.

```APIDOC
## GET /users/$id

### Description
Fetches user information based on a dynamic user ID.

### Method
GET

### Endpoint
/users/$id

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier of the user.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **string** - A message indicating the user ID.

#### Response Example
```
User ID: 123
```
```

--------------------------------

### Handling POST Requests with Body

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

To handle POST requests, add a `POST` handler to the route object. The handler receives the request object, and you can access the request body using `request.json()`, `request.text()`, or `request.formData()`.

```APIDOC
## POST /hello

### Description
Handles POST requests, greeting the user by name from the request body.

### Method
POST

### Endpoint
/hello

### Parameters
#### Request Body
- **name** (string) - Required - The name of the user to greet.

### Request Example
```json
{
  "name": "Tanner"
}
```

### Response
#### Success Response (200)
- **string** - A greeting message.

#### Response Example
```
Hello, Tanner!
```
```

--------------------------------

### Create Server Function Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Creates server function middleware with specific types. This middleware can include client-side and server-side logic, and input validation.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware({ type: 'function' })
  .client(() => {
    //...
  })
  .server(() => {
    //...
  })
```

--------------------------------

### Disable Server-Side Rendering (SSR) for Specific React Routes

Source: https://tanstack.com/start/latest/docs/framework/react/guide/seo

Shows how to selectively disable Server-Side Rendering (SSR) for specific routes in React applications using TanStack Start. This is useful for pages that do not require indexing by search engines, potentially impacting their SEO.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  ssr: false, // Dashboard doesn't need to be indexed
  component: DashboardPage,
})
```

--------------------------------

### Replace Global Response with FastResponse in Node.js

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Replaces the global Response constructor with srvx's FastResponse in the server entry point. This optimization is specific to Node.js deployments using Nitro/h3/srvx and enhances performance.

```typescript
import { FastResponse } from 'srvx'
globalThis.Response = FastResponse
```

--------------------------------

### Article Schema for LLMO using React and TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This snippet demonstrates how to implement the Article schema using JSON-LD within the head configuration of a TanStack Router route. It ensures that AI systems can accurately parse and understand article-specific metadata like title, author, and publication dates.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData.post.title }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.post.title,
          description: loaderData.post.excerpt,
          image: loaderData.post.coverImage,
          author: {
            '@type': 'Person',
            name: loaderData.post.author.name,
            url: loaderData.post.author.url,
          },
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            logo: {
              '@type': 'ImageObject',
              url: 'https://myapp.com/logo.png',
            },
          },
          datePublished: loaderData.post.publishedAt,
          dateModified: loaderData.post.updatedAt,
        }),
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Secure Session Configuration with useAppSession

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Provides a React hook `useAppSession` for configuring secure sessions. It includes settings for session name, secret, and cookie attributes like `secure`, `sameSite`, `httpOnly`, and `maxAge` to enhance security against common web vulnerabilities.

```tsx
// Use secure session configuration
export function useAppSession() {
  return useSession({
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // 32+ characters
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      httpOnly: true, // XSS protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  })
}
```

--------------------------------

### Create Isomorphic Function with Client and Server Implementations

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Defines a function that behaves differently on the client and server. It uses .server() and .client() to provide environment-specific logic. The function returns 'server' on the server and 'client' on the client.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it returns `'client'`.
```

--------------------------------

### Accessing Runtime Environment Variables on Client

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Shows how to make environment variables available to the client at runtime in a production environment. This involves passing variables from the server down to the client using server functions. Note that `process.env` is used on the server without the `VITE_` prefix.

```tsx
import { createFileRoute } from '@tanstack/react-router'

const getRuntimeVar = createServerFn({
  method: 'GET',
}).handler(() => {
  return process.env.MY_RUNTIME_VAR // notice `process.env` on the server, and no `VITE_` prefix
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const foo = await getRuntimeVar()
    return { foo }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { foo } = Route.useLoaderData()
  // ... use your variable however you want
}
```

--------------------------------

### Use Dynamic Markdown in React Routes with TanStack Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

Demonstrates how to create dynamic routes in React using TanStack Router to render markdown files. It utilizes `createFileRoute` for route definition, `fetchDocs` for data fetching, and a `Markdown` component for rendering.

```tsx
// src/routes/docs.$path.tsx
import { createFileRoute } from '@tanstack/react-router'
import { fetchDocs } from '~/utils/docs.server'
import { Markdown } from '~/components/Markdown'

export const Route = createFileRoute('/docs/$path')({
  loader: async ({ params }) => {
    return fetchDocs({
      data: {
        repo: 'your-org/your-repo',
        branch: 'main',
        filePath: `docs/${params.path}.md`,
      },
    })
  },
  component: DocsPage,
})

function DocsPage() {
  const { frontmatter, content } = Route.useLoaderData()

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <Markdown content={content} className="prose" />
    </article>
  )
}

```

--------------------------------

### Enable Data-Only SSR for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Enables Server-Side Rendering (SSR) for `beforeLoad` and `loader` but disables it for the route component. The server will execute `beforeLoad` and `loader`, sending their results to the client, but the component will be rendered on the client.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  ssr: 'data-only',
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  component: () => <div>This component is rendered on the client</div>,
})
```

--------------------------------

### Create Isomorphic Function with No Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Initializes an isomorphic function without any specific server or client implementations. Calling this function on either the client or server results in a no-operation (no-op), returning undefined.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const noImplementation = createIsomorphicFn()

const noop = noImplementation()
// ℹ️ On both **client** and **server**, it is no-op (returns `undefined`)
```

--------------------------------

### Security: Exposing Secrets vs. Server-Side Handling

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Contrasts incorrect and correct approaches to handling API secrets. The wrong method exposes secrets to the client bundle, while the correct method keeps secrets on the server and uses `createServerFn` for secure API calls.

```typescript
// ❌ WRONG - Secret exposed to client bundle
const config = {
  apiKey: import.meta.env.VITE_SECRET_API_KEY, // This will be in your JS bundle!
}

// ✅ CORRECT - Keep secrets on server
const getApiData = createServerFn().handler(async () => {
  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${process.env.SECRET_API_KEY}` },
  })
  return response.json()
})
```

--------------------------------

### Create Authentication Context in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Implements an authentication context using React's `createContext` and `useContext` hooks. It leverages `useServerFn` to fetch the current user data and provides `user`, `isLoading`, and `refetch` state to child components. This enables easy access to authentication status throughout the application.

```tsx
// contexts/auth.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getCurrentUserFn } from '../server/auth'

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useServerFn(getCurrentUserFn)

  return (
    <AuthContext.Provider value={{ user, isLoading, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

```

--------------------------------

### Create Isomorphic Function with Client-Only Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Creates a function that only has a client-side implementation. When called on the client, it returns 'client'. On the server, it acts as a no-op, returning undefined.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const clientImplementationOnly = createIsomorphicFn().client(() => 'client')

const client = clientImplementationOnly()
// ℹ️ On the **server**, it is no-op (returns `undefined`)
// ℹ️ On the **client**, it returns `'client'`.
```

--------------------------------

### Multiple Dynamic Path Parameters Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Demonstrates a server route with multiple dynamic path parameters, such as '$id' and '$postId'. It extracts both parameters from the route and includes them in the response, enabling more complex resource nesting.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id/posts/$postId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id, postId } = params
        return new Response(`User ID: ${id}, Post ID: ${postId}`)
      },
    },
  },
})

// Visit /users/123/posts/456 to see the response
// User ID: 123, Post ID: 456
```

--------------------------------

### Disable SSR for a Route in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Disables Server-Side Rendering (SSR) for a specific route. Neither `beforeLoad`, `loader`, nor the route component will execute on the server. They will only run on the client during hydration or subsequent navigation.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  ssr: false,
  beforeLoad: () => {
    console.log('Executes on the client during hydration')
  },
  loader: () => {
    console.log('Executes on the client during hydration')
  },
  component: () => <div>This component is rendered on the client</div>,
})
```

--------------------------------

### Secure Environment Variable Access with ServerOnlyFn

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Highlights the danger of exposing environment variables to the client bundle. It demonstrates the correct way to access sensitive variables using createServerOnlyFn to ensure they are only available on the server.

```tsx
// ❌ Exposes to client bundle
const apiKey = process.env.SECRET_KEY

// ✅ Server-only access
const apiKey = createServerOnlyFn(() => process.env.SECRET_KEY)
```

--------------------------------

### Server-Side Environment Variable Access (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Illustrates how server functions in TanStack Start can access any environment variable using `process.env`. This is crucial for sensitive information like database connection strings (`DATABASE_URL`) and external API secrets (`EXTERNAL_API_SECRET`), which are never exposed to the client.

```typescript
import { createServerFn } from '@tanstack/react-start'

// Database connection (server-only)
const connectToDatabase = createServerFn().handler(async () => {
  const connectionString = process.env.DATABASE_URL // No prefix needed
  const apiKey = process.env.EXTERNAL_API_SECRET // Stays on server

  // These variables are never exposed to the client
  return await database.connect(connectionString)
})

// Authentication (server-only)
const authenticateUser = createServerFn()
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const jwtSecret = process.env.JWT_SECRET // Server-only
    return jwt.verify(data.token, jwtSecret)
  })
```

--------------------------------

### Create Isomorphic Function with Server-Only Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Creates a function that only has a server-side implementation. When called on the server, it returns 'server'. On the client, it acts as a no-op, returning undefined.

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const serverImplementationOnly = createIsomorphicFn().server(() => 'server')

const server = serverImplementationOnly()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it is no-op (returns `undefined`)
```

--------------------------------

### Create Client-Only Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Creates a function that is strictly intended to be executed on the client. If this function is invoked on the server, it will throw a descriptive runtime error, preventing unintended server-side execution.

```javascript
import { createClientOnlyFn } from '@tanstack/react-start'

const foo = createClientOnlyFn(() => 'bar')

foo() // ✅ On client: returns "bar"
// ❌ On server: throws "createClientOnlyFn() functions can only be called on the client!"
```

--------------------------------

### Responding with JSON Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Illustrates how to send a JSON response from a server route. It explicitly stringifies a JavaScript object and sets the 'Content-Type' header to 'application/json', ensuring the client correctly interprets the response.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(JSON.stringify({ message: 'Hello, World!' }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    },
  },
})

// Visit /hello to see the response
// {"message":"Hello, World!"}
```

--------------------------------

### Using Response.json Helper Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Presents a more concise way to send JSON responses using the `Response.json()` helper function. This method automatically serializes the object and sets the 'Content-Type' header, simplifying JSON response handling.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ message: 'Hello, World!' })
      },
    },
  },
})

// Visit /hello to see the response
// {"message":"Hello, World!"}
```

--------------------------------

### Input Validation with Zod Schema

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Shows how to perform input validation for login data using Zod. It defines a `loginSchema` with email and password constraints and integrates it with `createServerFn` to ensure that incoming data conforms to the expected structure and types before processing.

```tsx
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    // data is now validated
  })
```

--------------------------------

### Display Clear, Factual Product Details (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This React component displays product details in a clear and factual manner. It uses standard HTML elements to present information like name, category, brand, price, and colors, making it easy for AI to extract key facts.

```tsx
// Good: Clear, extractable facts
function ProductDetails({ product }) {
  return (
    <article>
      <h1>{product.name}</h1>
      <p>
        {product.name} is a {product.category} made by {product.brand}. It costs
        ${product.price} and is available in {product.colors.join(', ')}.
      </p>
    </article>
  )
}
```

--------------------------------

### Define and Call a Basic Server Function (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates how to create a server function using `createServerFn` that returns the current server time. It also shows how to call this server function from client code.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

--------------------------------

### Create Server-Only Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

Creates a function that is strictly intended to be executed on the server. If this function is invoked on the client, it will throw a descriptive runtime error, preventing unintended client-side execution.

```javascript
import { createServerOnlyFn } from '@tanstack/react-start'

const foo = createServerOnlyFn(() => 'bar')

foo() // ✅ On server: returns "bar"
// ❌ On client: throws "createServerOnlyFn() functions can only be called on the server!"
```

--------------------------------

### Collect Performance Metrics (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

A utility class for collecting and exposing basic performance metrics. It allows recording timing durations for named events and provides methods to retrieve statistics like count, average, percentiles, min, and max. Also includes a '/metrics' server route to expose these metrics.

```tsx
// utils/metrics.ts
class MetricsCollector {
  private metrics = new Map<string, number[]>()

  recordTiming(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(duration)
  }

  getStats(name: string) {
    const timings = this.metrics.get(name) || []
    if (timings.length === 0) return null

    const sorted = timings.sort((a, b) => a - b)
    return {
      count: timings.length,
      avg: timings.reduce((a, b) => a + b, 0) / timings.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    }
  }

  getAllStats() {
    const stats: Record<string, any> = {}
    for (const [name] of this.metrics) {
      stats[name] = this.getStats(name)
    }
    return stats
  }
}

export const metrics = new MetricsCollector()

// Metrics endpoint
// routes/metrics.ts
export const Route = createFileRoute('/metrics')({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString(),
          },
          application: metrics.getAllStats(),
        })
      },
    },
  },
})
```

--------------------------------

### Set Custom Headers Directly at Call Site

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Shows how to directly specify custom headers when making a server function call. These headers have the highest precedence and will override any headers set by middleware.

```tsx
await myServerFn({
  data: { name: 'John' },
  headers: {
    'X-Custom-Header': 'call-site-value',
  },
})
```

--------------------------------

### CDN-Specific Cache Control Headers (TypeScript & Plain Text)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Demonstrates how to configure cache control headers for different CDN providers. Cloudflare and Vercel utilize `Cache-Control` and specific CDN headers within route definitions, while Netlify uses a `_headers` file for configuration.

```typescript
export const Route = createFileRoute('/products/$id')({
  headers: () => ({
    'Cache-Control': 'public, max-age=3600',
    // Cloudflare-specific header for finer control
    'CDN-Cache-Control': 'max-age=7200',
  }),
})
```

```plaintext
# public/_headers
/blog/*
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400

/api/*
  Cache-Control: public, max-age=300
```

```typescript
export const Route = createFileRoute('/posts/$id')({
  headers: () => ({
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  }),
})
```

--------------------------------

### Use Hierarchical Structure for Documentation (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This React component demonstrates the use of a hierarchical structure for documentation content. It employs HTML heading tags (h1, h2, h3) to organize sections and sub-sections, aiding AI in understanding content hierarchy.

```tsx
function DocumentationPage() {
  return (
    <article>
      <h1>Getting Started with TanStack Start</h1>

      <section>
        <h2>Installation</h2>
        <p>Install TanStack Start using npm...</p>

        <h3>Prerequisites</h3>
        <p>You'll need Node.js 18 or later...</p>
      </section>

      <section>
        <h2>Configuration</h2>
        <p>Configure your app in vite.config.ts...</p>
      </section>
    </article>
  )
}
```

--------------------------------

### Validating Required Environment Variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Demonstrates a method for validating the presence of required server-side and client-side environment variables. This script checks for essential variables on server startup and during the build process to prevent runtime errors.

```typescript
// src/config/validation.ts
const requiredServerEnv = ['DATABASE_URL', 'JWT_SECRET'] as const

const requiredClientEnv = ['VITE_APP_NAME', 'VITE_API_URL'] as const

// Validate on server startup
for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

// Validate client environment at build time
for (const key of requiredClientEnv) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}
```

--------------------------------

### Check Cache Headers with cURL (Bash)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Demonstrates how to inspect cache-related headers for a given URL using the cURL command-line tool. This is useful for debugging ISR and verifying cache control, age, and CDN hit status. It specifically looks for 'Cache-Control', 'Age', and 'X-Cache' headers.

```bash
curl -I https://yoursite.com/blog/my-post

# Look for:
# Cache-Control: public, max-age=3600, stale-while-revalidate=86400
# Age: 1234 (time in cache)
# X-Cache: HIT (from CDN)
```

--------------------------------

### Disabling Static NODE_ENV Replacement

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Shows how to disable static `NODE_ENV` replacement by setting `staticNodeEnv: false` in the TanStack Start Vite plugin configuration. This keeps `NODE_ENV` dynamic at runtime, which is useful for scenarios like deploying a single build artifact to multiple environments or performing runtime environment detection.

```typescript
tanstackStart({
  server: {
    build: {
      staticNodeEnv: false, // Keep NODE_ENV dynamic at runtime
    },
  },
})
```

--------------------------------

### Customize Server Function ID Generation with Vite Plugin

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

This snippet demonstrates how to configure the TanStack Start Vite plugin to use a custom function for generating server function IDs. It utilizes the `generateFunctionId` option, accepting `filename` and `functionName` as input to create a deterministic SHA1 hash. If `undefined` is returned, the default ID generation is used. This customization is experimental.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      serverFns: {
        generateFunctionId: ({ filename, functionName }) => {
          // Return a custom ID string
          return crypto
            .createHash('sha1')
            .update(`${filename}--${functionName}`)
            .digest('hex')

          // If you return undefined, the default is used
          // return undefined
        },
      },
    }),
    react(),
  ],
})
```

--------------------------------

### Define a Dynamic Route with createFileRoute (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/routing

This snippet shows how to define a dynamic route for '/posts/$postId' using `createFileRoute` from TanStack Router. It exports the route definition with a specified path and component. The path string is automatically managed by the router.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})
```

--------------------------------

### Graceful Error Handling with Error Boundaries in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

Demonstrates how to implement error boundaries in React for graceful handling of server and client execution errors. The `ErrorBoundaryComponent` logs errors differently based on the execution environment.

```tsx
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={<div>Something went wrong</div>}
      onError={(error) => {
        if (typeof window === 'undefined') {
          console.error('[SERVER ERROR]:', error)
        } else {
          console.error('[CLIENT ERROR]:', error)
        }
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
```

--------------------------------

### Implementing Loading States in React Forms

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Shows how to manage loading states in a React form component, specifically a `LoginForm`. It uses `useState` to track the loading status and disables the submit button while a `useServerFn` mutation is in progress, providing visual feedback to the user.

```tsx
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const loginMutation = useServerFn(loginFn)

  const handleSubmit = async (data: LoginData) => {
    setIsLoading(true)
    try {
      await loginMutation.mutate(data)
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

--------------------------------

### Add Debug Headers for Development (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements a server middleware using TanStack Router's `createMiddleware` to add helpful debug information to responses during development. It sets headers like 'X-Debug-Timestamp', 'X-Debug-Node-Version', and 'X-Debug-Uptime' only when `NODE_ENV` is 'development'.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const debugMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  if (process.env.NODE_ENV === 'development') {
    result.response.headers.set('X-Debug-Timestamp', new Date().toISOString())
    result.response.headers.set('X-Debug-Node-Version', process.version)
    result.response.headers.set('X-Debug-Uptime', process.uptime().toString())
  }

  return result
})
```

--------------------------------

### Protect Routes with beforeLoad in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Demonstrates how to protect routes in a React application using the `beforeLoad` hook provided by TanStack Router. This ensures that only authenticated users can access specific pages. It checks for a current user and redirects to the login page if not found, passing the original location for redirection after login. The authenticated user's data is then passed down to child routes.

```tsx
// routes/_authed.tsx - Layout route for protected pages
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    // Pass user to child routes
    return { user }
  },
})

```

```tsx
// routes/_authed/dashboard.tsx - Protected route
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const { user } = Route.useRouteContext()

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {/* Dashboard content */}
    </div>
  )
}

```

--------------------------------

### Render Blog Post List in React Router

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This React component, used with React Router, displays a list of blog posts. It imports all posts from the 'content-collections' generated module, sorts them by publication date, and renders them as list items with links to individual post pages. It assumes a 'Link' component is available for navigation.

```typescript
// src/routes/blog.index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  // Posts are sorted by published date
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  )

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span>{post.published}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

--------------------------------

### Basic Server Function with Input Validation (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Shows a server function (`greetUser`) that accepts a single `data` parameter and uses a basic input validator. It demonstrates how to pass data when calling the server function.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const greetUser = createServerFn({ method: 'GET' })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    return `Hello, ${data.name}!`
  })

await greetUser({ data: { name: 'John' } })
```

--------------------------------

### Environment Variable Naming Conventions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Provides guidelines for naming environment variables to distinguish between server-only secrets and client-accessible variables. Server-only variables should not have a prefix, while client-safe variables must use the `VITE_` prefix.

```bash
# ✅ Server-only (no prefix)
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key
STRIPE_SECRET_KEY=sk_live_...

# ✅ Client-safe (VITE_ prefix)
VITE_APP_NAME=My App
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...
```

--------------------------------

### Password Reset Flow Implementation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Outlines a two-part password reset flow using `createServerFn`. The `requestPasswordResetFn` handles initiating the reset by validating the email, generating a secure token, saving it with an expiry, and sending a reset email. The `resetPasswordFn` confirms the reset by validating the token, checking its expiry, updating the user's password, and then deleting the used token.

```tsx
// Password reset request
export const requestPasswordResetFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const user = await getUserByEmail(data.email)
    if (!user) {
      // Don't reveal if email exists
      return { success: true }
    }

    const token = generateSecureToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await savePasswordResetToken(user.id, token, expires)
    await sendPasswordResetEmail(user.email, token)

    return { success: true }
  })

// Password reset confirmation
export const resetPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { token: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const resetToken = await getPasswordResetToken(data.token)

    if (!resetToken || resetToken.expires < new Date()) {
      return { error: 'Invalid or expired token' }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 12)
    await updateUserPassword(resetToken.userId, hashedPassword)
    await deletePasswordResetToken(data.token)

    return { success: true }
  })

```

--------------------------------

### Configure SPA Prerendering Options in Vite

Source: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

This snippet demonstrates how to override the default prerendering options for the SPA shell in Vite configuration. It allows customization of output path, link crawling, and retry counts for prerendering.

```tsx
import { defineConfig } from 'vite';
import tanstackStart from '@tanstack/start-framework-react';

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        prerender: {
          outputPath: '/custom-shell',
          crawlLinks: true,
          retryCount: 3,
        },
      },
    }),
  ],
});
```

--------------------------------

### Generate Tailwind and PostCSS Config Files

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Generates the `tailwind.config.js` and `postcss.config.js` files using the Tailwind CSS CLI. These files are essential for configuring Tailwind CSS v3.

```shell
npx tailwindcss init -p
```

--------------------------------

### Set Response Headers in TanStack Router (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Illustrates how to set custom HTTP headers for a response in TanStack Router. This is commonly used to specify the content type or other metadata. It requires the '@tanstack/react-router' library.

```typescript
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!', {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      },
    },
  },
})
// Visit /hello to see the response
// Hello, World!
```

--------------------------------

### Add New Relic Integration Script to Root Route (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Configures the root route (`__root.tsx`) to include the New Relic integration script in the HTML head. This is essential for monitoring Single Page Applications (SPAs) and browser-side interactions.

```typescript
// __root.tsx
export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        id: 'new-relic',

        // either copy/paste your New Relic integration script here
        children: `...`,

        // or you can create it in your public folder and then reference it here
        src: '/newrelic.js',
      },
    ],
  }),
})

```

--------------------------------

### Define Server Middleware with .server Method (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Defines server-side logic that executes before nested middleware. It receives `next`, `context`, and `request` objects. The `next()` function is called to proceed to the next middleware or handler.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(
  ({ next, context, request }) => {
    return next()
  },
)
```

--------------------------------

### Remember Me Functionality in Login

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Details how to implement 'Remember Me' functionality within the login process. The `loginFn` is modified to accept a `rememberMe` boolean, which, when true, extends the session duration significantly, allowing users to stay logged in for longer periods.

```tsx
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { email: string; password: string; rememberMe?: boolean }) => data,
  )
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)
    if (!user) return { error: 'Invalid credentials' }

    const session = await useAppSession()
    await session.update(
      { userId: user.id },
      {
        // Extend session if remember me is checked
        maxAge: data.rememberMe ? 30 * 24 * 60 * 60 : undefined, // 30 days vs session
      },
    )

    return { success: true }
  })
```

--------------------------------

### Environment-Aware Storage with Isomorphic Function

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Shows how to create an isomorphic storage function using createIsomorphicFn. This function provides different implementations for server (file-based cache) and client (localStorage) environments, ensuring data persistence across both.

```tsx
const storage = createIsomorphicFn()
  .server((key: string) => {
    // Server: File-based cache
    const fs = require('node:fs')
    return JSON.parse(fs.readFileSync('.cache', 'utf-8'))[key]
  })
  .client((key: string) => {
    // Client: localStorage
    return JSON.parse(localStorage.getItem(key) || 'null')
  })
```

--------------------------------

### Object Form TransformAssetUrls with Warmup Enabled (React Server)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Shows how to enable the `warmup: true` option in the object form of `transformAssetUrls` when `cache: true`. This pre-computes the transformed manifest during server startup to avoid first-request latency. This option is only effective in production.

```ts
transformAssetUrls: {
  transform: process.env.CDN_ORIGIN || '',
  cache: true,
  warmup: true,
}
```

--------------------------------

### Handling POST Request Body Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Shows how to handle POST requests in a server route. It accesses the request body using `request.json()`, parses it, and returns a personalized greeting. This pattern is essential for receiving data from clients in API endpoints.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}!`) 
      },
    },
  },
})

// Send a POST request to /hello with a JSON body like { "name": "Tanner" }
// Hello, Tanner!
```

--------------------------------

### Send Client Context to Server (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Explains how to explicitly send client-side context data to the server using the `sendContext` property within the `next` function. This is necessary because client context is not sent by default to prevent large payload transfers.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({
      sendContext: {
        // Send the workspace ID to the server
        workspaceId: context.workspaceId,
      },
    })
  })
  .server(async ({ next, data, context }) => {
    // Woah! We have the workspace ID from the client!
    console.log('Workspace ID:', context.workspaceId)
    return next()
  })
```

--------------------------------

### Configure Vite for Cloudflare Workers

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Adds the Cloudflare plugin to your Vite configuration file (`vite.config.ts`). This enables Vite to build your application specifically for the Cloudflare Workers environment, setting the environment name to 'ssr'.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact(),
  ],
})
```

--------------------------------

### Progressive Enhancement with ClientOnly Component

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Illustrates how to use the ClientOnly component for progressive enhancement. The SearchForm component works without JavaScript, and its functionality is enhanced when JavaScript is available, providing a fallback button for non-JavaScript environments.

```tsx
// Component works without JS, enhanced with JS
function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form action="/search" method="get">
      <input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query)} />
      </ClientOnly>
    </form>
  )
}
```

--------------------------------

### Configure Vite for Tailwind CSS v4

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Adds the `@tailwindcss/vite` plugin to the Vite configuration file (`vite.config.ts`). This enables Tailwind CSS processing within the Vite build pipeline.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tsConfigPaths(), tanstackStart(), viteReact(), tailwindcss()],
})
```

--------------------------------

### Client-Only Rendering Wrapper (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Demonstrates the use of the `ClientOnly` component from `@tanstack/react-router` to conditionally render components only on the client-side. This prevents hydration mismatches for components that rely on client-specific APIs or data.

```tsx
import { ClientOnly } from '@tanstack/react-router'
;<ClientOnly fallback={<span>—</span>}>
  <RelativeTime ts={someTs} />
</ClientOnly>
```

--------------------------------

### Use Tailwind CSS in Components

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Demonstrates applying Tailwind CSS classes directly within a React component (`index.tsx`). This shows that Tailwind utility classes are now available throughout the project.

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <div className="bg-red-500 text-white p-4">Hello World</div>
}
```

--------------------------------

### Cloudflare Workers Wrangler Configuration

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Sets up the `wrangler.jsonc` configuration file for your Cloudflare Workers deployment. This file specifies the worker's name, compatibility date, Node.js compatibility, and the main entry point for the server.

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry"
}
```

--------------------------------

### Define Client-Side Logic in Server Function Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Defines client-side logic that wraps the execution and result of an RPC call to the server. The `next()` function executes the subsequent middleware or the server function.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next, context, request }) => {
    const result = await next() // <-- This will execute the next middleware in the chain and eventually, the RPC to the server
    return result
  },
)
```

--------------------------------

### Monitor Route Performance (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Tracks route loading performance on both client and server using React. It logs server-side performance during the loader execution and client-side render time using React's useEffect hook. Dependencies include '@tanstack/react-router'.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  loader: async ({ context }) => {
    const startTime = Date.now()

    try {
      const data = await loadDashboardData()
      const duration = Date.now() - startTime

      // Log server-side performance
      if (typeof window === 'undefined') {
        console.log(`[SSR] Dashboard loaded in ${duration}ms`)
      }

      return data
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(`[LOADER] Dashboard error after ${duration}ms:`, error)
      throw error
    }
  },
  component: Dashboard,
})

function Dashboard() {
  const data = Route.useLoaderData()

  // Track client-side render time
  React.useEffect(() => {
    const renderTime = performance.now()
    console.log(`[CLIENT] Dashboard rendered in ${renderTime}ms`)
  }, [])

  return <div>Dashboard content</div>
}
```

--------------------------------

### Create React Markdown Component

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

A React component `Markdown` that takes markdown content, renders it using the `renderMarkdown` utility, and processes the resulting HTML. It includes custom rendering logic for links (handling internal links with a `Link` component) and images (adding lazy loading and CSS classes). It uses `useState` and `useEffect` for asynchronous rendering and `html-react-parser` for converting HTML strings to React elements.

```tsx
// src/components/Markdown.tsx
import parse, { type HTMLReactParserOptions, Element } from 'html-react-parser'
import { renderMarkdown, type MarkdownResult } from '~/utils/markdown'

type MarkdownProps = {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  const [result, setResult] = useState<MarkdownResult | null>(null)

  useEffect(() => {
    renderMarkdown(content).then(setResult)
  }, [content])

  if (!result) {
    return <div className={className}>Loading...</div>
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // Customize rendering of specific elements
        if (domNode.name === 'a') {
          // Handle links
          const href = domNode.attribs.href
          if (href?.startsWith('/')) {
            // Internal link - use your router's Link component
            return (
              <Link to={href}>{domToReact(domNode.children, options)}</Link>
            )
          }
        }

        if (domNode.name === 'img') {
          // Add lazy loading to images
          return (
            <img
              {...domNode.attribs}
              loading="lazy"
              className="rounded-lg shadow-md"
            />
          )
        }
      }
    },
  }

  return <div className={className}>{parse(result.markup, options)}</div>
}

```

--------------------------------

### Simple Error Reporting with Map (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements a basic client-side error reporting mechanism using a `Map` to store error occurrences, counts, and last seen timestamps. Errors are logged immediately to the console. This approach does not require external dependencies.

```tsx
// utils/error-reporter.ts
const errorStore = new Map<
  string,
  { count: number; lastSeen: Date; error: any }
>()

export function reportError(error: Error, context?: any) {
  const key = `${error.name}:${error.message}`
  const existing = errorStore.get(key)

  if (existing) {
    existing.count++
    existing.lastSeen = new Date()
  } else {
    errorStore.set(key, {
      count: 1,
      lastSeen: new Date(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      },
    })
  }

  // Log immediately
  console.error('[ERROR REPORTED]:', {
    error: error.message,
    count: existing ? existing.count : 1,
    context,
  })
}
```

--------------------------------

### Prefix Asset URLs with a String - TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Configures `createStartHandler` to prepend a CDN origin string to all manifest asset URLs. This is useful when the CDN origin is known at runtime. If the string is empty, URLs remain unchanged.

```typescript
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const handler = createStartHandler({
  handler: defaultStreamHandler,
  transformAssetUrls: process.env.CDN_ORIGIN || '',
})

export default createServerEntry({ fetch: handler })
```

--------------------------------

### Import Tailwind CSS v4 Directives

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Defines Tailwind CSS in a CSS file (`app.css`) using the `@import 'tailwindcss'` directive. This replaces the traditional `tailwind.config.js` configuration for directives in version 4.

```css
/* src/styles/app.css */
@import 'tailwindcss' source('../');
```

--------------------------------

### Social Authentication Integration with OAuth

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Details the integration of social authentication providers like Google and GitHub using OAuth. It defines configuration for OAuth providers, including client IDs and redirect URIs, and implements a `initiateOAuthFn` using `createServerFn`. This function generates a random state for CSRF protection, stores it in the session, and redirects the user to the appropriate OAuth provider's authorization URL.

```tsx
// Example with OAuth providers
export const authProviders = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    redirectUri: `${process.env.APP_URL}/auth/google/callback`,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    redirectUri: `${process.env.APP_URL}/auth/github/callback`,
  },
}

export const initiateOAuthFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { provider: 'google' | 'github' }) => data)
  .handler(async ({ data }) => {
    const provider = authProviders[data.provider]
    const state = generateRandomState()

    // Store state in session for CSRF protection
    const session = await useAppSession()
    await session.update({ oauthState: state })

    // Generate OAuth URL
    const authUrl = generateOAuthUrl(provider, state)

    throw redirect({ href: authUrl })
  })

```

--------------------------------

### Render Single Blog Post with Markdown

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This React component renders a single blog post based on its slug. It uses React Router's 'loader' to fetch the post data from 'allPosts' and throws a 'notFound' error if the post doesn't exist. The post's markdown content is rendered using a 'Markdown' component, likely a markdown parser like 'react-markdown'.

```typescript
// src/routes/blog.$slug.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { Markdown } from '~/components/Markdown'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) {
      throw notFound()
    }
    return post
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          By {post.authors.join(', ')} on {post.published}
        </p>
      </header>
      <Markdown content={post.content} className="prose" />
    </article>
  )
}
```

--------------------------------

### Provide Context via `next` in Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Illustrates how to pass context data to subsequent middleware or the server function using the `next` function. The `context` property of the object passed to `next` merges with the parent context, making properties available downstream.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const awesomeMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    return next({
      context: {
        isAwesome: Math.random() > 0.5,
      },
    })
  },
)

const loggingMiddleware = createMiddleware({ type: 'function' })
  .middleware([awesomeMiddleware])
  .server(async ({ next, context }) => {
    console.log('Is awesome?', context.isAwesome)
    return next()
  })
```

--------------------------------

### Server Function Wrapper Using Server-Only Helpers (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates creating a server function (`getUser`) that utilizes a server-only helper function (`findUserById`). This pattern separates concerns and keeps server-specific logic contained.

```tsx
// users.functions.ts - Server functions
import { createServerFn } from '@tanstack/react-start'
import { findUserById } from './users.server'

export const getUser = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return findUserById(data.id)
  })
```

--------------------------------

### Import CSS in __root.tsx for v4

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Imports the main CSS file (`app.css`) into the root component (`__root.tsx`) using a `?url` query for Vite. It also includes a triple-slash directive for Vite client type definitions.

```tsx
// src/routes/__root.tsx
/// <reference types="vite/client" />
// other imports...

import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      // your meta tags and site config
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    // other head config
  }),
  component: RootComponent,
})
```

--------------------------------

### Correct Loader Assumptions with Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

Addresses incorrect assumptions about loader functions running only on the server. This snippet shows how loaders run on both server and client, and recommends using server functions (createServerFn) for server-only operations within loaders.

```tsx
// ❌ Assuming loader is server-only
export const Route = createFileRoute('/users')({
  loader: () => {
    // This runs on BOTH server and client!
    const secret = process.env.SECRET // Exposed to client
    return fetch(`/api/users?key=${secret}`)
  },
})

// ✅ Use server function for server-only operations
const getUsersSecurely = createServerFn().handler(() => {
  const secret = process.env.SECRET // Server-only
  return fetch(`/api/users?key=${secret}`)
})

export const Route = createFileRoute('/users')({
  loader: () => getUsersSecurely(), // Isomorphic call to server function
})
```

--------------------------------

### Wildcard/Splat Parameter Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Implements a server route using a wildcard parameter '$' at the end of the path. This allows the route to match any subsequent path segments and capture them as a single '_splat' parameter, useful for serving static files or handling catch-all routes.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/file/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { _splat } = params
        return new Response(`File: ${_splat}`)
      },
    },
  },
})

// Visit /file/hello.txt to see the response
// File: hello.txt
```

--------------------------------

### Configure Template Paths for Tailwind v3

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Specifies the paths to all template files (e.g., JS, TS, JSX, TSX) within the `tailwind.config.js` file. This tells Tailwind where to scan for class names to generate CSS.

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

--------------------------------

### Stream Data with Async Generator in Server Function (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

An alternative server function implementation using an async generator to stream messages. This approach is often cleaner and yields typed Message chunks after a specified delay.

```typescript
const streamingWithAnAsyncGeneratorFn = createServerFn().handler(
  async function* () {
    const messages: Message[] = generateMessages()
    for (const msg of messages) {
      await sleep(500)
      // The streamed chunks are still typed as `Message`
      yield msg
    }
  },
)
```

--------------------------------

### Apply Middleware to Specific Server Route Methods (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Applies middleware to specific HTTP methods within a server route using the `createHandlers` utility. The middleware is defined within the `middleware` property of the individual method object.

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

export const Route = createFileRoute('/foo')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: {
          middleware: [loggingMiddleware],
          handler: () => {
            //...
          },
        },
      }),
  },
})
```

--------------------------------

### In-Memory Rate Limiting for Logins

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Implements a simple in-memory rate limiting mechanism for login attempts using a Map. It tracks the number of attempts and resets the count after a specified period. For production environments, using a more robust solution like Redis is recommended.

```tsx
// Simple in-memory rate limiting (use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export const rateLimitLogin = (ip: string): boolean => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 min
    return true
  }

  if (attempts.count >= 5) {
    return false // Too many attempts
  }

  attempts.count++
  return true
}
```

--------------------------------

### Runtime Environment Variable Validation with Zod

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Implements runtime validation for environment variables using Zod. This ensures that critical server-side and client-side variables are present and conform to expected types and formats before application startup or during runtime.

```typescript
// src/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

const clientEnvSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.string().url(),
  VITE_AUTH0_DOMAIN: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
})

// Validate server environment
export const serverEnv = envSchema.parse(process.env)

// Validate client environment
export const clientEnv = clientEnvSchema.parse(import.meta.env)
```

--------------------------------

### Client-Side Environment Variable Access (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Shows how client-side code can access environment variables prefixed with `VITE_`. These variables are considered public and safe to expose in the browser. Variables without the `VITE_` prefix will be undefined in the client context, enforcing security.

```typescript
// Client configuration
export function ApiProvider({ children }: { children: React.ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL     // ✅ Public
  const apiKey = import.meta.env.VITE_PUBLIC_KEY  // ✅ Public

  // This would be undefined (security feature):
  // const secret = import.meta.env.DATABASE_URL   // ❌ Undefined

  return (
    <ApiContext.Provider value={{ apiUrl, apiKey }}>
      {children}
    </ApiContext.Provider>
  )
}

// Feature flags
export function FeatureGatedComponent() {
  const enableNewFeature = import.meta.env.VITE_ENABLE_NEW_FEATURE === 'true'

  if (!enableNewFeature) return null

  return <NewFeature />
}
```

--------------------------------

### Feature Flags Management in React Components

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Illustrates how to manage feature flags using environment variables in a React application. The `featureFlags` object is populated from `import.meta.env`, allowing conditional rendering of components based on enabled features.

```typescript
// src/config/features.ts
export const featureFlags = {
  enableNewDashboard: import.meta.env.VITE_ENABLE_NEW_DASHBOARD === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
}

// Usage in components
export function Dashboard() {
  if (featureFlags.enableNewDashboard) {
    return <NewDashboard />
  }

  return <LegacyDashboard />
}
```

--------------------------------

### Consume Typed ReadableStream in Client (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

Client-side code to consume a ReadableStream streamed from a server function. It reads chunks from the stream, processes them, and updates the UI. The code highlights how the streamed chunks are correctly typed as Message objects.

```typescript
const [message, setMessage] = useState('')

const getTypedReadableStreamResponse = useCallback(async () => {
  const response = await streamingResponseFn()

  if (!response) {
    return
  }

  const reader = response.getReader()
  let done = false
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    if (value) {
      // Notice how we know the value of `chunk` (`Message | undefined`)
      // here, because it's coming from the typed `ReadableStream`
      const chunk = value.content
      setMessage((prev) => prev + chunk)
    }
  }
}, [])
```

--------------------------------

### Configure TypeScript Path Aliases (tsconfig.json)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

Defines path aliases in your TypeScript project. This configuration maps the alias '~/*' to the './src/*' directory, enabling shorter import paths. Ensure `baseUrl` is set to '.' for relative path resolution.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

--------------------------------

### Create Server Function to Add Jokes (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This server function, written in TypeScript, handles the addition of new jokes to a JSON file. It uses `createServerFn` from `@tanstack/react-start` to define a POST endpoint. The function includes input validation to ensure the question and answer are provided, reads existing jokes, generates a unique ID for the new joke using `uuidv4`, appends the new joke, and writes the updated list back to the `jokes.json` file. It also includes error handling for the file operations.

```tsx
// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid' // Add this import
import type { Joke, JokesData } from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({ method: 'GET' }).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})

// Add this new server function
export const addJoke = createServerFn({ method: 'POST' })
  .inputValidator((data: { question: string; answer: string }) => {
    // Validate input data
    if (!data.question || !data.question.trim()) {
      throw new Error('Joke question is required')
    }
    if (!data.answer || !data.answer.trim()) {
      throw new Error('Joke answer is required')
    }
    return data
  })
  .handler(async ({ data }) => {
    try {
      // Read the existing jokes from the file
      const jokesData = await getJokes()

      // Create a new joke with a unique ID
      const newJoke: Joke = {
        id: uuidv4(),
        question: data.question,
        answer: data.answer,
      }

      // Add the new joke to the list
      const updatedJokes = [...jokesData, newJoke]

      // Write the updated jokes back to the file
      await fs.promises.writeFile(
        JOKES_FILE,
        JSON.stringify(updatedJokes, null, 2),
        'utf-8',
      )

      return newJoke
    } catch (error) {
      console.error('Failed to add joke:', error)
      throw new Error('Failed to add joke')
    }
  })
```

--------------------------------

### Set Response Status Code in TanStack Router (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Demonstrates how to set a custom HTTP status code for a response in TanStack Router. This is useful for indicating specific outcomes like 'Not Found' (404). It requires the '@tanstack/react-router' library.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const user = await findUser(params.id)
        if (!user) {
          return new Response('User not found', {
            status: 404,
          })
        }
        return Response.json(user)
      },
    },
  },
})
```

--------------------------------

### API Endpoint for On-Demand Revalidation (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This API route allows for on-demand cache invalidation by accepting a path and a secret token. It verifies the token against an environment variable and then triggers a cache purge via the Cloudflare API. Ensure `ZONE_ID` and `CF_API_TOKEN` are set in your environment.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/revalidate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { path, secret } = await request.json()

        // Verify secret token
        if (secret !== process.env.REVALIDATE_SECRET) {
          return Response.json({ error: 'Invalid token' }, { status: 401 })
        }

        // Trigger CDN purge via your CDN's API
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${CF_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              files: [`https://yoursite.com${path}`],
            }),
          },
        )

        return Response.json({ revalidated: true })
      },
    },
  },
})
```

--------------------------------

### Implement Error Boundaries (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Provides comprehensive error handling for both client and server-side operations. Includes a client-side React Error Boundary component to catch rendering errors and a server function wrapper to catch and log errors during operation execution, returning a user-friendly message.

```tsx
// Client-side error boundary
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: any) {
  // Log client errors
  console.error('[CLIENT ERROR]:', error)

  // Could also send to external service
  // sendErrorToService(error)

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router />
    </ErrorBoundary>
  )
}

// Server function error handling
const riskyOperation = createServerFn().handler(async () => {
  try {
    return await performOperation()
  } catch (error) {
    // Log server errors with context
    console.error('[SERVER ERROR]:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      // Add request context if available
    })

    // Return user-friendly error
    throw new Error('Operation failed. Please try again.')
  }
})
```

--------------------------------

### Suppressing Hydration Warnings (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Illustrates the use of React's built-in `suppressHydrationWarning` prop on a DOM element. This is a last resort for small, known differences between server and client rendering, and should be used sparingly.

```tsx
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>
```

--------------------------------

### Consume Async Generator Stream on Client (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

Client-side code to consume data streamed from a server function using an async generator. It iterates over the yielded messages, processes their content, and updates the UI, demonstrating a leaner consumption pattern.

```typescript
const getResponseFromTheAsyncGenerator = useCallback(async () => {
  for await (const msg of await streamingWithAnAsyncGeneratorFn()) {
    const chunk = msg.content
    setMessages((prev) => prev + chunk)
  }
}, [])
```

--------------------------------

### Add Organization Schema to Root Route (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This snippet demonstrates how to add organization schema markup to the root route of a React application using TanStack Router. It includes meta tags for character set and viewport, and a JSON-LD script for WebSite schema.

```tsx
// src/routes/__root.tsx
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'My App',
          url: 'https://myapp.com',
          publisher: {
            '@type': 'Organization',
            name: 'My Company',
            url: 'https://myapp.com',
            logo: 'https://myapp.com/logo.png',
            sameAs: [
              'https://twitter.com/mycompany',
              'https://github.com/mycompany',
            ],
          },
        }),
      },
    ],
  }),
  component: RootComponent,
})
```

--------------------------------

### Access Request Context in React Server Functions

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Explains how to access incoming request details like headers and cookies, and how to customize the server response, such as setting headers and status codes. The `getRequest`, `getRequestHeader`, `setResponseHeaders`, and `setResponseStatus` utilities from `@tanstack/react-start/server` are used. This is useful for implementing caching strategies or custom authentication.

```tsx
import { createServerFn } from '@tanstack/react-start'
import {
  getRequest,
  getRequestHeader,
  setResponseHeaders,
  setResponseStatus,
} from '@tanstack/react-start/server'

export const getCachedData = createServerFn({ method: 'GET' }).handler(
  async () => {
    // Access the incoming request
    const request = getRequest()
    const authHeader = getRequestHeader('Authorization')

    // Set response headers (e.g., for caching)
    setResponseHeaders(
      new Headers({
        'Cache-Control': 'public, max-age=300',
        'CDN-Cache-Control': 'max-age=3600, stale-while-revalidate=600',
      }),
    )

    // Optionally set status code
    setResponseStatus(200)

    return fetchData()
  },
)
```

--------------------------------

### TypeScript Declaration for VITE_ Environment Variables

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Provides the necessary TypeScript declaration to resolve errors related to accessing `VITE_` prefixed environment variables. By adding `VITE_MY_VAR` to the `ImportMetaEnv` interface, TypeScript will recognize these variables and prevent type errors.

```typescript
interface ImportMetaEnv {
  readonly VITE_MY_VAR: string
}
```

--------------------------------

### Configure Vite `experimental.renderBuiltUrl` for Component Assets (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Configures Vite's experimental `renderBuiltUrl` option to rewrite asset URLs imported directly within components. This ensures these assets are served from a specified CDN origin, complementing the `base: ''` setting for client-side navigation.

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { relative: true };
      }
      return `https://cdn.example.com/${filename}`;
    },
  },
});
```

--------------------------------

### Input Validation with Server Function Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Uses the `.inputValidator` method to modify or validate the data object before it's passed to middleware or the server function. It commonly integrates with validation libraries like Zod.

```tsx
import { createMiddleware } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const mySchema = z.object({
  workspaceId: z.string(),
})

const workspaceMiddleware = createMiddleware({ type: 'function' })
  .inputValidator(zodValidator(mySchema))
  .server(({ next, data }) => {
    console.log('Workspace ID:', data.workspaceId)
    return next()
  })
```

--------------------------------

### Monitor Cache Hit Rates with Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Implements a server middleware to monitor cache status by inspecting CDN response headers. After the request is processed, it retrieves and logs the 'cf-cache-status' header to help track CDN performance and cache effectiveness. This middleware is designed to run on the server.

```tsx
const cacheMonitoringMiddleware = createMiddleware().server(
  async ({ next }) => {
    const result = await next()

    // Log cache status (from CDN headers)
    console.log('Cache Status:', result.response.headers.get('cf-cache-status'))

    return result
  },
)
```

--------------------------------

### Build Movie Details Component for Displaying Movie Information (React)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This React component, `MovieDetails`, is responsible for rendering the detailed information of a movie within a `MovieCard`. It displays the movie's title, overview, release date, and vote average, applying specific styling and text truncation for a clean presentation.

```tsx
// MovieDetails component
const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
      <p className="text-sm text-gray-300 mb-3 line-clamp-3 h-10">
        {movie.overview}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{movie.release_date}</span>
        <span className="flex items-center">
          ⭐️ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </>
  )
}
```

--------------------------------

### Define Joke Data Types in TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

Defines TypeScript interfaces for a single 'Joke' object and a 'JokesData' type representing an array of jokes. These types ensure data consistency when working with joke data.

```typescript
// src/types/index.ts
export interface Joke {
  id: string
  question: string
  answer: string
}

export type JokesData = Joke[]
```

--------------------------------

### Create New Relic Middleware for Server Functions (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Defines a New Relic middleware for server functions and routes. This middleware intercepts requests, sets the transaction controller name based on the request path and method, and passes control to the next middleware or handler.

```typescript
// newrelic-middleware.ts
import newrelic from 'newrelic'
import { createMiddleware } from '@tanstack/react-start'

export const nrTransactionMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const reqPath = new URL(request.url).pathname
    newrelic.setControllerName(reqPath, request.method ?? 'GET')
    return await next()
  },
)

```

--------------------------------

### Dynamic Path Parameter Server Route (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

Defines a server route with a dynamic path parameter '$id'. It extracts the 'id' from the route parameters and returns a response including the user ID. This is useful for creating API endpoints that operate on specific resources identified by an ID.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        return new Response(`User ID: ${id}`)
      },
    },
  },
})

// Visit /users/123 to see the response
// User ID: 123
```

--------------------------------

### Test Cache Revalidation with cURL (Bash)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Provides methods to force cache misses for testing ISR revalidation. It shows how to use the 'Cache-Control: no-cache' header with cURL to bypass the cache for a specific request. Alternatively, it suggests using CDN-specific cache purge APIs for more direct control.

```bash
# Cloudflare: Bypass cache
curl -H "Cache-Control: no-cache" https://yoursite.com/page

# Or use CDN-specific cache purge APIs
```

--------------------------------

### Create Health Check Endpoints (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Implements server routes for health monitoring using TanStack Router. It defines a '/health' route that returns system status, uptime, memory usage, database connection status, and application version. Requires a database connection function `checkDatabase`.

```tsx
// routes/health.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/health')({
  server: {
    handlers: {
      GET: async () => {
        const checks = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          database: await checkDatabase(),
          version: process.env.npm_package_version,
        }

        return Response.json(checks)
      },
    },
  },
})

async function checkDatabase() {
  try {
    await db.raw('SELECT 1')
    return { status: 'connected', latency: 0 }
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}
```

--------------------------------

### Validate Client-Sent Context on Server (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware

Demonstrates securing client-sent context data by validating it on the server-side using a library like Zod. This is crucial when handling dynamic or user-generated data passed via context to prevent security vulnerabilities.

```tsx
import { createMiddleware } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({
      sendContext: {
        workspaceId: context.workspaceId,
      },
    })
  })
  .server(async ({ next, data, context }) => {
    // Validate the workspace ID before using it
    const workspaceId = zodValidator(z.number()).parse(context.workspaceId)
    console.log('Workspace ID:', workspaceId)
    return next()
  })
```

--------------------------------

### Add Tailwind Directives to CSS for v3

Source: https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

Includes the essential Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) in the main CSS file (`app.css`). These directives are processed by Tailwind to generate the necessary styles.

```css
/* src/styles/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

--------------------------------

### Safe Static Import of Server Functions in Client Components (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Illustrates the safe static import of a server function (`getUser`) within a client component (`UserProfile`). The build process ensures only RPC stubs are included in the client bundle.

```tsx
// ✅ Safe - build process handles environment shaking
import { getUser } from '~/utils/users.functions'

function UserProfile({ id }) {
  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser({ data: { id } }),
  })
}
```

--------------------------------

### Implement New Relic SSR Handler (TypeScript/React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/observability

Custom server-side rendering handler using New Relic integration. It sets controller names and custom attributes for transactions based on route ID and HTTP method, ensuring detailed transaction grouping and data capture.

```typescript
// server.tsx
import newrelic from 'newrelic' // Make sure this is the first import
import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import type { ServerEntry } from '@tanstack/react-start/server-entry'

const customHandler = defineHandlerCallback(async (ctx) => {
  // We do this so that transactions are grouped under the route ID instead of unique URLs
  const matches = ctx.router?.state?.matches ?? []
  const leaf = matches[matches.length - 1]
  const routeId = leaf?.routeId ?? new URL(ctx.request.url).pathname

  newrelic.setControllerName(routeId, ctx.request.method ?? 'GET')
  newrelic.addCustomAttributes({
    'route.id': routeId,
    'http.method': ctx.request.method,
    'http.path': new URL(ctx.request.url).pathname,
    // Any other custom attributes you want to add
  })

  return defaultStreamHandler(ctx)
})

export default {
  fetch(request) {
    const handler = createStartHandler(customHandler)
    return handler(request)
  },
} satisfies ServerEntry

```

--------------------------------

### Create Markdown Rendering Utility (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

A utility function `renderMarkdown` that takes markdown content as a string and returns an object containing the HTML markup and a list of extracted headings. It uses the unified ecosystem to parse, transform, and stringify markdown to HTML, including GitHub Flavored Markdown support, raw HTML processing, slug generation for headings, and autolinking.

```tsx
// src/utils/markdown.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'

export type MarkdownHeading = {
  id: string
  text: string
  level: number
}

export type MarkdownResult = {
  markup: string
  headings: Array<MarkdownHeading>
}

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: Array<MarkdownHeading> = []

  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Process raw HTML in markdown
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['anchor'] },
    })
    .use(() => (tree) => {
      // Extract headings for table of contents
      const { visit } = require('unist-util-visit')
      const { toString } = require('hast-util-to-string')

      visit(tree, 'element', (node: any) => {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          headings.push({
            id: node.properties?.id || '',
            text: toString(node),
            level: parseInt(node.tagName.charAt(1), 10),
          })
        }
      })
    })
    .use(rehypeStringify) // Serialize to HTML string
    .process(content)

  return {
    markup: String(result),
    headings,
  }
}

```

--------------------------------

### Configure Vite `base` for Client-Side CDN Navigation (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Sets the Vite `base` configuration to an empty string, ensuring that client-side navigation uses relative paths that resolve to the CDN. This is crucial when `transformAssetUrls` is used to serve initial SSR assets from a CDN.

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  // ... plugins, etc.
});
```

--------------------------------

### Accessing Environment Variables in Server and Client Code (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Demonstrates how environment variables are accessed in different contexts. Server functions can access any variable via `process.env`, while client components can only access variables prefixed with `VITE_` via `import.meta.env`. This ensures security by preventing sensitive information from being exposed to the client.

```typescript
// Server function - can access any environment variable
const getUser = createServerFn().handler(async () => {
  const db = await connect(process.env.DATABASE_URL) // ✅ Server-only
  return db.user.findFirst()
})

// Client component - only VITE_ prefixed variables
export function AppHeader() {
  return <h1>{import.meta.env.VITE_APP_NAME}</h1> // ✅ Client-safe
}
```

--------------------------------

### Stream Typed Data with ReadableStream in Server Function (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

This server function demonstrates how to stream typed messages using a ReadableStream. It enqueues Message objects and closes the stream when done. The stream is typed to ensure client-side consumption receives Message chunks.

```typescript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
      controller.close()
    },
  })

  return stream
})
```

--------------------------------

### Server-Side Locale and Time Zone Middleware (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Implements server-side middleware to determine and persist locale and time zone information. It prioritizes cookies for source of truth and falls back to the 'Accept-Language' header, ensuring consistent environment for hydration.

```tsx
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client sends tz

  // Persist locale for subsequent requests (optional)
  setCookie('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })

  return next({ context: { locale, timeZone } })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [localeTzMiddleware],
}))
```

--------------------------------

### Combining ISR with Client-Side Caching (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

This snippet shows how to implement a multi-tier caching strategy by combining CDN caching via headers with TanStack Router's client-side caching mechanisms (`staleTime` and `gcTime`). It defines cache durations for both the CDN edge and the client.

```typescript
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
  // CDN caching (via headers)
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  }),
  // Client-side caching (via TanStack Router)
  staleTime: 60_000, // Consider data fresh for 60 seconds on client
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

--------------------------------

### Set Time-Based Cache Headers for Page Revalidation

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Defines cache headers for a React page route to enable Incremental Static Regeneration (ISR). It sets a short `max-age` and `s-maxage` for CDN caching and a longer `stale-while-revalidate` period.

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    'Cache-Control':
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
})

export default function BlogPost() {
  const { post } = Route.useLoaderData()
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}
```

--------------------------------

### Setting Client Time Zone Cookie (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

A React component that uses `useEffect` to detect the client's time zone and set it as a cookie. This is intended to be used during the initial client-side render to inform the server on subsequent requests.

```tsx
import * as React from 'react'
import { ClientOnly } from '@tanstack/react-router'

function SetTimeZoneCookie() {
  React.useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    document.cookie = `tz=${tz}; path=/; max-age=31536000`
  }, [])
  return null
}

export function AppBoot() {
  return (
    <ClientOnly fallback={null}>
      <SetTimeZoneCookie />
    </ClientOnly>
  )
}
```

--------------------------------

### Server Function Input Validation with Zod (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates robust input validation for a server function (`createUser`) using the Zod schema library. The `inputValidator` accepts a Zod schema, ensuring type safety and runtime correctness for the `data` parameter.

```tsx
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
})

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    // data is fully typed and validated
    return `Created user: ${data.name}, age ${data.age}`
  })
```

--------------------------------

### Consume Server Function in Route Loader (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This code defines a route component using `createFileRoute` from `@tanstack/react-router`. The `loader` function calls the `getJokes` server function to fetch data when the route is accessed. The fetched jokes are then passed to the `App` component, which renders the `JokesList` component to display them.

```jsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { getJokes } from './serverActions/jokesActions'
import { JokesList } from './JokesList'

export const Route = createFileRoute('/')({
  loader: async () => {
    // Load jokes data when the route is accessed
    return getJokes()
  },
  component: App,
})

const App = () => {
  const jokes = Route.useLoaderData() || []

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-10">DevJokes</h1>
      <JokesList jokes={jokes} />
    </div>
  )
}
```

--------------------------------

### Build Movie Card Component for Displaying Movie Data (React)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This React component, `MovieCard`, is designed to display individual movie information. It takes a `movie` object as a prop and renders a card with the movie's poster, title, overview, release date, and vote average. It includes basic styling and accessibility attributes.

```tsx
// MovieCard component
const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="bg-white/10 border border-white/20 rounded-lg overflow-hidden backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
      aria-label={`Movie: ${movie.title}`}
      role="group"
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-4">
        <MovieDetails movie={movie} />
      </div>
    </div>
  )
}
```

--------------------------------

### Fetching Server-Side Date with Locale and Time Zone (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Defines a server function to fetch and format the current date and time based on locale and time zone obtained from cookies. This ensures the server provides a consistent date representation for hydration.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const getServerNow = createServerFn().handler(async () => {
  const locale = getCookie('locale') || 'en-US'
  const timeZone = getCookie('tz') || 'UTC'
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date())
})

export const Route = createFileRoute('/')({
  loader: () => getServerNow(),
  component: () => {
    const serverNow = Route.useLoaderData() as string
    return <time dateTime={serverNow}>{serverNow}</time>
  },
})
```

--------------------------------

### Define Content Collections with TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown

This TypeScript code defines a content collection named 'posts' for markdown files. It specifies the directory, inclusion pattern, a schema for frontmatter using Zod, and a transformation function to extract data like title, published date, description, authors, excerpt, header image, and content from markdown files. It uses 'gray-matter' for frontmatter parsing.

```typescript
// content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core'
import matter from 'gray-matter'

function extractFrontMatter(content: string) {
  const { data, content: body, excerpt } = matter(content, { excerpt: true })
  return { data, body, excerpt: excerpt || '' }
}

const posts = defineCollection({
  name: 'posts',
  directory: './src/blog', // Directory containing your .md files
  include: '*.md',
  schema: (z) => ({
    title: z.string(),
    published: z.string().date(),
    description: z.string().optional(),
    authors: z.string().array(),
  }),
  transform: ({ content, ...post }) => {
    const frontMatter = extractFrontMatter(content)

    // Extract header image (first image in the document)
    const headerImageMatch = content.match(/![\[\]]*\([^)]+\)/)
    const headerImage = headerImageMatch ? headerImageMatch[2] : undefined

    return {
      ...post,
      slug: post._meta.path,
      excerpt: frontMatter.excerpt,
      description: frontMatter.data.description,
      headerImage,
      content: frontMatter.body,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
```

--------------------------------

### Vary Cache by Query Parameters (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/isr

Configures cache control headers to vary the cache based on query parameters for a specific route. This ensures that different versions of a page, distinguished by their query parameters, are cached separately. It sets 'Cache-Control' to public with a max age of 300 seconds and 'Vary' to include 'Accept' and 'Accept-Encoding'.

```tsx
export const Route = createFileRoute('/search')({
  headers: () => ({
    'Cache-Control': 'public, max-age=300',
    Vary: 'Accept, Accept-Encoding',
  }),
})
```

--------------------------------

### Render Jokes List Component (React/TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This React component, `JokesList`, is responsible for displaying a list of jokes. It accepts an array of `Joke` objects as a prop and renders them with basic styling. If no jokes are provided, it displays a message indicating that jokes are missing.

```typescript
// src/components/JokesList.tsx
import { Joke } from '../types'

interface JokesListProps {
  jokes: Joke[]
}

export function JokesList({ jokes }: JokesListProps) {
  if (!jokes || jokes.length === 0) {
    return <p className="text-gray-500 italic">No jokes found. Add some!</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Jokes Collection</h2>
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <p className="font-bold text-lg mb-2">{joke.question}</p>
          <p className="text-gray-700">{joke.answer}</p>
        </div>
      ))}
    </div>
  )
}
```

--------------------------------

### Rewrite Asset URLs with a Callback - TypeScript

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Utilizes a callback function within `createStartHandler` to dynamically transform asset URLs based on their type. The callback receives the URL and type, returning a new URL. By default, the transformation is cached after the first request in production.

```typescript
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const handler = createStartHandler({
  handler: defaultStreamHandler,
  transformAssetUrls: ({ url, type }) => {
    // Only rewrite JS and CSS, leave client entry unchanged
    if (type === 'clientEntry') return url
    return `https://cdn.example.com${url}`
  },
})

export default createServerEntry({ fetch: handler })
```

--------------------------------

### Selective Server-Side Rendering Configuration (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

Configures a route to disable or limit server-side rendering using the `ssr` option. Setting `ssr: 'data-only'` or `ssr: false` prevents the component from rendering on the server, thus avoiding potential hydration issues.

```tsx
export const Route = createFileRoute('/unstable')({
  ssr: 'data-only', // or false
  component: () => <ExpensiveViz />,
})
```

--------------------------------

### Handle Form Data with FormData in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

Demonstrates how to process form submissions using FormData with server functions. It includes input validation to ensure the data is of type FormData and extracts 'name' and 'email' fields. This is useful for standard HTML form submissions.

```tsx
import { createServerFn } from '@tanstack/react-start'

export const submitForm = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('Expected FormData')
    }

    return {
      name: data.get('name')?.toString() || '',
      email: data.get('email')?.toString() || '',
    }
  })
  .handler(async ({ data }) => {
    // Process form data
    return { success: true }
  })
```

--------------------------------

### Define TypeScript Interfaces for Movie Data

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

This TypeScript code defines the data structures for movie information and the response format from the TMDB API. It includes interfaces for individual movies and the overall response object, specifying properties like ID, title, overview, poster path, release date, vote average, and popularity.

```typescript
// src/types/movie.ts
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
```

--------------------------------

### Object Form TransformAssetUrls with Cache Disabled (React Server)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Demonstrates using the object form of `transformAssetUrls` with `cache: false` for per-request asset URL transformations in a React server environment. This is useful when CDN URLs depend on request-specific data like headers. It imports necessary functions from '@tanstack/react-start/server'.

```tsx
// src/server.ts
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'
import { getRequest } from '@tanstack/react-start/server'

const handler = createStartHandler({
  handler: defaultStreamHandler,
  transformAssetUrls: {
    transform: ({ url, type }) => {
      const region = getRequest().headers.get('x-region') || 'us'
      const cdnBase =
        region === 'eu'
          ? 'https://cdn-eu.example.com'
          : 'https://cdn-us.example.com'
      return `${cdnBase}${url}`
    },
    cache: false,
  },
})

export default createServerEntry({ fetch: handler })
```

--------------------------------

### Object Form TransformAssetUrls with createTransform (React Server)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls

Illustrates using the `createTransform` property within the object form of `transformAssetUrls` for asynchronous, per-manifest computation transformations. This approach is suitable for fetching dynamic CDN bases before transforming multiple URLs. It emphasizes setting `cache: false` when per-request data is involved.

```ts
transformAssetUrls: {
  cache: false,
  async createTransform(ctx) {
    if (ctx.warmup) {
      // optional: return a default transform during warmup
      return ({ url }) => url
    }

    const region = ctx.request.headers.get('x-region') || 'us'
    const cdnBase = await fetchCdnBaseForRegion(region)
    return ({ url }) => `${cdnBase}${url}`
  },
}
```

--------------------------------

### Add Authoritative Attribution Meta Tags (React)

Source: https://tanstack.com/start/latest/docs/framework/react/guide/llmo

This snippet shows how to add authoritative attribution meta tags to a post route using TanStack Router. It includes the post title, author name, author profile URL, and publication time, which are signals of authority for AI systems.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.post.title },
      { name: 'author', content: loaderData.post.author.name },
      {
        property: 'article:author',
        content: loaderData.post.author.profileUrl,
      },
      {
        property: 'article:published_time',
        content: loaderData.post.publishedAt,
      },
    ],
  }),
  component: PostPage,
})
```

--------------------------------

### Dynamic SSR with Functional `ssr` Property in React

Source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

Demonstrates how to use a functional `ssr` property within a React route definition to conditionally disable server-side rendering based on route parameters and search criteria. The `ssr` function runs only on the server and is stripped from the client bundle. It receives validated `params` and `search` objects.

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/docs/$docType/$docId')({
  validateSearch: z.object({ details: z.boolean().optional() }),
  ssr: ({ params, search }) => {
    if (params.status === 'success' && params.value.docType === 'sheet') {
      return false;
    }
    if (search.status === 'success' && search.value.details) {
      return 'data-only';
    }
  },
  beforeLoad: () => {
    console.log('Executes on the server depending on the result of ssr()');
  },
  loader: () => {
    console.log('Executes on the server depending on the result of ssr()');
  },
  component: () => <div>This component is rendered on the client</div>,
});
```

--------------------------------

### Create React Form Component to Add Jokes (TypeScript)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This React component, written in TypeScript, provides a form for users to add new jokes. It utilizes the `useState` hook to manage the form inputs for question and answer, as well as the submission state and any errors. The `useRouter` hook from `@tanstack/react-router` is imported, though not explicitly used in the provided snippet. The form submits data to the `addJoke` server action.

```tsx
// src/components/JokeForm.tsx
import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { addJoke } from '../serverActions/jokesActions'

export function JokeForm() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="question"
          type="text"
          placeholder="Enter joke question"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <input
          id="answer"
          type="text"
          placeholder="Enter joke answer"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
        >
          {isSubmitting ? 'Adding...' : 'Add Joke'}
        </button>
      </div>
    </form>
  )
}

```

--------------------------------

### React Form Submission with Server Action (tsx)

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

This React component, JokeForm.tsx, handles user input for adding new jokes. It uses useState for managing form fields (question, answer) and submission state (isSubmitting, error). The handleSubmit function is triggered on form submission, calling the addJoke server action and then invalidating the router data to refresh the jokes list. Error handling is included for failed submissions.

```tsx
import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { addJoke } from '../serverActions/jokesActions'

export function JokeForm() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question || !answer || isSubmitting) return
    try {
      setIsSubmitting(true)
      await addJoke({
        data: { question, answer },
      })

      // Clear form
      setQuestion('')
      setAnswer('')

      // Refresh data
      router.invalidate()
    } catch (error) {
      console.error('Failed to add joke:', error)
      setError('Failed to add joke')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="question"
          type="text"
          placeholder="Enter joke question"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          id="answer"
          type="text"
          placeholder="Enter joke answer"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
        >
          {isSubmitting ? 'Adding...' : 'Add Joke'}
        </button>
      </div>
    </form>
  )
}
```

--------------------------------

### TanStack Router Loader with Caching Options

Source: https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs

Demonstrates how to define a route loader in TanStack Router that fetches data and specifies caching behavior using `staleTime` and `gcTime`. This pattern is similar to SWR, providing built-in data caching for server components.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  staleTime: 10_000, // Fresh for 10 seconds
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

--------------------------------

### TanStack Server Functions for Type-Safe RPC

Source: https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs

Shows the implementation of a TanStack Server Function for creating a post. It features input validation using Zod, middleware for cross-cutting concerns like authentication, and provides full type inference from input to output.

```tsx
export const createPost = createServerFn({ method: 'POST' })
  .validator(z.object({ title: z.string().min(1) }))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    // data is typed and validated
    // context comes from middleware, also typed
    return db.posts.create({ title: data.title })
  })
```

--------------------------------

### Next.js Server Actions for Server-Side Operations

Source: https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs

Illustrates a Next.js Server Action function designed to create a post. It uses the `'use server'` directive and accepts a `FormData` object, but lacks compile-time type safety for its inputs.

```tsx
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // No compile-time type safety on inputs
  return db.posts.create({ title })
}
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
