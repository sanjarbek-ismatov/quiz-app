/**
 * Custom hook for accessing subjects and subject data
 */

import { useMemo } from 'react'
import { SUBJECTS, SubjectConfig, getSubject } from '../config/subjects'

export type SubjectWithStats = SubjectConfig

export function useSubjects() {
  return SUBJECTS
}

export function useSubject(id?: string) {
  const config = useMemo(() => (id ? getSubject(id) : undefined), [id])
  return config || null
}
