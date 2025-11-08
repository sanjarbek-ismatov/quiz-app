import React, { useEffect, useMemo, useState } from 'react'
import { FiCheck, FiRotateCcw } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import sampleData from '../data/sample-data.json'

interface Question {
  id: number
  text: string
  options: string[]
  correctIndex: number
}

export default function Quiz(){
  const { subjectId, groupId } = useParams()
  const groupNum = Number(groupId || 1)
  const rawQuestions = (sampleData as any)[subjectId || 'history-econ']?.questions || []
  const start = (groupNum-1)*20
  const [shuffleKey, setShuffleKey] = useState(() => Date.now())

  // helper: Fisher-Yates shuffle (returns new array)
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

  // preprocess questions: strip leading '#' from options, infer correctIndex, then shuffle options and questions
  const groupQuestions: Question[] = useMemo(() => {
    const raw = rawQuestions.slice(start, start + 20)
    const processed = raw.map((q: any, idx: number) => {
      let inferredIndex: number | null = null
      type OptWithOrig = { text: string; origIndex: number }
      const optsWithOrig: OptWithOrig[] = (q.options || []).map((opt: string, i: number) => {
        const text = (typeof opt === 'string' && opt.trim().startsWith('#')) ? opt.replace(/^\s*#\s*/, '').trim() : opt
        if (typeof opt === 'string' && opt.trim().startsWith('#')) {
          if (inferredIndex === null) inferredIndex = i
        }
        return { text, origIndex: i }
      })

      const origCorrect = (inferredIndex !== null) ? inferredIndex : (typeof q.correctIndex === 'number' ? q.correctIndex : 0)

      // shuffle options and compute new correct index
      const shuffledOpts = shuffleArray(optsWithOrig)
  const newCorrectIndex = shuffledOpts.findIndex((o: OptWithOrig) => o.origIndex === origCorrect)

      return {
        id: start + idx + 1,
        text: q.text,
  options: shuffledOpts.map((o: OptWithOrig) => o.text),
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      } as Question
    })

    // shuffle question order
    return shuffleArray(processed)
  }, [rawQuestions, start, shuffleKey])

  const [answers, setAnswers] = useState<Record<number, number | null>>({})
  const [showModal, setShowModal] = useState(false)

  function select(qid:number, index:number){
    setAnswers(a => ({...a, [qid]: index}))
  }

  // Auto-open modal when all questions in the group have been answered
  useEffect(() => {
    const total = groupQuestions.length
    if (total > 0){
      const answered = groupQuestions.filter(q => typeof answers[q.id] === 'number').length
      if (answered === total){
        setShowModal(true)
      }
    }
  }, [answers, groupQuestions])

  function finishNow(){
    setShowModal(true)
  }

  function resetAnswers(){
    setAnswers({})
    setShowModal(false)
    // reshuffle questions and options
    setShuffleKey(Date.now())
  }

  const totals = useMemo(() => {
    let correct = 0
    let wrong = 0
    groupQuestions.forEach(q => {
      const sel = answers[q.id]
      if (typeof sel === 'number'){
        if (sel === q.correctIndex) correct++
        else wrong++
      }
    })
    return { correct, wrong, total: groupQuestions.length }
  }, [answers, groupQuestions])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{subjectId}</h1>
        <div className="text-sm text-gray-600">Group {groupId}</div>
      </div>

      <div className="space-y-4">
        {groupQuestions.map((q, qIndex) => {
          const selected = answers[q.id]
          const displayNumber = qIndex + 1
          return (
            <div key={q.id} className="card p-4 bg-white">
              <div className="font-medium mb-2">{displayNumber}. {q.text}</div>
              <div className="grid gap-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i
                  const isCorrect = q.correctIndex === i
                  let styleBg = 'bg-white'
                  let borderClass = 'border-gray-200'

                  if (selected == null) {
                    styleBg = 'bg-white hover:bg-gray-50'
                    borderClass = 'border-gray-200'
                  } else {
                    if (isSelected && isCorrect) {
                      styleBg = 'bg-green-200'
                      borderClass = 'border-green-600'
                    } else if (isSelected && !isCorrect) {
                      styleBg = 'bg-red-200'
                      borderClass = 'border-red-600'
                    } else if (!isSelected && isCorrect && selected !== q.correctIndex) {
                      styleBg = 'bg-gray-200'
                      borderClass = 'border-gray-500'
                    } else {
                      styleBg = 'bg-white'
                      borderClass = 'border-gray-200'
                    }
                  }

                  const disabled = selected != null

                  return (
                    <button
                      key={i}
                      onClick={() => select(q.id, i)}
                      disabled={disabled}
                      className={`${styleBg} ${borderClass} option-btn rounded border flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-95' : 'hover:shadow-sm'}`}>
                      <span className="w-6 text-sm text-gray-700">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={finishNow} className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 pop focus-ring"><FiCheck /> Finish</button>
          <button onClick={resetAnswers} className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded flex items-center gap-2 pop focus-ring"><FiRotateCcw /> Reset</button>
        </div>
        <div className="ml-auto text-sm text-gray-600">Answered: {Object.keys(answers).filter(k => answers[Number(k)] != null).length}/{groupQuestions.length}</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="modal-card bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="mb-2">Correct: <span className="font-medium">{totals.correct}</span></p>
            <p className="mb-4">Wrong: <span className="font-medium">{totals.wrong}</span></p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
              <button onClick={resetAnswers} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
