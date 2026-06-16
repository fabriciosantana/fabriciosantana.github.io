# Repository Instructions

## Proposal Work

When working on freelance/client proposals, always read and follow:

- `opportunities/proposal-methodology.md`

That file is the source of truth for proposal positioning, structure, Discovery Sprint framing, delivery packages, budget logic, warranty language, questions, and output files.

For each new opportunity, prefer this structure:

```text
opportunities/<platform-or-client>-<short-topic>/
  opportunity-and-analysis.md
  proposal.tex
  proposal.pdf
```

Proposal workflow:

1. Analyze the opportunity and identify the real engineering problem behind the client request.
2. Create or update `opportunity-and-analysis.md`.
3. Create the final proposal in LaTeX when requested.
4. Compile with `latexmk -pdf proposal.tex`.
5. Clean auxiliary LaTeX files with `latexmk -c`.

Keep the commercial methodology consistent with the site offer:

- Start with the Discovery Sprint.
- Recommend one of the fixed 4-week delivery packages.
- Use clear assumptions, risks, acceptance criteria, and questions.
- Avoid generic freelancer language and overpromising.
- Emphasize predictable delivery, technical rigor, client ownership of code, testing, deployment support, and handoff.
