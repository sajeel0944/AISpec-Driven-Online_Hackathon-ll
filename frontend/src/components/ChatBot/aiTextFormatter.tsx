import { FormattedBlock } from "@/types/chatbot.types";

export function formatAIText(rawText: string): FormattedBlock[] {
  if (rawText === null || rawText === undefined) return [];

  const lines = rawText.split("\n");

  const blocks: FormattedBlock[] = [];
  let currentList: string[] = [];
  let currentTask: FormattedBlock | null = null;

  const pushListIfAny = () => {
    if (currentList.length) {
      blocks.push({ type: "list", items: [...currentList] });
      currentList = [];
    }
  };

  for (const line of lines) {
    const safeLine = line.trim();

    // Normalize common markdown artifacts so they don't appear raw in output
    //  - convert markdown headings like "## Heading"
    //  - remove bold/asterisk wrappers like "**text**"
    // We keep the original `safeLine` for list/dash detection below when needed.
    const noBold = safeLine.replace(/\*\*/g, "").trim();

    // 0️⃣ Markdown heading like '# Heading' or '## **Heading**'
    const headingMatch = safeLine.match(/^\s*#{1,6}\s*(.*)$/);
    if (headingMatch) {
      pushListIfAny();
      const headingText = headingMatch[1].replace(/\*\*/g, "").trim();
      blocks.push({ type: "heading", text: headingText });
      continue;
    }

    // 1️⃣ Headings
    if (noBold === "Your Pending Tasks" || noBold.startsWith("Here are")) {
      pushListIfAny();
      blocks.push({ type: "heading", text: noBold });
      continue;
    }

    // 2️⃣ Numbered task start: 1. **Task ID: xxxx**
    // allow optional bold markers around 'Task ID' (e.g. '1. **Task ID:')
    if (/^\d+\.\s*\*{0,2}Task ID:/i.test(noBold)) {
      pushListIfAny();

      currentTask = {
        type: "task",
        title: safeLine
          .replace(/^\d+\.\s*/g, "")
          .replace(/\*\*/g, ""),
        fields: [],
      };

      blocks.push(currentTask);
      continue;
    }

    // 3️⃣ Field like **Subject:** value  (NO DASH)
    if (/^\*{0,2}.+?\*{0,2}:/i.test(safeLine) && currentTask) {
      const cleaned = safeLine.replace(/\*\*/g, "");
      const [label, ...rest] = cleaned.split(":");

      currentTask.fields.push({
        label: label.trim(),
        value: rest.join(":").trim(),
      });
      continue;
    }

    // 4️⃣ Dash list (still supported)
    if (safeLine.startsWith("-")) {
      const cleaned = safeLine.replace(/^-\s*/, "");

      if (cleaned.includes(":" ) && currentTask) {
        const [label, ...rest] = cleaned.split(":");
        currentTask.fields.push({
          label: label.replace(/\*\*/g, "").trim(),
          value: rest.join(":").trim(),
        });
      } else {
        currentList.push(cleaned.replace(/\*\*/g, ""));
      }
      continue;
    }

    // 5️⃣ Everything else (dates, AM/PM, random text)
    pushListIfAny();
    // strip common markdown wrappers from paragraphs so raw tokens don't show
    const paraText = safeLine.replace(/\*\*/g, "").replace(/`/g, "").trim();
    blocks.push({
      type: "paragraph",
      text: paraText,
    });
  }

  pushListIfAny();
  return blocks;
}