/**
 * Custom hook for accessing subjects and subject data
 * This provides a single point of access for subject information across the app
 */

import { useMemo } from 'react'
import { SUBJECTS, SubjectConfig, getSubject } from '../config/subjects'

export function useSubjects() {
  return useMemo(() => SUBJECTS, [])
}

export function useSubject(id?: string): SubjectConfig | undefined {
  return useMemo(() => {
    if (!id) return undefined
    return getSubject(id)
  }, [id])
}
