# Jet motion

Each effect below is what is on https://jet.framer.website. “Authored” is the prop in the published component module. “Seen” is a Chrome observation at 1440×900 unless a width is named. If a named effect does not actually move, that is said here.

The page sets `data-framer-appear-animation="no-preference"`, so these run when the user has not asked for reduced motion.

## TextGlitch

Used on nav links (`framer-Iti5Q`) and footer links (`framer-Sl0r4`).

- Trigger: hover. Resting `glitch` is false. The hover variant sets `glitch` true and changes `color` from the white 50% token (`rgba(255, 255, 255, 0.5)`) to the white token (`rgb(255, 255, 255)`).
- Authored: duration 300ms, speed 50ms (the scramble interval), scramble 20%. Characters are `A–Z a–z 0–9` plus `!@#$%^&*()_+-=[]{}|;:,.<>?`. Font is Raveo 12px, weight 1000, line-height 1.6em, letter-spacing 0, variation opsz 14 / wght 500.
- What changes: about one in five non-space characters is replaced on each interval, then the original string returns when the duration elapses. The component skips the scramble unless Framer’s render target is preview.
- Seen: hovering “Blog” left the word intact at 120ms (still `rgba(255, 255, 255, 0.5)`). By ~340ms the text was `Bmog` and the color was `rgb(255, 255, 255)`. The scramble does run on the published site, so the preview guard is not blocking it there.

The component’s own defaults, if a caller omitted the props, would be duration 1200ms, speed 40ms, scramble 100%. The nav and footer do not use those defaults.

A separate TextGlitch instance in the page module is authored with `glitch: true` at rest, scramble 10%, speed 60ms. That one was not isolated on screen.

## TextShimmer

Visible on the HIRING badge.

- Trigger: it starts on its own and repeats. There is a second `<p>` with `aria-hidden="true"` laid over the text.
- Authored props on that instance: color accent `#00e6c5`, shimmer token `#000000bf`, delay 1.5, direction `right`, rotation 100deg, size 30, speed 10, tag `p`, Geist Mono 12px / 500 / letter-spacing 0.02em / line-height 1.6em.
- The component’s formula is `duration = (11 - speed) + delay` seconds, linear, infinite. The keyframes hold `background-position` until `delay / duration`, then move. For delay 1.5 and speed 10 that is 2.5s with a hold through 60%.
- Seen: the stylesheet the page inserted is not 2.5s. It is `animation: shimmer-text-shimmer-… 3s linear infinite`, holding `background-position: 200%` until `66.666…%`, then moving to `-100%`. The gradient is `100deg`, transparent from 0–41% and 59–100%, with the black 75% token at 50%. That 41/59 band is what size 30 produces (`50 ± 30 × 0.3`). The visible HIRING text stays `rgb(0, 230, 197)`; the shimmer is the overlay. A 3s duration is the same formula with delay 2, not the delay 1.5 in the module. The inserted CSS is what runs.

## RollingText

Used by button `framer-2X62i` (Primary, Secondary, Nav Button Primary, Nav Button Secondary, Primary Small, Secondary Small, Oversized).

- Trigger: hover sets state `Roll` on every one of those variants. Resting state is not Roll.
- Authored: transition `{ type: spring, duration: 0.4, bounce: 0, delay: 0 }`, stagger 25, reverse false. Each letter’s `y` goes from `0%` to minus one line-height. A `text-shadow` one line below paints the copy that rolls into view. Per-letter delay is `duration / letterCount * index * (stagger / 100)`.
- The button shell uses a second spring, `{ bounce: 0.2, delay: 0, duration: 0.4 }`.
- Seen: the visible “Join waitlist” letters are Raveo, 14px, weight 1000, line-height 23.8px, color `rgb(0, 0, 0)`. The button’s radius is 20px and its background is white. Before hover every letter transform was `none`. About 580ms after hover the first six letters were translated by roughly -7.6, -6.1, -4.5, -3.1, -1.8, and -0.7 px. That is mid-spring, staggered, toward a destination of -23.8px. The button chrome does not move; the letters do.

Button `framer-O88Xk` keeps state `Default` on hover, so its label does not roll.

## Dither

Canvases are in the SSR with `aria-label`s. The effect is a stepped brightness redraw on a 2D canvas, not a CSS tween. Interval is the gap between redraws.

Three instances:

1. Ordered, animation enabled, `canvasPreview` false, intensity 40, interval 0.08s, brightness -20, pixel size 4, threshold 140, midtones 48, glow 0, radius 0. Labels include the rocket, the satellite, the old computer, and “optimized settings”.
2. Random, animation off at rest, `canvasPreview` true, intensity 10, interval 0.1s, brightness 58, pixel size 2, threshold 118, midtones 59. The hover variant `vU0jij3HY` turns animation on at intensity 5, interval 0.2s. Labels include the magic wand, the podium, the lightning, and the stacked coins.
3. Ordered, nested, animation off, intensity 20, interval 0.08s, brightness 29, pixel size 3, threshold 90, midtones 87, white dot.

The component draws once and does not start the animation frame loop when `hasRestrictions()` is true and `canvasPreview` is false. `hasRestrictions()` was not called from the page.

Seen: an ordered canvas and a random canvas were pixel-identical across two screenshots 450ms apart, so the resting jitter is not running. Hovering the random canvas and shooting again at 500ms and 900ms also produced identical frames, so that hover jitter was not visible in the sampled region. Instance 3 was not shot on its own; its animation prop is off.

## GodRays and Pulser

There is no layer named GodRays. The named layer is Pulser, a variant of the animated-background component that mounts GodRays (`framer-adCyo`, variant `DkJYqhgVo`, class `framer-v-1js5mkj`). One canvas, opacity 1, about 1168×382 on the homepage.

- Authored base: colors `rgb(0, 230, 197)` and `rgb(50, 82, 77)`, colors mode Custom, preset Custom, speed 5, frequency 0, spotty 2.5, offset Y 0.49, density 0.5, color back black.
- Pulser overrides: `canvasPreview` false, center intensity 0.47, center size 0.8, density 1, offset Y 0.54, spotty 0.8. It does not override speed.
- The shader speed is forced to 0 when `canvasPreview` is false and `hasRestrictions()` is true. Otherwise it is a continuous `requestAnimationFrame` loop. There is no CSS duration or easing. Time advances by `delta * speed`.
- Seen: two screenshots of the Pulser canvas 450ms apart were different, so this canvas is moving on the published site. The speed-0 branch is not what ran on this load.

A sibling gradient in the same component is authored with `hue-rotate(0deg)`. The homepage also references mask SVG `https://framerusercontent.com/images/d2XF9ufkkUPltjFDP7rAY9pOTQ.svg`. That SVG was not isolated as the Pulser mask in the browser.

## Hovers

- Nav and footer links: TextGlitch, above. Resting dashed strokes in the SSR are `opacity: 0`, `stroke-dasharray: 6, 4`, `animation: none`, radius 6px, stroke the `#333` token. After hydration, `getAnimations()` showed SVG animations at 1000ms, linear, infinite. The animation targets were unnamed SVG elements, so those running dashes were not tied to a specific link.
- Primary and the other `framer-2X62i` variants: RollingText, above.
- `framer-O88Xk` does not roll. Its dashed overlay fades with `opacity 0.4s cubic-bezier(.4, 0, .2, 1)` when the border props change, then the dash travels. Which on-screen control that is was not hovered separately.
- FAQ rows have a hover variant on the closed state. The hover background was not measured.
- Random dither hover: authored, not visible in the sample above.
- “What’s this?” and “Background variations” are opacity-0 labels in the HTML. They are not resting paint.

## Mobile menu

Nav component `framer-ktGc7`. Variants: Desktop `O3CtLBFX8`, Desktop Active CTA `ZnSLVplic`, Mobile Closed `Otiz3JbIx` (`framer-v-18880lb`), Mobile Open `aIfq9yxhP` (`framer-v-1s9kptw`). Inner pages use Desktop Active CTA.

- Trigger: a control named Menu. Open sets Mobile Open immediately. Close waits 50ms, then sets Mobile Closed.
- Authored transitions: `{ bounce: 0.2, delay: 0, duration: 0.4, type: spring }` and `{ bounce: 0, delay: 0.1, duration: 0.4, type: spring }`.
- SSR surface for the closed mobile nav: `backdrop-filter: blur(5px)`, background the `#000000e6` token.
- Seen at 390px: before the click the nav was “Mobile Closed”, height 64. After the click it was “Mobile Open”, height 844, with Blog, Updates, Pricing, About, Careers, and Join waitlist in the text. The spring itself was not timed in Chrome.

## FAQ

Accordion `framer-RzIaH`. Variants Closed `E3Hcex79n` and Opened `NKMIZUkBe`.

- Trigger: a click on the question `h3`. A layer named Border sits across the row; clicking that border did not toggle it.
- Authored transition: `{ bounce: 0, delay: 0, duration: 0.4, type: spring }`. The closed variant’s CSS sets padding `28px 0` on `.framer-17m71tt`.
- What changes: `data-framer-name` goes from Closed to Opened and the row grows. The answer is not in the SSR HTML (the answer slot is an empty div). It is in the hydrated tree once the row is open.
- Seen: closed height 82px. “Do I need coding skills?” opened to 139px. “Will my site stay optimized?”, “Is it safe to use Jet?”, and “How fast will I see results?” opened to 142px. “What platforms does Jet support?” opened in one sample and showed its answer while the border box stayed 82px. Answers are listed in `pages.md`. A 1000ms linear animation was also running on a descendant; it was not the row’s height spring.

## Testimonial carousel

Section name in the source is “Section: Testimonails”. The cycler is `framer-UgDr4`.

- Trigger: autoplay. No click.
- Variants, in order, with the wait before each step: Default `xLhVUZ25C` (2.5s) → Switch First `YySLLH5rq` (100ms) → Switch Second `RNJCv8iJf` (100ms) → Switch Third `Smu7ookYD` (5s) → Back First `jtg905av8` (100ms) → Back Second `w7tZ2TZvX` (100ms) → Back Third `fzFe80Ulh` (2.5s) → Default. The source spells the switch variants `Swtich`.
- Transition between variants: `{ bounce: 0, delay: 0, duration: 0.6, type: spring }`. An inner tween is `{ duration: 0, type: tween }`. Cards are positioned absolutely. The second quote of a pair is in the DOM at opacity 0 until that step shows it.
- Seen: within 2.7s the visible quote changed from “We saved on hosting…” (Tom Sullivan) to “My shop now loads in under a second…” (Luca Rossi). The 100ms steps were not timed separately. Reading the whole section’s `innerText` does not show the change, because both quotes are in the DOM.

## Scroll and appear

- Trigger: load, for elements with `data-framer-appear-id`. Scrolling after they have finished does not play them again.
- Seen immediately after `DOMContentLoaded`, before the entrance finishes: hero text (`data-framer-name` Text) and Actions are `opacity: 0.001` and `transform: translateY(20px)`. A layer named Light is `opacity: 0.001`; its inline style still says `translateY(10px)` while the computed transform was already `none`.
- Seen about 1.4s later: those appear targets are `opacity: 1` and `transform: none`. Scrolling to mid-page left all nine of them unchanged.
- The duration and easing of that entrance were not isolated. `getAnimations()` at that point listed many CSS transitions at 400ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`, on targets with no name, plus the 1000ms linear SVG animations above. Those 400ms transitions are not pinned to the appear ids.

## Other autoplay

The same module has a second cycler (`framer-v-4dcn3a`) with the same spring `{ bounce: 0, delay: 0, duration: 0.6 }` and the same Default / Switch / Back variant shape. Waits: 1s, 100ms, 100ms, 2s, 100ms, 100ms, then 1s back to Default. It was not watched on its own. It is the logo row’s cycler in that module, not one of the named effects above.
