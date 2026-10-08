# Owned input source status

The single OPI historical input source is active on indexers2. It reuses owned Bitcoin Core and a bounded shared RPC gateway. Its existing dataset and passive reader were preserved.

| Stage | Recorded status |
|---|---|
| Input writer | Active, one child, restart count zero |
| Committed input checkpoint | 3211; observed owned node tip 970524 |
| Current phase | Header replay through 767429 |
| Inscription tracking | Starts at 767430 |
| Passive reader | Active; above-coverage queries refused |
| Financial reference and native release | Not admitted |

Current resource and fairness guards remain enforced. The event subscriber continues while a valid child runs, so the shared tip source stays interested. Storage and WAL publication preserve a complete resumable prefix.

The early 1.5–1.7 headers/s window describes only header input work. A same-process transport repair raised the next measured window to about 4.32 headers/s. The prior 3–9-day allowance is superseded; a conditional low-confidence range of about 10 hours to 4.5 days assumes 2–20 headers/s and no new failure. Later financial validation and native release are separate gates and are not implied by this estimate.
