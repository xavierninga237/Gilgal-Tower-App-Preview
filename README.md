# Gilgal Tower, App Preview

A standalone, interactive **web preview of the Gilgal Tower customer app**. It is
separate from the main website and from the Android build. Deploy it on Vercel to
show clients how the mobile app looks and works.

Live experience: a full mobile web app, full-width on phones and centred at mobile width on desktop (no phone frame), with:

- **Home** — hero, quick actions, featured rooms, and the spaces (Conference Hall,
  Erica Ballroom, Rooftop Lounge)
- **Rooms** — every room with filters, price, specs and availability
- **Room detail** — image gallery, full description, amenities and specs
- **Book** — choose a room, pick dates on a calendar (past days shown in red),
  set guests, choose Cameroon / abroad, then send the request on WhatsApp
- **Settings** — English / French switch, notification toggles, contact details,
  and an About section with description, address and version

It uses the same rooms, prices, descriptions and WhatsApp booking logic as the
website, follows the same rules (Hotel Rooms, no offices, Rooftop Lounge), and
works with **no backend** (all state is in the browser).

## Deploy on Vercel

1. Push this folder to your Git repository.
2. On Vercel: New Project → import the repo → Framework preset **Next.js** →
   Deploy. No environment variables are needed.

Built on Next.js 14.2.35 (patched), React 18, Tailwind CSS. Fully client-side,
so it builds and deploys cleanly.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Notes

- This is a **preview**, not a published Play Store / App Store app.
- To change rooms, prices or descriptions, edit `lib/rooms.ts`.
- To change contact details or WhatsApp numbers, edit `lib/site.ts`.
- French wording lives in `lib/i18n.tsx` and `lib/rooms.ts`.
