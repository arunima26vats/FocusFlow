# 🧠 FocusFlowZ

<div align="center">

![FocusFlowZ Logo](public/favicon.svg)

**The Second Brain & Gamified Deep Work Operating System**  
*An Obsidian + Notion hybrid knowledge hive married with high-leverage focus sessions, algorithmic intelligence, and RPG-style progression.*

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quickstart](#-quickstart) • [Environment Variables](#-environment-variables) • [Database Setup](#-database-schema-supabase) • [Deployment](#-deploy-to-vercel)

</div>

---

## 🌟 Overview

**FocusFlowZ** is engineered for researchers, engineers, and deep workers who need more than a generic to-do list or note app. It bridges the gap between **knowledge acquisition** and **focused execution**:

* **Capture & Connect**: Write in an Obsidian-grade TipTap editor with bi-directional `[[wiki-links]]`, backlinks, and interactive graph exploration.
* **Execute**: Run structured focus blocks with milestone steps, active recall checkpoints, and distraction blockers.
* **Level Up**: Earn XP, build streaks, conquer daily commissions, and unlock prestige badges for deep work completed.

---

## ✨ Key Features

### 🧠 1. The Knowledge Hive (Second Brain)
* **TipTap Rich Text Suite**: Slash commands (`/`), bubble menus, code syntax highlighting (`lowlight`), callouts, tables, and task checklists.
* **Native `[[Wiki-Style]]` Linking**: Fully editable TipTap mark extension (`InternalLinkMark`) enabling inline linked notes without awkward `contenteditable="false"` quirks.
* **2D Force-Directed Knowledge Graph**: Interactive visual map powered by `react-force-graph-2d` connecting topics, references, and related concepts.
* **Bi-directional Backlinks & Related References**: Automatic detection of incoming and outgoing links with link counts on cards.
* **Robust Autosave**: Debounced, race-condition-safe autosave with retry backoff and abort controllers.
* **Hierarchical Folders & Collections**: Nested folders with color tags, custom icons, and drag/move support.

### ⏱️ 2. Deep Work & Focus Engine
* **Structured Focus Modes**: Countdown timer, stopwatch, and step-by-step guided intervals.
* **AI & Algorithmic Session Generation**:
  * Live Claude (Anthropic) AI plan generator with fallback to a built-in deterministic planning algorithm.
  * Breaks subjects into cognitive phases: *Priming & Setup*, *Deep Immersion*, *Practice / Application*, and *Active Recall*.
* **Session Persistence**: Wall-clock drift recovery that preserves progress even if tabs close or reload.

### 🎮 3. Gamification & RPG Progression
* **Deterministic XP Engine**: Formula-based rewards scaled by duration, session completion, and difficulty multiplier (1.0x – 1.5x).
* **Daily Commissions & Quests**: Rotating daily objectives that reward consistent study habits.
* **Badge & Achievement System**: Unlock milestones across study volume, consistency, and night-owl sessions.
* **Dynamic Level-Up Modals**: Celebration modals with audio-visual feedback and stat upgrades.

### 📊 4. Algorithmic Decision Intelligence
* **Next Action Engine**: Context-aware recommendation banner pointing to the most impactful immediate task.
* **Smart Insights Ribbon**: Rotates observations on streak health, peak performance hours, and subject balance.
* **Fatigue & Burnout Detection**: Detects completion drops and warns users to take restorative breaks.
* **Rich Visualizations**: Donut distribution charts and weekly activity graphs built with `recharts`.

### 🎨 5. Aesthetic & UX Excellence
* **Editorial Parchment & Obsidian Themes**: Seamless toggle between warm cream typography and dark obsidian mode.
* **Global Command Palette (`Ctrl/Cmd + K`)**: Fuzzy-search notes, open recent sessions, jump to views, or trigger actions with keyboard navigation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [React Router v7](https://reactrouter.com/) |
| **Bundler & Build Tool** | [Vite 8](https://vitejs.dev/) with optimized chunk partitioning |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), Custom CSS Variables, Google Web Fonts |
| **Editor Framework** | [TipTap v3](https://tiptap.dev/) (StarterKit, Bubble Menu, Tables, Typography, TaskList) |
| **Data Visualizations** | [react-force-graph-2d](https://github.com/vasturiano/react-force-graph-2d), [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/) |
| **Animation & Icons** | [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database & Storage** | [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security) |
| **Deployment Target** | [Vercel](https://vercel.com/) |

---

## 🚀 Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) `>= 20.14.0` (Recommended: Node 22 or 24)
* A [Clerk](https://clerk.com/) account
* A [Supabase](https://supabase.com/) project

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/FocusFlowZ.git
cd FocusFlowZ

# Install dependencies using clean install
npm ci
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Fill in your project credentials:
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase Credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# (Optional) Anthropic Claude API for live AI generation
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🔐 Environment Variables

| Variable | Description | Required | Source |
| :--- | :--- | :---: | :--- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable public key | **Yes** | Clerk Dashboard &rarr; API Keys |
| `VITE_SUPABASE_URL` | Supabase project API URL | **Yes** | Supabase &rarr; Settings &rarr; Data API |
| `VITE_SUPABASE_ANON_KEY` | Supabase client anon public key | **Yes** | Supabase &rarr; Settings &rarr; API Keys |
| `VITE_ANTHROPIC_API_KEY` | Claude API key for AI study assistant | *Optional* | Anthropic Console |

---

## 🗄️ Database Schema (Supabase)

Execute this script in your **Supabase SQL Editor** to initialize the required tables:

```sql
-- 1. Users Table (Synced with Clerk)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Note Collections (Folders)
CREATE TABLE IF NOT EXISTS public.note_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.note_collections(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT '#c4913a',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Notes Table
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

-- GIN Index for rapid wiki-link graph querying
CREATE INDEX IF NOT EXISTS idx_notes_links ON public.user_notes USING GIN (links);

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

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Add basic RLS policies for authenticated users
CREATE POLICY "Users can manage own data" ON public.users FOR ALL USING (auth.jwt() ->> 'sub' = id);
CREATE POLICY "Users can manage own collections" ON public.note_collections FOR ALL USING (auth.jwt() ->> 'sub' = user_id);
CREATE POLICY "Users can manage own notes" ON public.user_notes FOR ALL USING (auth.jwt() ->> 'sub' = user_id);
CREATE POLICY "Users can manage own sessions" ON public.sessions FOR ALL USING (auth.jwt() ->> 'sub' = user_id);
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL USING (auth.jwt() ->> 'sub' = user_id);
```

> **Important**: Configure a custom JWT template named `supabase` in your [Clerk Dashboard](https://dashboard.clerk.com/) (*JWT Templates &rarr; New Template &rarr; Supabase*) to authorize database queries.

---

## 🚢 Deploy to Vercel

The repository is fully pre-configured for Vercel deployment:
* [`vercel.json`](vercel.json) handles SPA client-side routing rewrites (`/(.*)` &rarr; `/index.html`).
* [`vite.config.js`](vite.config.js) partitions heavy vendor libraries into efficient chunks under 600 kB.
* [`src/main.jsx`](src/main.jsx) includes configuration guards and runtime error boundaries.

### One-Click Deployment
1. Push your repository to **GitHub**.
2. Go to **[Vercel](https://vercel.com/)** and click **Import Project**.
3. Add your **Environment Variables**:
   * `VITE_CLERK_PUBLISHABLE_KEY`
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**.
5. Copy your live Vercel domain (e.g. `https://focusflowz.vercel.app`) and add it to **Clerk Dashboard &rarr; Configure &rarr; Domains**.

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite development server with HMR at `localhost:5173` |
| `npm run build` | Compiles production assets into `dist/` |
| `npm run preview` | Locally serves the built production application at `localhost:4173` |
| `npm run lint` | Runs ESLint analysis across all project files |

---

## 📁 Project Architecture

```
FocusFlowZ/
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Branding and images
│   ├── components/         # Modular UI components
│   │   ├── app/            # AppNavbar, DailyProgressStrip
│   │   ├── landing/        # Landing page sections & navigation
│   │   ├── GraphView.jsx   # 2D Knowledge Graph visualizer
│   │   ├── SyncUser.jsx    # Clerk <-> Supabase sync handler
│   │   └── ...             # Gamification & Editor widgets
│   ├── context/            # React context (Theme, etc.)
│   ├── extensions/         # Custom TipTap extensions (InternalLinkMark)
│   ├── hooks/              # Custom hooks (Autosave, Graph, Supabase, XP)
│   ├── lib/                # API helpers and collection tree logic
│   ├── pages/              # Application views & route containers
│   │   ├── Dashboard.jsx   # Decision Intelligence & Analytics Hub
│   │   ├── NoteEditor.jsx  # Knowledge Hive core document editor
│   │   ├── NotesPage.jsx   # Document library & collection navigator
│   │   ├── FocusMode.jsx   # Immersion timer & step executor
│   │   └── ...             # Analytics, Profile, Sessions
│   ├── routes/             # Client-side router & ProtectedRoute guards
│   ├── utils/              # Search scoring & formatting utilities
│   ├── main.jsx            # Entry point with Error Boundary & Clerk
│   └── index.css           # Tailwind v4 directives & theme styles
├── .env.example            # Environment variables template
├── eslint.config.js        # Production ESLint flat configuration
├── vercel.json             # Vercel SPA rewrite definitions
└── vite.config.js          # Build configuration & manual chunk splitting
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
