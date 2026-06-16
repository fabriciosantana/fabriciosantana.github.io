# Proposal Methodology

This guide captures the proposal method used for Workana opportunities, based on the site offer and the completed proposals for the swimming performance platform and lead prioritization/sales automation system.

## Core positioning

Every proposal should position Fabricio Santana as a senior software engineer and technical lead who reduces delivery risk through clear scope, fixed-price phases, technical rigor, and practical execution.

Use this baseline identity:

- 20+ years of experience in software engineering, technical leadership, architecture, backend development, database integration, automated testing, cloud computing, and critical systems.
- Experience leading large engineering teams and coordinating complex systems where business rules, data consistency, security, quality, and maintainability matter.
- Strong fit for MVPs, APIs, internal tools, dashboards, system integrations, process automation, AI applications, architecture improvements, security, testing, CI/CD, and deployment.
- Commercial promise: fixed pricing, clear milestones, no open-ended hourly billing, client ownership of produced code, frequent demos, technical review, tests when applicable, deployment support, and handoff.

Avoid generic freelancer language. The proposal should show that the real challenge has been understood and reframed as an operational software system with risks, dependencies, acceptance criteria, and maintainable delivery.

## Required commercial structure

Use a Discovery Sprint first, followed by a delivery package only after scope and risks are clear.

Discovery Sprint:

- Duration: 1 week.
- Price: USD 500 for English/international proposals or R$ 3.000 for Brazilian proposals.
- Up to 5 remote meetings.
- Purpose: understand business problem, review current platform/data/workflow, map requirements, risks, integrations, dependencies, priorities, and acceptance criteria.
- Deliverable: practical work plan with recommended scope, technical approach, milestones, success criteria, responsibilities, risks, and package recommendation.

Delivery packages:

- Essential Delivery: USD 2,000 / R$ 12.000, 4 weeks. Use for focused modules, MVPs, backend features, import flows, or small integrations with limited uncertainty.
- Product Acceleration: USD 4,000 / R$ 24.000, 4 weeks. Use when faster delivery is needed, or when the project includes a product, API, integration, internal workflow, multiple features, or more demanding quality needs.
- Scale & Intelligence: USD 6,000 / R$ 36.000, 4 weeks. Use for complex systems, advanced data workflows, automation, AI, auditability, security, observability, broader platform evolution, or stronger technical scale planning.

Choose the package based on complexity and risk, not only on feature count. For unclear but narrow work, recommend Discovery + Essential. For integrations, automation, and multiple moving parts, recommend Discovery + Product Acceleration. For AI, complex data, compliance, security, bidirectional messaging, advanced dashboards, or scale concerns, recommend Discovery + Scale & Intelligence or state that discovery may recommend it.

## Standard proposal shape

Use this order for the formal proposal:

1. Title.
2. Greeting and presentation.
3. Specific fit paragraph.
4. Working methodology.
5. Opportunity analysis.
6. Proposed work plan.
7. Estimated timeline.
8. Availability and communication.
9. Budget.
10. Questions before final confirmation.

The presentation and Working methodology may be reused, but the specific fit paragraph, analysis, work plan, budget assumptions, and questions must be tailored to the opportunity.

## Commercial funnel artifacts

Do not treat every opportunity as if it automatically deserves a full formal proposal. Treat proposal work as a small sales funnel.

For each opportunity, prefer creating these artifacts:

```text
opportunities/<platform-or-client>-<short-topic>/
  qualification.md
  opportunity-and-analysis.md
  bid-message.md
  proposal.tex
  proposal.pdf
```

Use `qualification.md` to decide whether to pursue the opportunity and how much effort to invest. The decision should be one of:

- `pursue`: strong fit and enough commercial signal to prepare both bid message and formal proposal.
- `pursue discovery only`: useful opportunity but scope, budget, client maturity, or unknowns make it safer to sell only the Discovery Sprint first.
- `skip`: weak fit, low budget signal, unclear client, high risk of open-ended scope, or poor alignment with the offer.

Evaluate at least:

- budget signal or likely ability to pay;
- clarity of scope;
- fit with Fabricio's positioning;
- urgency and business pain;
- access to decision maker;
- risk of uncontrolled scope;
- seriousness of client signals;
- likelihood of competing only on low price.

## Proposal review and improvement loop

When a proposal has already been drafted, review it before treating it as ready for the client. Use a review stance similar to code review: findings first, ordered by commercial or delivery risk, with direct references to the relevant file and line when possible.

Check at least:

- whether the bid message is commercially sharp enough to earn a conversation;
- whether the proposal addresses the client's explicit buying criteria, not only the technical scope;
- whether important client phrases such as "easy to change", "secure", "scalable", "bilingual", "admin panel", or "automation" became concrete deliverables;
- whether the timeline says "first operational release" or another bounded delivery phrase when the full future scope could exceed one cycle;
- whether security, integrations, data ownership, CMS/admin needs, handoff, and acceptance criteria are specific enough for the opportunity;
- whether budget language protects against uncontrolled scope while still giving the client a clear next step;
- whether the final question helps qualify buyer intent, access, budget, or readiness to start discovery.

After the review, adjust all affected artifacts together: `bid-message.md`, `opportunity-and-analysis.md`, `proposal.tex`, and then regenerate `proposal.pdf`. If the opportunity folder is not tracked by Git yet, inspect the files directly because `git diff` will not show useful changes for untracked directories. Compile with `latexmk -pdf proposal.tex` and clean auxiliary files with `latexmk -c`.

## Bid message

For platforms such as Workana, always prepare a short `bid-message.md` in addition to the formal proposal. The bid message is often the first and most important sales filter.

Recommended structure:

1. Specific recognition of the client's problem.
2. Short technical diagnosis that shows judgment.
3. Proposed next step, usually Discovery Sprint.
4. Direct call to action or one high-value question.

The bid message should be concise, specific, and commercially sharp. It should not be a compressed version of the full proposal. Its goal is to earn a conversation or make the Discovery Sprint feel like the obvious low-risk next step.

Example pattern:

"This is not just a CRM automation task. The key risk is making sure lead scoring, enrichment, assignment rules, and daily summaries work as one reliable sales workflow. I would start with a short Discovery Sprint to review your CRM, lead data, enrichment access, messaging provider, and current sales rules, then confirm the best fixed-scope implementation package."

## Tone and argument

The tone should be confident, technical, concrete, and low-hype. The proposal should demonstrate judgment by identifying the real implementation risks behind the client's request.

Use this pattern:

- "The main challenge is not only X. The important part is Y."
- Reframe the work as a controlled workflow or system, not a single feature.
- Prefer explainable and configurable first versions before advanced AI or machine learning claims.
- Tie technical decisions to business outcomes and operational reliability.
- State assumptions clearly.
- Use discovery to protect both sides from unclear scope.

Do not overpromise. When the client asks for AI, intelligent algorithms, crawling, automation, or third-party integrations, state that the first version should be practical, explainable, auditable, and improved once reliable data exists.

## Analysis method

For each opportunity, extract:

- The client objective.
- The visible requested deliverables.
- The hidden operational risks.
- Unknown dependencies.
- The most appropriate starting package.
- Required inputs from the client.
- Criteria that may increase scope or require a higher package.

Then write an analysis that distinguishes the obvious task from the real engineering problem.

Examples:

- For Excel import: the issue is not just reading Excel, but a controlled data pipeline with validation, staging, duplicate prevention, matching, auditability, and recalculation side effects.
- For lead automation: the issue is not just lead scoring, but a sales operations automation workflow with CRM data quality, enrichment constraints, explainable prioritization, assignment rules, WhatsApp delivery, and measurable feedback.

## Proposed work plan rules

Break implementation into structured phases, usually 5 or 6.

Good phase types:

- Technical assessment, discovery, and design.
- Integration/data pipeline.
- Validation, normalization, deduplication, or enrichment.
- Core business logic or algorithm.
- Workflow automation and user-facing delivery.
- Testing, monitoring, documentation, and handoff.

Each phase should contain concrete bullets. Include validation, error handling, duplicate handling, traceability, safeguards, tests, documentation, and handoff whenever applicable.

Do not describe only happy-path implementation. Mention fallback behavior, manual review, incomplete data, ambiguous matches, provider limits, or operational failure modes where relevant.

## Budget and timeline rules

Timeline should include Discovery Sprint plus one 4-week package when possible.

Default patterns:

- Discovery + Essential: USD 2,500 total, 5 weeks. Use for focused and bounded work.
- Discovery + Product Acceleration: USD 4,500 total, 5 weeks. Use for multi-integration automation, CRM workflows, APIs, or faster delivery needs.
- Discovery + Scale & Intelligence: USD 6,500 total, 5 weeks. Use only when strong complexity, AI, security, compliance, or scale requirements are already visible.

Always include assumptions under the budget. Then state that Discovery will confirm whether the recommended package is sufficient and identify conditions that would require a higher package or additional cycle.

Choose the commercial framing according to buyer maturity and scope clarity:

- For uncertain or early-stage clients, sell the Discovery Sprint first and avoid pushing a full implementation budget too early.
- For serious clients with a clear operational problem and credible budget, present Discovery plus the recommended package.
- For clients who need a lower-risk entry point, offer a minimum operational version first, then expansion after acceptance.

Make the Discovery Sprint feel like a concrete deliverable, not paid conversation. When relevant, list discovery outputs such as current-flow map, risk analysis, prioritized backlog, recommended architecture, integration plan, validated estimate, acceptance criteria, and package recommendation.

## Warranty

Include a construction defect warranty in LaTeX/PDF proposals unless the context suggests not to.

Baseline text:

"After delivery and acceptance, I include a 30-day warranty for construction defects related to the approved scope. This covers fixes for implementation errors, broken agreed behavior, or defects introduced by the delivered code. It does not cover new features, changes in business rules, new data formats or fields not included in the approved scope, third-party service changes, infrastructure changes outside the project, or requests that expand the original acceptance criteria."

Adapt the exclusions to the project domain.

## Questions section

End with 8 to 10 questions that expose the key unknowns needed to confirm scope.

Questions should cover:

- Technology stack or current platform.
- Data sources and data quality.
- Examples, samples, credentials, or access requirements.
- Business rules.
- Third-party providers and API availability.
- Compliance or privacy constraints.
- Existing tests, staging, deployment, or environments.
- Operational workflow and user responsibilities.
- Success metrics.
- Deadlines or external constraints.
- Budget approval or budget range, when appropriate.
- Decision maker and integration owner, when appropriate.

Do not ask generic questions if a more specific question is possible.

Include at least one question that helps qualify buying intent, such as:

- Do you already have a budget range approved for this project?
- Who will approve access to the CRM, messaging provider, repository, or production environment?
- Would you prefer to start with a Discovery Sprint before committing to full implementation?
- Is there a target date for the first operational version?
- What would make this project successful in the first 30 days?

## Output files

For each opportunity, prefer this structure:

```text
opportunities/<platform-or-client>-<short-topic>/
  qualification.md
  opportunity-and-analysis.md
  bid-message.md
  proposal.tex
  proposal.pdf
```

Use Markdown for analysis and LaTeX for the final proposal when the user asks for a proposal in LaTeX. Compile with `latexmk -pdf proposal.tex` and clean auxiliary files with `latexmk -c`.
