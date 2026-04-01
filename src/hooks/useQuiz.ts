import { useState, useEffect, useMemo } from 'react'
import { loadSubjectData, QuestionData } from '../utils/dataLoader'

export interface Question {
  id: number
  text: string
  options: string[]
  correctIndex: number
}

// Fisher-Yates shuffle (returns new array)
function shuffleArray<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

export function useQuiz(subjectId: string | undefined, groupId: string | undefined) {
  const groupNum = Number(groupId || 1)
  const [rawQuestions, setRawQuestions] = useState<QuestionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [shuffleKey, setShuffleKey] = useState(() => Date.now())
  const [answers, setAnswers] = useState<Record<number, number | null>>({})
  const [showModal, setShowModal] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const start = (groupNum - 1) * 25

  // Load subject data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const data = await loadSubjectData(subjectId || 'study-of-religions-part1')
      setRawQuestions(data?.questions || [])
      setIsLoading(false)
    }
    loadData()
  }, [subjectId])

  // Process questions for the current group
  const groupQuestions: Question[] = useMemo(() => {
    const raw = rawQuestions.slice(start, start + 25)
    const processed = raw.map((q: QuestionData, idx: number) => {
      type OptWithOrig = { text: string; origIndex: number }

      const optsWithOrig: OptWithOrig[] = (q.options || []).map((text: string, i: number) => ({
        text,
        origIndex: i
      }))

      const shuffledOpts = shuffleArray(optsWithOrig)
      const lastIdx = Math.max(0, (q.options?.length ?? 1) - 1)
      const origCorrect = Math.min(Math.max(0, q.correctIndex), lastIdx)
      const newCorrectIndex = shuffledOpts.findIndex((o: OptWithOrig) => o.origIndex === origCorrect)

      return {
        id: start + idx + 1,
        text: q.text,
        options: shuffledOpts.map((o: OptWithOrig) => o.text),
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      } as Question
    })

    return shuffleArray(processed)
  }, [rawQuestions, start, shuffleKey])

  // Reset progress when group changes
  useEffect(() => {
    setAnswers({})
    setShowModal(false)
    setCurrentQuestion(0)
    setShuffleKey(Date.now())
  }, [groupId])

  // Auto-open modal when all questions are answered
  useEffect(() => {
    const total = groupQuestions.length
    if (total > 0) {
      const answered = groupQuestions.filter(q => typeof answers[q.id] === 'number').length
      if (answered === total) {
        setShowModal(true)
      }
    }
  }, [answers, groupQuestions])

  const selectAnswer = (qid: number, index: number) => {
    setAnswers(a => ({ ...a, [qid]: index }))
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowModal(false)
    setCurrentQuestion(0)
    setShuffleKey(Date.now())
  }

  const totals = useMemo(() => {
    let correct = 0
    let wrong = 0
    groupQuestions.forEach(q => {
      const sel = answers[q.id]
      if (typeof sel === 'number') {
        if (sel === q.correctIndex) correct++
        else wrong++
      }
    })
    return { correct, wrong, total: groupQuestions.length }
  }, [answers, groupQuestions])

  const progressPercent = groupQuestions.length > 0
    ? Math.round((Object.keys(answers).filter(k => answers[Number(k)] != null).length / groupQuestions.length) * 100)
    : 0

  return {
    groupQuestions,
    isLoading,
    answers,
    showModal,
    setShowModal,
    currentQuestion,
    setCurrentQuestion,
    selectAnswer,
    resetQuiz,
    totals,
    progressPercent,
    rawQuestionsCount: rawQuestions.length
  }
}
