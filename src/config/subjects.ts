/**
 * Subject Configuration
 * 
 * Define all available subjects here. This is the source of truth
 * for UI metadata like name, description, icon, and color.
 * The question and group counts are now dynamically calculated.
 * 
 * See ADDING_SUBJECTS.md for detailed instructions.
 */

export interface SubjectConfig {
  id: string
  name: string
  description: string
  icon: 'book' | 'zap' | 'award' | 'globe' | 'brain' | 'target'
  color: string
}

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'academic-writing',
    name: 'Academic Writing',
    description: 'Master the essentials of academic writing and composition',
    icon: 'book',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    description: 'Test your IT knowledge across all major domains',
    icon: 'zap',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'economic-theories',
    name: 'Economic Theories',
    description: 'Understand fundamental economic principles and theories',
    icon: 'award',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Master programming concepts and C++ fundamentals',
    icon: 'target',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'history-uzbekistan',
    name: 'History of Uzbekistan',
    description: 'Learn the history and development of Uzbekistan',
    icon: 'globe',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'study-of-religions',
    name: 'Study of Religions',
    description: 'Explore world religions, belief systems, and religious studies',
    icon: 'brain',
    color: 'from-indigo-500 to-violet-500',
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
