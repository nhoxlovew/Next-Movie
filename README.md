# Next Movie

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/BetterAuth-Enabled-10B981?style=for-the-badge" alt="Better Auth" />
</p>

A modern movie discovery and streaming-style web app built with Next.js, React, Tailwind CSS, and Better Auth. The project showcases a premium home page, category-driven browsing, movie detail views, episode selection, search, and user authentication — all designed to feel like a polished entertainment portal.

## Overview

This application is a media catalog platform for browsing movies by:
- genre
- country
- release year
- search keyword
- trending/newly updated content

It uses a server-side API proxy layer to fetch movie metadata from an upstream movie service, then presents a clean client experience for browsing and watching. The app includes a theme toggle, responsive layout, user auth, and a cinematic hero carousel.

## Why this project exists

The project combines:
- a premium movie UI shell
- a structured movie browsing experience
- API abstraction for external movie data
- authentication and session handling
- modern frontend practices using App Router and TypeScript

This makes it a strong foundation for a production movie platform, content portal, or entertainment SaaS MVP.

---

## Features

- Cinematic landing page with rotating movie hero
- Genre-based content browsing
- Country and year filters
- Search modal with debounced requests
- Movie detail pages with episode and server selection
- Embedded video player support via HLS
- Responsive layout for desktop and mobile
- Light/dark theme support
- Email/password authentication with social login support
- SQLite-backed auth persistence via Better Auth
- Server-side API routes to proxy upstream content providers

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Better Auth
- SQLite (via better-sqlite3)
- Framer Motion
- HLS.js
- Zod + React Hook Form
- ESLint + Next.js linting

---

## Architecture

The project uses the Next.js App Router and follows a pragmatic layering model:

- `src/app` handles routing and page composition
- `src/app/api` provides proxy endpoints for upstream movie data
- `src/components` contains feature-rich UI modules
- `src/lib` contains auth and shared client configuration
- `src/type` defines TypeScript interfaces for API responses
- `src/constants` stores static mock/demo data used in UI
- `public` holds static assets and branding files

Typical workflow:
1. User loads the homepage
2. Client fetches recent movies and renders hero + grid
3. User navigates to a genre/country/year list
4. Server route proxies external API requests
5. Movie detail page loads metadata, poster, cast info, and episode list
6. User picks a server/episode and the player loads the media stream
7. Auth requests are handled via Better Auth and SQLite

---

## Project Structure

```text
next-movie/
├── src/
│   ├── app/
│   │   ├── (root)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── nam/
│   │   │   ├── phim/
│   │   │   ├── quoc-gia/
│   │   │   └── the-loai/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── nam/
│   │   │   ├── phim/
│   │   │   ├── phim-moi-cap-nhat/
│   │   │   ├── quoc-gia/
│   │   │   ├── the-loai/
│   │   │   └── tim-kiem/
│   │   ├── auth/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── app-sidebar.tsx
│   │   ├── login-form.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-user.tsx
│   │   ├── sreach.tsx
│   │   ├── footer/
│   │   ├── gerne/
│   │   ├── home-hero/
│   │   ├── movie-details/
│   │   ├── movie-grid/
│   │   └── ui/
│   ├── constants/
│   │   └── constants.ts
│   ├── hooks/
│   │   └── use-debounce.ts
│   ├── lib/
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── validations/
│   ├── type/
│   │   ├── genre-page.types.ts
│   │   ├── movie-details.types.ts
│   │   ├── movie-list.types.ts
│   │   └── sreach.type.ts
│   └── ...
├── public/
├── auth.db
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, yarn, or bun
- A modern browser
- Optional: a configured upstream movie API source

### Installation

```bash
git clone <your-repo-url>
cd next-movie
npm install
```

If you use another package manager:

```bash
pnpm install
# or
yarn install
# or
bun install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=your-super-secret-key
BETTER_AUTH_URL=http://localhost:3000/api/auth

# Optional social providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Notes:
- `BETTER_AUTH_SECRET` is required for secure session management
- `BETTER_AUTH_URL` should point to your auth API route
- Social login keys are optional and only used when configured
- `auth.db` is created automatically by the app when authentication is initialized

### Run in Development Mode

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## Usage Examples

### Browse the home page

```text
http://localhost:3000/
```

This loads the hero carousel and recent movie cards.

### Browse movies by genre

```text
http://localhost:3000/the-loai/hanh-dong
http://localhost:3000/the-loai/hoat-hinh
http://localhost:3000/the-loai/tinh-cam
```

### Browse by country

```text
http://localhost:3000/quoc-gia/my
http://localhost:3000/quoc-gia/us
http://localhost:3000/quoc-gia/kr
```

### Browse by year

```text
http://localhost:3000/nam/2024
http://localhost:3000/nam/2023
```

### Open a movie detail page

```text
http://localhost:3000/phim/ten-phim
```

You can also pass episode or server parameters when the app is configured to work with a specific stream:

```text
http://localhost:3000/phim/ten-phim?tap=1&server=1
```

### Auth flow

```text
http://localhost:3000/auth
```

This route includes:
- sign in
- sign up
- GitHub login
- Google login

---

## How the App Works

### Homepage workflow

The home page fetches a list of movies and renders:
- Hero carousel with featured movies
- Film grid with cards and metadata
- Responsive layout with navigation and theme support

### Search workflow

The search modal is debounced to avoid excessive requests:

- User types in the search box
- A small delay is introduced using a custom hook
- The frontend calls the backend search route
- The server forwards an upstream request to the movie API
- Matching results are displayed in the modal

### Genre/country/year workflow

Each route page:
- reads a slug from the URL
- requests details from a dedicated API route
- renders cards for the matched movies
- supports pagination and client-side loading states

### Movie detail workflow

The movie detail page:
- loads a movie item by slug
- extracts metadata like title, genre, background, poster, and content
- renders episode/server options
- loads the selected stream via the player

---

## API Layer

The project uses app routes as server-side proxies. This is ideal when:
- you need to hide upstream API keys
- you want to stabilize data formatting
- you need to improve cache control and request shaping
- you want to centralize upstream service concerns

Example routes:
- `/api/the-loai`
- `/api/quoc-gia/[slug]`
- `/api/nam/[year]`
- `/api/tim-kiem`
- `/api/phim-moi-cap-nhat`

These endpoints fetch external movie data and return structured JSON to the frontend.

---

## Authentication

Authentication is powered by Better Auth and uses a local SQLite database named `auth.db`.

### Supported modes
- email + password
- optional GitHub OAuth
- optional Google OAuth

### Auth configuration
The app stores auth configuration in:

```ts
src/lib/auth.ts
```

This file sets:
- database
- base URL
- secret
- trusted origins
- email/password mode
- social providers

---

## Deployment

### Recommended: Vercel

1. Push your project to GitHub
2. Import it into Vercel
3. Set Node.js version to 20
4. Add environment variables in Vercel Project Settings
5. Deploy

Environment variables for deployment:

```env
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-domain.com/api/auth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Notes for production
- Use a proper secret manager instead of hardcoded values
- Ensure your auth origin matches your public domain
- Use a persistent database if you expect real user growth
- Consider adding rate limiting and API caching for the upstream provider

---

## Troubleshooting

### 1. App does not start
Check that dependencies are installed:

```bash
npm install
```

Then run:

```bash
npm run dev
```

If you still see issues:
- ensure Node.js version is 20 or newer
- clear `node_modules` and reinstall
- check for lockfile drift

### 2. Auth errors
Common cause: missing `BETTER_AUTH_SECRET` or invalid auth URL.

Verify that your `.env.local` contains:

```env
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000/api/auth
```

### 3. Search returns empty results
This usually means:
- the upstream provider is temporarily unavailable
- the route configuration is wrong
- the request missing a required query parameter

Check the browser devtools network tab and the server logs.

### 4. Movie pages fail to load
Check whether the upstream provider is reachable and whether API routes are returning valid JSON. Many upstream movie APIs require a clean user-agent or may rate-limit requests.

### 5. Social login does not work
Ensure:
- OAuth app credentials are valid
- redirect URLs match exactly
- environment variables are set in the correct environment
- the app is deployed under the same origin used in the callback

### 6. Dark mode or styling feels broken
Make sure:
- `ThemeProvider` is wrapping the app
- `next-themes` is installed correctly
- CSS variables are loaded from `globals.css`

---

## FAQ

### Is this a complete streaming platform?
This project is a polished movie portal frontend with backend proxies and auth support. It is production-ready as a front-end foundation and can be extended into a full streaming platform with:
- subscriptions
- watch history
- favorites
- admin CMS
- payment integration

### Can I replace the upstream movie provider?
Yes. The app is structured to make upstream data sources independent from the UI layer. You can swap the provider in the route files under `src/app/api`.

### Is SQLite suitable for production?
SQLite is acceptable for local testing and small deployments, but for a high-traffic production environment, consider:
- PostgreSQL
- Supabase
- Neon
- PlanetScale

### Does this app support search?
Yes. The app includes a debounced search modal backed by the API route `/api/tim-kiem`.

### Can I add user roles?
Yes. Better Auth can be extended with custom claims, role checks, and server-side authorization patterns.

### Does it support mobile browsing?
Yes. The layout is responsive and built around modern Tailwind patterns.

---

## Contributing

We welcome contributions from the community.

### Development workflow

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-awesome-change
   ```
3. Make your changes
4. Run linting:
   ```bash
   npm run lint
   ```
5. Build the project locally:
   ```bash
   npm run build
   ```
6. Open a pull request with a clear description

### Contribution guidelines

- Keep commits focused and descriptive
- Prefer small, reviewable changes
- Update documentation when behavior changes
- Avoid breaking existing route or auth flows
- Maintain TypeScript safety and consistent styling
- Add comments only when they improve clarity

### Pull request checklist

- [ ] Code builds successfully
- [ ] Lint passes
- [ ] No console errors in local checks
- [ ] Auth flows still work
- [ ] Movie pages still render correctly
- [ ] Search and detail navigation still function
- [ ] Documentation updated where needed

---

## Recommended Roadmap

- Add user favorites/watchlist
- Add movie recommendation engine
- Add admin dashboard for content management
- Add subscription gating and user roles
- Improve caching and stale data handling
- Add end-to-end testing
- Add Docker support
- Add analytics and monitoring

---

## Notes

This project is a strong example of a modern Next.js entertainment portal with:
- server API proxying
- theme-ready UI
- polished movie browsing
- modern authentication
- extensible architecture

It is well-suited as a foundation for a real-world media application or a portfolio-grade project.

> This project currently does not appear to include a LICENSE file. If you plan to publish or distribute it publicly, add an appropriate license before release.

---

## Quick Start Summary

```bash
git clone <your-repo-url>
cd next-movie
npm install
cp .env.example .env.local
npm run dev
```

Then visit:

```text
http://localhost:3000
```

If you want an even more production-focused setup, deploy to Vercel and add the required environment variables there.
