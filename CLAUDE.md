# Yuho Jeong's Blog - Developer Guide

Gatsby 기반 개인 기술 블로그 (`yuhodots.github.io`).
Machine Learning, Web 관련 글을 Markdown으로 작성하고, GitHub Pages로 배포합니다.

---

## Architecture Overview

```
blog-develop/
├── contents/                # 블로그 포스트 (Markdown)
│   ├── MachineLearning/     # ML/DL 관련 포스트
│   ├── Web/                 # 웹 개발 관련 포스트
│   ├── Archive/             # 기타 아카이브 포스트
│   ├── About/               # About 페이지 콘텐츠
│   └── img/                 # 포스트에 사용되는 이미지
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Header/          # 네비게이션 헤더
│   │   ├── Home/            # 메인 페이지 (포스트 목록)
│   │   ├── Post/            # 포스트 상세 (본문, TOC, 댓글)
│   │   ├── Category/        # 카테고리 목록 및 필터링
│   │   ├── About/           # About 페이지
│   │   ├── layout.js        # 공통 레이아웃 (Header + Footer)
│   │   └── seo.js           # SEO 메타 태그 (react-helmet)
│   ├── templates/           # Gatsby 페이지 템플릿
│   │   ├── index.js         # 홈 (/) - 전체 포스트 목록
│   │   ├── post.js          # 개별 포스트 (/path)
│   │   ├── category.js      # 카테고리 (/category)
│   │   └── about.js         # About (/about)
│   └── pages/
│       └── 404.js           # 404 에러 페이지
├── stylesheets/
│   ├── asset.scss           # 글로벌 스타일 (폰트, 리셋, 테마)
│   ├── _variables.scss      # SCSS 변수
│   └── _default.scss        # 기본 스타일
├── images/                  # 사이트 이미지 (프로필 등)
├── static/                  # 정적 파일
├── gatsby-config.js         # Gatsby 설정 및 플러그인
├── gatsby-node.js           # 페이지 생성 로직
├── gatsby-browser.js        # 브라우저 API (Prism 테마)
└── gatsby-ssr.js            # SSR API (미사용)
```

---

## Tech Stack

- **Framework:** Gatsby 5 (Static Site Generator)
- **UI:** React 18 + JavaScript
- **Styling:** SCSS (Sass)
- **Content:** Markdown (`gatsby-transformer-remark`)
- **Comments:** Utterances (GitHub Issues 기반)
- **Math:** KaTeX (`gatsby-remark-katex`)
- **Syntax Highlighting:** PrismJS (`gatsby-remark-prismjs`, Solarized Light 테마)
- **Image Optimization:** `gatsby-plugin-image` + `gatsby-plugin-sharp`
- **Analytics:** Google Analytics (gtag: `G-T7DDYNCDL6`)
- **SEO:** `react-helmet`, `gatsby-plugin-sitemap`, RSS Feed
- **Deploy:** `gh-pages` (master 브랜치로 배포)
- **Package Manager:** yarn

---

## Development Commands

```bash
# 개발 서버 실행
yarn develop          # localhost:8000

# 프로덕션 빌드
yarn build

# 빌드 결과 로컬 서빙
yarn serve

# 캐시 정리 (빌드 오류 시)
yarn clean

# 배포 (빌드 → public/ → gh-pages로 master 브랜치에 push)
yarn deploy

# 코드 포맷팅
yarn format
```

---

## Git Branch Strategy

- **develop**: 개발 브랜치 (기본 작업 브랜치)
- **master**: 배포 브랜치 (`gh-pages`가 `public/` 결과물을 push)

---

## Content (포스트) 작성 규칙

### Frontmatter 형식

모든 Markdown 포스트는 다음 frontmatter를 포함해야 합니다:

```markdown
---
title: "포스트 제목"
date: "2024-05-14"
template: "post"
draft: false
path: "/datascience/24-05-14/"
description: "포스트 설명 (SEO 및 목록에 표시)"
category: "카테고리명"
thumbnail: "썸네일키"
---
```

### 필드 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `title` | O | 포스트 제목 |
| `date` | O | 작성일 (YYYY-MM-DD) |
| `template` | O | 항상 `"post"` |
| `draft` | O | `true`면 비공개 |
| `path` | O | URL 경로 (예: `/datascience/24-05-14/`) |
| `description` | O | 요약 설명 |
| `category` | O | 카테고리 (아래 목록 참고) |
| `thumbnail` | - | 썸네일 이미지 키 |

### 카테고리 체계

3개의 상위 그룹으로 분류됩니다 (`Category/CategoryList/CategoryList.js`):

- **MachineLearning 그룹**: Deep Learning, Reinforcement Learning, Meta Learning, Probabilistic, Optimization, Data Mining 등
- **Web 그룹**: FrontEnd, BackEnd 등
- **Archive 그룹**: Linguistics, Linear Algebra, Basics 등

### 이미지 사용

포스트 내 이미지는 `contents/img/` 디렉토리에 저장하고, 상대 경로로 참조합니다:

```markdown
<center><img src="../img/파일명.png"></center>
```

---

## Component Architecture

### 페이지 흐름

```
gatsby-node.js (createPages)
  ├── / → templates/index.js → Home (포스트 목록)
  ├── /category → templates/category.js → Category (카테고리 필터)
  ├── /about → templates/about.js → About (자기소개)
  └── /{post.path} → templates/post.js → Post (포스트 상세)
```

### 주요 컴포넌트

- **Layout** (`layout.js`): Header + children + Footer 래핑. `type` prop으로 레이아웃 변형 (`main`, `post`, `category`)
- **Header** (`Header/`): 사이트 제목, 네비게이션 (Home, Category, About, GitHub 링크)
- **Home** (`Home/`): 포스트 목록. `Item` 컴포넌트로 개별 포스트 렌더링 (제목, 설명, 카테고리, 날짜, 썸네일)
- **Post** (`Post/`): 포스트 본문 + TableOfContents + PostInfo + Comment. 스크롤 시 '맨 위로' 버튼
- **Category** (`Category/`): CategoryList (카테고리 버튼) + SelectedCategory (필터링된 포스트 목록)
- **Comment/Utterances** (`Post/Comment/`): GitHub Issues 기반 댓글 시스템 (utterances)

### 데이터 흐름

1. Gatsby가 빌드 시 `contents/` 의 Markdown 파일을 GraphQL 노드로 변환
2. 각 템플릿에서 `useStaticQuery` 또는 페이지 쿼리로 데이터 조회
3. `draft: true`인 포스트는 빌드에서 제외
4. `template: "post"`인 Markdown만 포스트로 처리

---

## Gatsby Plugin 구성

| 플러그인 | 용도 |
|----------|------|
| `gatsby-source-filesystem` | `contents/` 디렉토리의 Markdown 파일 소싱 |
| `gatsby-transformer-remark` | Markdown → HTML 변환 |
| `gatsby-remark-katex` | LaTeX 수식 렌더링 |
| `gatsby-remark-prismjs` | 코드 구문 강조 |
| `gatsby-remark-images` | Markdown 내 이미지 최적화 (max 760px) |
| `gatsby-remark-autolink-headers` | h2~h5 헤더에 앵커 링크 추가 |
| `gatsby-plugin-image/sharp` | 이미지 최적화 파이프라인 |
| `gatsby-plugin-sass` | SCSS 지원 |
| `gatsby-plugin-sitemap` | sitemap.xml 생성 |
| `gatsby-plugin-feed` | RSS Feed 생성 (`/rss.xml`) |
| `gatsby-plugin-google-gtag` | Google Analytics |
| `gatsby-plugin-disqus` | Disqus 설정 (현재 Utterances로 대체) |
| `gatsby-plugin-manifest` | PWA manifest |
| `gatsby-alias-imports` | `rootFolder: "src"` 별칭 (`components/...` 로 import) |

---

## Import 별칭

`gatsby-alias-imports` 설정으로 `src/`를 루트로 하는 별칭이 설정되어 있습니다:

```javascript
// 상대 경로 대신 별칭 사용
import Layout from "components/layout";     // src/components/layout.js
import Home from "components/Home";          // src/components/Home/index.js
```

---

## Important Reminders

- 요청된 작업만 수행하고, 불필요한 파일을 생성하지 않기
- 기존 파일 수정을 우선하고, 새 파일 생성은 최소화
- 포스트 작성 시 반드시 frontmatter 형식을 준수
- `draft: true` 설정으로 비공개 포스트 관리 가능
- 빌드 오류 시 `yarn clean` 후 재빌드
- 배포는 `yarn deploy`로 master 브랜치에 자동 push
