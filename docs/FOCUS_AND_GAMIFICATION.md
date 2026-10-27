# ⏱️ Focus Engine & Gamification Architecture

FocusFlowZ blends behavioral psychology with game design principles to sustain long-term deep work habits.

---

## ⏱️ Deep Work & Focus Timer Engine

The timer engine powers [`FocusMode.jsx`](../src/pages/FocusMode.jsx) and [`SessionDetail.jsx`](../src/pages/SessionDetail.jsx).

### 1. Drift-Proof Wall Clock Tracking
Standard `setInterval()` or `setTimeout()` loops in JavaScript drift significantly when browser tabs are inactive or computer screens sleep. FocusFlowZ solves this by comparing against actual timestamps:

```javascript
// Elapsed computation
const drift = Math.floor((Date.now() - saved.savedAt) / 1000);
saved.elapsed = (saved.elapsed || 0) + drift;
```

### 2. Multi-Mode Flexibility
* **Countdown Mode**: Fixed-duration deep work blocks with automatic completion triggers.
* **Stopwatch Mode**: Open-ended immersion for unstructured research or creative writing.
* **Milestone Steps**: Breaks long sessions into tangible sub-tasks with independent timers and concept checklists.

### 3. AI & Deterministic Cognitive Session Planner
When creating sessions in [`CreateSession.jsx`](../src/pages/CreateSession.jsx):
* **AI Generation**: If `VITE_ANTHROPIC_API_KEY` is present, Claude 3.5 Sonnet formats an actionable study plan.
* **Deterministic Fallback (`generateAlgorithmicPlan`)**: If no key is set or network requests fail, an internal algorithm generates cognitive intervals based on study duration:
  * **Short Sessions (&le; 25m)**: Priming & Setup (5m) &rarr; Execution (15m) &rarr; Quick Recall (5m).
  * **Medium Sessions (&le; 50m)**: Concept Review (10m) &rarr; Deep Work (Part 1) &rarr; Application (Part 2) &rarr; Reflection (5m).
  * **Long Sessions (> 50m)**: Scoping (10m) &rarr; Theory & Immersion &rarr; Deliberate Practice &rarr; Critical Testing &rarr; Metacognition (10m).

---

## 🎮 Gamification & XP System

* **Source File**: [`src/hooks/useUserProgress.js`](../src/hooks/useUserProgress.js)

### 1. Canonical XP Formula
```javascript
export function calcSessionXP(session) {
  const mins = session.duration || 0;
  const done = session.completed || session.is_completed;
  const diff = (session.difficulty || '').toLowerCase();

  let base = mins * 2;
  const mult = diff === 'hard' ? 1.5 : diff === 'medium' ? 1.2 : 1.0;
  const bonus = done ? 50 : 0;

  return Math.round(base * mult) + bonus;
}
```

### 2. Level Progression Formula
Level curves use a quadratic progression curve capped at Level 50:
$$\text{Level} = \min\left(\left\lfloor\sqrt{\frac{\text{Total XP}}{100}}\right\rfloor + 1, 50\right)$$
* **XP required for Level $L$**: $(L - 1)^2 \times 100$
* **XP required for Level $L + 1$**: $L^2 \times 100$

### 3. Daily Commissions & Quests
* **Component**: [`DailyCommissions.jsx`](../src/components/DailyCommissions.jsx)
* Automatically seeds 3 to 4 rotating daily objectives:
  * *"Complete 45 minutes of Deep Focus"*
  * *"Take session notes with at least 150 words"*
  * *"Maintain your active study streak"*
* Awards bonus XP upon claiming completion.

### 4. Achievement Badges
* **Component**: [`BadgeStore.jsx`](../src/components/BadgeStore.jsx)
* Badges are unlocked and persisted to the `user_progress` table:
  * 🏅 **First Spark**: Complete your first deep work session.
  * 🔥 **Consistency Master**: Reach a 7-day streak.
  * 🌙 **Night Owl**: Complete a session past 11:00 PM.
  * 📚 **Archivist**: Link more than 10 notes in the Knowledge Hive.
