---
id: 018
title: Generate Database Research
stage: misc
date: 2026-01-07
surface: CLI
model: gemini-1.5-flash
feature: 06-database
branch: master
user: pc
command: "@specs\01-overview\** read this and create research file @.claude/commands/sp.reverse-engineer.md"
labels: [research, 06-database]
links:
  spec: specs/06-database/spec.md
  plan: specs/06-database/plan.md
  research: specs/06-database/research.md
tests: {}
---

## Prompt

@specs\01-overview\** read this and create research file @.claude/commands/sp.reverse-engineer.md

## Response snapshot

The agent read the `specs/06-database/plan.md` file and identified two "NEEDS CLARIFICATION" items: "Performance Goals" and "Scale/Scope". Based on these, the agent generated a `research.md` file for the `06-database` feature.

**Summary of research.md**:
-   **Topic**: Performance Goals for Database
    -   **Assumed Decision**: Task retrieval queries should have a latency of less than 50ms. The database should support 100 concurrent connections and handle 500 transactions per second.
-   **Topic**: Scale and Scope for Database
    -   **Assumed Decision**: The system should support 100,000 users, handle 10 million tasks, and the total data volume should not exceed 1TB.

## Outcome

- ✅ Impact: Successfully generated `specs/06-database/research.md` to resolve "NEEDS CLARIFICATION" items in the plan.
- 🧪 Tests: No tests were run as part of this action.
- 📁 Files: Created `specs/06-database/research.md`.
- 🔁 Next prompts: Continue processing other spec files for research.
- 🧠 Reflection: The agent successfully inferred the purpose of the research file and generated content based on the `plan.md`'s "NEEDS CLARIFICATION" sections.
