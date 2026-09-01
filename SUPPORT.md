# Support

## Start with the documentation

Most questions are answered on the site: <https://bitcoinuniverseio.github.io/brc-20/>

| Question | Page |
| --- | --- |
| What is BRC-20 and how does it work? | [Overview](https://bitcoinuniverseio.github.io/brc-20/) |
| What exactly makes a payload valid? | [Specification](https://bitcoinuniverseio.github.io/brc-20/spec.html) |
| How do I deploy, mint, or send? | [Guide](https://bitcoinuniverseio.github.io/brc-20/guide.html) |
| Why did my transfer not arrive? | [Guide: the two-phase transfer](https://bitcoinuniverseio.github.io/brc-20/guide.html#two-phase) |
| How should an indexer handle reorgs? | [Reference](https://bitcoinuniverseio.github.io/brc-20/reference.html#reorg) |
| Is this payload correct? | [Validator](https://bitcoinuniverseio.github.io/brc-20/validator.html) |
| How do I test my parser? | [Test vectors](https://bitcoinuniverseio.github.io/brc-20/vectors.html) |

Press `/` on any page to search the site.

## Where to ask

| You want to | Go to |
| --- | --- |
| Report an error in this documentation | [Issues on this repository](https://github.com/bitcoinuniverseio/brc-20/issues) |
| Report a security or funds-loss issue | [Private advisory](https://github.com/bitcoinuniverseio/brc-20/security/advisories/new), never a public issue |
| Ask about the protocol rules themselves | [Layer1 Foundation indexing rules](https://layer1.gitbook.io/layer1-foundation/protocols/brc-20/indexing) |
| Ask about a Bitcoin Universe product | That product's repository, or [docs.bitcoinuniverse.io](https://docs.bitcoinuniverse.io) |

## What this repository cannot help with

- **Recovering lost or mis-sent tokens.** BRC-20 transfers are irreversible once confirmed, and
  nobody involved in this documentation can reverse a transaction or restore a balance.
- **Wallet, exchange, or marketplace account problems.** Contact that service.
- **Valuations, trading advice, or whether a ticker is legitimate.** Not something this project
  provides.
- **Deciding whether a specific balance is correct.** A balance is an indexer's reading. Compare
  independent indexers and check the height each reading was computed at.

## Filing a useful issue

Include the page and anchor (for example `spec.html#r16`), what it says, what you believe is
correct, and the source that supports it. For validator problems, include the exact payload you
pasted and the verdict you expected.
