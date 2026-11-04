# Hero background video — sourcing

`hero-rishikesh.mp4` is a ~32-second, muted, looping 1080p background
video for the homepage hero, built from two real, high-quality,
**moving** (not locked-off) clips of Rishikesh — both Pexels, free
license, no attribution required:

| Segment | Source |
|---|---|
| 0–18s: Drone ascending/pulling back over a suspension bridge crossing the Ganga, revealing more of the riverside town and mountains as it climbs — bridge stays prominent in frame throughout, camera movement is continuous and dramatic | Pexels, creator Nitin Khajotia — [source](https://www.pexels.com/video/aerial-view-of-a-city-with-a-bridge-over-a-river-16195456/) (4K vertical original, cropped to a landscape window that tracks the bridge through the ascent) |
| 18–32s: Golden-hour drone flythrough continuing past the Ganga, Trayambakeshwar Temple and the bridge | Pexels, creator Nitin Khajotia — [source](https://www.pexels.com/video/a-river-with-rocks-and-buildings-in-the-background-19096741/) (4K original, this is a ~15s excerpt from a longer clip) |

Re-encoded with ffmpeg (h264, crf 26, ~15.7MB, 1920×1080).
`hero-rishikesh-poster.jpg` is the first frame, used as the
`<video poster>` and as the static fallback shown instead of the video
when the visitor has `prefers-reduced-motion` set (see
`components/Hero.tsx`).

### Why this specific pairing

Earlier versions had a first segment that was either fully static
(locked-off dusk shot) or only subtly panning — not a convincing
"moving shot" of the bridge. This version's first segment is a
vertical drone clip that was originally shot ascending/pulling back
over the bridge; cropped to a landscape window that follows the same
flight path, it keeps the bridge prominent in frame from the first
frame to the last while the camera movement stays unambiguous —
confirmed by comparing frames across the full clip, which show the
view progressively widening to reveal more of the city and mountains
as the bridge itself stays put in the lower third of the frame.

## Missing: Bajrang Setu (the glass-floor bridge)

Checked repeatedly — still no stock video of Bajrang Setu exists on
Pexels/Unsplash/Pixabay. It's too new (opened publicly in late 2025)
for stock footage libraries to have caught up; searches only return
news-article pages and YouTube videos, none of which are licensed for
reuse here. If the hotel has (or can get) real video of Bajrang Setu,
drop it in here and it can be added as a third segment.
