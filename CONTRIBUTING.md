# Contributing

Corrections are the most valuable contribution to this repository. If a rule, field table, or test
vector here is wrong, an implementer who trusts it writes a divergent indexer.

## Before you open a pull request

- **Ground every factual claim.** Protocol rules come from the upstream sources listed in
  [ATTRIBUTION.md](ATTRIBUTION.md). Statements about Bitcoin Universe behavior come from Bitcoin
  Universe code. If you cannot point at a source, do not assert it.
- **Do not claim unreleased capability.** Code existing somewhere is not support. If a capability
  is not wired end to end, say it is not currently supported, or leave it out.
- **Keep protocol rules and Universe decisions separate.** Universe-specific indexing behavior
  belongs in the marked sections, never presented as a protocol rule.
- **Rule numbers are stable.** R1 to R24 are permanent identifiers that the validator, the test
  vectors, and external links depend on. Add new rules at the end. A withdrawn rule keeps its
  number and is marked withdrawn; it is never reused.

## House style

- No em dash characters anywhere. Use commas, colons, periods, or parentheses.
- Plain, direct writing. No filler, no superlatives, no manufactured urgency, no placeholder
  sections, no "coming soon".
- Prefer a table, a diagram, or a worked example over a paragraph.
- Amounts in tabular monospace, ruled tables, ledger vocabulary. The design has a point: this is a
  protocol whose entire story is balances.

## Technical constraints

These are not negotiable, because they are what makes the site fast, private, and durable:

- Hand-authored HTML, CSS, and vanilla JavaScript. No build step, no framework, no package
  manager.
- No external resources of any kind: no CDNs, no web fonts, no analytics, no third-party images.
  System font stacks and inline SVG only.
- Every ordinary page must work with JavaScript disabled. JavaScript may only enhance: theme
  toggle, search, and the validator.
- Light and dark themes must both meet WCAG 2.2 AA contrast.
- Responsive to 320px with no horizontal page overflow. Wide tables and code scroll inside their
  own container.
- Semantic landmarks, a skip link, visible focus, correct heading order, and a text alternative
  (`<title>` and `<desc>`) on every diagram.
- Diagram colors come from CSS custom properties so they stay legible in both themes.
- The validator processes input in the browser only. It must never transmit, store, or log a
  pasted payload.

## Changing a page

1. Edit the HTML directly. Each page carries its own header, footer, and metadata; keep the
   navigation, footer fields, and `<link rel="canonical">` consistent with the other pages.
2. If you add or rename a heading, update `search-index.json` with its page, title, anchor,
   snippet, and useful aliases (including likely misspellings).
3. If you add a page, update `sitemap.xml`, `llms.txt`, the navigation in every page, and the 404
   table of contents.
4. Record the change in `changelog.html` and bump the spec version in every page footer,
   `docs.manifest.json`, and the validator's stated rules revision if a rule's meaning changed.
5. Validate the manifest before pushing:
   `node <docs-platform>/packages/content-schema/bin/validate-manifest.mjs docs.manifest.json`

## Checking your work

Open the pages from disk in a browser and confirm:

- The page renders correctly in light and dark themes and with JavaScript disabled.
- Nothing overflows horizontally at 320px wide.
- Every internal link and rule anchor resolves.
- Search finds your new heading.
- The validator still agrees with every vector on the test vectors page.

## Reporting instead of fixing

An issue is welcome if you would rather report than fix. For anything with a security or
funds-loss impact, use [private reporting](SECURITY.md) instead of a public issue.
