# Repository Instructions

## Proposal Work

When working on freelance/client proposals, always read and follow:

- `opportunities/proposal-methodology.md`

That file is the source of truth for proposal positioning, structure, Discovery Sprint framing, delivery packages, budget logic, warranty language, questions, and output files.

For each new opportunity, prefer this structure:

```text
opportunities/<platform-or-client>-<short-topic>/
  qualification.md
  opportunity-and-analysis.md
  bid-message.md
  proposal.tex
  proposal.pdf
```

Proposal workflow:

1. Qualify the opportunity before writing a full proposal.
2. Decide whether to `pursue`, `pursue discovery only`, or `skip`.
3. Analyze the opportunity and identify the real engineering problem behind the client request.
4. Create or update `opportunity-and-analysis.md`.
5. Create `bid-message.md` for the platform message when useful.
6. Create the final proposal in LaTeX when requested.
7. Compile with `latexmk -pdf proposal.tex`.
8. Clean auxiliary LaTeX files with `latexmk -c`.

Keep the commercial methodology consistent with the site offer:

- Start with the Discovery Sprint.
- Recommend one of the fixed 4-week delivery packages.
- Use clear assumptions, risks, acceptance criteria, and questions.
- Make the Discovery Sprint feel like a concrete deliverable, not paid conversation.
- Add buyer-intent questions when appropriate.
- Avoid generic freelancer language and overpromising.
- Emphasize predictable delivery, technical rigor, client ownership of code, testing, deployment support, and handoff.
