/**
 * Dynamic data loader for subject questions
 * Loads question data from individual JSON files per subject
 */

// Import all subject data
import academicWriting from '../data/subjects/academic-writing.json'
import informationTechnology from '../data/subjects/information-technology.json'
import economicTheories from '../data/subjects/economic-theories.json'
import programming from '../data/subjects/programming.json'
import historyUzbekistan from '../data/subjects/history-uzbekistan.json'

interface QuestionsData {
  questions: Array<{
    text: string
    options: string[]
  }>
}

// Strip [cite: N] and similar citation tags from text
function stripCitationTags(s: string): string {
  return s.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').trim()
}

// Map subject IDs to their data
const subjectDataMap: Record<string, QuestionsData> = {
  'academic-writing': academicWriting,
  'information-technology': informationTechnology,
  'economic-theories': economicTheories,
  'programming': programming,
  'history-uzbekistan': historyUzbekistan,
}

/**
 * Load questions for a specific subject
 * Each subject has its own JSON file in src/data/subjects/
 */
export async function loadSubjectData(subjectId: string): Promise<QuestionsData | null> {
  try {
    const data = subjectDataMap[subjectId]
    if (!data) {
      console.warn(`Subject data not found for: ${subjectId}`)
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
