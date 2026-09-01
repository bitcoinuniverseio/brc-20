# Security policy

## Reporting a vulnerability

Report privately through GitHub:
**[Open a private security advisory](https://github.com/bitcoinuniverseio/brc-20/security/advisories/new)**

Do not open a public issue, pull request, or discussion for a security problem, and do not post
details publicly before a fix is available.

## What belongs here

This repository is documentation. Reports in scope:

- A rule, field table, state transition, or test vector on this site that is **wrong** in a way
  that could cause loss of funds or a divergent implementation.
- A claim about Bitcoin Universe support that overstates what the products actually do.
- A defect in the client-side validator that reports a valid payload as invalid, or an invalid
  payload as valid.
- A privacy or supply-chain problem with the site itself: unexpected network requests, injected
  third-party resources, or content that could execute untrusted code.

Report elsewhere:

- Vulnerabilities in the BRC-20 protocol rules themselves belong upstream with the
  [Layer1 Foundation](https://layer1.gitbook.io/layer1-foundation/protocols/brc-20/indexing).
- Vulnerabilities in Bitcoin Universe applications, wallets, or indexers belong in that
  product's repository, or through private advisory on the relevant repository.

## What to include

- The exact page and, where applicable, the rule number (for example `spec.html#r16`).
- What the documentation says and what the correct behavior is.
- Evidence: a reference to the upstream rules, a reference implementation, or an on-chain example.
- The impact you expect if an implementer follows the incorrect text.

## What to expect

- Acknowledgement of the report through the advisory thread.
- An assessment of impact and, for confirmed issues, a correction to the affected pages and an
  entry in the [changelog](https://bitcoinuniverseio.github.io/brc-20/changelog.html).
- Credit in the advisory if you want it.

## Safe harbour

Testing against this site means reading it and running the client-side validator in your own
browser. Do not attempt to attack GitHub infrastructure, other users, or unrelated Bitcoin
Universe systems as part of a report.
