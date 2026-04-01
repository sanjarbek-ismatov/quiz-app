/**
 * Subject Configuration
 * 
 * Define only the metadata here. Question counts and groups
 * will be calculated dynamically on the fly.
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
    id: 'study-of-religions-part1',
    name: 'Study of Religions (part 1)',
    description: 'Explore world religions, belief systems, and religious studies - Part 1',
    icon: 'brain',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'study-of-religions-part2',
    name: 'Study of Religions (part 2)',
    description: 'Explore world religions, belief systems, and religious studies - Part 2',
    icon: 'brain',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'study-of-religions-part3',
    name: 'Study of Religions (part 3)',
    description: 'Explore world religions, belief systems, and religious studies - Part 3',
    icon: 'brain',
    color: 'from-purple-500 to-pink-500',
  },
]

export function getSubject(id: string): SubjectConfig | undefined {
  return SUBJECTS.find(s => s.id === id)
}
