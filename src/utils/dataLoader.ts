/**
 * Dynamic data loader for subject questions
 * Loads question data from individual JSON files per subject
 */

export interface QuestionData {
  text: string
  options: string[]
  correctIndex: number
}

export interface QuestionsData {
  questions: QuestionData[]
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
    // Also detect and strip the '#' marker for the correct answer
    const sanitized: QuestionsData = {
      questions: data.questions.map((q: any) => {
        let correctIndex = typeof q.correctIndex === 'number' ? q.correctIndex : 0;

        const options = (q.options || []).map((opt: string, idx: number) => {
          if (typeof opt !== 'string') return opt;

          let text = opt.trim();
          if (text.startsWith('#')) {
            text = text.substring(1).trim();
            correctIndex = idx;
          }
          return stripCitationTags(text);
        });

        return {
          text: stripCitationTags(q.text || ''),
          options,
          correctIndex
        };
      }),
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
export function getQuestionsFromData(data: QuestionsData | null): QuestionData[] {
  return data?.questions || []
}
