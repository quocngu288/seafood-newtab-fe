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

## API & CMS

Backend API: `http://localhost:3001/api` (see `../backend`)

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**CMS Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

- Default login: `admin` / `admin123`
- Quản lý sản phẩm, tin tức, tin nhắn liên hệ
- Trang public (products, news, contact) gọi API; fallback JSON nếu API lỗi

## Placeholders

- Images: Unsplash
- `+` and "Xem thêm" buttons: no action yet

## Project structure

```
src/
  app/[locale]/     # Pages per locale
  components/       # UI components
  i18n/             # next-intl routing
  messages/         # vi.json, en.json
```
