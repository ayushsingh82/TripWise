# Opik API & Capabilities Reference

Reference for Opik features relevant to the Comik Hackathon. Use for implementation, evaluation, observability, and continuous improvement.

---

## Core Concepts

| Capability | Description |
|------------|-------------|
| **Log traces** | Record execution traces for debugging and analysis |
| **Log conversations** | Capture full multi-turn conversations |
| **Log user feedback** | Store thumbs up/down, ratings, and explicit feedback |
| **Log media & attachments** | Support images, PDFs, and other non-text inputs |
| **Cost tracking** | Monitor token use and cost per session/request |

---

## Evaluation

| Feature | Use case |
|---------|----------|
| **Single prompt evaluation** | Score individual prompts (accuracy, tone, safety) |
| **Agent evaluation** | Evaluate full agent behavior and outputs |
| **Trajectory evaluation** | Score end-to-end flows (clarity, safety, completeness) |
| **Multimodal evaluation** | Evaluate when inputs/outputs include images, charts, etc. |
| **Multi-turn agents** | Evals across conversation turns |
| **Re-running experiments** | Re-evaluate archived prompts when models or policies change |
| **Annotation queues** | Human labels for golden sets and model tuning |

---

## Production & Monitoring

| Feature | Description |
|---------|-------------|
| **Online evaluation rules** | Rules that run on live traffic (e.g. flag risky topics) |
| **Guardrails** | Block or redirect harmful or off-scope content |
| **Anonymizers** | Strip or anonymize PII/health/financial identifiers in logs |
| **Alerts & dashboards** | Monitor metrics, spikes, and safety signals |
| **Production monitoring** | Track quality and behavior in production |

---

## Tooling

| Tool | Purpose |
|------|---------|
| **Prompt Playground** | Rapidly test prompts and edge cases |
| **Prompt Generator & Improver** | Generate and iterate on prompt text |
| **Agent Optimizer** | Tune prompts/agents for safety and quality |
| **Pytest integration** | Regression tests and evals in CI |
| **Opik MCP Server** | Use Opik from MCP-enabled workflows |

---

## Integration Notes

- **LLM-as-judge**: Use Opik evals to score “Is this accurate?”, “Is it safe?”, “Plain language?” etc.
- **Experiment tracking**: Compare prompt/agent variants and track metrics over time.
- **Evaluation loops**: Log feedback → run evals → tune with Agent Optimizer → re-eval.
- **Guardrails first**: Use guardrails and anonymizers before logging sensitive data.

Use this file alongside **hackathon-info.md** and **idea.md** when building and evaluating your hackathon project.

---

## Opik APIs we’ll use for encode-hack (Subscription Audit)

For the **Subscription & Recurring Charge Audit** agent, these are the Opik APIs/features we’ll use and how they map to the product.

### 1. Log media & attachments (CSV / uploads)

- **Purpose:** Log uploaded CSVs or pasted transaction data (with user consent) for multimodal evaluation and debugging.
- **Opik surface:**
  - **Python:** [Log multimodal traces](https://www.comet.com/docs/opik/tracing/log_multimodal_traces) — attach files to traces/spans.
  - **REST:** [Attachments Client](https://www.comet.com/docs/opik/python-sdk-reference/) — upload/store attachment metadata and references.
- **In our app:** When the user uploads a CSV or pastes transactions, we log a trace (or span) that references the input *after* anonymization (see below). Used for evals: “Categories correct?”, “Summary faithful to data?”.

### 2. Anonymizers (strip PII / merchant names / amounts)

- **Purpose:** Before any logging, strip or redact merchant names, dollar amounts, and other financial PII so we never store raw sensitive data.
- **Opik surface:**
  - [Anonymizers](https://www.comet.com/docs/opik/production/anonymizers) — configure rules to strip or hash PII in production logs.
- **In our app:** Apply anonymizers on transaction text before sending to Opik. Log only aggregate stats (e.g. “3 streaming, 2 software”) or redacted summaries. Target: **PII leak rate = 0** in logs.

### 3. Log traces & spans (audit flow)

- **Purpose:** Record the “analyze subscriptions” flow so we can debug, inspect LLM calls, and feed into evaluation.
- **Opik surface:**
  - **Python SDK:** `opik.start_as_current_trace()`, `opik.start_as_current_span()`, or `@track` on the analyze function.
  - **REST:** [Traces Client](https://www.comet.com/docs/opik/reference/rest-api/overview), [Spans Client](https://www.comet.com/docs/opik/python-sdk-reference/) — create traces/spans programmatically.
- **In our app:** One trace per “Analyze” run; spans for: input validation, LLM call (if any), categorization, suggestion logic. Makes it clear what we’re evaling later.

### 4. Log user feedback (thumbs up/down)

- **Purpose:** Capture “Was this useful?” and “acted on suggestion” to drive online eval rules and tuning.
- **Opik surface:**
  - [Log user feedback / annotate traces](https://www.comet.com/docs/opik/tracing/annotate_traces) — attach feedback to the corresponding trace.
  - **REST:** Feedback definitions and trace annotations.
- **In our app:** When the user clicks 👍/👎 (and optionally “I canceled X” / “I kept Y”), send that as feedback on the audit trace. Use in **online evaluation rules** and dashboards.

### 5. Multimodal / agent evaluation

- **Purpose:** Evaluate “Did the summary match the data?”, “Categories correct?”, “No product pitches?” on runs that include CSV/text input.
- **Opik surface:**
  - [Evaluate multimodal traces](https://www.comet.com/docs/opik/evaluation/evaluate_multimodal) — run evals on traces that have attachments or non-text I/O.
  - **Metrics:** e.g. [GEval](https://www.comet.com/docs/opik/python-sdk-reference/) (LLM-as-judge), custom checks for “no product advice”, “faithful to data”.
- **In our app:** Offline evals on a golden set of (anonymized) CSV → summary pairs; LLM-as-judge: “Summary faithful to data?”, “No investment or product recommendation?”.

### 6. Online evaluation rules (live traffic)

- **Purpose:** In production, flag runs where the model says “invest the savings”, product names, or “borrow to pay subscriptions”.
- **Opik surface:**
  - [Online Evaluation rules](https://www.comet.com/docs/opik/production/rules) — rules that run on each trace/span in production and flag or score.
- **In our app:** Rules that tag traces for human review when output contains risky phrases (invest, borrow, specific products). Feeds into **alerts** and **dashboards**.

### 7. Experiment tracking & re-running experiments

- **Purpose:** A/B prompt or explanation style (“save $X/month” vs “you’re spending $X on Y”), and re-eval when we change model or policy.
- **Opik surface:**
  - [Experiments Client](https://www.comet.com/docs/opik/python-sdk-reference/) (REST) — create and query experiments.
  - [Re-running an existing experiment](https://www.comet.com/docs/opik/evaluation/update_existing_experiment) — re-evaluate the same dataset with new model/prompt.
- **In our app:** Log each “analyze” run as part of an experiment (e.g. by prompt variant). Later: re-run the same evaluation dataset to catch regressions (“Never recommend borrowing for subscriptions”, “Always normalize for income”).

### 8. Regression tests (Pytest + Opik)

- **Purpose:** Encode safety and correctness as tests: “Never recommend borrowing for discretionary subscriptions”, “Always normalize for stated income when judging ‘too much’.”
- **Opik surface:**
  - [Pytest integration](https://www.comet.com/docs/opik/testing/pytest_integration) — run Opik evals inside pytest; results in CI.
  - **Python:** `opik.evaluate()` (or evaluate_prompt / evaluate_experiment) with a small dataset + metrics; call from pytest.
- **In our app:** Pytest tests that run the audit pipeline on fixed (synthetic) inputs and assert on Opik metric results or on output constraints (no “borrow”, no product names).

### 9. Alerts & dashboards

- **Purpose:** Get notified when risky phrases spike; monitor safety and “acted on suggestion” over time.
- **Opik surface:**
  - [Alerts](https://www.comet.com/docs/opik/production/alerts) — configure alerts on metrics or rule hits.
  - [Dashboards](https://www.comet.com/docs/opik/production/dashboards) — build views over traces, feedback, and rule outcomes.
- **In our app:** Alerts when “invest”/“borrow”/product mentions cross a threshold; dashboards for categorization accuracy, feedback distribution, and PII-leak checks.

### 10. Cost tracking

- **Purpose:** Monitor token usage and cost per audit session for scaling and optimization.
- **Opik surface:**
  - [Cost tracking](https://www.comet.com/docs/opik/tracing/cost_tracking) — part of tracing; set `usage` (e.g. `prompt_tokens`, `completion_tokens`) on LLM spans.
- **In our app:** If we add an LLM step (e.g. to explain “keep/reduce/cancel” in plain language), log usage on that span so we can track cost per audit and optimize prompts.

---

### Quick reference: SDK / REST entrypoints

| What we need            | Python SDK / REST |
|-------------------------|-------------------|
| Log a run               | `opik.start_as_current_trace()`, `@track`, or REST Traces/Spans |
| Attach CSV/input        | Log multimodal trace / Attachments Client |
| Anonymize before log    | Anonymizers (production config) |
| Log thumbs / feedback   | Annotate trace / Feedback definitions |
| Evaluate runs           | `evaluate()`, `evaluate_prompt()`, `evaluate_experiment()`, multimodal eval |
| Rules on live traffic   | Online Evaluation rules |
| Experiments & re-runs   | Experiments Client, “re-running experiment” |
| Regression tests        | Pytest + Opik (`llm_unit` or evaluate inside pytest) |
| Alerts & dashboards     | Alerts, Dashboards (production) |
| Cost per request        | Set `usage` on LLM spans in traces |
