# Vitreous Turnbook

An experimental, turn-based narrative game concept inspired by the thematic DNA of *Our Vitreous Womb*:

- controlled societies and ritualized hierarchy
- body autonomy vs duty
- ecological interdependence and sacrifice
- intimate scale choices against civilizational stakes

This repo includes:

- `docs/text-scan-notes.md`: distilled motifs and design hooks from the text scan
- `docs/experience-strategy.md`: playable experience strategy and production plan
- `web/`: a small animated branching prototype you can run locally

## Run The Prototype

```bash
cd /Users/ab/Documents/10_Active_Projects/coding_projects/vitreous-turnbook
python3 -m http.server 4173
```

Open `http://localhost:4173/web/`.

## Why This Shape

The first build focuses on a compact "scene card + choices + animated atmosphere" loop. It keeps iteration speed high while proving:

- emotional tone
- readability of choices
- visual rhythm with short animations
- branch clarity before scaling to a full narrative graph
