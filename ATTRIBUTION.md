# Attribution

## The protocol

BRC-20 was created by the pseudonymous builder **domo** and published on 8 March 2023 as an open
experiment, with an explicit warning that the tokens would be worthless. The ecosystem adopted it
anyway. Bitcoin Universe did not originate BRC-20, does not control its rules, and documents it
here as an upstream protocol that Universe products index and support.

## Sources of record

- [Original BRC-20 documentation](https://docs.bitcoints.org/brc-20), domo's specification of
  record and the origin of the deploy, mint, and transfer operations documented here.
- [Layer1 Foundation BRC-20 indexing rules](https://layer1.gitbook.io/layer1-foundation/protocols/brc-20/indexing),
  the maintained indexing rulebook, including the one-use transfer inscription reservation and the
  separation of the transfer-inscribe and first-spend events.
- [OPI](https://github.com/bestinslot-xyz/OPI), the open reference indexer implementation, which
  commits transfer-inscribe and transfer-transfer as separate ordered events.
- [Ordinals](https://docs.ordinals.com/), the inscription carrier and the numbering rules that
  decide inscription identity and cursed status.

## This documentation

The specification, guide, reference, test vectors, and validator in this repository are written by
Bitcoin Universe. They restate the upstream rules for implementers and mark Universe-specific
indexing decisions explicitly wherever they appear, so a reader can always tell a protocol rule
from an implementation choice.

Bitcoin Universe indexing behavior described on this site is grounded in the organization's own
code. Capabilities that are not wired in that code are not claimed.

## Visual material

This site is entirely self-contained. It uses system font stacks, inline SVG diagrams, and a
locally hosted icon, all authored in this repository. It loads no third-party images, fonts,
scripts, or trackers.

Earlier versions of this site displayed an icon and artwork served by the original BRC-20
documentation. Those remotely hosted assets have been removed in favor of self-hosted material;
the credit above stands.

BRC-20 names and any third-party source artwork remain associated with their respective creators.
Reference to them here does not imply affiliation or endorsement.
