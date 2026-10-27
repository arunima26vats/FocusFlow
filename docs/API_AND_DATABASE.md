# 🗄️ Database & API Reference (Supabase + Clerk)

FocusFlowZ uses Supabase PostgreSQL as its persistent storage layer with PostgreSQL Row-Level Security (RLS) guaranteeing tenant isolation.

---

## 🗄️ PostgreSQL Database Schemas

Run the following SQL in your **Supabase SQL Editor**:

```sql
-- 1. Users Table (Synced from Clerk via SyncUser.jsx)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Note Collections (Hierarchical Folders)
CREATE TABLE IF NOT EXISTS public.note_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.note_collections(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT '#c4913a',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. User Notes
CREATE TABLE IF NOT EXISTS public.user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES public.note_collections(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Untitled',
  subject TEXT,
  content JSONB DEFAULT '{"type":"doc","content":[{"type":"paragraph"}]}',
  tags TEXT[] DEFAULT '{}',
  links TEXT[] DEFAULT '{}',
  word_count INT DEFAULT 0,
  font TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- GIN Index for rapid array containment checks (used for graph queries)
CREATE INDEX IF NOT EXISTS idx_notes_links ON public.user_notes USING GIN (links);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON public.user_notes(user_id);

-- 4. Focus Sessions
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT,
  focus_type TEXT DEFAULT 'General',
  duration INT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  completed BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  goal TEXT,
  notes TEXT,
  ai_plan JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);

-- 5. User Progress & Gamification
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id TEXT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_xp INT DEFAULT 0,
  level INT DEFAULT 1,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🔒 Row-Level Security (RLS) Policies

Every query to Supabase carries the Clerk JWT in the `Authorization: Bearer <token>` header. Supabase decrypts this token and matches `auth.jwt() ->> 'sub'` against `user_id`:

```sql
-- Enable RLS across all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- User Policies
CREATE POLICY "Users can view and update own profile" 
  ON public.users FOR ALL 
  USING (auth.jwt() ->> 'sub' = id);

-- Note Collections Policies
CREATE POLICY "Users can manage own collections" 
  ON public.note_collections FOR ALL 
  USING (auth.jwt() ->> 'sub' = user_id);

-- User Notes Policies
CREATE POLICY "Users can manage own notes" 
  ON public.user_notes FOR ALL 
  USING (auth.jwt() ->> 'sub' = user_id);

-- Sessions Policies
CREATE POLICY "Users can manage own sessions" 
  ON public.sessions FOR ALL 
  USING (auth.jwt() ->> 'sub' = user_id);

-- Progress Policies
CREATE POLICY "Users can manage own progress" 
  ON public.user_progress FOR ALL 
  USING (auth.jwt() ->> 'sub' = user_id);
```

---

## 🔑 Clerk JWT Template Specification

For Supabase to authenticate Clerk users, create a custom template in the **Clerk Dashboard**:

1. Go to **JWT Templates** &rarr; **New Template** &rarr; **Supabase**.
2. **Name**: `supabase`
3. **Claims definition**:
```json
{
  "aud": "authenticated",
  "role": "authenticated",
  "email": "{{user.primary_email_address}}",
  "sub": "{{user.id}}"
}
```
4. **Lifetime**: 60 seconds (Clerk automatically refreshes tokens in the background via `getToken({ template: 'supabase' })`).
