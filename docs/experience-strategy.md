# Experience Strategy

## Core Premise

Create a turn-based interactive narrative where each turn asks the player to trade between:

- obedience and defiance
- personal attachment and collective duty
- short-term safety and long-term transformation

## Format

- 8-15 minute playable "chapter slices"
- each turn: atmospheric scene + 2-3 consequential choices
- small stat model to make pressure legible
- branching endpoints with distinct visual/tonal payoff

## Play Loop

1. Scene arrives with a strong visual mood and compact text.
2. Player inspects current stats and memory log.
3. Player chooses one action.
4. Short transition animation resolves the choice.
5. Stats shift and branch advances.
6. Repeat until chapter ending.

## Stat Model (MVP)

- `Composure`: ability to endure stress and coercion
- `Defiance`: willingness to break assigned role
- `Kinship`: relational trust and solidarity

These should not map to "good/bad." They shape what endings become available.

## Visual Direction

- Materials: smoked glass, wet stone, oxidized metal, fungal glow
- Palette: deep teal, algae green, copper, bone
- Typography:
  - narrative title and scene headings: expressive serif
  - UI labels and controls: compact humanist sans
- Layout:
  - asymmetrical card and side panels
  - layered gradients and soft geometric haze
  - no flat monochrome screens

## Animation Direction (Short, Meaningful)

1. Entry drift  
Background particles and haze drift continuously to imply living atmosphere.

2. Turn transition  
Scene card crossfades over 180-300ms with slight scale shift.

3. Choice reveal  
Choice buttons stagger upward in 80ms intervals.

4. Stat response  
When a choice shifts stats, meters flash in accent color once.

5. Ending punctum  
One stronger animation per ending (pulse, fracture, or dissolve) to mark emotional resolution.

## Narrative Architecture

- Act 1: constrained domestic/ritual space
- Act 2: technical or ecological threshold
- Act 3: irreversible commitment

Each act should present one "soft" choice and one "hard" choice:

- soft: interpersonal, language, trust, framing
- hard: movement, sabotage, disclosure, sacrifice

## Production Plan

1. Vertical slice (current repo)
- 6-10 scenes
- 3 endings
- baseline atmosphere and transitions

2. Branch expansion
- 25-40 scenes
- reusable scene templates
- richer consequence tracking (flags + stat thresholds)

3. Art and sound pass
- animated background layers per biome
- low-frequency drones and sparse tactile cues
- ending-specific visual motifs

4. Authoring pipeline
- move scene data into JSON/YAML
- validation script for dead links and unreachable nodes
- content tags for pacing and theme balance

## Technical Recommendation

Start web-first for speed:

- plain HTML/CSS/JS for early iteration
- optional upgrade path:
  - narrative engine: Ink or custom JSON graph
  - rendering: PixiJS if richer 2D effects become necessary
  - animation: WAAPI/CSS first, GSAP only if needed

This gives a fast loop before committing to heavier engine overhead.
