import React, { useEffect, useMemo, useState } from 'react'
import { FiCheck, FiRotateCcw, FiArrowLeft, FiAlertCircle, FiChevronRight } from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { loadSubjectData } from '../utils/dataLoader'

interface Question {
  id: number
  text: string
  options: string[]
  correctIndex: number
}

export default function Quiz(){
  const { subjectId, groupId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const groupNum = Number(groupId || 1)
  const [rawQuestions, setRawQuestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const start = (groupNum-1)*25
  const [shuffleKey, setShuffleKey] = useState(() => Date.now())

  // Load subject data dynamically
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const data = await loadSubjectData(subjectId || 'academic-writing')
      setRawQuestions(data?.questions || [])
      setIsLoading(false)
    }
    loadData()
  }, [subjectId])

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
    const raw = rawQuestions.slice(start, start + 25)
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
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // Reset progress when navigating to a different group
  useEffect(() => {
    setAnswers({})
    setShowModal(false)
    setCurrentQuestion(0)
    setShuffleKey(Date.now())
  }, [groupId])

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
    setCurrentQuestion(0)
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

  const progressPercent = groupQuestions.length > 0 
    ? Math.round((Object.keys(answers).filter(k => answers[Number(k)] != null).length / groupQuestions.length) * 100)
    : 0

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 fade-in">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-primary-600"></div>
          </div>
          <p className="text-gray-600 font-medium">{t.loadingQuestions}...</p>
        </div>
      </div>
    )
  }

  // Show error if no questions found
  if (groupQuestions.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12 fade-in">
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.errorLoading}</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          {t.goBack}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Progress Bar */}
      <div className="sticky top-20 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm mt-4 sm:mt-6">
        <div className="app-container space-y-2 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Progress</label>
            <span className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-500 dark:to-primary-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full app-container py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 pb-24 sm:pb-20 fade-in">
        {/* Header with back button */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
              aria-label="Go back"
            >
              <FiArrowLeft className="text-xl sm:text-2xl text-gray-600" aria-hidden="true" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 truncate dark:text-white">
                {subjectId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 my-1">Group {groupId} • {groupQuestions.length} {t.question}</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="w-full space-y-2 sm:space-y-3 md:space-y-4 pb-24 sm:pb-16 px-0">
        {groupQuestions.map((q, qIndex) => {
          const selected = answers[q.id]
          const displayNumber = qIndex + 1
          const isAnswered = selected !== null && selected !== undefined
          
          return (
            <div key={q.id} className="card mx-0 p-2 sm:p-3 md:p-5 scroll-mt-24 sm:scroll-mt-28">
              {/* Question header */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex-1">
                  <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">{displayNumber}.</span>
                  {q.text}
                </h2>
                {isAnswered && (
                  <div className={`flex-shrink-0 flex items-center gap-2 px-3 py-1 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap ${
                    selected === q.correctIndex 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {selected === q.correctIndex ? 'Correct' : 'Wrong'}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 sm:space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i
                  const isCorrect = q.correctIndex === i
                  const hasAnswered = typeof selected === 'number' // user has selected an answer
                  const answeredWrong = hasAnswered && selected !== q.correctIndex // user answered the question incorrectly
                  const wasWrong = isSelected && !isCorrect // this specific option was selected and is wrong
                  
                  let bgClass = 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
                  let hoverClass = 'hover:shadow-md'
                  
                  if (hasAnswered) {
                    hoverClass = ''
                    if (isSelected && isCorrect) {
                      // User selected the correct answer - green
                      bgClass = 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600'
                    } else if (wasWrong) {
                      // User selected this wrong answer - red
                      bgClass = 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'
                    } else if (isCorrect && answeredWrong) {
                      // This is the correct answer, but user chose wrong - darker gray to reveal the right answer
                      bgClass = 'bg-gray-200 dark:bg-gray-500 border-gray-500 dark:border-gray-400'
                    } else {
                      // Unselected options - lighter/more subtle
                      bgClass = 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                    }
                  }

                  const disabled = hasAnswered

                  return (
                    <button
                      key={i}
                      onClick={() => select(q.id, i)}
                      disabled={disabled}
                      className={`w-full option-btn border-2 transition-all duration-200 text-left flex items-center gap-4 text-gray-900 dark:text-white ${bgClass} ${!disabled ? hoverClass : 'cursor-not-allowed'} focus-ring`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      aria-pressed={isSelected}
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm"
                        style={{
                          borderColor: isSelected && isCorrect ? '#10b981' : wasWrong ? '#ef4444' : (isCorrect && answeredWrong) ? '#4b5563' : 'currentColor',
                          backgroundColor: isSelected && isCorrect ? '#10b981' : wasWrong ? '#ef4444' : (isCorrect && answeredWrong) ? '#4b5563' : 'transparent',
                          color: (isSelected || (isCorrect && answeredWrong)) ? 'white' : 'currentColor'
                        }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-sm sm:text-base">{opt}</span>
                      {isSelected && isCorrect && <FiCheck className="flex-shrink-0 text-base sm:text-lg text-green-600" aria-hidden="true" />}
                      {isCorrect && answeredWrong && <FiCheck className="flex-shrink-0 text-base sm:text-lg text-gray-600" aria-hidden="true" />}
                      {wasWrong && <FiAlertCircle className="flex-shrink-0 text-base sm:text-lg text-red-600" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
        </div>

      {/* Action Buttons - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 sm:static bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg sm:shadow-none px-2 py-2 sm:py-0 sm:border-0 sm:bg-transparent dark:sm:bg-transparent">
        <div className="app-container flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
          <div className="flex gap-1 flex-1 w-full">
            <button 
              onClick={finishNow} 
              className="btn-primary flex-1 gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5"
            >
              <FiCheck className="text-sm sm:text-lg" aria-hidden="true" /> 
              <span className="hidden sm:inline">{t.goBack}</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button 
              onClick={resetAnswers} 
              className="btn-secondary flex-1 gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5"
            >
              <FiRotateCcw className="text-sm sm:text-lg" aria-hidden="true" /> 
              <span className="hidden sm:inline">{t.retakeQuiz}</span>
              <span className="sm:hidden">Retry</span>
            </button>
          </div>
          <div className="flex gap-1 flex-wrap sm:flex-nowrap">
            {groupNum > 1 && (
              <button 
                onClick={() => navigate(`/subject/${subjectId}/group/${groupNum - 1}`)}
                className="btn-secondary gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 sm:w-auto whitespace-nowrap"
              >
                <span className="sm:hidden">← Prev</span>
                <span className="hidden sm:inline">{t.previousGroup}</span>
              </button>
            )}
            {groupNum < Math.ceil(rawQuestions.length / 25) && (
              <button 
                onClick={() => navigate(`/subject/${subjectId}/group/${groupNum + 1}`)}
                className="btn-primary gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5 sm:w-auto whitespace-nowrap"
              >
                <span className="sm:hidden">Next →</span>
                <span className="hidden sm:inline">{t.nextGroup}</span>
              </button>
            )}
          </div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 sm:py-2 bg-gray-50 dark:bg-gray-700 rounded-lg whitespace-nowrap flex-shrink-0">
            <span className="hidden sm:inline">Answered:</span> <span className="text-primary-600 dark:text-primary-400 font-bold">{Object.keys(answers).filter(k => answers[Number(k)] != null).length}/{groupQuestions.length}</span>
          </div>
        </div>
      </div>

      {/* Spacer for fixed buttons on mobile */}
      <div className="h-20 sm:h-0"></div>
      </main>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="modal-card bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full scale-in">
            {/* Results Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.congratulations}!</h2>
              <p className="text-gray-600 dark:text-gray-400">Here's how you performed</p>
            </div>

            {/* Score */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-green-100 dark:to-green-900/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totals.correct}</div>
                <p className="text-sm text-green-700 dark:text-green-400 font-medium mt-1">{t.correct}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 dark:from-red-900/20 to-red-100 dark:to-red-900/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">{totals.wrong}</div>
                <p className="text-sm text-red-700 dark:text-red-400 font-medium mt-1">{t.incorrect}</p>
              </div>
            </div>

            {/* Percentage */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 text-center mb-8">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0}%
              </div>
              <p className="text-sm text-primary-700 dark:text-primary-400 font-medium mt-2">{t.yourScore}</p>
            </div>

            {/* Feedback */}
            {totals.correct === totals.total && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-900 dark:text-blue-400">🎉 {t.congratulations}! Excellent work!</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-secondary flex-1"
              >
                {t.reviewAnswers}
              </button>
              <button 
                onClick={resetAnswers} 
                className="btn-primary flex-1 gap-2"
              >
                <FiRotateCcw className="text-lg" aria-hidden="true" /> 
                {t.retakeQuiz}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
