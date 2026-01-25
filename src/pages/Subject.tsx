import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useLanguage } from '../contexts/LanguageContext'
import { useSubject } from '../hooks/useSubjects'

function groupsForSubject(questionsCount: number){
  const questionsPerGroup = 25
  const groupCount = Math.ceil(questionsCount / questionsPerGroup)
  const groups = [] as {id:string,label:string,start:number,end:number}[]
  
  for(let i=0; i < groupCount; i++){
    const start = i * questionsPerGroup + 1
    const end = Math.min((i + 1) * questionsPerGroup, questionsCount)
    groups.push({id:`${i+1}`, label:`${start}-${end}`, start, end})
  }
  return groups
}

export default function Subject(){
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const subject = useSubject(subjectId)
  
  if (!subject) {
    return (
      <div className="text-center py-12 fade-in">
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.subjectNotFound}</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          {t.backToSubjects}
        </button>
      </div>
    )
  }

  const groups = groupsForSubject(subject.questionsCount)

  return (
    <div className="app-container space-y-6 sm:space-y-8 fade-in">
      {/* Header with back button */}
      <div className="flex items-start gap-3 sm:gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus-ring mt-1"
          aria-label="Go back to subjects"
        >
          <FiArrowLeft className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400" aria-hidden="true" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{subject.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">{subject.description}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{subject.questionsCount}</div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t.totalQuestions}</p>
        </div>
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{groups.length}</div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t.groups}</p>
        </div>
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">25</div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t.perGroup}</p>
        </div>
        <div className="hidden sm:block card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">∞</div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t.attempts}</p>
        </div>
      </div>

      {/* Groups Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">{t.practiceGroups}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          {groups.map(g => (
            <Link
              key={g.id}
              to={`/subject/${subjectId}/group/${g.id}`}
              className="group card p-3 sm:p-4 text-center hover-lift focus-ring focus:ring-2"
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="text-lg sm:text-2xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  {t.question} {g.id}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Q {g.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
  
    </div>
  )
}
