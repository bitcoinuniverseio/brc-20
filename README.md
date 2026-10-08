# BRC-20

## Universe decoder availability

The native Universe decoder is currently awaiting qualified owned historical
inputs after a programmable trace discrepancy. It explicitly reports unready;
process liveness or retained data is not proof of complete indexed history.
Consumers must respect readiness and checkpoint coverage before treating data
as fresh. Existing datasets and validation guards remain intact. See the
[public indexer documentation](https://github.com/bitcoinuniverseio/docs-brc20)
for availability guidance and the protocol guide below for BRC-20 rules.

Universe indexer inputs use owned blockchain infrastructure. External blockchain
status polling is removed from the Node read model; retained external-status
checkpoints cannot establish readiness. This does not change the protocol rules
or claim the native decoder's historical reconciliation is complete.
Build-only publication and isolated trace/VM fixtures have passed. A distinct
owned historical replay driver compiles and awaits data qualification. These checks do not replace
independent historical reconciliation or establish live readiness.

Captured-engine Signet checks and complete private checkpoint checks have passed.
The owned input producer/reader is built and statically validated, with its data
admission still gated. Native decoding remains unready while independent owned
history and financial/programmable prefix comparison are completed.

Protocol documentation for BRC-20, the fungible token protocol carried inside Ordinals
inscriptions on Bitcoin.

**Site: <https://bitcoinuniverseio.github.io/brc-20/>**

BRC-20 operations are small JSON objects inscribed on Bitcoin: `deploy` opens the ledger for a
ticker, `mint` credits units, and `transfer` moves them in two phases. Bitcoin consensus validates
none of it. Token state is a ledger that indexers reconstruct by replaying inscriptions in block
order under a shared rulebook, which is why the indexing rules matter as much as the payload
format.

## Origin

BRC-20 was created by the pseudonymous builder **domo** on 8 March 2023 and released as a public
experiment. Bitcoin Universe did not originate BRC-20 and does not control its rules. This
repository documents the protocol as the ecosystem knows it and marks every Bitcoin Universe
indexing decision as Universe-specific. See [ATTRIBUTION.md](ATTRIBUTION.md).

Upstream references:

- [Original BRC-20 documentation](https://docs.bitcoints.org/brc-20) (domo)
- [Layer1 Foundation indexing rules](https://layer1.gitbook.io/layer1-foundation/protocols/brc-20/indexing)
- [OPI reference indexer](https://github.com/bestinslot-xyz/OPI)

## Key facts

| | |
| --- | --- |
| Chain / network | Bitcoin mainnet |
| Carrier | Ordinals inscriptions, JSON payload (`text/plain` or `application/json`) |
| Operations | `deploy`, `mint`, `transfer` |
| Ticker | Exactly 4 UTF-8 bytes, case-insensitive; 5 bytes under the self-mint extension |
| Balance model | Overall = available + transferable, per address (output script) |
| Conflict rule | First is valid: the earliest valid confirmed inscription wins |
| Transfers | Two phases: inscribe to reserve, then the inscription's first spend settles it |
| Doc spec version | 1.0.0 |
| Lifecycle | Stable |

## Pages

| Page | Contents |
| --- | --- |
| [Overview](https://bitcoinuniverseio.github.io/brc-20/) | Plain-language introduction, fact sheet, entry points, support, attribution |
| [Specification](https://bitcoinuniverseio.github.io/brc-20/spec.html) | Field tables, validity rules R1 to R24, state transitions, invalid conditions |
| [Guide](https://bitcoinuniverseio.github.io/brc-20/guide.html) | Worked deploy, mint, and transfer examples, and the Universe support matrix |
| [Reference](https://bitcoinuniverseio.github.io/brc-20/reference.html) | Terminology, confirmation, mempool, reorg, security, implementation checklist |
| [Test vectors](https://bitcoinuniverseio.github.io/brc-20/vectors.html) | Valid and invalid payloads plus ledger state vectors |
| [Validator](https://bitcoinuniverseio.github.io/brc-20/validator.html) | Client-side inscription payload validator |
| [Changelog](https://bitcoinuniverseio.github.io/brc-20/changelog.html) | Documentation version history |

## Support in Bitcoin Universe

Verified against the Bitcoin Universe codebase, not aspirational:

- **Inscribe**: `deploy`, `mint`, and `transfer` inscriptions.
- **Wallet**: view, send, receive.
- **Marketplace**: view, discover, list, update listing, unlist, buy, and settle, executed through
  the UniSat Marketplace Open API. Order authority and confirmation policy are the provider's.
  Protocol-native offers are not supported.
- **Token explorer**: Universe-operated BRC-20 read model over confirmed operations. Published
  coverage is `partial`: there is no exhaustive BRC-20 mempool feed.

## The two things that surprise people

1. **Nothing validates at signing time.** An invalid operation confirms on Bitcoin, costs the full
   fee, and records nothing in the ledger.
2. **Spending a satoshi can move a balance.** A transfer inscription is a one-use bearer
   instrument. A wallet unaware of inscriptions can settle it as change or fee.

## Repository

Static, hand-authored HTML, CSS, and vanilla JavaScript. No build step, no framework, no external
resources, no trackers. Published by GitHub Pages from `main` at the repository root; every
ordinary page works with JavaScript disabled.

```
index.html          spec.html         guide.html        reference.html
vectors.html        validator.html    changelog.html    404.html
ledger.css          site.js           validator.js      favicon.svg
search-index.json   docs.manifest.json  llms.txt        sitemap.xml  robots.txt
```

## Contributing and reporting

Native recovery is preparing independently validated owned historical inputs.
Passing build fixtures does not establish a running, fresh indexer. The native
service remains unready until its input history and validation qualify.

- Corrections and improvements: [CONTRIBUTING.md](CONTRIBUTING.md)
- Questions and help: [SUPPORT.md](SUPPORT.md)
- Security issues: [SECURITY.md](SECURITY.md). Use
  [private vulnerability reporting](https://github.com/bitcoinuniverseio/brc-20/security/advisories/new),
  never a public issue.

Part of the [Bitcoin Universe documentation platform](https://docs.bitcoinuniverse.io).
Licensed under [MIT](LICENSE).
# Shared recovery capacity

The single owned-input writer and its passive publication reader are live on indexers2. They reuse the existing owned Bitcoin Core and managed transport. Exporter and independent reference share one bounded RPC family, while the gateway reserves node headroom and retains existing authentication.

The transport streams large replies through bounded temporary storage. Reader identity is refreshed after legitimate startup and fails closed when stale. Persistent replies avoid the measured delayed-ACK penalty without restarting live services. A separate frontend fairness improvement remains a tested source candidate.

Input publication, complete historical financial agreement and native release are distinct stages. Current input replay is valid work; financial/reference/native readiness remains separately held.

A qualified continuity frontend preserves the same owned tip service and shared
connection limits while reserving input transport capacity for new sessions.
Existing sessions remain unchanged; its versioned startup policy preserves the
qualified route and healthy fallback without restarting current applications.
The common server's future-start metadata hook retains its latency fix without
changing running source or credentials. A fixed synthetic Signet input ledger is
prepared for paired tests; it does not establish execution or historical readiness.

Private checkpoint diagnostics and ordered financial prefix validation have advanced. These improvements preserve the validation rules and do not yet establish native historical readiness.

Complete historical financial validation now runs in bounded read-only batches. Representative checks passed, but full history validation and independent owned-input replay remain in progress. Native indexing stays unready until both complete.

## Owned input source

The single input writer on indexers2 is active and its passive reader publishes a committed prefix. Financial/reference/native readiness remains separately held. See [owned input source](owned-input-source.md).
