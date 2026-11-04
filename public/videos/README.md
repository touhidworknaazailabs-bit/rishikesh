# Hero background video — sourcing

`hero-rishikesh.mp4` is a ~31-second, muted, looping 1080p background
video for the homepage hero, built from three real, high-quality drone
and ground clips of Rishikesh — all Pexels, free license, no
attribution required:

| Segment | Source |
|---|---|
| 0–10s: Close drone shot of turquoise river rapids with a rafting boat, mountains behind | Pexels, creator Ex Route Adventures — [source](https://www.pexels.com/video/a-river-with-rapids-and-mountains-in-the-background-19096561/) |
| 10–20s: Ground-level shot of the suspension bridge, Trayambakeshwar Temple and the Ganga's turquoise water, close and legible | Pexels, creator shalender kumar — [source](https://www.pexels.com/video/river-under-a-suspension-bridge-6595641/) |
| 20–31s: Wide sweeping drone aerial orbiting the temple-lined riverbank as the Ganga bends through town | Pexels, creator Nitin Khajotia — [source](https://www.pexels.com/video/a-river-with-rocks-and-buildings-in-the-background-19096741/) (this is an ~11s excerpt from a longer clip, taken from its clean tail section — the clip's earlier minutes show a different, siltier stretch of river and aren't used here) |

Re-encoded and concatenated with ffmpeg (h264, crf 26, ~16MB, 1920×1080,
25fps, audio stripped).

`hero-rishikesh-poster.jpg` is a frame from the first segment (the
rapids), used as
the `<video poster>` and as the static fallback shown instead of the
video when the visitor has `prefers-reduced-motion` set (see
`components/Hero.tsx`).

## Why these three

Earlier versions leaned on distant/hazy drone footage (fully aerial,
overcast, muddy-looking riverbanks) that read as murky rather than
inviting. This edit deliberately mixes a close ground-level shot with
two drone shots chosen specifically for clean daylight, vivid turquoise
water and legible landmarks (bridge, temple, rapids) — no hazy or
silt-heavy footage.

## Missing: Bajrang Setu (the glass-floor bridge)

Checked repeatedly — still no stock video of Bajrang Setu exists on
Pexels/Unsplash/Pixabay. It's too new (opened publicly in late 2025)
for stock footage libraries to have caught up; searches only return
news-article pages and YouTube videos, none of which are licensed for
reuse here. If the hotel has (or can get) real video of Bajrang Setu,
drop it in here and it can be added as a fourth segment.
