# Nearby-attraction photos — licensing

These are mostly **not** photos of Hotel Chandreshwar itself — they're
public Rishikesh landmarks (temples, bridges, ghats, transit points) the
hotel doesn't independently own photography of. Sources are mixed:

- **Wikimedia Commons**, CC BY/BY-SA — REQUIRES the `credit` field in
  `data/attractions.ts` (photographer, license, license URL, source page
  URL), shown as an ⓘ badge by `components/PhotoCredit`. Do not drop it.
- **Pexels/Unsplash** — free license, no attribution required. No
  `credit` field; a one-line source note is kept in a code comment above
  the entry instead, for provenance only.
- **Supplied directly by the hotel/owner** — no attribution needed
  either; also just a code comment, no `credit` field.

If you swap one of these images out, either keep it Wikimedia-sourced and
update the matching `credit` object, or drop the `credit` field entirely
if it's a free-license/owner-supplied replacement — and update the table
below and the comment above that entry in `data/attractions.ts` so this
stays accurate.

| File | Subject | Source |
|---|---|---|
| triveni-ghat.jpg | Triveni Ghat (aerial, aarti platform visible) | Hotel-supplied |
| laxman-jhula.jpg | Laxman Jhula | Hotel-supplied |
| ram-jhula.jpg | Ram Jhula (night light installation) | Hotel-supplied |
| parmarth-niketan.jpg | Parmarth Niketan (night, "PARMARTH" signage visible) | Wikimedia, Sheikh Ershad, CC BY-SA 2.0 |
| beatles-ashram.jpg | Beatles Ashram ("Let It Be" mural) | Pexels, Tanuj Matta |
| neelkanth-mahadev.jpg | Neelkanth Mahadev Temple | Wikimedia, Anurodhraghuwanshi, CC BY-SA 3.0 |
| rajaji-national-park.jpg | Rajaji National Park (Asian elephant, representative — not geo-verified in-park) | Pexels, Sabik Nisam |
| swarg-ashram.jpg | Temples near Swarg Ashram | Wikimedia, Ken Wieland, CC BY-SA 2.0 |
| trayambakeshwar.jpg | Trayambakeshwar Temple (13-storey) | Hotel-supplied |
| local-markets.jpg | Local markets near Ram Jhula & Tapovan | Pexels, Aman Gairola |
| bajrang-setu.jpg | Bajrang Setu (night light installation) | Hotel-supplied |
| railway-station.jpg | Yog Nagari Railway Station | Hotel-supplied |
| aiims-hospital.jpg | AIIMS Hospital | Hotel-supplied |
| bus-stand.jpg | Bus Stand | Hotel-supplied |

## Still using a stock/generic photo, not a verified match

- **Neelkanth Mahadev Temple** and **Swarg Ashram** are still older
  Wikimedia photos (see above) — several Pexels/Unsplash candidates were
  tried for these but showed the *wrong* building/place entirely, so the
  original verified photo was kept rather than risk misleading a guest.
  Replace only with a photo confirmed to show the actual named place.
- **Rajaji National Park** uses a real Asian elephant photo that is
  representative of the park's wildlife but not confirmed to have been
  taken inside the park itself.
