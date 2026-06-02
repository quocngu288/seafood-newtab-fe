# Hai Huong Seafood — Website MVP

Next.js (App Router) + TypeScript + Tailwind CSS + next-intl (VI/EN).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — default locale is **Vietnamese** (`/vi`). English: `/en`.

## Routes

| Path | Page |
|------|------|
| `/` | Home (redirects to `/vi`) |
| `/vi`, `/en` | Home |
| `/vi/about`, `/en/about` | About |
| `/vi/products`, … | Products, Markets, News, Contact |

## Features (MVP)

- Header: logo, nav, search UI, language switcher (VI/EN)
- Hero carousel: 4 slides, auto-advance every 5s
- Feature cards (design match)
- Lower sections: About, Products, Stats, News, Contact CTA
- Footer
- Responsive layout (mobile hamburger menu)

## Placeholders

- Images: Unsplash
- `+` and "Xem thêm" buttons: no action yet
- Contact form: UI only

## Project structure

```
src/
  app/[locale]/     # Pages per locale
  components/       # UI components
  i18n/             # next-intl routing
  messages/         # vi.json, en.json
```
