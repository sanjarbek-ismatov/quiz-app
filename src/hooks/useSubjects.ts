import { useState, useEffect } from 'react'
import { SUBJECTS, SubjectConfig } from '../config/subjects'
import { loadSubjectData } from '../utils/dataLoader'

export interface SubjectWithStats extends SubjectConfig {
  questionsCount: number
  groupsCount: number
}

export function useSubjects() {
  const [subjectsWithStats, setSubjectsWithStats] = useState<SubjectWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAllStats() {
      const results = await Promise.all(
        SUBJECTS.map(async (s) => {
          const data = await loadSubjectData(s.id)
          const questionsCount = data?.questions.length || 0
          return {
            ...s,
            questionsCount,
            groupsCount: Math.ceil(questionsCount / 25)
          }
        })
      )
      setSubjectsWithStats(results)
      setIsLoading(false)
    }
    fetchAllStats()
  }, [])

  return { subjects: subjectsWithStats, isLoading }
}

export function useSubject(id?: string) {
  const [subject, setSubject] = useState<SubjectWithStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      if (!id) return
      const config = SUBJECTS.find(s => s.id === id)
      if (!config) {
        setSubject(null)
        setIsLoading(false)
        return
      }
      const data = await loadSubjectData(id)
      const questionsCount = data?.questions.length || 0
      setSubject({
        ...config,
        questionsCount,
        groupsCount: Math.ceil(questionsCount / 25)
      })
      setIsLoading(false)
    }
    fetchStats()
  }, [id])

  return { subject, isLoading }
}
