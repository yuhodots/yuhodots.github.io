---
name: writing-blog-posts
description: Use when writing or drafting a new blog post for this project (yuhodots.github.io, a Gatsby tech blog) — triggers on "블로그 글 써줘", "블로그 글/포스트 작성", "~에 대한 글 써줘", "write a blog post", or drafting a post about an ML/Web/CS topic. NOT for editing site code or fixing already-published posts.
---

# Writing Blog Posts

## Overview

Draft a new blog post for this Gatsby blog (`yuhodots.github.io`) in the author's established house style and save it to the **staging directory** for later review. The output is a single Korean-language Markdown draft — not a live post, not a built site.

**Core principle:** Match the *current* house style by reading recent posts (it evolves — don't trust memory or this file alone), ground every claim in verified sources, and leave the file in staging for the author to publish.

## When to Use

- The author asks to write / draft a new blog post or "글" on a topic.
- You're producing a post from references the author gave you, or from your own research.

**Not for:** editing site components, fixing typos in published posts under `contents/`, or building/deploying the site.

## Procedure

### 1. Study the current style (always, first)

Read the **~10 most recent posts** in `contents/kor/{MachineLearning,Web,Archive}/` — pick recency by the `yy-mm-dd` prefix in the filename / the `date:` frontmatter, **not** file modification time. Absorb the current frontmatter shape, header rhythm, paragraph length, tone, and how diagrams/tables/code are used. Style drifts over time; the latest posts are the source of truth.

### 2. Gather material

- **References provided** → use them as primary sources. Verify, and supplement only if there are real gaps.
- **No references** → decide per topic:
  - **Big / fast-moving / unfamiliar / needs several primary sources** → invoke the `deep-research` skill, then write the post from its cited findings.
  - **Narrow / familiar / well-bounded** → run 3–5 targeted web searches and fetch the primary sources directly.
- Cite verified sources in a `### References` section. **Never fabricate** facts, numbers, quotes, or citations. Prefer primary sources (official docs, papers with arXiv IDs). Flag contested numbers rather than asserting them.

### 3. Write in the house style

**Frontmatter** (fill every required field):

```markdown
---
title: "Short, descriptive — usually English"
date: "YYYY-MM-DD"
template: "post"
draft: false
path: "/{section}/{yy-mm-dd}/"
description: "한국어 SEO 요약 (2~3문장). 마지막 문장은 AI 작성 고지로 끝냅니다."
category: "<one of the valid categories below>"
thumbnail: "<key>"
---
```

Category → `path` section mapping (not exhaustive — match an existing sibling post; the full taxonomy lives in the `Category` components):

| `category`      | `path` section   |
| --------------- | ---------------- |
| Deep Learning   | `/deeplearning/` |
| BackEnd         | `/backend/`      |
| FrontEnd        | `/frontend/`     |
| Cheat Sheet     | `/cheatsheet/`   |
| Operations      | `/Operations/`   |
| Mathematics     | `/mathematics/`  |
| Essay           | `/essay/`        |
| Mobile          | `/mobile/`       |

- `date` = today. `draft: false`. `thumbnail` is optional — omit it if unsure, or reuse the key a sibling post in the same category uses (keys are registered in `images/index.js`); never invent a key.
- **`path` collision:** the default `path` is `/{section}/{yy-mm-dd}/`, but if a post with the **same date and same section** already exists, that path would collide in Gatsby's page generation. In that case append a short disambiguating slug, e.g. `/deeplearning/26-05-30-ner-ned/`. (This affects the `path` field only — the draft filename is already unique via its `{slug}`.)

**Body:**

- **Intro:** open with one `>` blockquote (2–4 sentences) summarizing the post. The **last sentence is the AI-authorship disclosure**. Canonical default (edit if images are involved):
  > 본 글은 AI(Claude Code)를 활용해 관련 자료를 조사·정리하고 초안을 작성한 뒤, 직접 검토·편집하여 완성하였습니다.
- **Headers:** `###` for top-level sections, `#####` for sub-sections. **Skip `##` and `####`** — this blog uses only `###`/`#####`. Section titles are **short English** ("What is X?", "How It Works", "References"), even though the body is Korean.
- **Prose:** Korean, polite declarative register — **`~합니다 / ~입니다.` with trailing periods**. Do *not* write in 음슴체 / drop sentence-final periods. Keep paragraphs short (2–4 sentences, one idea each) for readability. **Bold** key terms with `**...**`.
- Use bullet lists only for genuine enumerations — not as a substitute for explanatory prose. Add mermaid diagrams, comparison tables, and fenced code blocks where they earn their place (the recent posts do).
- **End with a reference section** containing footnote-style sources (`[^1]`, …). Recent posts title it `### References` (plural) — match the current siblings.

### 4. Save to staging

Save the single file to:

```
docs/superpowers/post-draft/{yy-mm-dd}-{slug}.md
```

- `{yy-mm-dd}` = today (2-digit year). `{slug}` = short kebab-case from the title.
- Create the `docs/superpowers/post-draft/` directory if it doesn't exist.
- This is a **draft for the author to review** — they move it into `contents/kor/{Category}/` themselves when ready.

## Hard Rules (do NOT)

- ❌ Write into `contents/kor/` or `contents/eng/`. Drafts go to `docs/superpowers/post-draft/` only.
- ❌ Create an English counterpart / bilingual pair. One Korean draft per invocation.
- ❌ Run `yarn build`, `yarn develop`, `yarn deploy`, or otherwise build the site. It's a draft.
- ❌ Fabricate sources, statistics, or quotes.

## Common Mistakes (from real baselines)

| Mistake | Fix |
| ------- | --- |
| Saved into `contents/kor/Web/…` (live tree) | Save only to `docs/superpowers/post-draft/` |
| Created a kor + eng file pair | One Korean draft only |
| Ran `yarn build` and generated `public/` | Never build; the output is a draft file |
| Wrote in 음슴체, dropped sentence periods | Polite declarative `~합니다/~입니다.` with periods |
| Whole section as a bullet dump | Prose paragraphs; bullets for real lists only |
| Used `##` / `####` headers | Only `###` and `#####` |
| Korean section titles | Short English section titles |
| Guessed `thumbnail: openai` | Omit if unsure, or reuse a sibling's key |
| Asserted unverified numbers | Verify; cite in `### References`, flag contested figures |

## Pre-Save Checklist

- [ ] Read ~10 recent `contents/kor/*` posts (by date) before writing.
- [ ] Frontmatter complete; `path` section matches `category`; `date` = today; `draft: false`.
- [ ] `>` intro blockquote present, ending in the AI-disclosure sentence.
- [ ] Only `###` / `#####` headers, short English titles.
- [ ] Korean body in `~합니다/~입니다.`, short paragraphs.
- [ ] `### References` with verified, cited sources.
- [ ] Saved to `docs/superpowers/post-draft/{yy-mm-dd}-{slug}.md` — and nowhere under `contents/`.
- [ ] No site build run.
