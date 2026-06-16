# Workana Opportunity: Swimming Performance Platform

## Original opportunity

We are seeking an experienced developer to improve our existing swimming performance platform. This platform currently tracks swimmer data, rankings, points, and competition results. The primary goal of this project is to enhance the data import process for competition results and refine the scoring and ranking calculation logic.

Scope of Work:

1. Excel Data Import System Development: We receive competition results in Excel format and require a robust import process. This process must be capable of:
- Reading competition data accurately from various Excel file structures.
- Mapping imported records to existing swimmer profiles within our database.
- Implementing mechanisms to prevent duplicate record entries.
- Validating all imported data to ensure integrity before saving to the database.

2. Swimmer Data Matching Enhancement: The system needs to intelligently associate newly imported results with existing swimmer profiles. This includes:
- Prioritizing matching swimmers by unique identifiers, such as Swimmer ID, when available.
- Developing fuzzy matching logic for swimmer names when unique IDs are absent or incomplete.
- Implementing a flagging system to identify and isolate unmatched swimmers for manual review and reconciliation.

3. Score Calculation Logic Update: Our platform features an established points and ranking system that requires refinement and updates. The selected freelancer will be responsible for:
- Updating and optimizing performance points calculations based on new criteria or improved algorithms.
- Refining overall ranking calculations to ensure accuracy and fairness.
- Establishing clear rules for score updates following each new competition import.
- Ensuring automatic recalculation of all affected rankings and scores after data imports.

Required experience:
- Excel/CSV data import systems.
- Advanced data mapping, validation, and synchronization.
- Complex database updates and data consistency.
- Ranking or scoring systems.
- Web application back-end development.

Deliverables:
- Fully functional and tested Excel import process.
- Reliable and accurate swimmer matching mechanism.
- Updated, tested, and documented score calculation logic.

## Fit with Fabricio Santana's positioning

This opportunity is a strong fit for the software development offer described in `site/src/projects` because it is not just a small bug fix. It combines backend engineering, database consistency, data import, validation, business rules, automated tests, and technical documentation.

Relevant strengths to emphasize:

- 20+ years in software engineering, technical leadership, architecture, cloud computing, and AI.
- Experience leading complex and mission-critical systems.
- Ability to coordinate business and technical requirements.
- Backend, REST APIs, database integration, security, testing, CI/CD, observability, and maintainable architecture.
- Experience with Java, Spring Boot, SQL, PostgreSQL, Oracle, automated testing, Git, Docker, and agile delivery.
- Commercial positioning around clear scope, fixed milestones, frequent alignment, testing, technical review, demos, and client ownership of the code.

## Opportunity assessment

The client is likely facing data quality and consistency problems caused by variable Excel formats, incomplete swimmer identifiers, duplicate imports, and ranking recalculation side effects. The highest-risk part is not reading Excel files itself, but defining a repeatable import workflow with validation, auditability, idempotency, and manual review for ambiguous matches.

The proposal should avoid sounding like a generic "I can do it" message. It should show that the import process must be treated as a controlled data pipeline:

- File parsing and template detection.
- Staging table or temporary import area before writing production records.
- Validation report before commit.
- Matching by deterministic keys first.
- Fuzzy matching only as a fallback.
- Confidence scores and manual review queue for uncertain matches.
- Duplicate detection based on competition, swimmer, event, date, time/result, and source row.
- Transactional save and rollback strategy.
- Ranking recalculation based on clearly documented rules.
- Automated tests with representative Excel files and edge cases.

## Recommended commercial framing

Given the uncertainty about the existing platform stack and current scoring rules, the safest Workana approach is to propose a short diagnostic/discovery step first, followed by implementation once the codebase, database schema, Excel examples, and ranking rules are reviewed.

Suggested structure:

- Phase 1: Technical assessment and implementation plan, 3 to 5 business days.
- Phase 2: Import and matching implementation, 2 to 3 weeks.
- Phase 3: scoring/ranking recalculation, tests, documentation, and handoff, 1 to 2 weeks.

Suggested estimate:

- Full implementation estimate: 4 to 6 weeks after access to repository, database schema, and sample Excel files.
- Budget range: USD 3,500 to USD 6,000, depending on platform complexity, number of Excel formats, existing test coverage, and ranking-rule complexity.
- If Workana requires a single number before discovery, a pragmatic initial bid is USD 4,500 for a well-scoped first phase covering import, matching, recalculation, tests, and documentation, with assumptions stated clearly.

## Key questions before final commitment

- What technology stack is the current platform using?
- Which database is used?
- Can the client share anonymized Excel files with different structures?
- Are swimmer IDs always available in some competitions, or are they often missing?
- What are the current ranking and points rules?
- Should imports be reviewed before saving, or should valid rows be saved automatically?
- Does the platform already have test coverage?
- Is there an admin interface where unmatched swimmers should be reviewed?
- Are historical results already imported, and do they need cleanup or deduplication?
- Should the ranking recalculation affect all historical data or only affected competitions/seasons/categories?

