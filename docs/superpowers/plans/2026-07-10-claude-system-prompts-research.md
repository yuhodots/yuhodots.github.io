# Claude System Prompts Research Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사용자가 제공한 네 개의 비공식 Claude 시스템 프롬프트 원문을 직접 분석하여, 모델별 독립 한국어 연구 문서 네 개를 `docs/research/`에 완성합니다.

**Architecture:** Claude Sonnet 5, Claude Opus 4.8, Claude Fable 5는 서로 다른 서브 에이전트가 한 파일씩 담당하고, 메인 에이전트는 Claude Code Opus 4.8을 담당합니다. 네 작업은 동일한 문서 계약을 따르되 독립적으로 진행하며, 마지막에 메인 에이전트가 원문 대조와 교차 문서 편집을 수행합니다.

**Tech Stack:** Markdown, GitHub 원문, 웹 브라우징, `rg`, `git diff --check`

## Global Constraints

- 설계 기준은 `docs/superpowers/specs/2026-07-10-claude-system-prompts-research-design.md`입니다.
- 산출물은 frontmatter 없는 한국어 상세 기술 분석 문서입니다.
- 기존의 빈 `docs/research/*.md` 파일 네 개를 사용하고 파일 이름을 변경하지 않습니다.
- 사용자가 제공한 GitHub URL을 각 모델 문서의 1차 자료로 사용합니다.
- 비공식 수집본이라는 점과 실제 서비스 프롬프트 전체·최신본임을 보장할 수 없다는 한계를 각 문서에 명시합니다.
- 원문을 대량 번역하거나 복제하지 않고, 짧은 인용 외에는 한국어로 재서술합니다.
- 사실과 해석을 구분하고, 원문에 없는 기능이나 정책을 추정해 추가하지 않습니다.
- 네 문서 모두 `전체적인 구조`, `핵심 항목`, `특징`, `요약`, `References`를 명시적으로 포함합니다.
- `contents/`를 수정하지 않고 Gatsby 빌드·개발 서버·배포를 실행하지 않습니다.
- 병렬 작업자는 자신에게 배정된 출력 파일 하나만 수정하며 Git 커밋은 메인 에이전트가 통합 검수 후 수행합니다.

## File Structure

- Modify: `docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md` — Claude Code Opus 4.8의 코딩 에이전트 실행 계약 분석
- Modify: `docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md` — Claude Sonnet 5의 일반 대화 모델 시스템 지침 분석
- Modify: `docs/research/260710-claude-opus4-8-system-prompt-summary.md` — Claude Opus 4.8의 일반 대화 모델 시스템 지침 분석
- Modify: `docs/research/260710-claude-fable5-system-prompt-summary.md` — Claude Fable 5의 시스템 지침 분석

---

### Task 1: Claude Sonnet 5 Research Note

**Files:**
- Modify: `docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md`
- Reference: `docs/superpowers/specs/2026-07-10-claude-system-prompts-research-design.md`
- Source: `https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-sonnet-5.md`

**Interfaces:**
- Consumes: 공통 문서 구조와 출처 정책
- Produces: Claude Sonnet 5만을 다루는 독립 연구 문서 한 개

- [ ] **Step 1: 원문 접근성과 대상 모델을 검증합니다.**

  브라우징 도구로 Source URL을 열어 페이지 제목, 파일 경로, 본문 존재 여부를 확인합니다. 링크가 GitHub UI에서 렌더링되지 않으면 같은 커밋의 Raw 파일을 열되 References에는 사용자가 제공한 URL을 유지합니다.

- [ ] **Step 2: 원문의 구조 인벤토리를 만듭니다.**

  최상위 지시 블록, 모델 정체성, 지식·시간 처리, 응답 규칙, 안전 경계, 저작권·인용, 도구 또는 외부 정보 규칙을 원문 순서와 함께 파악합니다. 존재하지 않는 범주는 `없음`으로 억지로 만들지 않고, 다른 모델과 비교할 때 의미 있는 부재만 본문에서 설명합니다.

- [ ] **Step 3: 공통 계약에 맞춰 문서를 작성합니다.**

  다음 최상위 목차를 모두 포함합니다.

  ```markdown
  # Claude Sonnet 5 System Prompt 분석
  ### Document Scope
  ### Overview
  ### Overall Structure
  ### Core Instructions
  ### Distinctive Characteristics
  ### Summary
  ### References
  ```

  `Overall Structure`에는 계층이나 실행 흐름을 보여주는 표 또는 Mermaid를 하나 이상 포함합니다. `Core Instructions`에서는 원문에 확인되는 규칙을 주제별로 설명하고, `Distinctive Characteristics`에서는 반복 강조점과 프롬프트 설계가 응답 행동에 미치는 영향을 분석합니다.

- [ ] **Step 4: 문서 자체 검증을 실행합니다.**

  Run:

  ```bash
  test -s "docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md"
  rg -n '^### (Overall Structure|Core Instructions|Distinctive Characteristics|Summary|References)$' "docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md"
  rg -n 'claude-sonnet-5\.md' "docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md"
  ```

  Expected: 첫 명령의 종료 코드가 0이고, 두 번째 명령이 필수 섹션 5개를 모두 출력하며, 세 번째 명령이 References의 원문 링크를 출력합니다.

### Task 2: Claude Opus 4.8 Research Note

**Files:**
- Modify: `docs/research/260710-claude-opus4-8-system-prompt-summary.md`
- Reference: `docs/superpowers/specs/2026-07-10-claude-system-prompts-research-design.md`
- Source: `https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-opus-4.8.md`

**Interfaces:**
- Consumes: 공통 문서 구조와 출처 정책
- Produces: Claude Opus 4.8 일반 대화 모델만을 다루는 독립 연구 문서 한 개

- [ ] **Step 1: 원문 접근성과 Claude Code 버전과의 구분을 검증합니다.**

  브라우징 도구로 Source URL을 열어 본문이 일반 대화 모델용인지 확인합니다. Claude Code Opus 4.8 원문과 파일 경로가 다르다는 점을 기록하고, 두 프롬프트의 역할을 혼합하지 않습니다.

- [ ] **Step 2: 원문의 구조 인벤토리를 만듭니다.**

  모델 정체성, 사용자 의도 처리, 응답 깊이와 형식, 정직성·불확실성, 지식과 시간, 안전, 저작권·인용, 외부 정보 또는 도구 규칙을 원문 근거에 따라 분류합니다.

- [ ] **Step 3: 공통 계약에 맞춰 문서를 작성합니다.**

  다음 최상위 목차를 모두 포함합니다.

  ```markdown
  # Claude Opus 4.8 System Prompt 분석
  ### Document Scope
  ### Overview
  ### Overall Structure
  ### Core Instructions
  ### Distinctive Characteristics
  ### Summary
  ### References
  ```

  `Distinctive Characteristics`에서 복잡한 요청을 다루는 태도, 정직성과 안전 경계, 일반 대화 모델로서 Claude Code 버전과 구분되는 지점을 원문 근거로 설명합니다.

- [ ] **Step 4: 문서 자체 검증을 실행합니다.**

  Run:

  ```bash
  test -s docs/research/260710-claude-opus4-8-system-prompt-summary.md
  rg -n '^### (Overall Structure|Core Instructions|Distinctive Characteristics|Summary|References)$' docs/research/260710-claude-opus4-8-system-prompt-summary.md
  rg -n 'claude-opus-4\.8\.md' docs/research/260710-claude-opus4-8-system-prompt-summary.md
  ```

  Expected: 첫 명령의 종료 코드가 0이고, 두 번째 명령이 필수 섹션 5개를 모두 출력하며, 세 번째 명령이 References의 원문 링크를 출력합니다.

### Task 3: Claude Fable 5 Research Note

**Files:**
- Modify: `docs/research/260710-claude-fable5-system-prompt-summary.md`
- Reference: `docs/superpowers/specs/2026-07-10-claude-system-prompts-research-design.md`
- Source: `https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-fable-5.md`

**Interfaces:**
- Consumes: 공통 문서 구조와 출처 정책
- Produces: Claude Fable 5만을 다루는 독립 연구 문서 한 개

- [ ] **Step 1: 원문 접근성과 대상 모델을 검증합니다.**

  브라우징 도구로 Source URL을 열어 파일 내용과 모델명을 확인합니다. `Fable`이라는 이름으로부터 창작 특성을 추정하지 않고 실제 원문 지시만 사용합니다.

- [ ] **Step 2: 원문의 구조 인벤토리를 만듭니다.**

  모델 정체성, 서술 또는 창작 지침, 사용자 의도 처리, 스타일, 안전, 정직성, 저작권·인용, 도구·외부 정보 관련 규칙을 원문에 존재하는 범위에서 분류합니다.

- [ ] **Step 3: 공통 계약에 맞춰 문서를 작성합니다.**

  다음 최상위 목차를 모두 포함합니다.

  ```markdown
  # Claude Fable 5 System Prompt 분석
  ### Document Scope
  ### Overview
  ### Overall Structure
  ### Core Instructions
  ### Distinctive Characteristics
  ### Summary
  ### References
  ```

  `Distinctive Characteristics`에서 실제 원문에 확인되는 서술 성향과 일반 안전·정직성 규칙의 관계를 분석합니다. 원문에 창작 특화 지침이 없다면 그 사실을 명시하고 이름만으로 특징을 만들지 않습니다.

- [ ] **Step 4: 문서 자체 검증을 실행합니다.**

  Run:

  ```bash
  test -s docs/research/260710-claude-fable5-system-prompt-summary.md
  rg -n '^### (Overall Structure|Core Instructions|Distinctive Characteristics|Summary|References)$' docs/research/260710-claude-fable5-system-prompt-summary.md
  rg -n 'claude-fable-5\.md' docs/research/260710-claude-fable5-system-prompt-summary.md
  ```

  Expected: 첫 명령의 종료 코드가 0이고, 두 번째 명령이 필수 섹션 5개를 모두 출력하며, 세 번째 명령이 References의 원문 링크를 출력합니다.

### Task 4: Claude Code Opus 4.8 Research Note

**Files:**
- Modify: `docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md`
- Reference: `docs/superpowers/specs/2026-07-10-claude-system-prompts-research-design.md`
- Source: `https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/Claude%20Code/claude-code-opus-4.8.md`

**Interfaces:**
- Consumes: 공통 문서 구조와 출처 정책
- Produces: Claude Code Opus 4.8 코딩 에이전트만을 다루는 독립 연구 문서 한 개

- [ ] **Step 1: 원문 접근성과 전체 프롬프트 경계를 검증합니다.**

  브라우징 도구로 Source URL을 열어 Claude Code 경로, 모델명, 도구 정의 및 런타임 지침 포함 여부를 확인합니다. 저장소 파일이 여러 시스템 블록이나 도구 스키마를 합친 자료라면 그 경계를 문서에서 구분합니다.

- [ ] **Step 2: 원문의 구조 인벤토리를 만듭니다.**

  지시 우선순위, 저장소 지침, 계획, 사용자 진행 보고, 도구 선택, 파일 읽기·편집, 셸 실행, 권한과 샌드박스, Git 안전성, 검증, 완료 보고, 서브 에이전트, 웹 또는 MCP 관련 규칙을 원문 순서와 역할별 분류로 함께 정리합니다.

- [ ] **Step 3: 공통 계약에 맞춰 문서를 작성합니다.**

  다음 최상위 목차를 모두 포함합니다.

  ```markdown
  # Claude Code Opus 4.8 System Prompt 분석
  ### Document Scope
  ### Overview
  ### Overall Structure
  ### Core Instructions
  ### Distinctive Characteristics
  ### Summary
  ### References
  ```

  `Overall Structure`에는 지시 수집부터 탐색·계획·도구 실행·검증·최종 보고까지의 흐름을 Mermaid로 나타냅니다. `Core Instructions`에는 도구별 나열보다 행동 계약과 안전 경계가 어떤 목적을 갖는지 설명합니다.

- [ ] **Step 4: 문서 자체 검증을 실행합니다.**

  Run:

  ```bash
  test -s "docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md"
  rg -n '^### (Overall Structure|Core Instructions|Distinctive Characteristics|Summary|References)$' "docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md"
  rg -n 'claude-code-opus-4\.8\.md' "docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md"
  ```

  Expected: 첫 명령의 종료 코드가 0이고, 두 번째 명령이 필수 섹션 5개를 모두 출력하며, 세 번째 명령이 References의 원문 링크를 출력합니다.

### Task 5: Integrated Editorial and Source Verification

**Files:**
- Modify: `docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md`
- Modify: `docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md`
- Modify: `docs/research/260710-claude-opus4-8-system-prompt-summary.md`
- Modify: `docs/research/260710-claude-fable5-system-prompt-summary.md`

**Interfaces:**
- Consumes: Tasks 1–4의 완성 문서와 각 작업자의 원문 대조 요약
- Produces: 구조·용어·출처·Markdown 형식이 통일된 최종 연구 문서 네 개

- [ ] **Step 1: 네 문서의 존재와 공통 구조를 일괄 검사합니다.**

  Run:

  ```bash
  wc -l docs/research/*.md
  rg --files-without-match '^### Overall Structure$' docs/research/*.md
  rg --files-without-match '^### Core Instructions$' docs/research/*.md
  rg --files-without-match '^### Distinctive Characteristics$' docs/research/*.md
  rg --files-without-match '^### Summary$' docs/research/*.md
  rg --files-without-match '^### References$' docs/research/*.md
  ```

  Expected: 각 파일이 상세 분석에 충분한 본문을 가지며, `rg --files-without-match` 명령들은 아무 파일도 출력하지 않습니다.

- [ ] **Step 2: 각 문서를 해당 원문과 다시 대조합니다.**

  모델명, 파일 경로, 도구명, 지시 계층, 안전 및 저작권 규칙을 원문에서 다시 확인합니다. 원문 사실과 분석자의 해석이 섞인 문장은 `원문은 ...을 요구합니다`와 `이는 ...으로 해석할 수 있습니다`처럼 문장을 분리합니다.

- [ ] **Step 3: 교차 문서 편집을 수행합니다.**

  공통 용어는 `시스템 프롬프트`, `지시 계층`, `도구 호출`, `안전 경계`, `불확실성`으로 통일합니다. 반복되는 출처 주의사항은 유지하되 모델별 설명이 같은 문장으로 복제되지 않도록 다듬습니다. Claude Code Opus 4.8과 Claude Opus 4.8의 역할 차이를 두 문서 모두에서 분명히 합니다.

- [ ] **Step 4: 미완성 문구와 Markdown 오류를 검사합니다.**

  Run:

  ```bash
  rg -n 'TBD|TODO|FIXME|작성 예정|추가 필요' docs/research/*.md
  git diff --check -- docs/research
  rg -n '^---$' docs/research/*.md
  ```

  Expected: 첫 번째 명령은 미완성 문구를 출력하지 않고, `git diff --check`는 오류 없이 종료하며, 마지막 명령은 frontmatter 구분선을 출력하지 않습니다. 본문에서 의미상 필요한 수평선이 있다면 frontmatter가 아님을 수동 확인합니다.

- [ ] **Step 5: 최종 변경 범위를 검토합니다.**

  Run:

  ```bash
  git status --short
  wc -l docs/research/*.md
  for file in docs/research/*.md; do sed -n '1,260p' "$file"; done
  ```

  Expected: 네 개의 목표 문서만 이번 연구 산출물로 포함되고, 사용자 소유의 기존 변경은 스테이징하지 않습니다.

- [ ] **Step 6: 네 연구 문서를 한 커밋으로 기록합니다.**

  Run:

  ```bash
  git add -- "docs/research/260710-claude-code-opus4-8-system-prompt-summary copy 2.md" "docs/research/260710-claude-sonnet5-system-prompt-summary copy 3.md" docs/research/260710-claude-opus4-8-system-prompt-summary.md docs/research/260710-claude-fable5-system-prompt-summary.md
  git commit -m "docs: analyze Claude system prompts"
  ```

  Expected: 정확히 네 개의 연구 문서만 포함한 새 커밋이 생성됩니다.
