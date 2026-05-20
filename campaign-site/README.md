# Campaign Site — Placeholder

A static dummy campaign website modeled after the structure of edreece.com, built for a fictional candidate **Jordan Rivera for Westbrook City Council**. All names, quotes, endorsers, events, and contact info are placeholders.

## Run locally

No build step — open `index.html` directly, or serve the folder:

```bash
cd campaign-site
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — full single-page site
- `styles.css` — visual system (navy + gold, serif headings, sans body)
- `script.js` — mobile nav, donate amount selection, mock form handlers

## Sections (in order)

1. Sticky header + nav with Donate CTA
2. Hero — tagline, headline, candidate pull-quote, photo, CTAs
3. Credential strip (5 role bullets)
4. Email signup with ZIP capture
5. Priorities grid — "Back to Basics" (6 tiles)
6. Endorsements (grid + "see all" link)
7. About Jordan (photo + long-form bio)
8. Story / podcast feature
9. Upcoming events
10. Donate + Volunteer side-by-side cards
11. Contact form + socials
12. Footer with "Paid for by…" disclosure

## How to swap in real content

All copy lives in `index.html`. Search for these placeholders:

- `Jordan Rivera` — candidate name
- `Westbrook` — city
- `District 3` — office
- `Rivera & Co.` — business
- Endorser names inside `.endorser-grid`
- Event dates and venues inside `.events-list`
- Disclosure / FPPC ID in the footer

For the visual style, edit the `:root` color tokens at the top of `styles.css`.
