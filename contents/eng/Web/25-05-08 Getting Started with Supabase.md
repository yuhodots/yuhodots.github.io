---
title: "Getting Started with Supabase: DB, Auth, Edge Functions"
date: "2025-05-08"
template: "post"
draft: false
path: "/backend/25-05-08/"
description: "Supabase is an open-source platform that helps you quickly and easily build and deploy backend infrastructure. While providing an API similar to Firebase, it is built on PostgreSQL, allowing you to leverage the strengths of both SQL and open source."
category: "BackEnd"
thumbnail: "supabase"
---

> This post introduces the key features of Supabase, installation and basic usage, and real-world development examples.

Supabase is an open-source platform that helps you quickly and easily build and deploy backend infrastructure. While providing an API similar to Firebase, it is built on PostgreSQL, allowing you to leverage the strengths of both SQL and open source.

### 1. Supabase?

Supabase is an open-source Firebase alternative. Built on top of a powerful Postgres database, it provides various services including Auth, Realtime, Storage, Edge Functions, and Analytics to help developers rapidly build modern applications.

It has the following characteristics that make it well-suited for quickly building PoC services:

- Fully managed PostgreSQL database
- Built-in easy-to-use authentication and authorization system
- Real-time database change detection (Realtime)
- Large-scale file storage (Storage)
- Serverless backend extension with Edge Functions
- Web and mobile app-friendly API
- Open source with freedom to customize

Based on these features, you can build a service with basic backend functionality using just the frontend, without writing any backend code.

### 2. Products

The specific features offered are as follows:

- Database: A managed database based on PostgreSQL. You can safely manage data through SQL and auto-generated types.

- Authentication (Auth): Supports various authentication methods including email/password, OAuth (Google, GitHub, etc.), Magic Link, and OTP. Authorization (RLS) management is naturally integrated at the Postgres level. This characteristic also makes development without a backend server easier.

- Storage: Provides AWS S3-compatible file storage. Permission control and file distribution via URL are supported.

- Realtime: Provides real-time subscription to database changes (INSERT/UPDATE/DELETE). Built on WebSocket implementation, it is useful for developing collaborative applications.

- Edge Functions: Provides Deno-based serverless functions. You can flexibly implement various server-side logic such as database triggers and third-party API calls.

- Analytics: Provides various resource monitoring and insights including API usage, error status, and database queries for your project.

### 3. Quick Start

First, install the Supabase CLI.

```bash
brew install supabase/tap/supabase
brew upgrade supabase
```

Set the environment variables needed for Supabase in the .env file.

If you want to use the Supabase cloud environment, set SUPABASE\_URL to `https://{YOUR_PROJECT_REF}.supabase.co`. If you want to develop locally, set SUPABASE\_URL to `http://localhost:54321`.

```
SUPABASE_URL="..."
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_KEY="..."
```

Initialize the project and start the server.

```bash
supabase init
# First method
env $(cat .env | xargs) supabase start
# Second method
dotenv -e .env -- supabase start
```

You can then see the following information in the terminal. When working locally, you can access the dashboard at http://localhost:54323.

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

The basic commands for Supabase Database are as follows.

First, write SQL queries related to the database in the `supabase/migrations` folder as shown in the example below.

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

Then apply the newly created model to the database using the following command.

```bash
# dotenv -e .env.development -- supabase start
supabase db push
```

To reset the database state, use the following command.

```bash
supabase db reset
```

##### Row Level Security (RLS)

In Supabase, Postgres Row Level Security (RLS) makes it easy to handle sensitive data and permission management.

For example, an RLS policy that allows each user to view only their own data can be written as follows.

```sql
CREATE POLICY "Users can view their own data only"
  ON users
  FOR SELECT
  USING (auth.uid() = id);
```

Then add a query to enable RLS as well.

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

Once RLS is applied, only authenticated users can perform SELECT on their own row data. (The same applies to INSERT, DELETE, etc.)

### 5. Supabase Auth

Supabase authentication supports not only email/password but also various OAuth providers, OTP, and Magic Link.

##### OAuth Setup

1. Register your app with a Provider (e.g., Google/GitHub, etc.)

2. Set the Callback URL.

   ```
   https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
   ```

3. Register the issued Client ID/Secret in Supabase.

##### Example: Google OAuth in Supabase Cloud

1. Register the app in the Google Developer Console and issue an OAuth Client.
2. Set the Redirect URI: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
3. In the Supabase dashboard, go to Authentication > Providers > Enable Google and enter the account information.

##### Example: Google OAuth in Supabase Local Dev

1. Register the app in the Google Developer Console and issue an OAuth Client.

2. Set the Redirect URI: `http://localhost:54321/auth/v1/callback`

3. Set environment variables in the `.env` file.

   ```
   SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=...
   SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=...
   SUPABASE_AUTH_EXTERNAL_GOOGLE_REDIRECT_URI=...
   ```

4. Add the [auth.external.google] section in `supabase/config.toml`.

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

##### Frontend Setup Example

For Google OAuth setup, I've taken a portion of my Next.js code from the project I'm working on. Since this is code used in my specific project, it may not be directly applicable elsewhere.

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

Then, on the frontend login page, attach `onClick={handleGoogleSignIn}` to a specific login button component, and clicking that button will redirect to the Google login page.

### 6. Supabase Storage

Supabase Storage enables large-scale image/video/file management through an S3-compatible API. Below is a basic usage example.

```typescript
// Upload example
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file, { upsert: true });

// Get download link
const { data } = await supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png');
```

Storage also allows flexible management of file load/upload permissions through RLS configuration.

### 7. Supabase Edge Function

Supabase Edge Functions are fast serverless functions that can safely and quickly perform external API calls and other backend processing.

1. Using the following command in the CLI, a `supabase/functions/{FUNCTION_NAME}/index.ts` file will be created.

   ```bash
   supabase functions new {FUNCTION_NAME}
   ```

2. Write a Deno-based function in the index.ts file.

   ```typescript
   // ./supabase/functions/openai/index.ts
   import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts';

   Deno.serve(async (req) => { ... })
   ```

3. (Optional) Add any required environment variable configuration.

   ```
   OPENAI_API_KEY=your-openai-api-key
   ```

4. You can test locally with serve and deploy using deploy.

   ```bash
   supabase functions serve {FUNCTION_NAME} --env-file .env --debug
   supabase functions deploy {FUNCTION_NAME}
   ```

5. Verify the results using curl or Postman.

   ```sh
   curl -i --location --request POST http://localhost:54321/functions/v1/{FUNCTION_NAME} \
       --header 'Content-Type: application/json' \
       --data '{"prompt": "Hello, GPT!"}'
   ```

### 8. Glossary

The following terms are essential when working with Supabase official documentation and in practice.

- Access token: A short-lived token (JWT format) that allows authenticated clients to access resources.
- Authentication: Verifying a user's identity (through passwords, OTP, biometrics, etc.)
- Authenticator app: Registers via QR code and serves as an OTP generator (TOTP method).
- Authorization: Verifying permissions to access specific resources (RLS, tokens, etc.)
- Identity provider (IDP): An entity that provides identity through social login, enterprise SSO, etc. (e.g., Google, Microsoft)
- JWT (JSON Web Token): A signed token containing user information and permissions (closely tied to RLS).
- JWT signing secret: A secret key for preventing JWT token tampering; must never be exposed externally.
- Nonce: A one-time random string to prevent replay attacks.
- OAuth: A standard protocol that allows third-party apps to securely authenticate users.
- OIDC: OpenID Connect based on OAuth, a standard for enterprise SSO.
- OTP/TOTP: One-time passwords, generated on a time-based basis (using an Authenticator).
- Password hashing function: Secure password storage methods (Argon2, bcrypt, scrypt).
- PKCE: A protocol that enhances OAuth token exchange security for mobile/SPA applications.
- Provider refresh token/token: Long-lived and fresh tokens provided through social login.
- Refresh token flow: A mechanism for reissuing access tokens.
- Replay attack: An attack that reuses stolen authentication information (prevented with Nonce).
- RLS (Row Level Security): A table row access control policy based on JWT.
- SAML: An older enterprise SSO standard (recently being replaced by OIDC).
- Session: Preserving authentication state in cookies/local storage to maintain login status.
- Single-sign on (SSO): Accessing multiple apps with a single login.
- Time-based one-time password (TOTP): OTP based on time.

### References

- https://supabase.com/docs
- https://supabase.com/docs/guides/resources/glossary
