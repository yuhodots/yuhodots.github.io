# Claude/Codex Shared Instructions Design

## Goal

프로젝트 지침과 `writing-blog-posts` 스킬을 한 곳에서 관리하면서 Claude Code와 Codex가 모두 자동으로 발견하도록 구성합니다.

## Current State

- 공통 프로젝트 지침은 루트 `CLAUDE.md`에만 있습니다.
- 블로그 작성 스킬은 `.claude/skills/writing-blog-posts/SKILL.md`에만 있습니다.
- `.claude/settings.local.json`은 Claude Code 전용 권한 설정입니다.
- `writing-blog-posts/SKILL.md`에는 커밋되지 않은 사용자 변경이 있으므로 내용을 그대로 보존해야 합니다.

## Considered Approaches

### 1. `.agents`를 공통 원본으로 사용하고 Claude 진입점을 연결

- `AGENTS.md`가 프로젝트 지침의 원본입니다.
- `CLAUDE.md`는 `@AGENTS.md`만 가져옵니다.
- `.agents/skills/writing-blog-posts/`가 스킬의 원본입니다.
- `.claude/skills/writing-blog-posts`는 공통 스킬 디렉터리를 가리키는 상대 심볼릭 링크입니다.

장점은 도구 중립적인 공통 파일이 명확하고, 같은 내용을 두 번 수정할 필요가 없다는 점입니다. 단점은 심볼릭 링크를 지원하지 않는 파일 복사·배포 환경에서 링크 보존 여부를 확인해야 한다는 점입니다.

### 2. `.claude`를 원본으로 유지하고 Codex 진입점만 연결

현재 파일 이동이 최소화되고 Claude Code의 기존 구조를 그대로 유지할 수 있습니다. 하지만 공통 스킬의 원본이 특정 도구 이름 아래 남아 구조의 의도가 덜 분명합니다.

### 3. 두 위치에 파일을 복제

심볼릭 링크가 필요 없지만 두 사본이 쉽게 달라질 수 있습니다. 장기 유지보수 비용 때문에 사용하지 않습니다.

## Decision

1번을 사용합니다. 공통 지침과 공통 스킬의 원본은 각각 `AGENTS.md`, `.agents/skills/`에 둡니다. Claude Code가 요구하는 `CLAUDE.md`, `.claude/skills/`는 공통 원본을 참조하는 호환 진입점으로 유지합니다.

## Target Structure

```text
blog-develop/
├── AGENTS.md
├── CLAUDE.md                         # @AGENTS.md
├── .agents/
│   └── skills/
│       └── writing-blog-posts/
│           └── SKILL.md              # 공통 원본
└── .claude/
    ├── settings.local.json           # Claude 전용, 변경하지 않음
    └── skills/
        └── writing-blog-posts -> ../../.agents/skills/writing-blog-posts
```

## Compatibility Rules

- 공통 프로젝트 규칙은 `AGENTS.md`에서만 수정합니다.
- `CLAUDE.md`에는 `@AGENTS.md` 가져오기 외에 공통 규칙을 복제하지 않습니다.
- 공통 스킬은 `.agents/skills/`에서만 수정합니다.
- Claude 전용 권한은 `.claude/settings.local.json`에 남기며 Codex 설정으로 번역하지 않습니다.
- 기존 `writing-blog-posts` 스킬의 커밋되지 않은 변경을 포함한 파일 내용과 Git 추적 이력을 보존합니다.

## Verification

- `CLAUDE.md`가 정확히 `@AGENTS.md`를 가져오는지 확인합니다.
- `.claude/skills/writing-blog-posts`가 존재하는 상대 링크이며 `.agents/skills/writing-blog-posts`를 가리키는지 확인합니다.
- 두 도구의 경로에서 읽은 `SKILL.md` 내용이 동일한지 확인합니다.
- `AGENTS.md`가 비어 있지 않고 스킬의 필수 YAML frontmatter가 존재하는지 확인합니다.
- Git diff에서 `.claude/settings.local.json`과 사용자 스킬 내용에 의도하지 않은 변경이 없는지 확인합니다.

## Non-Goals

- Claude Code의 로컬 권한을 Codex 권한 설정으로 변환하지 않습니다.
- 사이트 코드, 블로그 콘텐츠, 빌드 설정은 수정하지 않습니다.
- 공통화와 무관한 문서 내용은 정리하거나 다시 작성하지 않습니다.
