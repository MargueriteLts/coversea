# Coversea audit

- **Date:** 18 November 2026
- **Version audited:** branch `gh-pages` at commit `358041c` (13 November 2025), plus that day's uncommitted changes to [sketch.js](src/javascript/sketch.js), [TeaserGeneratorContainer.jsx](src/javascript/TeaserGeneratorContainer.jsx) and [M_UploadImageContent.jsx](src/javascript/components/molecules/moduleContent/M_UploadImageContent.jsx).
- **Line numbers** are from that version and will drift as the code changes. If a link lands on the wrong line, search for the code quoted next to it.

## Summary

The teaser generator on the home page, the live part of the site, works. But it has a redraw leak, several controls that silently do nothing, a phone layout that breaks the Text module, low-resolution downloads, and about 20 MB to download on a first visit.

The 29 old generator pages are still deployed and don't work. The old home page that links to them and two empty placeholder pages are deployed too.

The uncommitted changes listed above stop the redraw leak, but with them an uploaded image or a newly loaded font only shows up after the next click.

## How it was checked

- The whole codebase was read.
- Both the working copy and commit `358041c` (the version the GitHub Actions workflow deploys) were built into a temporary folder outside the project.
- Both builds were tested in headless Chrome at laptop size (1440×900, 1× pixel density) and phone size (390×844, 3×), with Google Analytics blocked.
- No project files were changed during the audit.

Each item says how it was confirmed: **tested** means reproduced in the browser; **from code** means found by reading the code only.

## Critical: affects visitors today

### 1. Redraw leak on the live site (tested)

In the deployed commit, every draw schedules another redraw one second later ([sketch.js:1973](src/javascript/sketch.js#L1973), commented out in the working copy). Each control change starts a chain that never stops.

Measured: 1 redraw per second at rest after load, about 40 per second after one slider drag (40 input events), and still 40 per second ten seconds later. It keeps climbing while someone plays with the controls, which wastes CPU and battery.

**Fix:** see item 2. The timer-based redraws need replacing, not just removing.

### 2. The uncommitted fix leaves the canvas out of date (tested)

- **Uploads:** an uploaded logo or background photo doesn't appear until the next click. The redraws after loading are commented out ([sketch.js:2231](src/javascript/sketch.js#L2231), [2248](src/javascript/sketch.js#L2248)), and the 100 ms timers ([TeaserGeneratorContainer.jsx:171](src/javascript/TeaserGeneratorContainer.jsx#L171), [220](src/javascript/TeaserGeneratorContainer.jsx#L220)) fire before the image has loaded.
- **Fonts:** cover fonts load on first use, so a newly picked font is first drawn with a fallback. In 4 of 8 GENERATE clicks the cover stayed in the wrong font, and a download at that moment saves it that way.

**Fix:** redraw when the work finishes, not on timers.

- Load the uploaded image with p5's `loadImage(url, img => { …; redraw() })`, so the redraw happens once the image is ready.
- Load the 10 cover fonts at startup with `document.fonts.load()` and redraw once they're ready.
- Then delete the timers ([sketch.js:2366](src/javascript/sketch.js#L2366), [2397](src/javascript/sketch.js#L2397), and the two above) and the `checkPendingImage` polling ([sketch.js:2215-2256](src/javascript/sketch.js#L2215-L2256)).

### 3. The home page has no text until its 2.6 MB script runs (tested)

[language.scss:3](src/stylesheets/language.scss#L3) hides every translated block, and only the script adds the `lang-en` class ([teaserGenerator.jsx:89](src/teaserGenerator.jsx#L89)). With the script blocked, 0 of 60 text blocks were visible. Visitors who chose FR or RU may also see English briefly before their language is applied (from code).

**Fix:** put the class in the HTML: `<body class="teaser-generator lang-en">` ([index.html:35](src/index.html#L35)). Better still, add a one-line inline script right after `<body>` that applies the saved `preferredLanguage` ([A_LanguageToggle.jsx:15](src/javascript/components/ATOMS/A_LanguageToggle.jsx#L15)) before the first paint.

### 4. Text module unusable on phones (tested at 390 px wide)

- The main-text box is about 3 characters wide and the small-text box 1 character.
- The second "Text settings" button is off-screen.
- The first one's popup opens 48 px past the left edge of the screen.

**Causes:** [adaptive.scss](src/stylesheets/adaptive.scss) has no phone styles for the text rows, the rows have a fixed indent and label width ([teaserGenerator.scss:622-640](src/stylesheets/teaserGenerator.scss#L622-L640)), and the popup is pinned at `right: 108px` ([M_DropDown.jsx:88](src/javascript/components/molecules/M_DropDown.jsx#L88)).

### 5. On phones the language switcher covers the Randomize buttons (tested)

The switcher is pinned on top of everything (`position: fixed`, `z-index: 9999`, [A_LanguageToggle.scss:46-63](src/stylesheets/A_LanguageToggle.scss#L46-L63)), and its small-screen styles are commented out ([lines 65-80](src/stylesheets/A_LanguageToggle.scss#L65-L80)). When a module header is near the top of the screen, tapping its Randomize button hits the switcher instead (5 of 5 modules).

### 6. Downloads are only as large as the on-screen canvas (tested)

[saveCanvasAsImage](src/javascript/sketch.js#L2409-L2413) saves the on-screen canvas:

- 613×613 px on a 1440×900 laptop screen at 1× pixel density;
- 1074 px on a 3× phone;
- about twice the on-screen size on a 2× Retina screen (estimated).

Distributors generally ask for 3000×3000 px (Apple Music's minimum).

Some sizes are fixed pixels: line thickness ([sketch.js:1312](src/javascript/sketch.js#L1312)), the radial-gradient radius of 350 px ([sketch.js:515](src/javascript/sketch.js#L515)) and the logo margin ([sketch.js:1183](src/javascript/sketch.js#L1183)). So the same cover looks different on a phone and on a laptop.

**Fix:** size everything relative to `canvasSize`. To export, set `pixelDensity(3000 / canvasSize)`, redraw, save, then restore the density.

## High: broken controls

### 7. Changing the small text's font type does nothing (tested)

The store writes the font to `moduleBasicTypoWithTabsStore.fontOtherText` ([store.js:1547](src/javascript/store.js#L1547), [1550](src/javascript/store.js#L1550)), but the sketch reads `preset.Track.fontOtherText` ([sketch.js:1802](src/javascript/sketch.js#L1802)). Changing the main text's font type works.

### 8. In the "Random" layout, added small texts never appear (tested)

Random positions are created only for the starting number of texts ([store.js:1486](src/javascript/store.js#L1486), [1616](src/javascript/store.js#L1616)). Adding a text ([store.js:1588-1591](src/javascript/store.js#L1588-L1591)) doesn't add a position, and the sketch skips any text without one ([sketch.js:1894](src/javascript/sketch.js#L1894)).

### 9. The lock buttons never show in "Text settings" (tested)

The popup has 4 controls and 0 lock icons. [M_TextSettings.jsx:218-293](src/javascript/components/molecules/M_TextSettings.jsx#L218-L293) renders `M_Control` without `hasLock`, and [M_Control.jsx:149-156](src/javascript/components/molecules/controls/M_Control.jsx#L149-L156) only shows the lock when it's set.

### 10. Background → Randomize picks "Photo" when nothing is uploaded (tested)

It landed on Photo 17 times out of 40, which gives a black background. [store.js:1983-1986](src/javascript/store.js#L1983-L1986) picks from every background type.

**Fix:** leave Photo out of the random pick unless a photo has been uploaded.

### 11. Deleting the logo is incomplete (tested)

After Delete, the thumbnail stays and the file picker still holds the file, so picking the same file again does nothing. The upload control keeps its own preview and never resets its input ([M_FileUpload.jsx:18-32](src/javascript/components/molecules/controls/M_FileUpload.jsx#L18-L32)), and Delete ([M_UploadImageContent.jsx:66](src/javascript/components/molecules/moduleContent/M_UploadImageContent.jsx#L66)) can't clear either. There is no way to remove the background photo.

### 12. The Lines quantity slider shows the wrong value after changing the line type (from code)

Only the "Straight" type updates it ([store.js:759-775](src/javascript/store.js#L759-L775)).

### 13. Cyrillic titles fall back to a system font (tested)

None of the 10 cover fonts ([store.js:1169](src/javascript/store.js#L1169), [1173](src/javascript/store.js#L1173)) includes Cyrillic letters, on a site offered in Russian.

**Fix:** add or swap in families that include Cyrillic (Google Fonts can filter by language), such as Montserrat, Inter or Rubik for sans serif and Marck Script or Bad Script for script.

### 14. Some text is never translated (from code)

The mobile first screen ([index.html:63-76](src/index.html#L63-L76)) and the whole generator interface except GENERATE are English-only. `<html lang="en">` ([index.html:2](src/index.html#L2)) never changes when the language does.

## Old generator pages: deployed but broken

The 29 pages built from [src/generators/](src/generators/) (generator1 to generator10 and their `_2` to `_5` variants) aren't linked from the home page, but anyone with the address can open them. The old home page that lists them, [landing.html](src/landing.html), and its two empty placeholder pages, [about.html](src/about.html) and [socials.html](src/socials.html), are deployed too.

- **They stay on "Loading…" forever** (tested on generator4). The font path `./fonts/Aileron-Bold.otf` ([sketch.js:2138](src/javascript/sketch.js#L2138)) is relative to the page, so from /generators/ it points to a file that doesn't exist. p5 1.9 never finishes its preload step after a font fails to load.
- **Even with that path fixed, GENERATE never changes the picture** (simulated in the test server; tested on generators 1, 2, 4, 5, 7, 8, 9 and 10). No other control can either: [GeneratorContainer.jsx](src/javascript/GeneratorContainer.jsx) never asks the canvas to redraw.
- **Background → Randomize crashes** with `Cannot read properties of undefined (reading 'typeLocked')` ([store.js:1997](src/javascript/store.js#L1997)). This affects the 11 configs whose background has no Gradient type: generators 1, 2, 3 and 9 and their variants (tested on 1, 2 and 9).
- **The pages are unstyled:** [generator.scss](src/stylesheets/generator.scss) still targets old class names (`.O_Module`, `.M_ModuleHeader`, `.moduleTitle`).
- **They have no viewport tag**, so phones show them zoomed out (from code; only index.html has one).
- **generator3_2, generator6 and generator6_2 preload every overlay photo** ([sketch.js:2094-2115](src/javascript/sketch.js#L2094-L2115)). The "Plastic" set alone is 33 photos up to 3024×4032 px: 116 MB, about 1.5 GB in memory once decoded. In testing, generator6 still showed nothing after 40 s and generator3_2 froze the tab.

**Fastest fix:** remove these pages from [webpack.common.js](webpack.common.js#L112-L366) until they're reworked.

**To keep them instead:** load the font with a path that works from any folder, call `triggerRedraw` after each change in GeneratorContainer.jsx, guard the Gradient lookup, update generator.scss to the current class names, add a viewport tag, and load overlay photos only when picked (after resizing them).

## Medium: speed, build and publishing

### 15. The production JavaScript isn't minified (tested)

`optimization.minimizer` in [webpack.common.js:378-380](webpack.common.js#L378-L380) lists only the CSS minimizer, which replaces webpack's default JavaScript minifier.

**Fix:** `minimizer: ['...', new CssMinimizerPlugin()]` (the `'...'` keeps the default). Tested: teasergenerator.js drops from 2,656 KB to 1,732 KB (511 KB to 397 KB gzipped). Removing the unused `html2canvas` import ([TeaserGeneratorContainer.jsx:8](src/javascript/TeaserGeneratorContainer.jsx#L8)) saves about 190 KB more.

### 16. A first visit downloads about 20 MB (tested)

- 14 MB is the 12 vinyl images (up to 2081×2081 px for a canvas of about 600 px), all preloaded although only one shows at a time ([sketch.js:2060-2090](src/javascript/sketch.js#L2060-L2090)).
- 3.3 MB is page images, mainly [generatorExampleOk.png](src/images/ui/generatorExampleOk.png) (3085×1961 px, 2.1 MB) and [modulesExamples-3.png](src/images/ui/modulesExamples-3.png) (2589×1324 px, 1.1 MB).
- 2.65 MB is JavaScript and CSS (see item 15).

GitHub Pages has a soft limit of 100 GB of traffic a month, which is about 5,000 first visits at this size.

**Fix:** resize the images to the size they're shown at, convert them to WebP, and load each vinyl image only when it's picked.

### 17. Every push builds and deploys the site twice (from code)

[build-BEFORECLAUDE.yml](.github/workflows/build-BEFORECLAUDE.yml) and [build.yml](.github/workflows/build.yml) are both named "Build site" and both run on every push to `gh-pages`. Delete the old one. Then, in build.yml:

- install with `--frozen-lockfile` ([line 31](.github/workflows/build.yml#L31): `command=install --frozen-lockfile`), so CI uses exactly the versions in yarn.lock;
- move off Node 20 ([line 47](.github/workflows/build.yml#L47)), which stopped receiving updates on 30 April 2026. The project builds fine on Node 24 (tested).

### 18. package-lock.json is out of date and conflicts with yarn.lock (from code)

[package-lock.json](package-lock.json) dates from March 2024 and lacks copy-webpack-plugin, html2canvas and case-sensitive-paths-webpack-plugin. CI installs from [yarn.lock](yarn.lock). Delete package-lock.json and stick with yarn.

### 19. The local node_modules folder doesn't work on Windows (tested)

It was probably installed on another operating system and copied over: `node_modules/.bin` only has Unix scripts, so `npx webpack` fails with "'webpack' n'est pas reconnu…" (and `yarn build`, which calls the same script, should fail the same way). Delete the folder and run `yarn install`.

### 20. The canvas size changes after a window resize (tested)

The first size is measured with `clientWidth` ([TeaserGeneratorContainer.jsx:51-54](src/javascript/TeaserGeneratorContainer.jsx#L51-L54)), later ones with `getBoundingClientRect` ([sketch.js:1986-1996](src/javascript/sketch.js#L1986-L1996)). After any resize the canvas is 615 px wide in a 613 px box.

The canvas is also rebuilt on every resize event, even when the size hasn't changed (5 events, 5 rebuilds). Phone browsers fire these events while scrolling, as their toolbars show and hide.

**Fix:** measure the same way in both places, and skip the resize when the size is unchanged.

### 21. Two font mistakes in the CSS (tested)

- The misspelled `"bc-novatica-cy"` ([teaserGenerator.scss:222](src/stylesheets/teaserGenerator.scss#L222)) makes the desktop "Try our teaser generator" button fall back to a generic font. It should be `bc-novatica-cyr`.
- `format('otf')` ([fonts.scss:9](src/stylesheets/fonts.scss#L9)) isn't a valid value, so the browser ignores the font file in that rule. Use `format('opentype')`.

## Medium: legal and page info

### 22. Google Analytics runs with no cookie banner or privacy notice (from code)

[analytics.html](src/partials/analytics.html) loads Google Analytics on every page. For visitors in the EU, cookie-based analytics generally needs their consent first.

### 23. package.json and README.md still describe the starter template (from code)

[package.json:2-13](package.json#L2-L13) has the template's name (`static-site-boilerplate`), author (Zakhar Day), repository links and MIT license, which contradicts the "all rights reserved" [LICENSE](LICENSE). [README.md](README.md) is the template's README.

**Fix:** set the project's own name and author, `"license": "UNLICENSED"` and `"private": true`. If parts of the MIT template remain, its license requires keeping its copyright and permission notice.

### 24. Social-sharing tags point to margueritelts.github.io (from code)

The `og:` and `twitter:` URLs ([index.html:20-30](src/index.html#L20-L30)) use `https://margueritelts.github.io/coversea/` instead of the coversea.space domain.

## Low: code health and cleanup

- **Add ESLint** with its React plugin. It would flag latent bugs in code the teaser doesn't use today, which will break as soon as that code is switched on:
  - `getText1Store` is used but never defined ([generator.jsx:164](src/generator.jsx#L164), [teaserGenerator.jsx:138](src/teaserGenerator.jsx#L138)).
  - `Module3D`, `BasicTypoV2` and `Overlay` are used without being imported ([TeaserGeneratorContainer.jsx:698](src/javascript/TeaserGeneratorContainer.jsx#L698), [795](src/javascript/TeaserGeneratorContainer.jsx#L795), [807](src/javascript/TeaserGeneratorContainer.jsx#L807); `BasicTypoV2` also at [GeneratorContainer.jsx:490](src/javascript/GeneratorContainer.jsx#L490)).
  - `(6,5 * canvasSize / 100)` ([sketch.js:814-815](src/javascript/sketch.js#L814-L815)): in JavaScript the comma isn't a decimal point, so this gives 5%, not 6.5%. Write `6.5`.
  - Unused imports, such as `ReactDOM` and `html2canvas` ([TeaserGeneratorContainer.jsx:6-8](src/javascript/TeaserGeneratorContainer.jsx#L6-L8)).
- **Latent bugs a linter won't catch** (from code):
  - [M_BackgroundContent.jsx:449](src/javascript/components/molecules/moduleContent/M_BackgroundContent.jsx#L449) calls `renderModuleContentUnits()`, whose definition is commented out (line 347). It crashes if a config ever has a single background type.
  - [store.js:2215](src/javascript/store.js#L2215) and 2218 write to `fontpreset` instead of `preset`, which throws when that code runs.
  - [store.js:1848](src/javascript/store.js#L1848) checks `collection` instead of `currentCollection`, so the "Electronics" image collection is never applied.
- **Most mismatches between the controls and the canvas share one cause.** Values live in mutable module-level objects, get copied into component state, and are re-rendered with `setState({})`, through 30+ near-identical handlers. One shared function that updates a value and redraws once would remove most of these bugs.
- **Isolate each module's drawing with `p.push()` and `p.pop()`.** Drawing settings (fill, rectMode, blendMode) currently leak from one module to the next. The gradient at [sketch.js:682](src/javascript/sketch.js#L682) only fills the canvas because the text module's `rectMode(CENTER)` carries over from the previous frame.
- **Accessibility:** the generator has no real buttons or links. Its controls, including the 12 module-header controls, are clickable `<div>`s, so they can't be reached with a keyboard or announced by screen readers. The download button has no label, and the text-box text contrast is about 4.1:1, below the usual 4.5:1 minimum.
- **Failed uploads are silent:** errors only go to the browser console ([sketch.js:2234](src/javascript/sketch.js#L2234), [2251](src/javascript/sketch.js#L2251)). Show a message instead.
- **Outdated build tools** ([package.json:19-43](package.json#L19-L43)): webpack-cli 4, sass-loader 11, css-loader 5 and css-minimizer-webpack-plugin 2 are several major versions behind. file-loader and @babel/plugin-proposal-class-properties are no longer needed (webpack 5's asset modules and @babel/preset-env cover them), and react-color hasn't been updated since 2020.
- **The webpack config repeats itself:** CopyPlugin is added twice ([webpack.common.js:90](webpack.common.js#L90), [106](webpack.common.js#L106)), and the 29 generator pages are 29 hand-written HtmlWebpackPlugin blocks ([lines 136-366](webpack.common.js#L136-L366)).
- **CSS leftovers:**
  - `var(--BgModul)` is used but never defined ([teaserGenerator.scss:593](src/stylesheets/teaserGenerator.scss#L593)).
  - [fonts.scss:1-5](src/stylesheets/fonts.scss#L1-L5) chains `@import`s for Typekit and two Google Fonts sheets that request 18 styles each of Barlow and Poppins. Request only the styles actually used, and load the sheets with `<link>` tags so they download in parallel.
- **Delete files nothing uses** (git keeps their history):
  - 17 source files that nothing loads (4,887 lines):
    - [src/javascript/store-withComments.js](src/javascript/store-withComments.js)
    - [src/javascript/TeaserGeneratorContainer-withoutP5redraw.jsx](src/javascript/TeaserGeneratorContainer-withoutP5redraw.jsx)
    - [M_UploadImageContent-beforeClaude.jsx](src/javascript/components/molecules/moduleContent/M_UploadImageContent-beforeClaude.jsx), [M_VinylContent-oldSave.jsx](src/javascript/components/molecules/moduleContent/M_VinylContent-oldSave.jsx) and [M_VinylContent-oldSave2.jsx](src/javascript/components/molecules/moduleContent/M_VinylContent-oldSave2.jsx)
    - [M_TextSettingsDropDown-oldSave.jsx](src/javascript/components/molecules/M_TextSettingsDropDown-oldSave.jsx)
    - [src/stylesheets/adaptive-oldKindaWorking.scss](src/stylesheets/adaptive-oldKindaWorking.scss)
    - the 6 scripts in [src/generators/working/](src/generators/working/), along with their 5 HTML pages
    - [ButtonImage.jsx](src/javascript/components/ButtonImage.jsx) and [ButtonPrimary_Randomize.jsx](src/javascript/components/ButtonPrimary_Randomize.jsx)
    - [src/about.js](src/about.js) and [src/socials.js](src/socials.js)
  - [draft](draft) at the project root (303 lines of commented-out code).
  - Unused images in [src/images/ui/](src/images/ui/): generatorExample-TOCHANGE.png (7.4 MB), generatorExample-cut.png, modulesExamples.png, modulesExamples-4.png, modulesExamples-x3.png, maket-teaserPage.jpg and logo-share.svg.
  - Commented-out code: sketch.js has 601 comment lines, mostly old code, and about 20% of TeaserGeneratorContainer.jsx is commented out.
- **Remove leftover debug messages:** `console.log` calls at [store.js:1299](src/javascript/store.js#L1299) (`'WTF'`), [store.js:1584-1626](src/javascript/store.js#L1584-L1626), [sketch.js:200](src/javascript/sketch.js#L200), [2368](src/javascript/sketch.js#L2368) and [2403](src/javascript/sketch.js#L2403), [TeaserGeneratorContainer.jsx:224](src/javascript/TeaserGeneratorContainer.jsx#L224) and [M_AddRemoveText.jsx:18](src/javascript/components/molecules/controls/M_AddRemoveText.jsx#L18).
- **Add `/docs` to [.gitignore](.gitignore).** A local build writes 174 MB there, which is easy to commit by accident.
- **Branches:** `main` is 33 commits behind `gh-pages`, so the repository's main branch on GitHub shows old code.

## Suggested order

1. Redo the redraws (items 1 and 2), loading the cover fonts up front, then fix 3 and 7 to 11. These are small fixes to the live page.
2. Phone layout (4 and 5).
3. Full-size download (6).
4. Smaller downloads: one config line plus resized images (15 and 16).
5. Clean up publishing: delete the duplicate workflow, then tidy the lock files, package.json and .gitignore (17, 18 and 23).
6. Decide what to do with the old generator pages. Removing them from the build takes about five minutes.
