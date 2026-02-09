# TripWise — Travel Budget Agent

**TripWise** is an AI-powered **travel budget agent** that helps users understand flight and hotel costs, get savings suggestions in plain language, and make informed travel spending decisions. Built for the Comik Hackathon (Financial Health track) with **Comet Opik** for observability and experimentation.

## What it does

- **Plan a trip** — Enter route, dates, and budget; the agent suggests options and explains tradeoffs in plain language.
- **Understand where your money goes** — Cost breakdowns for flights and hotels without the overwhelm.
- **Savings opportunities** — “You could save $X by…” (e.g. flexible dates, nearby airports) in simple terms.
- **Financial decisions** — No product pitches; focus on helping users make informed choices about travel spend.

## Tech stack

- **Next.js** (App Router), Node runtime
- **Comet Opik** (tracing, metrics, evals)
- **LLM** (OpenAI / Gemini / Grok) — swappable provider
- **PostgreSQL** (optional) — Supabase / Neon compatible
- Vercel-friendly deployment

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Plan trip** to describe your trip and get agent suggestions (MVP: form + placeholder; backend/agent wiring next).

## Project structure

- `/app` — Landing (TripWise hero), `/plan` (trip input + suggestions)
- `/api` — (To add) `generate-suggestions` — agent for flight/hotel options and savings
- `/lib` — LLM provider, Opik client, prompts

## Hackathon

- **Track:** Financial Health — empower better financial decisions and money management.
- **Judging:** Functionality, real-world relevance, use of LLMs/agents.
- **Opik:** Traces, metrics, evals, and A/B (e.g. friendly vs direct tone) for demo.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Comet Opik](https://www.comet.com/docs/opik/)
