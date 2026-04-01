/**
 * Custom hook for accessing subjects and subject data
 * This provides a single point of access for subject information across the app
 */

import { useMemo, useState, useEffect } from 'react'
import { SUBJECTS, SubjectConfig, getSubject } from '../config/subjects'
import { loadSubjectData } from '../utils/dataLoader'

export interface SubjectWithStats extends SubjectConfig {
  questionsCount: number
  groupsCount: number
}

export function useSubjects() {
  const [subjectsWithStats, setSubjectsWithStats] = useState<SubjectWithStats[]>(
    SUBJECTS.map(s => ({ ...s, questionsCount: 0, groupsCount: 0 }))
  )

  useEffect(() => {
    async function fetchStats() {
      const updated = await Promise.all(
        SUBJECTS.map(async (subject) => {
          const data = await loadSubjectData(subject.id)
          const questionsCount = data?.questions.length || 0
          const groupsCount = Math.ceil(questionsCount / 25)
          return { ...subject, questionsCount, groupsCount }
        })
      )
      setSubjectsWithStats(updated)
    }
    fetchStats()
  }, [])

  return subjectsWithStats
}

export function useSubject(id?: string) {
  const [subjectWithStats, setSubjectWithStats] = useState<SubjectWithStats | null>(null)
  const config = useMemo(() => (id ? getSubject(id) : undefined), [id])

  useEffect(() => {
    async function fetchStats() {
      if (id && config) {
        const data = await loadSubjectData(id)
        const questionsCount = data?.questions.length || 0
        const groupsCount = Math.ceil(questionsCount / 25)
        setSubjectWithStats({ ...config, questionsCount, groupsCount })
      }
    }
    fetchStats()
  }, [id, config])

  return subjectWithStats
}
