# BRC-20 documentation

Bitcoin Universe documentation for BRC-20, rebuilt from the original BRC-20 documentation and a source-linked BRC-20 indexer implementation.

## Documentation pages

- [Overview](index.html): protocol state model, transfer lifecycle, and source-backed visual identity
- [Reference](reference.html): canonical deploy, mint, and transfer payloads, fields, and available-balance logic
- [Build and verify guide](guide.html): a user-safe transaction workflow and release checklist
- [Attribution](ATTRIBUTION.md): official visual assets, colors, source links, and pinned implementation revision

## What is covered

BRC-20 is an inscription-driven balance protocol. Deploy defines a ticker policy. A successful mint credits the first owner of its inscription. A valid transfer inscription locks an amount from available balance, and that amount is credited to the receiver only when the transferable inscription moves for the first time.

The reference page uses canonical payloads from the original documentation and labels an OPI indexer excerpt as an implementation example. It includes protection against the most expensive mistakes: sending an inscription to an intermediary first, using overall balance instead of available balance, and assuming a transfer settles at inscription time.

## Primary sources

- [Original BRC-20 documentation](https://docs.bitcoints.org/brc-20)
- [Original BRC-20 examples](https://docs.bitcoints.org/brc-20/brc-20-examples)
- [OPI BRC-20 indexer](https://github.com/unisat-wallet/brc20-swap-indexer)
- [Pinned OPI indexer source](https://github.com/unisat-wallet/brc20-swap-indexer/blob/60565f3eb2ca9aa8fc1a787b3eab3a98d3bee1f1/modules/brc20_index/brc20_index.py)

## Scope

This is a transaction-building aid. BRC-20 balances are protocol interpretation, so always validate the finalized inscription and follow the active indexer and wallet rules used by the system that will read it.
