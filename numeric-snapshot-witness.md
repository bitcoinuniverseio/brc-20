# Numeric type verification

A separate read-only witness checks numeric precision and scale under the same held database snapshot as the financial scanner. It uses existing snapshot authority, keeps tokens private and refuses an expired snapshot rather than silently replacing it.

Private Signet tests verified numeric precision 40 and scale 0, unchanged fixture rows/schema, and refusal of altered schema or missing snapshot-owner locks. This verifies type compatibility; it does not prove financial balances agree or release production indexing.

The active financial scanner is unchanged. A reviewed production catalog-only witness matched the same held financial snapshot and verified nine numeric columns with precision 40 and scale 0. Existing indexing remained unchanged. This type proof does not establish financial agreement or release production BRC20 indexing.
