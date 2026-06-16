# Workana Proposal

## Proposal to submit in English

Hello,

My name is Fabricio Santana. I am a software engineer and technical lead with 20+ years of experience in backend development, software architecture, database integration, automated testing, cloud computing, and delivery of critical systems. I have also led large engineering teams and worked on projects where data consistency, business rules, validation, security, and maintainability are essential.

Your project is a strong match for my background because the main challenge is not only importing Excel files. The important part is building a reliable data import workflow that protects the integrity of swimmer profiles, competition results, scores, and rankings.

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

My estimated timeline is 4 to 6 weeks after receiving repository access, database/schema information, sample Excel files, and the current scoring rules.

A practical schedule would be:

- Week 1: technical assessment, import design, and confirmation of rules.
- Weeks 2 and 3: Excel import, validation, duplicate prevention, and swimmer matching.
- Weeks 4 and 5: scoring/ranking updates, recalculation logic, and automated tests.
- Week 6, if needed: refinements, documentation, edge cases, and final handoff.

If the existing codebase is well organized and the scoring rules are already clear, this may be completed closer to 4 weeks.

## Availability and communication

I can work remotely and keep communication in English through Workana messages, scheduled calls, and written progress updates. I usually prefer short alignment checkpoints during the week, especially after reviewing the codebase and after each major implementation milestone.

This helps reduce misunderstandings and keeps the project aligned with your actual data, business rules, and operational workflow.

## Budget

For the complete scope described, my estimated budget is USD 4,500, assuming:

- The platform already exists and the work is focused on improving the import, matching, scoring, and ranking logic.
- You can provide access to the codebase, database schema, and anonymized Excel samples.
- The number of Excel formats is limited and can be mapped during the first phase.
- The updated scoring criteria can be clearly defined with your input.

If the project includes many unknown Excel formats, major database refactoring, a new admin interface, or cleanup of a large volume of historical data, I would recommend splitting the work into a paid discovery phase first and then confirming the final implementation budget.

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

