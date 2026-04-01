/**
 * Dynamic data loader for subject questions
 * Loads question data from individual JSON files per subject
 */

export interface QuestionsData {
  questions: Array<{
    text: string
    options: string[]
  }>
}

// Strip [cite: N] and similar citation tags from text
function stripCitationTags(s: string): string {
  return s.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').replace(/\s*\[cite_start\]\s*/gi, ' ').trim()
}

/**
 * Load questions for a specific subject
 * Dynamically imports the JSON file based on subjectId
 */
export async function loadSubjectData(subjectId: string): Promise<QuestionsData | null> {
  try {
    // We use a manual map for dynamic imports to ensure Vite can track them correctly
    // while still keeping the loading logic centralized
    const modules = import.meta.glob('../data/subjects/*.json');
    const path = `../data/subjects/${subjectId}.json`;

    if (!(path in modules)) {
      console.warn(`Subject data file not found: ${path}`);
      return null;
    }

    const data = await modules[path]() as any;

    if (!data || !data.questions) {
      console.warn(`Subject data invalid for: ${subjectId}`)
      return null
    }

    // Strip [cite: N] and [cite_start] artifacts from questions for display
    const sanitized = {
      questions: data.questions.map((q: any) => ({
        ...q,
        text: stripCitationTags(q.text || ''),
        options: (q.options || []).map((opt: string) =>
          typeof opt === 'string' ? stripCitationTags(opt) : opt
        ),
      })),
    }
    return sanitized
  } catch (error) {
    console.error(`Error loading subject data for ${subjectId}:`, error)
    return null
  }
}

/**
 * Get questions from loaded data
 * Falls back to empty array if data is not available
 */
export function getQuestionsFromData(data: QuestionsData | null): any[] {
  return data?.questions || []
}
