# 🚀 Setup & Deployment Guide

This guide covers local environment initialization, Clerk configuration, Supabase database setup, and production deployment on Vercel.

---

## 🛠️ Local Environment Setup

### 1. Prerequisites
* **Node.js**: `v20.14.0` or higher (Node 22 or 24 recommended).
* **Package Manager**: `npm` (v10+).

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/FocusFlowZ.git
cd FocusFlowZ

# Clean install of all dependencies
npm ci
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase Credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# (Optional) Anthropic Claude API Key for Live AI Sessions
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Running the App
```bash
npm run dev
```
Navigate to `http://localhost:5173`.

---

## 🔑 Clerk & Supabase Integration (Critical)

FocusFlowZ uses Clerk to authenticate users and Supabase to store data with Row-Level Security (RLS). They must be linked via a JWT Template:

1. Open your **[Clerk Dashboard](https://dashboard.clerk.com/)**.
2. Navigate to **JWT Templates** (under *Configure* or *Integrations*).
3. Click **"New Template"** and select **Supabase**.
4. Set the template name to exactly:
   ```
   supabase
   ```
   *(Must be all lowercase)*.
5. In **Signing Key**, paste your **JWT Secret** from your Supabase Dashboard (*Project Settings &rarr; Data API &rarr; JWT Settings*), or leave it as Clerk default.
6. Click **Save**.

---

## ☁️ Deploying to Vercel

FocusFlowZ is pre-configured with [`vercel.json`](../vercel.json) to handle Single Page Application (SPA) client-side routing.

### Step 1: Push Repository to GitHub
```bash
git init
git add .
git commit -m "Initial FocusFlowZ release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Import Project in Vercel
1. Log in to [vercel.com](https://vercel.com/) and click **"Add New..."** &rarr; **"Project"**.
2. Select your repository and click **Import**.
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build` (auto-detected).
5. Output Directory: `dist` (auto-detected).

### Step 3: Add Environment Variables in Vercel
Under **Project Settings &rarr; Environment Variables**, add:
* `VITE_CLERK_PUBLISHABLE_KEY`
* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_ANON_KEY`
* *(Optional)* `VITE_ANTHROPIC_API_KEY`

Click **Deploy**.

### Step 4: Add Vercel Domain to Clerk Allowed Origins
Once Vercel assigns your live domain (e.g., `https://focusflowz.vercel.app`):
1. In [Clerk Dashboard](https://dashboard.clerk.com/), go to **Configure &rarr; Domains** (or **API Keys &rarr; Authorized Origins**).
2. Add `https://focusflowz.vercel.app`.
