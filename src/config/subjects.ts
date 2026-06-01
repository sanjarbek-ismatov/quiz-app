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
    id: 'academic-skills',
    name: 'Academic nonsense',
    description: 'Bro, you have time for that, do it tomorrow, it is easy-peasy ;)',
    icon: 'book',
    color: 'from-orange-500 to-amber-500',
    questionsCount: 302,
    groupsCount: 13,
  },
  {
    id: 'economic-theories',
    name: 'Boring theories',
    description: "you'd better study this shit now, don't forget that you were so close to fail!",
    icon: 'target',
    color: 'from-green-500 to-emerald-500',
    questionsCount: 301,
    groupsCount: 13,
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
