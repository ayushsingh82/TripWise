# Hackathon Ideas — Health & Wellness + Financial Health (Using Opik)

Expanded ideas for **Health, Fitness & Wellness** and **Financial Health** tracks, with concrete ways to use Opik for evaluation, observability, and continuous improvement.

---

# TripWise MVP Structure — Travel Budget Agent

**What we are building:** **TripWise** — an AI-powered **travel budget agent** that helps users understand flight and hotel costs, get savings suggestions in plain language, and make informed travel spending decisions. Uses **Comet Opik + OpikAssist** for observability, evaluation, and experimentation.

Hackathon MVP. Optimize for: **Speed · Clarity · Agent behavior · Visible Opik usage.**  
NOT for production completeness.

---

## 🎯 GOAL

Build an agent that:
- Takes **trip input** (route, dates, budget) or pasted booking/search text
- Suggests **flight and hotel options** with cost tradeoffs in plain language
- Explains **"You could save $X by…"** (e.g. flexible dates, nearby airports) without overwhelm
- Tracks user feedback and “acted on suggestion”
- Uses **Opik** for traces, metrics, evals, and A/B experiments

---

## 🧱 TECH STACK (STRICT)

- **Next.js** (App Router)
- **Node runtime ONLY** (no Edge)
- **PostgreSQL** (Supabase / Neon compatible) — optional for MVP; can start with in-memory or SQLite
- **Comet Opik** (tracing, metrics, evals, OpikAssist)
- **LLM** (OpenAI / Gemini / Grok) — provider must be swappable
- **Vercel-friendly** deployment

---

## 🚨 DOMAIN SAFETY (IMPORTANT)

This app handles **travel financial decisions only** — no booking, no payments.

**HARD RULES:**
- NO investment advice
- NO product or lender recommendations
- NO medical or health advice
- NO EMR or bank integrations (user paste/upload only)

Use neutral language:
- “follow-up”
- “suggestion”
- “audit”
- “keep / reduce / cancel”

---

## 🧠 CORE AGENT BEHAVIOR

1. User **enters trip details** (route, dates, budget) or **pastes** booking/search text
2. Agent **fetches or infers** flight and hotel options (costs, tradeoffs)
3. Agent **suggests** in plain language:
   - Cost breakdown (flights, hotels, ballpark total)
   - **"You could save $X by…"** (e.g. flexible dates, nearby airports, different stay)
   - No overwhelm — clear, scannable summary
4. User sees options + savings summary; can mark:
   - **Acted on suggestion** (e.g. booked with flexible dates)
   - **Ignored** / **Delayed**
5. User gives **feedback** (e.g. thumbs up/down)
6. Agent **adapts** explanation style via A/B (e.g. save $X on this trip vs spending $X on flights)

This MUST behave like an **agent**, not a static price list.

---

## 🗂️ REQUIRED PROJECT STRUCTURE

```
/app
  page.tsx              → TripWise landing (hero + CTA "Plan trip")
  plan/page.tsx         → Trip input + agent suggestions (flight/hotel)
/api
  generate-suggestions/route.ts → Agent: trip → options + savings in plain language
  (Optional) update-feedback/route.ts, progress/route.ts
/lib
  llm/
    provider.ts   → unified LLM interface
    openai.ts
    gemini.ts
    grok.ts
  opik/
    client.ts     → Opik initialization
    logTrace.ts
    logMetric.ts
    logEval.ts
  db.ts
  experiments.ts → A/B experiment logic (variant assignment)
  prompts.ts     → agent prompts
/sql (or prisma/)
  schema.sql
```

---

## 🗃️ DATABASE (MINIMAL)

Tables:

- **users** — `id`, `email?`, `created_at`
- **trips** — `id`, `user_id`, `from`, `to`, `dates`, `budget`, `raw_text?`
- **suggestions** — `id`, `trip_id`, `summary`, `alternatives_json`, `savings_plain_text`, `variant`
- **feedback** — `suggestion_id`, `score`, `acted`, `created_at`

Keep schema small and readable.

---

## 🤖 AGENT PROMPT REQUIREMENTS

The agent must:
- Use **trip input** (route, dates, budget or raw text) to produce cost breakdown and savings suggestions
- Avoid product names, investment advice, or medical language
- Output **plain-language** savings tips (e.g. "You could save $X by…") without overwhelming the user

Prompt must include:
- Trip/route/dates/budget (or pasted search text)
- User feedback history (if any)
- **Experiment variant (A/B)**

---

## 🔀 A/B EXPERIMENT (REQUIRED)

Implement a simple experiment:

- **Variant A** → Friendly tone, e.g. “You could save $X on this trip by…”
- **Variant B** → Direct tone, e.g. “You’re spending $X on flights. Consider…”

Assignment example:

```ts
variant = userId % 2 === 0 ? "A" : "B"
```

This variant **MUST** be logged to Opik (trace metadata, experiment tracking).

---

## 🔍 COMET OPIK INTEGRATION (CRITICAL)

### 1. Traces

Log every agent decision:
- Trip input parsing (route, dates, budget)
- Flight/hotel option retrieval or inference
- Cost breakdown and savings suggestion generation
- Plain-language summary output

Trace payload must include:
- `user_id` (or session_id)
- `session_id`
- `trip_id` (when created)
- `prompt` (or trip summary)
- LLM response
- `savings_plain_text` (or summary)
- `variant`
- `latency`
- `cost` (if available)

### 2. Metrics

Log:
- `trip_plan_completed` (0/1)
- `feedback_score` (e.g. thumbs)
- `acted_on_suggestion` (0/1)
- `completion_rate` (by variant)

### 3. Custom Evaluation

Implement a simple evaluation:
- Replay last N trip plans (or golden set)
- Compute completion / usefulness by:
  - trip type (route, budget range)
  - explanation style (variant A vs B)
- Log evaluation results to Opik

### 4. OpikAssist Readiness

Traces must be labeled so OpikAssist can answer:
- “Why do savings suggestions get ignored more?”
- “Which explanation style gets more follow-through?”

### 5. Anonymizers & Guardrails

- **Anonymizers** — Strip merchant names and amounts in production logs; only aggregate stats in Opik.
- **Guardrails** — Block “invest the savings”, booking/payment claims, or product names in agent output.

---

## ⏰ CRON (OPTIONAL)

Implement `/api/cron/daily` (or weekly) that:
- Can send a “plan your next trip” or savings reminder nudge (e.g. log to console or email if configured)
- Logs reminder actions to Opik
- Can be manually triggered for demo

---

## 🔌 LLM PROVIDER ABSTRACTION

Implement a clean adapter:

```ts
generateText(prompt: string): Promise<...>
```

Switch provider using:

```bash
LLM_PROVIDER=openai | gemini | grok
```

---

## 🚫 HARD CONSTRAINTS

- NO authentication system (anonymous sessions OK)
- NO queues or background workers beyond cron
- NO mobile apps
- NO complex UI polish
- NO premature optimization

---

## ✅ MVP SUCCESS CRITERIA

By the end, the app must:
- Convert trip input into cost breakdown + savings suggestions in plain language
- Capture user feedback (thumbs, acted/didn’t)
- Show **Opik traces & metrics**
- Support **A/B experiments** (variant logged)
- Be **demoable in under 3 minutes**

---

## 🏁 BUILD ORDER (DO NOT SKIP)

1. Create folder structure
2. Define database schema
3. Initialize Opik client
4. Build **trip input → suggestions** flow (UI + API stub)
5. Add agent logic (LLM + variant in prompt)
6. Instrument **Opik traces & metrics**
7. (Optional) Add cron reminder
8. Verify **Opik dashboards** are populated

Do NOT skip Comet Opik instrumentation.

---

## 🏃 Health, Fitness & Wellness Track

### 1. Adaptive Workout Planner Agent
**Concept:** Multi-turn agent that designs workouts from goals, fitness level, equipment, and recovery state.

**Opik usage:**
- **Trajectory evaluation** — Score full workout-planning flows (clarity, safety, progression, personalization).
- **LLM-as-judge evals** — "Does this plan avoid overreach?" "Is rest/recovery adequate?" "Is guidance age- and condition-appropriate?"
- **Annotation queues** — Experts label plans as safe/unsafe, appropriate/inappropriate for later model tuning.
- **Experiment tracking** — Compare prompt variants (e.g. "conservative vs progressive") and track injury-risk proxy metrics.
- **Guardrails** — Block or anonymize medical/condition mentions in logs; add safety checks before suggesting intensity.

**Metrics to track:** Safety score, user adherence proxy, plan diversity, cost per plan.

---

### 2. Mood-Aware Meditation & Reflection Guide
**Concept:** Agent that suggests short meditation/breathing/reflection prompts based on time of day, self-reported mood, and optional journal snippets.

**Opik usage:**
- **Conversation logging** — Log full sessions (with user consent) to analyze which prompts improve self-reported mood.
- **Single-prompt & multi-turn evals** — "Is tone supportive and non-clinical?" "Does it avoid diagnosing or treating mental health?"
- **User feedback** — Thumbs up/down and optional ratings; log and use for online eval rules and retraining.
- **Agent Optimizer** — Tune system prompts so recommendations stay within "wellness, not therapy" and avoid harmful advice.
- **Dashboards** — Track usage by mood type, drop-off points, and feedback distribution.

**Metrics:** Helpfulness rating, safety (no clinical claims), session length, return rate.

---

### 3. Sleep Habit Analyzer & Coach
**Concept:** Agent that ingests sleep logs (manual or from wearables), explains patterns in plain language, and suggests small, sustainable habit changes.

**Opik usage:**
- **Multimodal evaluation** — If users upload charts/screenshots, evals on "Did the summary match the data?" and "Were suggestions grounded in the chart?"
- **Regression tests** — Pytest + Opik: compare behavior across model versions (e.g. "Never recommend <5h as OK", "Always caveat medical conditions").
- **Online evaluation rules** — Flag responses that mention medication, sleep disorders, or "diagnosis" for human review.
- **Experiment tracking** — A/B different explanation styles (short vs detailed) and track user comprehension and follow-through proxies.

**Metrics:** Factual accuracy vs input data, safety flags, user satisfaction, suggestion uptake.

---

### 4. Recovery & Readiness Coach
**Concept:** Agent that uses HRV, soreness, sleep, and workout history to suggest "train today light / rest / full" and simple recovery actions.

**Opik usage:**
- **Trajectory scoring** — Evaluate end-to-end flows: Did it ask enough context? Did it err on the side of caution?
- **Guardrails & anonymizers** — Strip or anonymize health identifiers in production logs.
- **Alerts** — Trigger review when the agent frequently suggests "train hard" after poor sleep or high stress.
- **Annotation queues** — Coaches label recommendations as appropriate/overreaching for eval and tuning.

**Metrics:** Conservative vs aggressive recommendation rate, expert agreement, user-reported outcomes.

---

### 5. Sustainable Routine Builder
**Concept:** Agent that helps users build weekly routines (exercise, meals, sleep, mindfulness) with gradual, sustainable changes.

**Opik usage:**
- **Agent evaluation** — Score plans on sustainability (small steps), balance across domains, and clarity.
- **Prompt Generator/Improver** — Iterate on instructions so outputs are actionable and avoid "all or nothing" language.
- **User feedback loops** — Log "stuck to it / didn't" and feed into online evals and reporting.
- **Cost tracking** — Monitor token use per user/session for scaling and optimization.

**Metrics:** Sustainability score (from evals), adherence signals, diversity of routines, cost per user.

---

### 6. Nutrition-within-Wellness Assistant
**Concept:** Explains food choices in simple terms, suggests swaps, and ties to energy/mood—without giving medical or dietary prescriptions.

**Opik usage:**
- **Single-prompt evals** — "No specific calorie/medical targets?" "No absolutes like 'never eat X'?" "Culturally sensitive?"
- **Safety/false-positive tradeoffs** — Tune thresholds so we catch risky advice (e.g. extreme restriction) without over-flagging benign tips.
- **Production monitoring** — Dashboards for topics (e.g. "weight", "allergies") and flag spikes for review.

**Metrics:** Safety rate, false-positive rate on flags, user satisfaction, clarity score.

---

### 7. Hydration & Caffeine Timing Coach
**Concept:** Agent that logs daily water and caffeine intake (manual or from apps), explains how they affect energy/sleep, and suggests small timing tweaks—never medical or supplement advice.

**Opik API usage:**
- **Log traces** — Record each “add intake” / “get suggestion” step for debugging and pattern analysis.
- **Log conversations + user feedback** — Full sessions plus thumbs/ratings; feed into **online evaluation rules** (e.g. flag when users report headaches or insomnia after suggestions).
- **Single-prompt evaluation** — LLM-as-judge: “Does this avoid medical advice?” “No recommendation of specific supplements or dosages?” “Suggestions grounded in stated intake?”
- **Guardrails** — Block or redact specific product names and “diagnosis” language in logs; **anonymizers** for any health identifiers before storage.
- **Experiment tracking** — A/B “conservative vs moderate” caffeine-cutoff advice; track user-reported sleep/energy as proxy metrics.

**Metrics:** Safety (no medical claims), suggestion acceptance rate, user-reported sleep/energy delta, cost per session.

---

### 8. Posture & Desk Ergonomics Coach
**Concept:** Agent that uses short text or optional uploads (e.g. desk selfie or room description) to suggest posture cues and micro-breaks—no diagnosis of injury or pain.

**Opik API usage:**
- **Log media & attachments** — If users upload images, log them (with consent) for **multimodal evaluation**: “Did suggestions reference the image?” “No diagnosis of injury?”
- **Trajectory evaluation** — Score full flows: Did it ask about setup and discomfort level before advising? Did it err on “take breaks” rather than “push through”?
- **Annotation queues** — Ergo experts label outputs as safe/unsafe; build golden sets for **re-running experiments** when you change the model.
- **Alerts & dashboards** — Alert when phrases like “you have X condition” or “your spine is…” appear; dashboard for “suggest break” vs “suggest stretch” ratio.
- **Prompt Playground** — Rapidly test edge inputs (“sharp pain in neck”, “pregnant”) and lock down safe, consistent disclaimers.

**Metrics:** Multimodal faithfulness, safety score, expert agreement, user completion rate.

---

### 9. Stress-Signal & Break Reminder Agent
**Concept:** Lightweight agent that infers stress from time of day, calendar density, or short self-report, then suggests 1–3 minute breathing or refocus prompts—wellness only, never therapy.

**Opik API usage:**
- **Log conversations** — Every session; use for **Agent Optimizer** to tune prompts so tone stays supportive and non-clinical.
- **Multi-turn evaluation** — “Did it avoid diagnosing or treating anxiety/depression?” “Were suggestions time-bounded and actionable?”
- **User feedback + online evaluation rules** — Thumbs and optional “felt better / no change”; rules to flag sessions where users say “made me worse” for review.
- **Cost tracking** — Per-session token use (agents run often); optimize for short, cheap prompts.
- **Production monitoring** — Dashboards by time-of-day, user return rate, and feedback distribution to improve timing and content.

**Metrics:** Safety (no clinical claims), “felt better” rate, session length, cost per session.

---

### 10. Injury Prevention Checklist Agent
**Concept:** Pre-activity agent that runs a short checklist (warm-up done? any niggles? sleep/hydration?) and suggests “go / modify / skip” with optional exercise swaps—never “push through pain.”

**Opik API usage:**
- **Trajectory evaluation** — End-to-end score: “Did it ask key safety questions?” “Did it never encourage ignoring pain?” “Were modifications concrete?”
- **LLM-as-judge** — “Recommendation consistent with stated niggles?” “No medical or injury diagnosis?” “Age/context appropriate?”
- **Guardrails** — Block phrases like “push through”, “no pain no gain” in production; **anonymizers** for body-part or condition mentions in logs.
- **Pytest integration** — Regression suite: “For input ‘sharp pain in knee’, output must suggest skip or see professional”; run in CI on every model/prompt change.
- **Annotation queues** — Coaches label go/modify/skip decisions for eval and **Agent Optimizer** tuning.

**Metrics:** Consistency with stated risk factors, safety score, expert agreement, user adherence to “skip” when suggested.

---

### 11. Mindful Eating & Meal-Mood Logger
**Concept:** Agent that helps users log meals and brief mood/energy (no calories required), surfaces patterns in plain language, and suggests one small swap or ritual—no diets or weight targets.

**Opik API usage:**
- **Log conversations + user feedback** — Full flows and thumbs/ratings; drive **experiment tracking** (e.g. “suggest one swap” vs “suggest two options”).
- **Single-prompt evaluation** — “No calorie or weight targets?” “No ‘good/bad food’ framing?” “Culturally sensitive and non-stigmatizing?”
- **Safety/false-positive tradeoffs** — Tune **online evaluation rules** so we flag extreme restriction language without over-flagging “eat more veggies.”
- **Prompt Generator & Improver** — Iterate on wording so suggestions stay actionable and avoid “all or nothing” language.
- **Dashboards** — Topic mix (e.g. “stress eating”, “sleep”), suggestion acceptance, and feedback trends.

**Metrics:** Safety rate, false-positive rate on flags, suggestion acceptance, return rate.

---

### 12. Cycle-Aware Wellness Companion (e.g. period / hormonal)
**Concept:** Agent that uses cycle phase (if shared) plus sleep, energy, and appetite to suggest gentle routine tweaks—focus on sustainable habits, never diagnosis or treatment.

**Opik API usage:**
- **Guardrails & anonymizers** — Strip or anonymize cycle and health identifiers in **all production logs**; block medical or fertility claims in outputs.
- **Trajectory evaluation** — “Did it stay within wellness (sleep, nutrition, gentle movement) and avoid medical advice?” “Suggestions proportional to user’s stated energy?”
- **LLM-as-judge** — “No diagnosis?” “No specific supplement or medication suggestion?” “Respectful and non-stigmatizing?”
- **Alerts** — If outputs mention “see a doctor” or medical terms beyond a simple disclaimer, trigger human review.
- **Annotation queues** — Experts label outputs for appropriateness; use for golden set and **re-running experiments** when guidelines or model change.

**Metrics:** Safety (no medical overreach), user comfort score, suggestion relevance, guardrail trigger rate.

---

## 💰 Financial Health Track

### 1. Plain-Language Financial Explainer Agent
**Concept:** Multi-turn agent that answers "Why did my bill go up?" "What's the difference between APR and APY?" using user's own statements or generic examples.

**Opik usage:**
- **LLM-as-judge evals** — "Is this accurate?" "Is it in plain language?" "Does it avoid speculation or investment advice?"
- **Trajectory evaluation** — Score full explanations for correctness, completeness, and appropriateness for stated literacy level.
- **Annotation queues** — Finance educators label answers for accuracy and suitability; use for golden sets and regression tests.
- **Re-running experiments** — When docs/regulations change, re-run evals on archived prompts to catch regressions.

**Metrics:** Accuracy score, reading-level score, "no speculation" compliance, user ratings.

---

### 2. Goal-Based Savings Assistant
**Concept:** Agent that helps set savings goals, suggests small weekly/monthly amounts, and tracks progress with encouragement—no investment or product recommendations.

**Opik usage:**
- **Agent Optimizer** — Tune prompts so suggestions stay realistic (e.g. "save $X/week") and never cross into "put money in crypto/stock Y".
- **User feedback** — Log "helpful / not helpful" and "achieved goal / adjusted / abandoned"; feed into online eval rules.
- **Guardrails** — Block or redact product names, tickers, and specific investment advice in logs and outputs.
- **Dashboards** — Goal types, completion rates, and feedback trends per segment (e.g. by goal size).

**Metrics:** Advice appropriateness, guardrail triggers, goal completion rate, satisfaction.

---

### 3. Spending Tracker + Categorization Coach
**Concept:** Agent that categorizes transactions, explains spending patterns in simple language, and suggests achievable cutbacks—no judgment, no product pitches.

**Opik usage:**
- **Multimodal evaluation** — If users upload statements (images/PDFs), evals on "Correct category?" and "Summary faithful to data?"
- **Regression test suite** — Pytest + Opik: "Never recommend borrowing for discretionary spend", "Always normalize for income level when comparing".
- **Online evaluation rules** — Flag any mention of loans, credit products, or "invest now" for review.
- **Experiment tracking** — Compare categorization prompts and explanation styles; track accuracy and user trust signals.

**Metrics:** Categorization accuracy, safety flags, user edits to categories, feedback scores.

---

### 4. Budget-Builder Chat Agent
**Concept:** Walks users through building a first budget (income, fixed vs flexible spending, savings) and answers follow-up questions in plain language.

**Opik usage:**
- **Multi-turn agent evals** — Score full dialogues: Did it cover essentials? Did it avoid risky advice? Was it encouraging?
- **Prompt Playground** — Rapidly test edge cases ("I have debt", "irregular income") and lock down safe, consistent answers.
- **Alerts** — If the agent often mentions "invest" or "borrow" in budget context, alert for review.
- **Cost tracking** — Track cost per budget "session" for efficiency and scaling.

**Metrics:** Completeness of budget coverage, safety score, drop-off points, user satisfaction.

---

### 5. "Why Does My Paycheck Look Like This?" Explainer
**Concept:** Agent that explains deductions (tax, benefits, retirement) in simple terms from a pay stub or user-described numbers.

**Opik usage:**
- **Single-prompt evaluation** — Correctness vs stub logic, plain language, no tax/legal advice disclaimer where needed.
- **Guardrails** — Anonymize dollar amounts and employer names in production logs.
- **Re-running experiments** — When tax rules change, re-evaluate old prompts against new policy docs.
- **Annotation queues** — HR/payroll experts validate explanations for a golden set.

**Metrics:** Explanation accuracy, safety/compliance rate, clarity score.

---

### 6. Financial Literacy Quiz & Coach
**Concept:** Short, conversational quiz on concepts (interest, compounding, budgeting); agent explains right/wrong answers and suggests one next concept.

**Opik usage:**
- **Trajectory evaluation** — Score flows: difficulty progression, explanation quality, no product pitches.
- **LLM-as-judge** — "Explanation correct?" "Appropriate for age/context?" "No speculative or risky framing?"
- **Experiment tracking** — Compare quiz order and explanation styles; optimize for comprehension and completion.
- **Production monitoring** — Track completion by topic, drop-off, and feedback to improve content.

**Metrics:** Completion rate, accuracy of explanations, user confidence gain, safety compliance.

---

### 7. Bill & Fee Negotiation Explainer
**Concept:** Agent that explains how to ask for lower rates (internet, phone, insurance), what to say and when—no scripted “cancel everything,” no product pitches.

**Opik API usage:**
- **LLM-as-judge** — “Accurate and practical?” “Plain language?” “No speculative ‘you’ll definitely get 50% off’?” “Avoids pressuring user to cancel?”
- **Trajectory evaluation** — Score full explanations: completeness, appropriateness for stated provider and context, no risky or aggressive tactics.
- **Guardrails** — Block or redact provider names and dollar amounts in **production logs**; block “threaten to leave” or “fake cancel” as primary advice.
- **Re-running experiments** — When carrier or regulation docs change, re-run evals on archived prompts to catch outdated advice.
- **Annotation queues** — Consumer advocates label answers for accuracy and appropriateness; build golden set for regression tests.

**Metrics:** Accuracy score, “no pressure” compliance, user ratings, safety flags.

---

### 8. Debt Paydown Strategy Explainer (Avalanche vs Snowball)
**Concept:** Agent that explains avalanche vs snowball in plain language, helps users compare “pay high-interest first” vs “pay smallest balance first”—no product or loan recommendations.

**Opik API usage:**
- **Log conversations** — Full flows; use for **Agent Optimizer** so explanations stay clear and never cross into “take this loan” or “consolidate here.”
- **Single-prompt evaluation** — “Math consistent with user’s stated balances/APRs?” “Plain language?” “No product or lender names?” “Disclaimer that this is education, not advice?”
- **Pytest integration** — Regression tests: “For given balances and APRs, avalanche recommendation must match high-interest-first logic”; run in CI.
- **Online evaluation rules** — Flag any mention of specific lenders, consolidation products, or “invest instead of pay debt” for review.
- **Cost tracking** — Per-session cost; keep explanations concise to scale to many users.

**Metrics:** Math accuracy, “no product” compliance, user comprehension (e.g. quiz or follow-up), guardrail triggers.

---

### 9. Subscription & Recurring Charge Audit Agent
**Concept:** Agent that ingests transaction lists or bank/card exports (manual paste or CSV), identifies subscriptions and recurring charges, and suggests “keep / reduce / cancel” in plain language—no product pitches.

**Opik API usage:**
- **Log media & attachments** — If users upload CSVs or screenshots, log (with consent) for **multimodal evaluation**: “Categories correct?” “Summary faithful to data?” “No PII leaked in logs?”
- **Anonymizers** — Strip merchant names and amounts in **production logs**; only aggregate stats (e.g. “3 streaming, 2 software”) for dashboards.
- **Regression test suite (Pytest + Opik)** — “Never recommend borrowing to pay subscriptions”; “Always normalize for stated income when judging ‘too much’.”
- **Experiment tracking** — A/B explanation style (“save $X/month” vs “you’re spending $X on Y”) and track user actions (cancel vs keep) as proxy for usefulness.
- **Alerts** — If outputs mention “invest the savings” or specific products, alert for review.

**Metrics:** Categorization accuracy, safety flags, user “acted on suggestion” rate, PII leak rate (zero target).

---

### 10. Emergency Fund Calculator & Coach
**Concept:** Agent that helps users set an emergency fund target (e.g. 3–6 months expenses), suggests small weekly deposits, and tracks progress—no investment or product recommendations.

**Opik API usage:**
- **Agent Optimizer** — Tune prompts so suggestions stay in “save $X in a safe account” and never cross into “put in crypto/stock Y” or “use this high-yield product.”
- **Log user feedback** — “Helpful / not helpful,” “achieved milestone / adjusted / paused”; feed into **online evaluation rules** and dashboards.
- **Guardrails** — Block product names, tickers, and “invest your emergency fund” in outputs and logs.
- **Trajectory evaluation** — “Did it ask about income stability and expenses before suggesting months of savings?” “Encouraging without being pushy?”
- **Cost tracking** — Per-session cost; optimize for short, repeatable conversations (e.g. “update balance → get next milestone”).

**Metrics:** Advice appropriateness, goal completion rate, guardrail triggers, user satisfaction.

---

### 11. Credit Score Myth Buster
**Concept:** Agent that answers “What affects my score?” “Will one late payment ruin it?” in plain language—no “fix your score fast” or paid-product pitches.

**Opik API usage:**
- **LLM-as-judge** — “Factually accurate?” “No guarantee of specific score improvement?” “No paid repair-service or product recommendations?” “Appropriate disclaimer that this is education?”
- **Guardrails** — Block “boost your score in 30 days,” “we can fix it,” or product names in outputs; **anonymizers** for any score numbers or bureau names in logs.
- **Re-running experiments** — When bureau rules or reporting changes, re-eval archived Q&A against new docs.
- **Prompt Playground** — Test edge questions (“I’m in collections,” “I’m disputing”) and lock down safe, consistent answers and disclaimers.
- **Annotation queues** — Credit educators label answers for accuracy; use for golden set and regression tests.

**Metrics:** Accuracy score, “no product” compliance, user ratings, guardrail trigger rate.

---

### 12. Tax Withholding & W-4 Explainer
**Concept:** Agent that explains how withholding works, what W-4 choices mean in simple terms, and when to consider adjusting—no specific tax or legal advice, with clear disclaimers.

**Opik API usage:**
- **Single-prompt evaluation** — “Logic consistent with stated income and allowances?” “Plain language?” “Clear disclaimer that this is not tax/legal advice?” “No promise of specific refund amount?”
- **Guardrails** — Anonymize dollar amounts and employer names in **production logs**; block “you will get $X back” style guarantees.
- **Re-running experiments** — When IRS forms or guidelines change, re-run evals on archived prompts to catch regressions.
- **Annotation queues** — HR or tax educators validate explanations for a golden set.
- **Alerts** — If outputs give specific “change line X to Y” without disclaimer, trigger review.

**Metrics:** Explanation accuracy, disclaimer presence, safety/compliance rate, user satisfaction.

---

### 13. Family Money Conversations Coach (Parents & Kids)
**Concept:** Agent that helps parents explain earning, saving, and spending to kids in age-appropriate, honest language—no product pitches or “buy this for your kids.”

**Opik API usage:**
- **Trajectory evaluation** — “Age-appropriate language?” “No product or brand recommendations?” “Encourages dialogue, not scripted lectures?” “Respectful of different family structures?”
- **LLM-as-judge** — “Explanation correct?” “No speculative or risky framing?” “Suitable for stated age range?”
- **Guardrails** — Block specific product names, “invest for your kid,” or high-pressure sales language in outputs and logs.
- **Experiment tracking** — Compare conversation frameworks (e.g. allowance vs goals) and track parent feedback and completion.
- **Production monitoring** — Dashboards by age bucket, topic (saving vs spending), and feedback to improve content.

**Metrics:** Age-appropriateness score, “no product” compliance, parent satisfaction, completion rate.

---

## 🔗 Cross-Track Opik Patterns

| Need | Opik feature | Example |
|------|----------------|---------|
| "Is this safe / appropriate?" | LLM-as-judge evals | Health: no clinical claims; Finance: no speculation |
| End-to-end quality | Trajectory / agent eval | Workout plans, budget-building chats |
| Improve over time | Agent Optimizer + experiment tracking | Tune prompts for safety and helpfulness |
| Catch regressions | Pytest + re-run experiments | New model or policy → re-eval old prompts |
| Production safety | Guardrails, anonymizers, alerts | Redact PII, block harmful topics, alert on spikes |
| Human-in-the-loop | Annotation queues | Expert labels for training and eval sets |
| Real user signal | User feedback + online eval rules | Thumbs, ratings, "achieved goal" as live metrics |

Use these in **hackathon-info.md** for structure and in **idea.md** for brainstorming and design. Prioritize a few Opik features deeply (e.g. trajectory evals + Agent Optimizer + one guardrail) so the demo clearly shows "evaluation loops that actually improve quality."

---

## 🎯 Opik-First Quick Picks (Best Use of Opik)

Ideas that stack **multiple Opik API features** and show evaluation loops that improve quality:

| Idea | Opik stack to highlight | Why it shines for “Best Use of Opik” |
|------|-------------------------|--------------------------------------|
| **Injury Prevention Checklist** (Health #10) | Trajectory eval + LLM-as-judge + Guardrails + Pytest + Annotation queues | End-to-end safety: evals, regression tests, human labels, and guardrails in one flow. |
| **Cycle-Aware Wellness Companion** (Health #12) | Guardrails + Anonymizers + Trajectory eval + Alerts + Annotation queues | Sensitive domain: anonymizers, guardrails, and human review baked in. |
| **Debt Paydown Explainer** (Finance #8) | Agent Optimizer + Single-prompt eval + Pytest + Online eval rules | Math correctness + “no product” safety + regression suite and live rules. |
| **Subscription Audit Agent** (Finance #9) | Multimodal eval + Anonymizers + Pytest + Experiment tracking | Data-heavy: multimodal evals, PII protection, and A/B on explanation style. |
| **Emergency Fund Coach** (Finance #10) | Agent Optimizer + User feedback + Guardrails + Trajectory eval | Clear “tune prompts → stay in scope → re-eval” loop with guardrails. |
| **Stress-Signal & Break Reminder** (Health #9) | Agent Optimizer + Multi-turn eval + User feedback + Cost tracking | High-volume, low-cost agent with feedback-driven tuning and cost visibility. |

**Demo tip:** Pick one idea and implement **trajectory eval + Agent Optimizer + one guardrail** end-to-end so judges see “evaluation loops that actually improve quality.”
