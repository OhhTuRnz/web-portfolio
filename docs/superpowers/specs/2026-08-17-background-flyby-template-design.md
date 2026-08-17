# Background Flyby Template Design

## Goal

Remove the incorrect tumbling Kerbal from the live portfolio while preserving a generic design reference for a possible background flyby implemented later.

## Live-site changes

- Keep the humanoid point-cloud visualization in the hero section unchanged.
- Keep the shooting-star canvas and its animation unchanged.
- Delete the inline Kerbal SVG from `src/layouts/Layout.astro`.
- Delete the Kerbal flight scheduler and animation-control script.
- Delete the Kerbal-specific selectors, keyframes, custom properties, and reduced-motion rule.
- Leave no Kerbal-specific markup, styling, or behavior in production source.

## Future template

The future flyby remains a documentation-only pattern, not an inactive component or feature flag. A later implementation should supply its own visual asset and follow this lifecycle:

1. Render one decorative, non-interactive object behind page content.
2. Keep the object hidden until a scheduled flyby begins.
3. Randomize direction, vertical position, duration, and optional rotation within restrained bounds.
4. Animate the object across the viewport using compositor-friendly transforms.
5. Schedule the next pass only after the current animation finishes.
6. Disable the effect when `prefers-reduced-motion: reduce` is active.

The template intentionally defines no SVG, image, or character design.

## Validation

- Search runtime source and confirm no Kerbal-specific references remain.
- Run the offline production build.
- Verify the hero humanoid still renders.
- Verify shooting stars remain active for users without reduced-motion preferences.
- Verify no background character or flyby appears.

## Out of scope

- Designing a replacement spacecraft, astronaut, satellite, or character.
- Changing the humanoid visualization.
- Changing shooting-star appearance or timing.
- Adding a dormant runtime component or feature flag.
