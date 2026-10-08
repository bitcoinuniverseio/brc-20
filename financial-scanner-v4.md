# Financial snapshot verification

The V4 scanner checks an owned database snapshot without changing production balances, events or indexer settings. It streams authoritative history in bounded chunks, preserves exact monetary values and records durable commitments for all twelve source tables.

A successful scan establishes snapshot coverage. It does not establish agreement with an independent financial reference, and it does not release the production BRC20 indexer. Results remain explicitly unqualified until comparable reference commitments and the remaining admission checks pass.

Recovery requires the same surviving snapshot keeper. Missing or altered checkpoint files and an expired keeper cause refusal; the scanner never silently substitutes a new snapshot. The raw current-balance cache is diagnostic, while effective balances come from authoritative history.

As of 8 October 2026, private Signet tests passed complete coverage, large monetary values, bounded chunks, crash recovery under the same snapshot, altered-checkpoint rejection and expired-snapshot rejection. Managed production read-only attempts preserved explicit startup and row-budget refusals. A corrected bounded-source audit is awaiting review, with no financial readiness claim. Existing owned source indexing continues.

This scanner uses a new digest format. Older V1 reference or failed V3 audit digests cannot be treated as equivalent V4 commitments without a verified bridge.
