# Photography status

Real photographs supplied by the hotel are now in place for the hero, all
room cards, room detail pages, and gallery.

## What's still a placeholder

- `property/location-1.svg` — a street-level / neighbourhood photo of
  Chandreshwar Nagar was not supplied. Used only on the homepage's
  "Stay Close to Rishikesh" destination section.

To replace it, drop a real photo in as `property/location-1.jpg` (or
`.webp`) and update the one reference in `app/page.tsx`.

There is currently **no exterior/building photo anywhere on the site**.
The only one ever supplied (`property/exterior-1.jpg`, a crop from the
hotel's printed business card) was low-resolution and visibly poor
quality once shown at normal web sizes, so it was removed sitewide
(About page, Location page, Gallery, and two Rishikesh Guide articles —
see git history for exactly what each was replaced with or simplified
to). Re-add a real exterior photo here once the owner supplies one, and
wire it back into those five spots.

## Known gaps worth asking the owner for

- A dedicated, well-lit exterior photo (see above — there is currently
  none in use anywhere on the site).
- Bathroom photos — none of the supplied photos show a bathroom, even
  though every room has one.
- A photo distinguishing an AC room from a Non-AC room — none of the
  supplied photos are labeled by room, so `data/rooms.ts` currently
  reuses generic double-bed-room photography for both room types
  (choosing shots where the wall AC unit isn't in frame for the
  Non-AC room, without claiming any specific photo is "the" Non-AC
  room).

## Where each image is referenced

| Folder | Used by | Data file |
|---|---|---|
| `hero/` | Homepage hero background | `components/Hero.tsx` |
| `rooms/` | Room cards + room detail pages | `data/rooms.ts` |
| `gallery/` | Gallery + supporting sections | `data/gallery.ts` |
| `property/` | Homepage destination section | referenced directly in `app/page.tsx` |

Raw, unprocessed originals (as supplied over WhatsApp) are kept outside
the web-served folder, in `.source-photos/` at the project root (not
committed — see `.gitignore`), in case any need to be re-cropped.
