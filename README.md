# Hotel Chandreshwar

Production-ready hospitality website for Hotel Chandreshwar, Rishikesh —
built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and
Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing hotel info

All hotel facts (contact numbers, address, room counts, pricing) live in
[`data/hotel.ts`](data/hotel.ts) — nothing else should be hard-coded.
Room content is in [`data/rooms.ts`](data/rooms.ts), FAQs in
[`data/faq.ts`](data/faq.ts), gallery images in
[`data/gallery.ts`](data/gallery.ts), and Rishikesh guide articles in
[`data/guide.ts`](data/guide.ts).

## Photography

See [`public/images/README.md`](public/images/README.md) for what's real,
what's still a placeholder, and how to swap in new photos.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the live domain before deploying — it drives
canonical URLs, the sitemap, robots.txt and Open Graph metadata.

## Production build

```bash
npm run build
npm start
```
