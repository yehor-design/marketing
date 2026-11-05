# Jet tokens

Measured in Chrome (headless) against https://jet.framer.website on 5 Nov 2026, and checked against the published CSS. Computed values are `getComputedStyle`. Authored values are the stylesheet or inline style. Nothing here is a guess filled in for a value that was not read.

## Breakpoints

The page sets these in `style[data-framer-breakpoint-css]` and `style[data-framer-html-style]`:

| Range | Media query | `:root` font-size | Computed `font-size` on `<html>` |
| --- | --- | --- | --- |
| Desktop | `(min-width: 1200px)` hides `.hidden-72rtr7` and `.hidden-1f43tpi`. There is no `min-width: 1200px` rule on the font size itself. The base rule applies here because the two queries below override it. | `125%` | `20px` at a 1440px viewport |
| Tablet | `(min-width: 810px) and (max-width: 1199.98px)` hides `.hidden-1bn0ntr` and `.hidden-1h55yeb` | `112.5%` | `18px` at a 1024px viewport |
| Phone | `(max-width: 809.98px)` hides `.hidden-1y1ena2` and `.hidden-tsxcai` | `87.5%` | `14px` at a 390px viewport |

Layout frames follow the same edges. In the home stylesheet, `@media (min-width: 810px) and (max-width: 1199.98px)` sets the page frame width to `810px`, and `@media (max-width: 809.98px)` sets it to `390px`. The desktop frame width is the unscoped rule.

`125%` of a 16px user-agent default is 20px, `112.5%` is 18px, and `87.5%` is 14px. The px column is what Chrome computed. The percentage is what the CSS says.

Body background, from `:root body { background: var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6) }`, computed `rgb(0, 0, 0)`.

The reset also sets `body, input, textarea, select, button { font-family: sans-serif; font-size: 12px }`. Computed `font-family` on `body` is `sans-serif`. Visible text overrides that per element.

## Colors

Eighteen `--token-*` custom properties are set on `body`. Computed color is from assigning `color: var(--token)` to a probe element at 1440px. Chrome rounds some alpha channels (authored `#ffffff4d` is 77/255 ≈ 0.302, computed `0.3`).

| Token | Authored | Computed |
| --- | --- | --- |
| `--token-bb3f9735-47c4-4ac2-b002-c5446021aee6` | `#000` | `rgb(0, 0, 0)` |
| `--token-4fef9130-aa55-4351-8ed5-cfba481137a7` | `#fff` | `rgb(255, 255, 255)` |
| `--token-19e7a84f-9c9f-4761-ac3b-54ec81f5f8e0` | `#00e6c5` | `rgb(0, 230, 197)` |
| `--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979` | `#ffffff80` | `rgba(255, 255, 255, 0.5)` |
| `--token-311dfa1b-5054-44c6-8b55-ece1611bbe6a` | `#ffffff4d` | `rgba(255, 255, 255, 0.3)` |
| `--token-fa07d228-afbe-4fad-9a44-2fb0dadd2a5e` | `#171717` | `rgb(23, 23, 23)` |
| `--token-04a04e54-cbd8-4312-8418-e1527ef396e1` | `#333` | `rgb(51, 51, 51)` |
| `--token-361e1224-4029-4612-a297-51f349511b71` | `#ffffff1a` | `rgba(255, 255, 255, 0.1)` |
| `--token-1e61b8ec-fb03-4d71-8889-99c84f72af30` | `#d85ce0` | `rgb(216, 92, 224)` |
| `--token-70af50e6-b68b-4785-a006-3affe73027af` | `#29c2ff` | `rgb(41, 194, 255)` |
| `--token-11d9ea5f-97fd-4136-81df-b44c454e15b1` | `#0c0c0c` | `rgb(12, 12, 12)` |
| `--token-dcd7ab3c-f32b-409a-9ff2-c162bb1c4a45` | `#e0cd3a` | `rgb(224, 205, 58)` |
| `--token-9180da58-fe0a-487d-95b2-14f464c7692a` | `#000000e6` | `rgba(0, 0, 0, 0.9)` |
| `--token-b3e2223f-6504-416a-9959-e8753674e4b2` | `#080808` | `rgb(8, 8, 8)` |
| `--token-ab91763a-bd8d-4b8f-92c1-f89e2462855c` | `#1c1c1c` | `rgb(28, 28, 28)` |
| `--token-54d5892b-0224-424e-b224-359f05491e1f` | `#000000bf` | `rgba(0, 0, 0, 0.75)` |
| `--token-22e7e14f-1f70-49cd-ae98-e88c20549e6b` | `#ffffff08` | `rgba(255, 255, 255, 0.03)` |
| `--token-1e8433a6-dbc9-469b-bb1a-972dd419d298` | `#db2c2c` | `rgb(219, 44, 44)` |

`var()` fallbacks in the CSS repeat these as `rgb()` / `rgba()`.

Where they show up, from computed styles and the presets below:

- Page background and several canvas backgrounds: `#000`.
- Headings: `#fff`.
- Accent (HIRING, the “NEW” label): `#00e6c5`.
- Hero subtitle and muted body: `#ffffff80`.
- Form field background: `#171717` (computed `rgb(23, 23, 23)` on the input wrapper).
- Mobile menu surface: `#000000e6`.
- HIRING shimmer band: `#000000bf`.
- Dashed stroke on nav buttons: `#333`.

## Fonts

`@font-face` in `style[data-framer-font-css]` loads:

| Family | Weights | Notes |
| --- | --- | --- |
| Geist | 400, 500 | Form fields and the blog blockquote preset. |
| Geist Variable | 100–900 | Bold face of the blockquote preset. Not the display face. |
| Geist Mono | 500, 700 | Badges and small labels. |
| Fragment Mono | 400 | Code blocks only (`--sp-font-mono`). |
| Inter | 400, 700 | Reset preset. Not the visible UI face. |
| Raveo Variable Variable | 1000 | The face actually used for headings, nav, buttons, and body copy. File `JEdA86oNqHX1i1CLD92Q7jTxV8.woff2` on framerusercontent. |
| Berzulis-PIZIUS | 400 | Loaded. Not used by the measured UI text. |

`document.fonts` on the homepage: Raveo Variable Variable 1000 and Geist Mono 500 were `loaded`. Geist, Geist Variable, Geist Mono 700, Fragment Mono, Inter, and Berzulis were registered and `unloaded` (nothing on that page asked for them yet). On `/contact`, `document.fonts.check("14px Geist")` was true. On `/blog/the-ultimate-guide-to-core-web-vitals`, `document.fonts.check("14px 'Fragment Mono'")` was true and the `<pre>` computed family was `"Fragment Mono", monospace`.

Computed `font-variation-settings` were not sampled. The axes below are the authored `--framer-font-variation-axes` on the preset.

## Type sizes

Headings use `calc(var(--framer-root-font-size, 1rem) * N)`. `--framer-root-font-size` is not given a px value in the CSS. It resolves with the root font size above, so N × 20px at 1440, N × 18px at 1024, and N × 14px at 390.

Computed samples are the first element of that tag that Chrome returned. At 390 the first `h3` is the mobile nav “Blog”, not the desktop card heading.

| Sample | 1440 | 1024 | 390 |
| --- | --- | --- | --- |
| `h1` “Lightning fast sites. In a single click.” | 70px / 77px / -2.8px | 63px / 69.3px / -2.52px | 49px / 53.9px / -1.96px |
| `h2` “Accelerate your website with Jet.” | 32px / 38.4px / -0.32px | 28.8px / 34.56px / -0.288px | 22.4px / 26.88px / -0.224px |
| first `h3` | “Better user experience” 24px / 33.6px / -0.24px | “Blog” 25.2px / 32.76px / -0.252px | “Blog” 19.6px / 25.48px / -0.196px |

All three are `"Raveo Variable Variable", sans-serif`, computed `font-weight: 1000`, color `rgb(255, 255, 255)`. Columns are font-size / line-height / letter-spacing.

Authored presets that match those samples (`--framer-font-*`):

| Preset | Use | Family | Size | Weight | Line height | Letter spacing | Axes | Color |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `framer-styles-preset-18nb0d4` | h1 | Raveo Variable Variable | `calc(root * 3.5)` | 1000 | 1.1em | -0.04em | opsz 14, wght 550 | white token |
| `framer-styles-preset-1kz9fdj` | h2 at 1.6 | Raveo | `calc(root * 1.6)` | 1000 | 1.2em | -0.01em | opsz 14, wght 550 | white token |
| `framer-styles-preset-12vhwqu` | 1.4, the mobile “Blog” h3 | Raveo | `calc(root * 1.4)` | 1000 | 1.3em | -0.01em | opsz 14, wght 550 | white token |
| `framer-styles-preset-1mvjsmq` | desktop h3 at 1.2 | Raveo | `calc(root * 1.2)` | 1000 | 1.4em | -0.01em | opsz 14, wght 550 | white token |
| `framer-styles-preset-2pjocb` | nav label | Raveo | 12px | 1000 | 1.6em | 0em | opsz 14, wght 500 | white token |
| `framer-styles-preset-d4fts2` | muted body | Raveo | 16px | 1000 | 1.5em | 0em | opsz 14, wght 450 | white 50% token |
| `framer-styles-preset-yplpmu` | body | Raveo | 16px | 1000 | 1.5em | -0.01em | opsz 14, wght 550 | white token |
| `framer-styles-preset-axtltf` | larger muted | Raveo | 18px | 1000 | 1.5em | -0.01em | opsz 14, wght 450 | white 50% token |
| `framer-styles-preset-ujo3da` | | Raveo | 14px | 1000 | 1.5em | 0em | opsz 14, wght 550 | white token |
| `framer-styles-preset-c9mga6` | | Raveo | 14px | 1000 | 1.5em | 0em | opsz 14, wght 450 | white token |
| `framer-styles-preset-1klae7r` | HIRING | Geist Mono | 12px | 500 | 1.6em | 0.02em | normal | white token, then the instance sets the accent |
| `framer-styles-preset-adl1m0` | tiny mono | Geist Mono | 9px | 500 | 1.6em | 0.02em | normal | white token |
| `.text-styles-preset-reset` | rich-text reset | Inter | 16px | 500 | 1.2em | 0 | | `#000` |

The h1 preset also sets `--framer-font-open-type-features: "tnum" on`.

Other computed text at 1440:

- Hero subtitle “No code, no hassle. Jet simply keeps your website blazing fast 24/7.”: Raveo, 16px, weight 1000, line-height 24px, letter-spacing `normal`, color `rgba(255, 255, 255, 0.5)`.
- Nav “Blog” (first `p` on the desktop homepage): Raveo, 12px, weight 1000, line-height 19.2px, letter-spacing `normal`, color `rgb(255, 255, 255)`.
- Primary button letter (“J” inside the rolling label): Raveo, 14px, weight 1000, line-height 23.8px (1.7em), letter-spacing `normal`, color `rgb(0, 0, 0)`. The `<a>` itself computes to `sans-serif` 12px and link blue `rgb(0, 0, 238)`; that is the anchor, not the visible label.
- HIRING: Geist Mono, 12px, weight 500, line-height 19.2px, letter-spacing 0.24px (0.02em), color `rgb(0, 230, 197)`.
- Contact input: family `Geist` (computed as the single name `Geist`), 14px, weight 400, line-height 16.8px, letter-spacing `normal`, color `rgb(255, 255, 255)`, padding 12px. Authored variables: `--framer-input-font-family: "Geist"`, size 14px, weight 400, line-height 1.2em, letter-spacing 0em, padding 12px.
- Contact submit button element: radius 20px, background `rgb(255, 255, 255)`, color `rgb(0, 0, 0)`, padding `0px 18px`, the button’s own font `sans-serif` 12px. The visible label is a child.
- Blog `<pre>`: Fragment Mono, 14px, line-height 21px. Authored `--sp-font-mono: "Fragment Mono", monospace`, `--sp-font-size: 14px`, `--sp-font-lineHeight: 1.5em`.
- Blockquote preset `framer-styles-preset-10vrsm2` (blog): family Geist, bold family Geist Variable, size 16px, weight 500, bold weight 400, line-height 1.5em, letter-spacing 0em, color the white 50% token. Computed blockquote metrics were not sampled.

## Radii

Computed `border-radius` on the homepage at 1440, with one element that had that value:

| Value | Where |
| --- | --- |
| `0px` | Headings and most text. |
| `4px` | The careers count badge whose text is “8”, and a layer named Border. |
| `6px` | Nav buttons “Contact” and “Join waitlist”. Dashed-stroke wrappers in the SSR also set `border-radius: 6px`. |
| `8px` | Contact field wrapper `.framer-form-input-wrapper` (background `rgb(23, 23, 23)`). The `<input>` itself computed `0px`. Authored `--framer-input-border-radius-*-*: 8px`. |
| `10px` | The Framer “Get template” badge (layer Desktop) and a layer named Backdrop. |
| `11px` | Layers named Bottom and Border. |
| `20px` | Primary (“Join waitlist”) and Secondary (“Learn more”) buttons, and the contact submit button. |
| `50px` | The “NEW: 2025 JUNE UPDATE” icon. |
| `100px` | Layers named BG and Icon. |
| `188px` | Layer Icon Wrap. |
| `50%` | Layer Icon Holder. |

Authored inline or CSS values that were not in that homepage computed set:

- `13px` on the transparent dashed-border wrapper (`min-width: 20px; min-height: 20px`) on about, blog posts, career roles, and update posts.
- `15px` on that same kind of wrapper on `/pricing`.
- `16px` on that same kind of wrapper on `/checkout`.
- `4px` as `--sp-border-radius` on code blocks, and as `border-radius: 4px` next to a 4px focus ring.
- `8px` on a code-block surface (`--sp-colors-surface1`).
- `0`, `0px`, and `inherit` are the common inline values.
- Blockquote and link text-background radii are `var(--framer-blockquote-text-background-radius, …)` and `var(--framer-link-text-background-radius, initial)`. The resolved px of those variables was not read.

## Not read

- Computed `font-variation-settings` (the opsz/wght numbers above are the preset CSS, not a computed sample).
- Computed size of a `<blockquote>` element.
- Which element uses the `11px`, `100px`, `188px`, and `50%` radii beyond the layer name.
- A literal `min-width: 1200px` font-size declaration. Desktop font size is the base `125%` rule.
