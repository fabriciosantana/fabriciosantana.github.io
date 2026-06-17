# Portfolio PoC: RetentionOps AI

## Decision

Build a portfolio proof of concept based on the `workana-ai-whatsapp-retention-platform` opportunity.

Selected opportunity:

- `opportunities/workana-ai-whatsapp-retention-platform/`

## Why this PoC

This is the strongest opportunity for a portfolio demo because it shows a real end-to-end operational workflow, not only a static screen or generic CRUD. It demonstrates the main capabilities sold in the proposals and on the `/projects` landing page:

- AI applied to a business process;
- workflow automation;
- WhatsApp-style interaction;
- CRM or operational record keeping;
- automatic classification;
- reporting and metrics;
- traceability and logs;
- human handoff;
- a credible foundation for future SaaS evolution.

The dispatch control tower is visually strong, but it demonstrates mostly dashboard and data visualization. The legal office system and dating app are too large for a focused PoC. Lead automation is relevant, but depends more on CRM, Apollo, and WhatsApp integrations and is less direct to demonstrate. RetentionOps AI gives a clearer demo in a few minutes.

## Suggested name

`RetentionOps AI`

## Demo goal

Show a realistic retention workflow in 5 minutes:

1. An associate requests cancellation in a WhatsApp-like interface.
2. The AI agent responds within approved retention rules.
3. The system classifies the cancellation reason.
4. The system calculates sentiment, urgency, confidence, and recommended next action.
5. The conversation is registered in a CRM-like operational record.
6. A dashboard updates with cancellation reasons, retention rate, escalations, and volume.
7. A sensitive or low-confidence case is escalated to a human operator.
8. An audit/log view shows the classification, decision, and short justification.

## MVP scope

### Synthetic data

Use synthetic associates and conversations only. The demo must not depend on real client data.

Suggested associate attributes:

- name;
- membership plan;
- monthly value;
- tenure;
- status;
- recent usage;
- cancellation risk;
- last contact date;
- assigned operator.

### WhatsApp simulator

Build an internal WhatsApp-style simulator instead of integrating with the real WhatsApp API for the first PoC.

Required behavior:

- select an associate;
- start a cancellation conversation;
- send predefined or typed messages;
- display AI replies;
- show conversation state and outcome.

### AI agent

The AI agent should support:

- controlled conversation flow;
- classification of cancellation reason;
- sentiment detection;
- urgency detection;
- confidence score;
- recommended retention action;
- summary for CRM;
- handoff recommendation when needed.

For the first implementation, support both:

- OpenAI-backed mode when an API key is available;
- deterministic mock mode for local demo without external dependency.

### Classification taxonomy

Initial cancellation reason categories:

- price;
- low usage;
- customer service;
- competitor;
- technical problem;
- personal change;
- unknown or needs review.

### Guardrails

The demo should show that the agent is not an uncontrolled chatbot.

Guardrail examples:

- do not promise discounts outside approved rules;
- escalate sensitive complaints;
- escalate low-confidence classifications;
- escalate high-value associates;
- keep a structured log of AI decisions.

### CRM record

Create a simple CRM-like view with:

- associate profile;
- conversation history;
- cancellation reason;
- sentiment;
- urgency;
- confidence;
- status;
- next action;
- assigned operator;
- AI summary;
- audit trail.

### Dashboard

Initial dashboard widgets:

- total cancellation conversations;
- retained associates;
- escalated cases;
- top cancellation reasons;
- retention rate;
- average confidence;
- recent conversations;
- cases needing human action.

## Suggested architecture

Preferred stack for portfolio consistency:

- Backend: Java + Spring Boot;
- Database: PostgreSQL;
- Frontend: React;
- AI: OpenAI API with mock fallback;
- Deployment: Docker Compose first, public demo later;
- Automation: simulate n8n-style workflow in backend first, optional real n8n flow later.

## Suggested first build slice

Build the smallest end-to-end slice before adding polish:

1. Spring Boot API with synthetic associates and conversations.
2. PostgreSQL schema or in-memory seed that can later move to PostgreSQL.
3. React dashboard with associates, conversation simulator, CRM record, and metrics.
4. AI classification service with mock mode.
5. One full demo scenario: price cancellation retained.
6. One escalation scenario: sensitive complaint or low confidence.
7. Basic Docker Compose.
8. README with demo script.

## Demo script

Use this story for the portfolio page and live walkthrough:

A membership business is losing associates without structured visibility into why they cancel. RetentionOps AI receives a cancellation message, conducts a controlled WhatsApp-style conversation, classifies the reason, recommends a retention action, updates the CRM, escalates risky cases, and turns conversations into actionable churn reports.

## Success criteria

The PoC is ready for portfolio use when it can demonstrate:

- a complete cancellation conversation;
- AI or mock classification output;
- CRM update after the conversation;
- dashboard metrics updated from real app state;
- at least one human escalation path;
- a short audit trail explaining the system decision;
- local run instructions that work from a clean checkout.

## Portfolio positioning

This PoC should be presented as a synthetic demonstration of production thinking, not as a finished SaaS.

Message to emphasize:

- bounded AI instead of uncontrolled chatbot behavior;
- clear business workflow;
- traceability;
- safe escalation;
- measurable operational value;
- architecture ready to evolve after discovery.

