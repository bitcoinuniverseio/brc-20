# Financial comparison contract

The source-only V4 bridge compares matching event, history, ticker, unused-event and effective-balance commitments under the same reviewed format and type contract. It retains all twelve raw domains from both datasets. Dataset identifiers may differ; older V1 hashes are not converted or treated as comparable V4 hashes.

Bounded synthetic Signet fixtures verify namespace independence and refuse changes to money, ordering, links, coverage, schema, types or incomplete evidence. Sparse current-balance cache differences remain diagnostic and do not establish corruption or readiness.

No live audit or indexer changes were made. Successful source fixtures remain unqualified for production: independently replayed financial and EVM commitments and runtime checks are still required.
