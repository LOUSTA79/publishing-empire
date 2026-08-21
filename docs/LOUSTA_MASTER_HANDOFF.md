# LOUSTA / LOUCORP / BlueBot — Master Handoff

**Checkpoint date:** 2026-08-21  
**Purpose:** Canonical human-readable operating doctrine and build direction.  
**Current phase:** **Doctor / baseline evidence collection**  
**Important:** This document explains *how the estate is intended to operate*. It is not proof that every described component is currently live.

## Canonical operating structure

**LOUIE / OWNER CONTROL**  
→ **LouKey** — Android operator / approval surface  
→ **LouGrok / LouBot** — one conversational front door  
→ **LOUCORP** — corporate control, status and evidence plane  
→ **BlueBot** — commissioning and bounded-execution manager  
→ **Departments / specialist workers**  
→ **Critic / verifier / evidence / learning**  
→ result returns to the owner.

### Role boundaries

- **LouKey** is the mobile control surface, not a bypass around governance.
- **LouGrok / LouBot** is the human-facing front door.
- **LOUCORP** maintains organisation, evidence, authority state and drift visibility; it is not another bot.
- **BlueBot** diagnoses, routes, supervises and reports; it does not self-approve or self-graduate.
- **Critic / verifier** independently evaluates commissioning evidence.
- **Departments / specialists** perform bounded work under explicit capability authority.

## Six permanent operating laws

1. **Finish before expanding.**
2. **Prove before trusting.**
3. **Record once so we do not rediscover.**
4. **Repair the smallest broken layer.**
5. **Graduate capability, not whole systems.**
6. **Prove one commercial chain before scaling output.**

These rules are not aspirational slogans. They exist to prevent repeated failure modes: redesign-before-completion, unverified claims being treated as live capability, repeated estate rediscovery, broad rebuilds for local faults, blanket authority grants, and scaling output before a complete commercial path is proven.

## Truth model

Every capability moves through:

`DISCOVERED → OBSERVED → TESTED → VERIFIED → GATE-6 GRADUATED → BUSINESS-PROVEN`

Operational health is tracked separately:

`HEALTHY / DEGRADED / DOWN / UNKNOWN / HISTORICAL`

Examples:

- A file existing does not prove a service is live.
- A PM2 process being online does not make it graduated.
- An API responding does not prove the business pipeline works.
- A provider transaction identifier does not prove settlement.

**No evidence = no green.**

## Doctrine vs machine evidence

The estate has two deliberately asymmetric references:

### Human doctrine

`LOUSTA_MASTER_HANDOFF.md`

- read first by a human or fresh session;
- changes rarely and deliberately;
- explains architecture, rules, responsibilities and next-step logic.

### Machine evidence

`EMPIRE_STATUS.json` (local Level-0 control plane)

- changes as evidence is refreshed and Gate-6 receipts are admitted;
- separates observed state from authority state;
- becomes canonical machine truth only when its authority section is backed by real Gate-6 receipts.

**The mere existence of `EMPIRE_STATUS.json` does not make it authoritative.** An honestly empty `graduated_components` list means commissioning is incomplete, not that the status system failed.

## Commissioning factory

Use the existing six-gate model:

1. **Gate 1 — Resurrect**: locate the existing capability.
2. **Gate 2 — Canonical identity**: determine the real implementation.
3. **Gate 3 — Integrity / shadow qualification**: security, content integrity, fabrication checks, sandbox behavior.
4. **Gate 4 — Bounded canary**: smallest reversible proof.
5. **Gate 5 — Independent verification**: existing Critic/verifier reviews read-only evidence.
6. **Gate 6 — Capability graduation**: formal admission of the bounded capability.

If an existing capability has reached Gate 4 or later, a competing replacement is **HOLD** until the existing thread is completed or explicitly retired.

## Capability-specific graduation

Do not graduate broad labels such as `BLUEBOT`.

Graduate bounded capabilities, for example:

- `BLUEBOT_READ_STATUS_V1`
- `BLUEBOT_SUBMIT_BOUNDED_JOB_V1`
- `BLUEBOT_LOCAL_CODE_ANALYSIS_V1`

Each capability gets its own evidence, permissions and lifecycle state.

## Business spine

The first commercial system to prove end-to-end is:

`Forge → quality/integrity → ledger ready → publisher → provider URL → real purchase → payment event → webhook → D1/authoritative transaction store → reconciliation → settlement`

Only after one product clears this entire chain should output volume or channel count increase materially.

## Ten-stage book proof ladder

1. `CONTENT_PROVEN`
2. `PDF_PROVEN`
3. `LEDGER_READY`
4. `PROVIDER_CREATED`
5. `PROVIDER_URL_PROVEN`
6. `PURCHASE_PROVEN`
7. `PAYMENT_EVENT_PROVEN`
8. `WEBHOOK_PROVEN`
9. `D1_ROW_PROVEN`
10. `SETTLEMENT_PROVEN`

The first book to reach stage 10 becomes the **reference commercial product**.

## Books and media strategy

Do not mass-generate more books while the existing commissioning batch is unresolved.

Recommended progression:

`commissioning books → one reference commercial product → small controlled batch → measured scale`

A proven book becomes a master IP asset:

`Book → Audiobook → Short-form video → Long-form video → Magazine / premium product → larger media only for demonstrated winners`

All derivatives should inherit a master asset / trace identity so commercial performance can be tracked across formats.

## Infrastructure ownership rule

Every graduated persistent service should eventually have:

- service ID;
- capability;
- canonical path;
- process owner / PM2 name where relevant;
- port;
- start procedure;
- stop procedure;
- health check;
- version;
- permissions;
- last verified timestamp;
- Gate-6 receipt.

Avoid broad process-kill habits. Use service-specific lifecycle controls.

## Security direction

Security evidence and credential-specific details remain local/private and are **not mirrored into this public repository**.

General rule:

`worker → capability request → policy / permission matrix → narrow secret access → bounded action → audit receipt`

Do not give workers blanket vault access. Credential rotation remains owner-gated and should proceed one provider at a time with dependent-service verification after each change.

## Doctor Run — Phase 0

Nothing new should be built or repaired before the current estate is baselined.

### Pass 1 — Control truth

Status, PM2, processes, ports, Gates, permissions, drift.

### Pass 2 — Business truth

Forge, Publisher, ledger, books, publication evidence.

### Pass 3 — Intelligence truth

LouKey, LouBot/LouGrok, BlueBot, local model runtime, specialists, routing and result return.

### Pass 4 — Infrastructure and security truth

Lifecycle ownership, Termux boot, Worker/D1 inventory, permissions, and previously captured security evidence. Reuse established evidence unless there is a specific reason to invalidate it.

### Pass 5 — Commercial / media readiness

Judgment based on Passes 1–4. This is not a grep result.

## Doctor outputs

After evidence intake, produce exactly:

1. **Doctor's Diagnosis** — `PROVEN / OBSERVED / DEGRADED / HOLD / HISTORICAL / UNKNOWN`, with evidence.
2. **Treatment Plan** — smallest dependency-ordered repairs; healthy layers remain untouched.
3. **Books & Media Growth Plan** — reference product selection, commercial proof path, then controlled media expansion.

## Current HOLD

Until the Doctor baseline is complete:

- new architecture — **HOLD**
- competing systems — **HOLD**
- bulk book generation — **HOLD**
- media scaling — **HOLD**
- credential rotation — **HOLD**
- database consolidation — **HOLD**
- Gate-6 promotion — **HOLD**
- production repair/change — **HOLD**
- real purchase — **HOLD**

Read-only diagnosis remains permitted.

## Immediate next evidence event

The next action is **Package D identity verification**, then — only if the exact artifact identity is verified — run the existing read-only ground-truth package.

Expected local artifact:

`/sdcard/Download/LOUCORP_IMMEDIATE_GROUND_TRUTH_V1.sh`

Expected SHA-256:

`d2d3eac8ee8ac5267098497f78f1811f084bd9f12359c10b7b60cd746f19a681`

Outcomes:

- `VERIFIED / RUN=YES` → run that exact artifact.
- `ABSENT` → reconstruct the same contract and log the substitution.
- `DRIFT / RUN=NO` → stop and diff before execution.

## Long-term operating loop

`Observe → Model → Predict → Eliminate → Simulate → Canary → Verify → Graduate → Monitor → Learn`

Business loop:

`Create → Verify → Publish → Prove → Sell → Settle → Measure → Scale → Repurpose winners`

## Strategic checkpoint

The current objective is not **build more**.

It is:

**Know what exists. Prove what works. Finish what is close. Connect the proven parts. Give each capability bounded authority. Record the evidence. Detect drift. Prove one commercial chain. Then scale the winners.**
