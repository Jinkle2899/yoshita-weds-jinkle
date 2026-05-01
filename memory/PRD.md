# Jinkle & Yoshita — Cinematic Wedding Invitation

## Problem Statement
Create a responsive, modern, beautiful web app for a wedding invitation that holds the emotions and makes anyone who sees it say "wow". Built in React + JavaScript.

## User Choices
- Couple: **Jinkle & Yoshita**
- Date: **26 November 2026**
- Venue: **Aashish Vatika, Udaipur, Rajasthan**
- Style: **Cinematic & dramatic** (deep tones, parallax, grand imagery)
- Sections: Hero, Our Story, Event Details, Schedule, Gallery, Registry/Gifts, Location Map, Our Journey, Raw & Unfiltered gallery
- RSVP: **Not needed** (frontend-only)

## Architecture
- **Frontend**: React 19, Tailwind CSS, Framer Motion (parallax + reveals), Lenis (smooth scroll)
- **Backend**: FastAPI template left untouched (no wedding APIs needed)
- **No DB writes, no auth, no 3rd-party integrations**
- **Design system**: Jewel & Luxury dark theme — #0A0A0A bg, #8B1C31 wine, #D4AF37 gold, Cormorant Garamond + Outfit fonts

## Files
- `/app/frontend/src/App.js` — root wrapping SmoothScroll + all sections
- `/app/frontend/src/components/wedding/` — Nav, Hero, OurStory, OurJourney, EventDetails, Schedule, GalleryCurated, GalleryRaw, Registry, LocationMap, Footer, SmoothScroll
- `/app/frontend/src/lib/weddingData.js` — WEDDING, MEDIA, JOURNEY, EVENTS constants
- `/app/frontend/src/index.css` — global styles, fonts, grain, gold shimmer
- `/app/frontend/tailwind.config.js` — extended font/color tokens
- `/app/frontend/public/index.html` — Google Fonts (Cormorant Garamond + Outfit) + title

## Implemented (Dec 2025)
- Full cinematic scroll experience with parallax hero, momentum scrolling (Lenis)
- Live countdown timer to 26 Nov 2026
- 8-link sticky glass nav + fullscreen mobile menu
- Journey timeline (5 chapters), Event list (5 ceremonies), 4-day Schedule
- Curated tetris gallery + Raw polaroid gallery with film-rotation hover
- Registry section (Your presence / Shagun / Honeymoon fund)
- Google Maps embed styled dark + travel tips (Fly / Stay / Arrive)
- Massive typographic footer + back-to-top
- 100% frontend test pass (iteration_1.json)

## Backlog (P1/P2)
- P1: RSVP form with admin dashboard (if couple changes mind)
- P1: Photo upload from guests (post-wedding memory wall)
- P2: Multi-language (Hindi / Marwari) toggle
- P2: Custom playlist / music player (Sangeet preview)
- P2: Live wedding-day streaming link section
- P2: Personalised invites with guest name via URL `/i/<slug>`
