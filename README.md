# BRC-20 documentation

Bitcoin Universe documentation for BRC-20 on Bitcoin.

## What this covers

BRC-20 reads JSON text inscriptions as deploy, mint, and transfer events. A transfer is not settled when the JSON is inscribed: it becomes spendable only when that transferable inscription is sent to another owner.

## State model

Balance state is indexed from inscription history. The transferable is an Ordinal, so wallet coin selection must keep it separate from fee inputs and unrelated inscriptions.

## Documentation site

- Overview: [index.html](index.html)
- Field reference: [reference.html](reference.html)
- Build and verification playbook: [guide.html](guide.html)

## Core rules

- The first valid deployment wins a ticker, case-insensitively.
- Deploy requires p, op, tick, and max. lim and dec are optional.
- The default decimal precision is 18, and a declared precision cannot exceed 18.
- Creating a transfer does not credit the recipient. Sending the transferable does.
- Sending a transferable to its current owner cancels it.
- Block order decides conflicts, so preview state is not final before confirmation.

## Source material

- [BRC-20 documentation](https://docs.bitcoints.org/brc-20)
- [Ordinals handbook](https://docs.ordinals.com/)

## Scope

Use an indexer and wallet that agree on BRC-20 validity. The chain stores inscriptions, while balances are protocol interpretation.
