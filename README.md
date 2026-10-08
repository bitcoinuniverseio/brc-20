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

The owned-input exporter and independent reference must share one bounded RPC
family rather than compete with live protocols. The controller source candidate
preserves existing authentication and persistent clients, reserves node capacity,
and exposes only qualified owned publications. Private staging passed, then a
fresh idle-connection check safely refused handover. A tested stale-connection
repair passed refreshed staging and shared routing handover. Producer lifecycle
and historical recovery admission remain pending; no owned input reader is live.
Lifecycle source preparation reuses the same shared capacity for all consumers,
with an interest-driven tip source and guarded reader admission. It has passed
focused synthetic tests and awaits private runtime qualification.
Traffic currently uses the existing healthy transport after a memory-bound issue
was isolated. The replacement streams large replies with bounded temporary storage;
historical data and reader admission remain separate qualification gates.
The memory-safe shared route and qualified genesis publication are nowlive;
startup guards preserve fallback without restarting existing services. Full
historical/native validation remains pending. Genesis coverage is not full indexing.
Reader restart authority refresh is a guarded source candidate, preserving shared
RPC availability while refusing stale or unqualified publication identity.

Private checkpoint diagnostics and ordered financial prefix validation have advanced. These improvements preserve the validation rules and do not yet establish native historical readiness.
