/**
 * Subject Configuration
 * 
 * Define all available subjects here. This is the single source of truth
 * for subject metadata. Adding a new subject is as simple as adding an
 * entry here and the corresponding questions to sample-data.json
 */

export interface SubjectConfig {
  id: string
  name: string
  description: string
  icon: 'book' | 'zap' | 'award' | 'globe' | 'brain' | 'target'
  color: string
  questionsCount: number
  groupsCount: number
}

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'academic-writing',
    name: 'Academic Writing',
    description: 'Master the essentials of academic writing and composition',
    icon: 'book',
    color: 'from-blue-500 to-cyan-500',
    questionsCount: 200,
    groupsCount: 8,
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    description: 'Test your IT knowledge across all major domains',
    icon: 'zap',
    color: 'from-purple-500 to-pink-500',
    questionsCount: 131,
    groupsCount: 6,
  },
  {
    id: 'economic-theories',
    name: 'Economic Theories',
    description: 'Understand fundamental economic principles and theories',
    icon: 'award',
    color: 'from-orange-500 to-red-500',
    questionsCount: 126,
    groupsCount: 6,
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Master programming concepts and C++ fundamentals',
    icon: 'target',
    color: 'from-green-500 to-emerald-500',
    questionsCount: 146,
    groupsCount: 6,
  },
]

/**
 * Get a subject by ID
 */
export function getSubject(id: string): SubjectConfig | undefined {
  return SUBJECTS.find(s => s.id === id)
}

/**
 * Get all subject IDs
 */
export function getSubjectIds(): string[] {
  return SUBJECTS.map(s => s.id)
}

/**
 * Format subject name for display (e.g., 'academic-writing' -> 'Academic Writing')
 */
export function formatSubjectName(id: string): string {
  const subject = getSubject(id)
  return subject?.name || id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
