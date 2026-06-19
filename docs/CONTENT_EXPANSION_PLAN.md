# Undercover — Content Expansion Master Plan (137 → 5,000)

> Operating program to scale the word library from **137 → 5,000** entries
> **without** lowering the bar set in [`CONTENT_GUIDELINES.md`](./CONTENT_GUIDELINES.md).
> Every number here is grounded in the measured state of the corpus
> (137 words / 34 categories; empty Evil tier; defaulted scores; 365 dangling
> `related` refs; 5 phantom categories; no-op 18+/family-safe toggles).
>
> **Prime directive:** volume never overrides quality. The guidelines §7
> validation and §8 gates are enforced in CI — the database cannot regress.

---

## 1. Objective & Definition of Success

**Goal:** a **5,000-entry** library where *every* entry passes the guidelines,
the difficulty/culture/language/era mix is intentional, no category is below its
floor, and the structural defects in the seed set are fixed.

**Success is met when all of these are true:**
| KPI | Target |
|---|---|
| Total accepted entries | ≥ 5,000 |
| Categories below selectable floor (20) | **0** |
| Entries failing §7 validation in `main` | **0** (CI-enforced) |
| Entries with defaulted scores | **0** |
| Duplicate rate (tag-overlap ≥5) | < 1% |
| Evil-tier share | ≥ 8% |
| Trending lane freshness | refreshed weekly, < 5% stale |
| Playtested-before-`seed` (AI/UGC) | 100% |

**Non-goals:** quantity for its own sake, machine-dumped tags, or shipping any
entry that hasn't cleared the gates.

---

## 2. Target Architecture @ 5,000

### 2.1 Volume allocation (tiered)
| Tier | Categories | Target each | Subtotal |
|---|---|--:|--:|
| **Flagship** | indian-food, daily-life, bollywood, memes, cricket, family, college, global-food | ~230 | **1,800** |
| **Core** | regional-food, festivals, hollywood, anime, games, technology, programming, office, relationships, brands, cities, social-media, internet, nostalgia, music, travel | ~120 | **1,900** |
| **Long-tail + New** | cartoons, startup, engineering, creators, animals, countries, science, space, history, chaos, **+ sports, football, school, politics, cars, web-series/OTT, fashion** | ~75 | **1,300** |
| | | **Total** | **≈ 5,000** |

> New strategic categories (currently phantom or missing): **sports, football,
> school, politics, cars, web-series/OTT, fashion.** Build with UI metadata or
> delete from the type — no phantoms allowed (guidelines §6).

### 2.2 Cross-cutting target mix
| Axis | Target @ 5,000 | Current | Action |
|---|---|---|---|
| Difficulty | Easy 30% · Medium 40% · **Hard 22% · Evil 8%** | Evil = 3% (4 words) | Deliberately author Hard/Evil tiers |
| Culture | India ~45% · global ~33% · internet ~16% · west ~6% | India 47% / west 4% | Keep India-first edge; thicken Western mainstream a little |
| Language | en 55% · hinglish 38% · **hi 7% (~350)** | hi = 0 | Stand up a real Hindi lane |
| Era | timeless ~50% · modern ~30% · **trending ≥12%** · retro ~8% | trending 12% but only 16 words | Trending becomes a *process*, not a batch |
| Safety | **adult ≥150** behind 18+; explicit kid-safe ≥1,500 | adult 0; toggles no-op | Make 18+/family-safe mean something, or remove |

---

## 3. The Content Factory (production model)

### 3.1 Batch unit
The atomic unit of work is a **Batch = one (category × difficulty band) × 25
entries.** Batches are generated, linted, deduped, and human-reviewed together.

- New entries needed: **~4,863**. At 25/batch → **~195 batches.**
- A batch is "Done" only when 25 entries pass all gates (drafts that fail are
  replaced within the batch, not waved through).

### 3.2 Pipeline (guidelines §8, wired with WIP limits)
```
①Generate → ②Lint(§7) → ③Dedup(§5) → ④Score-sanity(§4) → ⑤Human QA(§8.5) → ⑥Playtest(§8.6) → ⑦Promote→seed
   AI/author     CI auto      CI auto       CI auto         person          1 round         flag flip
```
- ①–④ are **automated** and gate every PR into `data/`.
- ⑤–⑥ are **human** and gate promotion from `ai|community` → trusted `seed`.
- WIP limit: no more than **3 batches** in the QA queue at once (prevents a
  generation flood from drowning review quality).

### 3.3 Throughput math (the real bottleneck is QA, not generation)
| Lever | Rate |
|---|---|
| AI drafting | effectively unlimited |
| Lint/dedup/score (CI) | seconds per batch |
| **Human QA (careful)** | ~15–20 entries/hr → **~400–600 accepted/week per reviewer** |
| Playtest | batched into normal play sessions; ~free |

→ With **1 dedicated reviewer**, ~12–16 weeks of build. With **2**, ~8–10 weeks.
Plan assumes **1.5 reviewer-equivalents** (founder part-time + 1).

---

## 4. Sourcing Strategy by Phase

### Phase 0 — Integrity (Week 1) · *fix before you scale*
The existing 137 must pass their own guidelines first.
- Build the **`validate` CLI** (§7) and **`dedup` index** (§5); wire into CI.
- **Re-score the 137** against the §4 rubrics (kills the 94.5-avg default problem).
- Fix the seed defects surfaced in the audit: definitional tags
  (`Semicolon→punctuation`, `Mitochondria→organelle`, `Black Hole→event horizon`),
  the `Nutella` near-giveaway, the `Golgappa/Pani Puri` duplicate.
- **Resolve 5 phantom categories** (build or delete).
- Decide 18+/family-safe: author the adult lane or remove the toggles.
- Stand up the **KPI dashboard** baseline.
- **Exit:** 137 entries pass CI; gates live; dashboard reads green.

### Phase 1 — Floors & Free Harvest (Weeks 2–5) · 137 → 700
- **Harvest the 365 dangling `related` refs into real entries.** They're already
  on-theme and culturally vetted (`chaat, bhel, pulao, idli, kachori, ras malai…`).
  Cheapest, highest-relevance content available — roughly +400.
- Raise **every category to the selectable floor (20)**; the eight 2-word
  categories first.
- Deliberately seed the **Hard/Evil** tiers and the **Hindi** lane during this pass.
- **Exit:** no category below 20; Evil ≥ 5%; every category selectable in Create Room.

### Phase 2 — Assisted Scale + Trending Lane (Weeks 6–13) · 700 → 2,500
- **AI-assisted batch generation** (§5 below) with mandatory human QA.
- Stand up the **Trending lane**: a weekly hand-curated/AI drop (IPL, festivals,
  memes) — this is simultaneously the retention hook and the monetization flywheel.
- **Calibrate scores from playtest data** (did the word actually generate
  discussion? was the impostor catchable?).
- Ship the **first premium packs** + the **lifetime unlock** (per monetization audit).
- **Exit:** 2,500 entries; flagship categories ≥ 120; trending cadence proven.

### Phase 3 — Pipeline + UGC (Weeks 14–21) · 2,500 → 5,000
- Scale the generation→QA pipeline to steady-state.
- Open **community/UGC packs** (submit → auto-lint → light human review →
  publish) — the only realistic path to 5k *and* the strongest moat.
- Continuous **dedup + archetype audits** (catch the
  `Sharma-Ji ≈ Log-Kya-Kahenge` pile-ups before they multiply).
- **Exit:** 5,000 entries; all §1 success KPIs met.

**Total: ~21 weeks (~5 months) at 1.5 reviewers.**

---

## 5. AI Generation Method (prompt strategy)

Generation is cheap; **disciplined** generation is the point. Per batch:

1. **Few-shot from GREAT exemplars.** Feed the model the 3 strongest existing
   entries *in that category* (e.g. Indian Food → Maggi, Golgappa, Biryani) as
   the target style.
2. **System contract = the guidelines.** Encode: 8–12 tags, the 8-dimension
   framework, banned tag types (definitional/synonym/category/filler), the
   giveaway rule, ≥1 emotion + ≥1 setting/time, JSON output schema, and the §4
   scoring rubric (model must author non-default scores).
3. **Anti-dup priming.** Pass the category's **existing words + canonical names**
   as a "do not generate these or near-variants" list — kills most duplicates at
   the source.
4. **Self-critique pass.** Model re-rates its own draft against the rubric and
   flags any giveaway tag *before* it reaches the lint, raising accept rate.
5. **Variety controls.** Vary sub-themes per batch and cap any one archetype at
   15% (guidelines §6) to avoid sameness.

> The model proposes; the **lint disposes** and the **human ratifies.** No AI
> entry reaches `seed` without passing CI gates and one playtest.

---

## 6. Tooling to Build (small, high-leverage; maps to the guidelines)

| Tool | Enforces | Notes |
|---|---|---|
| **`validate` CLI** | §7 hard fails | Runs in CI on every change to `src/data/`; blocks merge on any violation |
| **`dedup` index** | §5 | Canonical + tag-overlap ≥5 + (later) embedding similarity |
| **`generate` harness** | §8 ① + §5 | Batch generator with exemplars + anti-dup list |
| **`review` queue** | §8 ⑤ | Accept/edit/reject UI (a structured CLI or lightweight web view is fine) |
| **`calibrate` job** | §4 | Updates discussion/chaos/guess from real round outcomes |
| **`dashboard`** | §1 KPIs | Volume vs target, lint/accept/dedup rates, archetype concentration, trending freshness |
| **CI gate** | §7 + §8 ①–④ | The regression firewall — the single most important tool |

> Build order: **`validate` + CI first** (Phase 0). Everything else is optional
> acceleration; the gate is mandatory.

---

## 7. Quality Calibration (replacing the defaults)

The seed scores are decorative (avg discussion 94.5/100). The plan fixes this:
- **At authoring:** scores assigned per the §4 anchored rubric, CI-rejected if
  equal to the builder default.
- **At playtest:** capture per-round signals — *did discussion happen?*, *was the
  impostor caught?*, *did anyone fail to recognize the word?*
- **`calibrate` job:** nudges `discussionScore`/`guessDifficulty`/`popularity`
  toward observed reality over time, so the selection engine finally optimizes on
  real signal instead of noise.

---

## 8. Schedule (sprint view)

| Sprint | Weeks | Volume | Focus | Exit gate |
|---|---|---|---|---|
| 0 | 1 | 137 | Integrity: CI gate, re-score, fix defects, phantoms, toggles | 137 pass CI |
| 1–2 | 2–5 | →700 | Harvest 365 refs; floors to 20; Hard/Evil/Hindi lanes | every category selectable |
| 3–6 | 6–13 | →2,500 | AI batches + QA; trending lane; calibration; premium packs ship | flagship ≥120; cadence proven |
| 7–10 | 14–21 | →5,000 | Pipeline steady-state; UGC; dedup/archetype audits | all §1 KPIs met |

---

## 9. Batch Definition of Done

A batch (25 entries) ships only when:
- [ ] 25/25 pass §7 validation in CI.
- [ ] 0 duplicates (canonical + overlap < 5) within batch and against corpus.
- [ ] Scores authored, in-band, non-default.
- [ ] Tags span ≥4 dimensions; ≥1 emotion + ≥1 setting/time each.
- [ ] Archetype concentration in the parent category still ≤15%.
- [ ] Human QA accept/edit complete; rejects replaced (not waved through).
- [ ] ≥1 playtest round logged before any `seed` promotion.

---

## 10. KPIs & Regression Guardrails

**Volume:** total entries · per-category vs target · % categories above floor.
**Quality:** lint pass-rate · QA accept-rate · dedup reject-rate · archetype
concentration/category · % non-default scores · playtest discussion-rate ·
impostor catch-rate.
**Flow:** drafts/week · accepted/week · QA backlog (WIP ≤ 3 batches).

**Guardrails (automated):**
- CI **fails** on any §7 violation reaching a PR.
- Dashboard **alerts** if a category exceeds 15% archetype share.
- Dashboard **alerts** if the trending lane goes > 14 days without refresh.
- **Bundle-weight watch:** at ~1,500+ entries, move content from bundled TS to
  **lazy-loaded pack chunks / fetched JSON** (the tech audit's scalability
  caveat) so the app stays light.

---

## 11. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| QA becomes the bottleneck | High | WIP limits, 1.5 reviewers, batch review UI, self-critique pass to raise accept rate |
| AI sameness / duplicates | High | Exemplar diversity, anti-dup priming, dedup gate, 15% archetype cap |
| Defaulted scores creep back | Medium | CI rejects default-valued scores |
| Cultural/safety misfires (politics/religion) | Medium | Mandatory review checklist + region/sensitivity pass on sensitive categories |
| Trending content rots | Medium | Dated entries + automated relevance sweep + weekly cadence |
| Bundle bloat at scale | Medium | Lazy-loaded pack chunks once > ~1,500 entries |
| Volume pressure erodes quality | High | Prime directive + hard CI gate; a smaller great library beats a large lazy one |

---

## 12. Business Linkage (content → revenue)

Content is the engine of the monetization plan from the product audit:
- **Free core** (~1,500 best entries) → great first experience, low friction.
- **Lifetime unlock IAP** → first revenue (right model for a party game).
- **Premium packs** → built on the §2 flagship/new categories.
- **Trending/seasonal lane** → the live flywheel (reason to return *and* to share).
- **UGC packs** → the durable moat at 5k+.

---

## 13. First Sprint (the next 2 weeks) — exactly what to do

1. Build **`validate` CLI** implementing guidelines §7; wire into CI on `src/data/`.
2. Build the **`dedup` index** (canonical + tag-overlap).
3. **Re-score the 137** to the §4 rubric; CI now blocks default scores.
4. Fix the known seed defects (definitional tags, `Nutella`, `Golgappa/Pani Puri`).
5. Resolve the **5 phantom categories**; decide 18+/family-safe.
6. Start the **365-ref harvest** (Phase 1 head start) — the cheapest 400 words you'll ever add.
7. Stand up the **KPI dashboard**; set the green baseline.

> Ship the gate before the volume. Once CI guarantees quality, scaling to 5,000
> is a throughput problem — and the throughput model above already solves it.
