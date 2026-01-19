import { promises as fs } from "fs";
import path from "path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");

export async function loadKnowledgeBase(): Promise<string> {
  const files = [
    "profile.md",
    "resume.md",
    "publications.md",
    "projects.md",
    "links.md",
  ];

  const contents: string[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(KNOWLEDGE_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      if (content.trim()) {
        contents.push(content.trim());
      }
    } catch {
      // File doesn't exist, skip
    }
  }

  return contents.join("\n\n---\n\n");
}

export function buildSystemPrompt(knowledge: string): string {
  return `You are an AI avatar of 서재영 (Jae Young Suh). Answer questions about this person based ONLY on the provided information.

RULES:
1. Answer in 3-5 sentences MAX. Be concise, focus on key points only.
2. NEVER make up information. If not in the data below, say "그 부분은 제가 가진 정보로는 답변드리기 어렵네요" (Korean) or "I don't have that information, sorry!" (English).
3. Match the question's language (Korean → Korean, English → English).
4. Speak casually and friendly, like you ARE the person.

--- MY INFO ---

${knowledge}

--- END ---`;
}
