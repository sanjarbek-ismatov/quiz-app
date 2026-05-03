/**
 * Subject Configuration
 * 
 * Define all available subjects here. This is the source of truth
 * for UI metadata like name, description, icon, and color.
 * The question and group counts are now statically defined for performance.
 * 
 * See ADDING_SUBJECTS.md for detailed instructions.
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
    id: 'study-of-religions-part1',
    name: 'Study of Religions (part 1)',
    description: 'Explore world religions, belief systems, and religious studies - Part 1',
    icon: 'brain',
    color: 'from-indigo-500 to-violet-500',
    questionsCount: 103,
    groupsCount: 5,
  },
  {
    id: 'study-of-religions-part2',
    name: 'Study of Religions (part 2)',
    description: 'Explore world religions, belief systems, and religious studies - Part 2',
    icon: 'brain',
    color: 'from-blue-500 to-cyan-500',
    questionsCount: 104,
    groupsCount: 5,
  },
  {
    id: 'study-of-religions-part3',
    name: 'Study of Religions (part 3)',
    description: 'Explore world religions, belief systems, and religious studies - Part 3',
    icon: 'brain',
    color: 'from-purple-500 to-pink-500',
    questionsCount: 130,
    groupsCount: 6,
  },
  {
    id: 'russian-vocabulary',
    name: 'Russian Vocabulary',
    description: 'Basic words and phrases in Russian',
    icon: 'brain',
    color: 'from-blue-500 to-red-500',
    questionsCount: 100,
    groupsCount: 4,
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
 * Format subject name for display
 */
export function formatSubjectName(id: string): string {
  const subject = getSubject(id)
  return subject?.name || id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
