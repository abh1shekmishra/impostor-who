# Undercover — Official Content Authoring Guidelines

> The content **is** the product. The code is copyable in a weekend; a large,
> high-quality, culturally-specific word library is the only real moat. These
> guidelines are the contract every entry — human-written or AI-generated —
> must satisfy **before** it enters the database.
>
> Derived from analysis of the 137-entry seed corpus. Examples below are real
> entries from that corpus.

---

## 0. North Star

A great entry makes a room of people **talk**. Civilians must be able to give
clues that are *true but not obvious*; the impostor must be able to *bluff
plausibly from a single vibe word*. Everything in this document exists to
protect that one outcome.

The cardinal sin is the **lazy association** — a tag that hands the answer over:

```
BAD   iPhone        → Apple
BAD   Virat Kohli   → Cricket
BAD   Shahi Paneer  → Kadhai Paneer
```

The cardinal virtue is the **associative world** — tags that describe the life
*around* the word:

```
GOOD  Maggi    → hostel · 2 minutes · rain · childhood · late night · exam · single vessel · yellow · comfort · lazy
GOOD  Golgappa → wedding · water · competition · street · crunch · friends · challenge · circle · explosion · spicy · north
GOOD  UPSC     → dream · pressure · library · attempt · optional · Delhi · parents · newspaper · waiting · discipline
```

---

## 1. Anatomy of an Entry

Every entry is a `WordEntry`. Required fields and their rules:

| Field | Rule |
|---|---|
| `text` | The secret word shown to civilians. **1–2 words max, never 3+.** A long title reads as a clue and kills the bluff (e.g. use `Munna Bhai`, not `Munna Bhai MBBS`; `Gajar Halwa`, not `Gajar ka Halwa`). A *shared experience*, not an obscurity. |
| `short` | Optional small-screen label. Required if `text` > ~16 chars. |
| `category` | Must be a real, UI-listed category. Must be the *best-fit* category, not a stretch. |
| `difficulty` | `easy \| medium \| hard \| evil` — **authored**, never defaulted (see §4). |
| `tags` | **8–12** associative tags. The heart of the entry (see §3). |
| `related` | **≥3 resolvable** neighbor words (used for decoys). "Resolvable" = ideally exists as another entry. |
| `semanticClusters` | **≥2** broad themes (e.g. `comfort-food`, `street-food`, `college-life`). Used for packs, decoys, and the impostor hint. |
| `culture` | `global \| india \| india-north \| india-south \| west \| internet` — set deliberately. |
| `language` | `en \| hinglish \| hi` — set deliberately. Affects the English-only filter. |
| `popularity` | 0–100, authored (see §4). Gates obscurity. |
| `yearRelevance` | `timeless \| retro \| modern \| trending`. `trending` entries carry a refresh obligation. |
| `safe` | `true` only if appropriate for kids/family/classroom. |
| `adult` | `true` only for 18+ content (and then `safe` must be `false`). |
| `discussionScore` `chaosScore` `guessDifficulty` | 0–100, **authored** against the §4 rubric. Must NOT be left to the builder default. |
| `source` | `seed \| ai \| community`. New AI/community entries enter as their source and are promoted to `seed` only after passing the playtest gate (§8). |

---

## 2. Quality Tiers (what great / mediocre / bad look like)

### 🟢 GREAT — ships as-is
- Tags describe the **lived world** around the word across **≥4 distinct
  dimensions** (§3).
- **Zero** giveaway/definitional tags.
- Civilians have **multiple independent true clue angles**; the impostor can
  bluff from any single tag.
- Culturally resonant; a typical target player recognizes it instantly.

> **Maggi, Golgappa, UPSC, Gully Cricket, Reply All, Situationship, Sharma Ji Ka Beta.**
> Real, evocative, debatable, ungiveable in one word.

### 🟡 MEDIOCRE — must be revised before entry
- Structurally valid but **flat**: tags cluster in 1–2 dimensions, or several
  are generic ("nice", "popular", "common").
- One or two tags drift toward definitional.
- Scores left at defaults.
- Recognizable but low discussion ceiling.

> **Nutella** — good entry, but `chocolate` + `spread` together nearly *define*
> it. Revise: drop one, add an experiential tag (`hazelnut`, `ferrero`, `diet starts tomorrow`).

### 🔴 BAD — auto-reject
- **Giveaway tag**: contains a token of the word, a synonym, a translation, the
  category name, or a 1:1 decode.
- **Definitional tag**: states what the thing *is* rather than the world around
  it. Real offenders in the seed set:
  - `Semicolon` → `punctuation` (definitional)
  - `Mitochondria` → `organelle`, `cell` (definitional)
  - `Black Hole` → `event horizon` (definitional)
- **Too obscure**: popularity < 40 and not deliberately `hard/evil`.
- **No clue path**: too abstract for civilians to clue or impostor to bluff.
- **Duplicate**: same concept as an existing entry (§5).
- **Proper noun with no experiential hooks** (a name and nothing to *feel*).

---

## 3. Tag Standards (the core craft)

Tags are **not** definitions, synonyms, or categories. They are the
**associative world** — what the word makes you remember, feel, argue about, and
where/when/with-whom it happens.

### 3.1 The 8-Dimension Framework
A GREAT entry's tags span **≥4** of these dimensions:

| # | Dimension | Examples |
|---|---|---|
| 1 | **Sensory** (look/taste/sound/texture) | `yellow`, `crunch`, `froth`, `spiral`, `explosion` |
| 2 | **Setting / place** | `hostel`, `tapri`, `Mumbai`, `library`, `balcony` |
| 3 | **Time / occasion** | `late night`, `Sunday`, `2 minutes`, `monsoon`, `exam` |
| 4 | **Social ritual / behavior** | `sharing`, `count`, `gossip`, `proxy`, `plate sharing` |
| 5 | **Emotion / feeling** | `comfort`, `guilt`, `anxiety`, `pride`, `nostalgia` |
| 6 | **Conflict / debate** | `pineapple debate`, `aloo in biryani`, `door debate` |
| 7 | **Cultural moment / reference** | `all is well`, `powerhouse`, `palat`, `present sir` |
| 8 | **Consequence / stakes** | `caught`, `regret`, `fear`, `embarrassment`, `clutch` |

### 3.2 Hard rules
- **Count: 8–12 tags.** (Seed standard is 10–11; <8 is thin, >12 dilutes.)
- **No giveaways.** A tag fails if, lowercased, it contains or is contained by
  any token (≥3 chars) of `text`, OR it is a synonym/translation/category of the
  word. (This is enforced by the same logic the impostor-hint uses.)
- **No definitional tags.** If a tag answers "what is it?", cut it.
- **No filler.** Banned: `nice, good, popular, famous, common, thing, stuff,
  cool, interesting, tasty, fun` (unless genuinely the *point*).
- **≥1 emotional tag and ≥1 setting/time tag.** Every entry needs a feeling and
  a "where/when".
- **Lowercase, concrete, 1–2 words per tag. Never 3+.** A longer tag becomes a
  dialogue/clue and turns the round into dumb charades — it's either a dead
  giveaway or unusable. Compress to the essence: `mere paas maa hai` → `dialogue`,
  `one against many` → `outnumbered`, `tickets in black` → `blackticket`.
- **At least one "spicy" tag** — a debate, a meme, or a stakes tag — to give the
  round teeth.

### 3.3 The giveaway self-check
For each tag, ask: *"If the impostor were handed only this one word, would a
single obvious clue name the answer?"* If yes → it's too revealing for a
**standalone** hint; it's still allowed in the pool only if ≥7 other non-giveaway
tags exist to dilute it. If it directly decodes the word → **delete**.

---

## 4. Scoring Rubrics (replace the defaults)

> The seed corpus left these at builder defaults (avg `discussionScore` = 94.5/100
> ≈ the cap). That makes the selection engine blind. **Every new entry must be
> scored against these anchored scales.**

### 4.1 `popularity` (recognizability), 0–100
| Band | Meaning | Example |
|---|---|---|
| 90–100 | Near-universal in target audience | Maggi, Pizza, Diwali |
| 70–89 | Most people know it | Vada Pav, Inception |
| 50–69 | Niche but gettable | Misal Pav, DRS |
| 40–49 | Fringe; allowed only for `hard` | Litti Chokha |
| < 40 | Obscure; allowed only for `evil` | Pootharekulu |

### 4.2 `difficulty` (composite, for civilians)
Driven by **recognizability × cluability**:
- `easy` — everyone knows it AND it's easy to clue (Maggi, Pizza).
- `medium` — known, but clues require some thought (Pani Puri, Inception).
- `hard` — niche or easy to fumble a clue (Misal Pav, Merge Conflict).
- `evil` — obscure or treacherous; only for connoisseur packs (Pootharekulu,
  Runway). **Target ≥8% of the library** — this tier is currently empty.

### 4.3 `discussionScore`, 0–100
Score = **(distinct true clue angles) × (emotional/debate pull)**. Practical
rubric: count the *independent* tag-dimensions (§3.1) present, then adjust for
debate potential.
| Score | Meaning |
|---|---|
| 85–100 | 5+ dimensions, strong debate/emotion (Biryani, UPSC, Goa Trip) |
| 65–84 | 4 dimensions, solid talk |
| 45–64 | 3 dimensions, functional |
| < 45 | Flat — **revise before entry** |

### 4.4 `chaosScore`, 0–100
How unpredictable/absurd the resulting clues are. Abstract/relatable entries
(Chaos category) score 80–95; concrete food/brands 30–55.

### 4.5 `guessDifficulty`, 0–100
How hard it is for the impostor to *name* the word from clues + their one hint.
Tight, single-meaning concepts are easy to guess (low); broad/abstract are hard
(high). Must be **authored**, not derived from difficulty alone.

---

## 5. Duplication Rules

A new entry is a **duplicate** (auto-reject) if any holds:
1. **Canonical match** — same real-world concept under a different name.
   - Seed offender: **Golgappa ≈ Pani Puri** (same dish). Pick a canonical;
     the alias may only exist as a deliberate "regional name" gag, never as a
     second selectable word in the same game.
2. **Tag overlap ≥ 5** shared tags with an existing entry (case-insensitive).
3. **Embedding/concept similarity** above threshold (when the pipeline supports
   it).

A new entry is an **archetype collision** (warn + diversify) if it shares a
`semanticCluster` **and** ≥4 tags with an existing entry.
   - Seed offender: **Sharma Ji Ka Beta ≈ Log Kya Kahenge** (both "Indian
     parental pressure"). Allowed, but cap any single archetype at **≤15%** of a
     category so it doesn't feel samey.

`related` references **should resolve** to real entries. The seed set has 365
unresolved `related` refs — these are a **backlog of obvious next entries**, not
a license to keep adding dangling links. New entries should reference existing
words where possible.

---

## 6. Category Standards

| Standard | Rule |
|---|---|
| **Selectable floor** | A category needs **≥20** entries before it's offered alone in Create Room. |
| **"Deep night" floor** | **≥40** for a themed session not to repeat. |
| **Flagship depth** | Strategic categories (Indian Food, Daily/Indian Life, Bollywood, Cricket, Memes, Family, College, Global Food) target **~250**. |
| **Best-fit** | An entry lives in exactly one category — its strongest. No stretch placements. |
| **Audience coherence** | Every word must be cluable by a *typical member of that category's audience*. (A "Programming" word may assume devs; a "Family" word may not.) |
| **Internal variety** | ≤15% of a category may share one archetype (§5). |
| **No phantom categories** | A `CategoryId` must have UI metadata + ≥1 word, or be removed. (Currently `football, sports, school, politics, cars` are phantom — build or delete.) |
| **Difficulty spread per category** | Aim within-category for roughly Easy 30 / Medium 40 / Hard 22 / Evil 8. |

---

## 7. Validation Rules (hard fails — automated)

An entry **cannot enter the DB** if any fails:

```
SCHEMA      all required fields present and correctly typed
TAGS_COUNT  8 ≤ tags.length ≤ 12
GIVEAWAY    no tag contains/!contained-by a ≥3-char token of text
DEFINITION  no tag is a synonym / translation / category-name / definition
FILLER      no banned filler tags
DIMENSIONS  tags span ≥4 of the 8 dimensions; ≥1 emotion AND ≥1 setting/time
CLUSTERS    semanticClusters.length ≥ 2
RELATED     related.length ≥ 3
SCORES      discussion/chaos/guess are authored (not equal to builder defaults)
            and within their rubric band for the chosen difficulty
POP_GATE    popularity ≥ 40, unless difficulty ∈ {hard, evil}
SAFETY      if adult: safe === false; offensive content correctly flagged
DEDUP       no canonical match; tag-overlap < 5 with any existing entry
ID_UNIQUE   generated id not already present
```

---

## 8. Quality Gates (the pipeline every entry passes)

```
①  AUTHOR / GENERATE   human or AI drafts against §1–§4
②  LINT                §7 automated validation (giveaway, count, dimensions, filler)
③  DEDUP GATE          §5 canonical + tag-overlap + (optional) embedding check
④  SCORE SANITY        scores authored, in-band, non-default
⑤  HUMAN QA            accept / edit / reject; cultural + safety review
⑥  PLAYTEST SIGNAL     ≥1 real round; capture: did it generate discussion?
                       was the impostor cluable? did anyone not recognize it?
⑦  PROMOTE             source: ai|community → seed once ⑥ passes
```

Gates ①–④ are automatable and should run in CI so the database can never
regress. Gates ⑤–⑥ are human and gate promotion to the trusted `seed` set.

---

## 9. Definition of Done (per-entry checklist)

- [ ] `text` is a shared experience, not an obscurity (or intentionally `evil`).
- [ ] 8–12 tags, spanning ≥4 dimensions, ≥1 emotion + ≥1 setting/time.
- [ ] Zero giveaway/definitional/filler tags (passes the §3.3 self-check).
- [ ] ≥2 `semanticClusters`, ≥3 `related` (resolvable where possible).
- [ ] `culture` + `language` set deliberately.
- [ ] `difficulty`, `popularity`, `discussion/chaos/guess` **authored** per §4.
- [ ] `safe`/`adult` set deliberately and consistently.
- [ ] Passes dedup (no canonical match, overlap < 5).
- [ ] Best-fit category; doesn't push that category past 15% of one archetype.
- [ ] (AI/community) passed one playtest before `seed` promotion.

---

## 10. Worked Example — turning BAD into GREAT

**Subject:** `iPhone`

🔴 **BAD (lazy):**
`tags: [apple, expensive, phone, ios, smartphone, camera]`
→ giveaway (`apple`, `phone`), definitional (`smartphone`, `ios`), filler.

🟡 **MEDIOCRE:**
`tags: [status, expensive, queue, blue bubble, camera bump, ecosystem]`
→ better, but `camera bump` borders definitional and only ~2 dimensions.

🟢 **GREAT:**
```
text: 'iPhone'
tags: ['status', 'launch queue', 'blue vs green bubble', 'no charger in box',
       'screen crack', 'one more thing', 'upgrade guilt', 'airdrop', 'pristine',
       'EMI']
clusters: ['gadget', 'status-symbol']
related: ['AirPods', 'Android', 'EMI']
culture: 'global', language: 'en', popularity: 92,
difficulty: 'easy', discussionScore: 86, chaosScore: 42, guessDifficulty: 38
```
→ dimensions hit: sensory (`pristine`, `screen crack`), social (`blue vs green
bubble`, `airdrop`), emotion (`upgrade guilt`, `status`), occasion (`launch
queue`), cultural moment (`one more thing`), stakes (`screen crack`, `EMI`).
No giveaways. Multiple independent clue angles. Impostor can bluff from any one.

---

*This document is the quality bar. If an entry doesn't clear it, it doesn't ship —
no exceptions for volume. A smaller, great library beats a large, lazy one.*
