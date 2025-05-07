---
title: "Supabase 시작하기: DB, Auth, Edge Functions"
date: "2025-05-08"
template: "post"
draft: false
path: "/backend/25-05-08/"
description: "Supabase는 빠르고 손쉽게 백엔드 인프라를 구축하고 배포할 수 있게 도와주는 오픈소스 플랫폼입니다. Firebase와 유사한 API를 제공하면서도, PostgreSQL을 기반으로 만들어진 만큼 SQL 및 오픈소스의 강점을 모두 누릴 수 있습니다."
category: "BackEnd"
thumbnail: "supabase"
---

> 이 글에서는 Supabase의 주요 기능들, 설치 및 기초 사용법, 실제 개발 예시 등을 소개합니다.

Supabase는 빠르고 손쉽게 백엔드 인프라를 구축하고 배포할 수 있게 도와주는 오픈소스 플랫폼입니다. Firebase와 유사한 API를 제공하면서도, PostgreSQL을 기반으로 만들어진 만큼 SQL 및 오픈소스의 강점을 모두 누릴 수 있습니다.

### 1. Supabase?

Supabase는 오픈소스 Firebase 대체제입니다. 강력한 Postgres 데이터베이스 위에 Auth, Realtime, Storage, Edge Function, Analytics 등 개발자가 현대적인 앱을 빠르게 개발할 수 있도록 돕는 다양한 서비스를 제공합니다.

아래와 같은 특징을 가져 빠르게 PoC 용도의 서비스를 만드는데에 적합합니다.

- 완전 관리형 PostgreSQL DB 제공
- 손쉬운 인증 및 권한(인증, 인가) 시스템 내장
- 실시간 데이터베이스 변화 감지(Realtime)
- 대용량 파일 저장소(Storage)
- 엣지 함수(Edge Function)로 serverless 백엔드 확장
- Web 및 모바일 앱 친화적 API 제공
- 오픈소스 및 커스터마이징의 자유로움

이러한 특징들을 바탕으로 백엔드 코드 하나 없이 프론트엔트 만으로도 기본적인 백엔드 기능이 들어가 있는 서비스를 충분히 구현할 수 있습니다.

### 2. Products

제공하는 구체적인 기능은 다음과 같습니다.

- Database: PostgreSQL 기반의 관리형 데이터베이스. SQL 및 자동 타입 생성을 통해 안전하게 데이터를 관리할 수 있습니다.

- Authentication (Auth) : 이메일/비밀번호, OAuth(구글, 깃허브 등), Magic Link, OTP 등 다양한 인증 방식을 지원합니다. 권한(RLS) 관리가 Postgres 레벨에서 자연스럽게 연동됩니다. 이러한 특성 덕분에 백엔드 서버 없는 개발 또한 용이하게 만듭니다.

- Storage: AWS S3 호환 파일 스토리지 기능을 제공합니다. 사용 권한 제어 및 URL로 파일 배포가 가능합니다.

- Realtime: 데이터베이스 변화(INSERT/UPDATE/DELETE)에 대한 실시간 구독 기능을 제공합니다. 웹소켓 기반 구현으로 협업 앱 개발에 유용합니다.

- Edge Functions: Deno 기반의 서버리스 함수를 제공합니다. 데이터베이스 트리거, 타사 API 호출 등 다양한 서버사이드 로직을 유연하게 구현할 수 있습니다.

- Analytics : 프로젝트의 API 사용량, 에러 현황, 데이터베이스 쿼리 등 다양한 리소스 모니터링 및 인사이트를 제공합니다. 

### 3. Quick Start

먼저 Supabase CLI를 설치합니다.

```bash
brew install supabase/tap/supabase
brew upgrade supabase
```

Supbase 실행에 필요한 환경변수를 .env 파일에 설정합니다. 

Supabase 클라우드 환경을 사용하려는 경우엔 SUPABASE\_URL을 `https://{YOUR_PROJECT_REF}.supabase.co` 형태로 기입하고, local에서 개발하려는 경우엔 SUPABASE\_URL을 `http://localhost:54321`로 기입하시면 됩니다.

```
SUPABASE_URL="..."
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_KEY="..."
```

프로젝트 초기화 및 서버를 실행합니다.

```bash
supabase init
# 첫 번째 방법
env $(cat .env | xargs) supabase start
# 두 번째 방법
dotenv -e .env -- supabase start
```

그러면 터미널에서 아래와 같은 정보를 확인 가능합니다. 로컬에서 작업하는 경우엔 http://localhost:54323 통해 대시보드에 접속 가능합니다.

```plaintext
API URL:        http://127.0.0.1:54321
GraphQL URL:    http://127.0.0.1:54321/graphql/v1
S3 Storage:     http://127.0.0.1:54321/storage/v1/s3
DB URL:         postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL:     http://127.0.0.1:54323
Inbucket URL:   http://127.0.0.1:54324
JWT secret:     ...
anon key:       ...
service_role:   ...
S3 Access Key:  ...
S3 Secret Key:  ...
S3 Region:      local
```

### 4. Supabase Database

Supabase Database의 기본 명령어는 다음과 같습니다.

일단 먼저 DB와 관련된 SQL 쿼리들을 아래 예시처럼 `supabase/migrations` 폴더에 작성합니다.

```sql
-- Create schema for profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  bio TEXT,
  language TEXT DEFAULT 'en', -- Default language setting
  theme TEXT DEFAULT 'dark', -- Default theme setting (dark/light)
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create a secure RLS policy for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

그리고 새로 만든 모델을 아래 명령어를 통해 DB에 반영합니다. 

```bash
# dotenv -e .env.development -- supabase start
supabase db push
```

DB 상태를 리셋하려면 아래의 명령어를 사용합니다.

```bash
supabase db reset
```

##### Row Level Security(RLS)

Supabase에서는 Postgres의 행 수준 보안(RLS)을 통해 민감 데이터 및 권한 처리가 용이합니다.

예를 들어, 각 사용자가 본인 데이터만 조회 가능하게 하는 RLS 정책은 아래와 같이 쿼리를 작성해볼 수 있습니다.

```sql
CREATE POLICY "Users can view their own data only"
  ON users
  FOR SELECT
  USING (auth.uid() = id);
```

그리고 RLS를 활성화 해주는 쿼리 또한 추가합니다.

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

RLS가 적용되면, 인증된 사용자만 자신 row 데이터에 SELECT 가 가능하게 됩니다. (INSERT, DELETE 등도 동일)

### 5. Supabase Auth

Supabase의 인증은 이메일/비밀번호뿐 아니라, 다양한 OAuth 및 OTP, Magic Link를 지원합니다.

##### OAuth 설정

1. Provider에 앱을 등록합니다 (ex: 구글/깃허브 등)

2. Callback URL을 설정합니다.

   ```
   https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
   ```

3. 발급받은 클라이언트 ID/Secret을 Supabase에 등록합니다.

##### Example: Google OAuth in Supabase Cloud

1. 구글 개발자 콘솔에서 앱 등록 및 OAuth Client 발급
2. Redirect URI 설정: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
3. Supabase 대시보드 → Authentication → Providers → Google 활성화 후 계정 정보를 입력

##### Example: Google OAuth in Supabase Local Dev

1. 구글 개발자 콘솔에서 앱 등록 및 OAuth Client 발급

2. Redirect URI 설정: `http://localhost:54321/auth/v1/callback`

3. `.env` 파일에 환경변수 설정

   ```
   SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=...
   SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=...
   SUPABASE_AUTH_EXTERNAL_GOOGLE_REDIRECT_URI=...
   ```

4. `supabase/config.toml`에 [auth.external.google] 항목 추가

   ```toml
   ...
   [auth.external.google]
   enabled = true
   client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
   secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)"
   redirect_uri = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_REDIRECT_URI)"
   url = ""
   ...
   ```

##### FrontEnd 설정 예시

Google OAuth 설정을 위해서, 제가 작업중인 Next.js 코드의 일부를 가져와 보았습니다. 제 프로젝트에서 사용하고 있는 코드라서 바로 다른 곳에서 적용하기는 어려울 수 있습니다.

```typescript
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Authentication might not work correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

```

```typescript
const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setError((err && typeof err.message === 'string') ? err.message : 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };
```

그리고 FrontEnd의 로그인 페이지에서, 특정 로그인 버튼 컴포넌트에 `onClick={handleGoogleSignIn}`을 걸어주시면 해당 버튼 클릭시 구글 로그인 페이지로 넘어갑니다.

### 6. Supabase Storage

Supabase Storage는 S3 호환 API를 통해 대용량 이미지/비디오/파일 관리가 가능합니다. 아래는 기본 사용법 예시입니다.

```typescript
// 업로드 예시
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file, { upsert: true });

// 다운로드 링크 얻기
const { data } = await supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png');
```

Storage 또한 RLS 설정을 통해 파일별 로드/업로드 권한을 유연하게 관리할 수 있습니다.

### 7. Supabase Edge Function

Supabase Edge Functions는 빠르게 동작하는 서버리스 함수로, 외부 API 호출, 기타 백엔드 처리를 안전하고 빠르게 수행할 수 있습니다. 

1. CLI에서 아래 명령어를 사용하면, `supabase/functions/{FUNCTION_NAME}/index.ts` 파일이 생성됩니다.

   ```bash
   supabase functions new {FUNCTION_NAME}
   ```

2. 해당 index.ts 파일에 Deno 기반의 함수를 작성합니다.

   ```typescript
   // ./supabase/functions/openai/index.ts
   import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts';
   
   Deno.serve(async (req) => { ... })
   ```

3. (optional) 필요한 env 설정을 추가합니다.

   ```
   OPENAI_API_KEY=your-openai-api-key
   ```

4. serve를 통해 로컬 테스트가 가능하고, deploy를 통해 배포가 가능합니다.

   ```bash
   supabase functions serve {FUNCTION_NAME} --env-file .env --debug
   supabase functions deploy {FUNCTION_NAME}
   ```

5. curl이나 Postman 등을 활용하여 결과를 확인합니다.

   ```sh
   curl -i --location --request POST http://localhost:54321/functions/v1/{FUNCTION_NAME} \
       --header 'Content-Type: application/json' \
       --data '{"prompt": "Hello, GPT!"}'
   ```

### 8. Glossary

아래 용어들은 Supabase 관련 공식 문서 및 실무에서 필수적으로 접하게 되는 용어들입니다. 

- Access token: 인증된 클라이언트가 리소스 접근할 수 있게 해주는 단기 토큰 (JWT 포맷)
- Authentication(인증): 사용자 신원 확인(비밀번호/OTP/생체인식 등 여러 방식)
- Authenticator app: QR 코드로 등록 후, OTP 생성기 역할(TOTP 방식)
- Authorization(인가): 특정 리소스 접근 권한 검증(RLS, 토큰 등)
- Identity provider(IDP): 소셜 로그인, 기업 SSO 등 신원 제공자(예: Google, Microsoft)
- JWT (JSON Web Token): 사용자 정보와 권한을 담아 서명된 토큰(RLS와 밀접 연결)
- JWT signing secret: JWT 토큰 변조 방지용 비밀키, 절대 외부 공개 금지
- Nonce: 재생 공격 방지를 위한 1회성 임의 문자열
- OAuth: 서드파티 앱이 사용자를 안전하게 인증할 수 있는 표준 프로토콜
- OIDC: OAuth 기반의 오픈 아이디 커넥트, 기업 SSO 표준
- OTP/TOTP: 일회용 비밀번호, 시간 단위로 생성(Authenticator 사용)
- Password hashing function: 안전한 비밀번호 저장방식(Argon2, bcrypt, scrypt)
- PKCE: 모바일/SPA에서 OAuth 토큰 교환 안전성 보강 프로토콜
- Provider refresh token/token: 소셜 로그인에서 제공되는 장기·신선 토큰
- Refresh token flow: 액세스 토큰 재발급 메커니즘
- Replay attack: 인증 정보 도난 후 재사용 공격(Nonce로 방지)
- RLS(행 수준 보안): JWT 기반의 테이블 Row 접근 제어 정책
- SAML: 구 기업 SSO 표준(최근 OIDC로 대체)
- Session: 인증상태를 쿠키/local storage에 보존, 로그인 유지
- Single-sign on(SSO): 여러 앱에 한 번 로그인으로 접근
- Time-based one-time password(TOTP): 시간을 기반으로 한 OTP

### References

- https://supabase.com/docs
- https://supabase.com/docs/guides/resources/glossary

