# Swimming Performance Platform Proposal

Hello,

My name is Fabricio Santana. I am a software engineer and technical lead with 20+ years of experience in backend development, software architecture, database integration, automated testing, cloud computing, and delivery of critical systems. I have also led large engineering teams and worked on projects where data consistency, business rules, validation, security, and maintainability are essential.

Your project is a strong match for my background because the main challenge is not only importing Excel files. The important part is building a reliable data import workflow that protects the integrity of swimmer profiles, competition results, scores, and rankings.

## Working methodology

My delivery method is designed to reduce risk before development starts. The work begins with a fixed Discovery Sprint and then moves into a delivery package only after scope, priorities, responsibilities, dependencies, and acceptance criteria are clear.

The first step is a one-week Discovery Sprint with a fixed price of USD 500. In this phase, I can hold up to five remote meetings to understand the business problem, review the current platform, analyze the Excel files, map requirements, identify risks, review integrations, and define priorities. The deliverable is a practical work plan for the implementation, including recommended scope, technical approach, milestones, success criteria, and the most appropriate delivery package.

After discovery, the project can move into one of three fixed-price, four-week delivery packages. The package is selected according to scope, complexity, delivery speed, integration needs, quality requirements, and the amount of engineering support required. Some roles may participate part-time depending on the agreed scope, especially Scrum Master, technical leadership, test automation, DevOps, observability, and deployment support.

The Essential Delivery package is designed for a focused module or MVP that needs to ship with quality and room to evolve. It is suitable when the scope is well defined, the number of integrations is limited, and the main goal is to deliver a reliable working feature without unnecessary overhead.

The Product Acceleration package is recommended when the client needs faster delivery of a product, API, integration, or internal workflow without losing control of scope. It adds more engineering capacity and a dedicated engineering profile for test automation, DevOps, observability, and deployment support.

The Scale & Intelligence package is designed for more complex projects with integrations, automation, security needs, data workflows, observability, or broader platform evolution. It is the right option when the project requires technical leadership, more engineering capacity, stronger quality support, and a more robust scale plan.

Package setup comparison:

| Package | Fixed price | Duration | Team setup | Delivery emphasis | When to choose |
| --- | ---: | --- | --- | --- | --- |
| Essential Delivery | USD 2,000 | 4 weeks | Scrum Master and one full-stack engineer | Focused delivery with clear scope, implementation by one full-stack engineer, lightweight validation, and technical follow-up | Best for a focused module, MVP, backend feature, import flow, or small integration with limited uncertainty |
| Product Acceleration | USD 4,000 | 4 weeks | Scrum Master, two full-stack engineers, and one engineer focused on test automation, DevOps, observability, and deployment | More delivery capacity, test automation, DevOps, observability, deployment support, cycle demo, and delivery report | Best when faster delivery is needed or when the scope includes multiple features, APIs, integrations, or more demanding quality needs |
| Scale & Intelligence | USD 6,000 | 4 weeks | Technical lead, Scrum Master, two full-stack engineers, and one engineer focused on test automation, DevOps, observability, and deployment | Technical leadership, evolutionary architecture, automation when applicable, observability, security, and technical scale planning | Best for complex systems, advanced data workflows, automation, auditability, security, observability, or broader platform hardening |

Role responsibilities are clear: the Scrum Master organizes scope, communication, ceremonies, progress tracking, and delivery alignment; full-stack engineers implement backend, frontend, API, and database changes as needed; the test automation, DevOps, observability, and deployment engineer supports automated tests, CI/CD, monitoring, release quality, and deployment; and the Technical lead, included in the Scale & Intelligence package, owns architecture, technical decisions, code quality, and risk management for more complex projects.

Each delivery cycle is executed with Scrum-inspired practices, frequent alignment, technical review, automated testing when applicable, and a demonstration of what was delivered. The client keeps ownership of the produced code, and the scope is agreed before execution to avoid open-ended work and unclear expectations.

## Proposed work plan

I would approach the project in structured phases:

1. Technical assessment and import design

- Review the current application architecture, database schema, existing import logic, and ranking calculation rules.
- Analyze representative Excel files with different layouts.
- Define the import workflow, validation rules, duplicate detection strategy, and matching criteria.
- Confirm the acceptance criteria before implementation.

2. Excel import and validation process

- Implement or improve Excel/CSV parsing for the expected file structures.
- Normalize imported data into a controlled staging process before saving final records.
- Validate required fields, formats, competition metadata, events, swimmer data, times/results, and category information.
- Generate clear validation feedback for rows that cannot be safely imported.
- Prevent duplicate entries using deterministic rules based on competition, swimmer, event, date, result, and source data.

3. Swimmer matching and reconciliation

- Prioritize exact matching using swimmer IDs or other unique identifiers when available.
- Add name-based fuzzy matching only as a fallback.
- Use confidence levels to avoid unsafe automatic matches.
- Flag unmatched or ambiguous swimmers for manual review before final reconciliation.

4. Score and ranking calculation updates

- Review the existing point and ranking formulas.
- Implement the updated scoring criteria in a clear and testable way.
- Define when scores and rankings should be recalculated after each import.
- Recalculate only the affected rankings when possible, while preserving correctness.
- Add automated tests for scoring and ranking edge cases.

5. Testing, documentation, and handoff

- Test the import process with multiple Excel examples and edge cases.
- Add technical documentation for the import flow, matching logic, duplicate prevention, and ranking recalculation.
- Provide a handoff session or written notes so your team can maintain and extend the feature.

## Estimated timeline

For the recommended starting scope, my estimated timeline is 5 weeks after receiving repository access, database/schema information, sample Excel files, and the current scoring rules: 1 week for Discovery Sprint and 4 weeks for one Essential Delivery cycle.

A practical schedule would be:

- Week 1: Discovery Sprint, technical assessment, import design, and confirmation of rules.
- Weeks 2 and 3: Excel import, validation, duplicate prevention, and swimmer matching.
- Weeks 4 and 5: scoring/ranking updates, recalculation logic, and automated tests.
- Optional extension, only if needed: refinements, additional edge cases, broader documentation, or scope items identified during discovery.

If discovery confirms that the current assumptions are correct, one Essential Delivery cycle should be enough. If the existing codebase, Excel formats, or ranking rules are more complex than expected, the timeline and package recommendation should be adjusted before implementation starts.

## Availability and communication

I can work remotely and keep communication in English through Workana messages, scheduled calls, and written progress updates. I usually prefer short alignment checkpoints during the week, especially after reviewing the codebase and after each major implementation milestone.

This helps reduce misunderstandings and keeps the project aligned with your actual data, business rules, and operational workflow.

## Budget

Based on the current understanding, my recommended starting budget is USD 2,500: USD 500 for the one-week Discovery Sprint plus USD 2,000 for one Essential Delivery cycle, assuming:

- The platform already exists and the work is focused on improving the import, matching, scoring, and ranking logic.
- You can provide access to the codebase, database schema, and anonymized Excel samples.
- The number of Excel formats is limited and can be mapped during the first phase.
- The updated scoring criteria can be clearly defined with your input.

The Discovery Sprint will refine the scope and confirm whether one Essential Delivery cycle is sufficient. If the review shows many unknown Excel formats, major database refactoring, a new admin interface, complex historical data cleanup, or advanced scoring changes, I will recommend moving to Product Acceleration or Scale & Intelligence before implementation starts.

## Questions before final confirmation

Before confirming the final scope, I would like to clarify a few points:

1. What technology stack is the current platform using for the backend and database?
2. Can you provide anonymized examples of the Excel files, including the different structures you receive?
3. Do most competition files include a unique swimmer ID, or is name-based matching frequently required?
4. What fields should define a duplicate result: swimmer, event, competition, date, time/result, category, or another combination?
5. Do you already have documented rules for the points and ranking calculations?
6. Should valid rows be imported automatically while unmatched rows are held for review, or should the entire import wait for manual approval?
7. Is there already an admin screen for reviewing unmatched swimmers, or should this be added as part of the project?
8. Should ranking recalculation apply to all historical results or only affected competitions, seasons, age groups, or categories?
9. Does the project currently have automated tests or a staging environment?
10. Are there any deadlines related to upcoming competitions or ranking publications?

Once these points are clear, I can confirm the final delivery plan and milestones.

