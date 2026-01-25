import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useLanguage } from '../contexts/LanguageContext'
import { useSubjects } from '../hooks/useSubjects'
import { getIconComponent } from '../config/icons'

export default function Home() {
  const { t } = useLanguage()
  const subjects = useSubjects()

  return (
    <div className="app-container space-y-6 sm:space-y-8 md:space-y-12 fade-in">
      {/* Hero Section */}

      {/* Subjects Grid */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-8">{t.chooseSubject}</h2>
        <div className="grid gap-3 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const IconComponent = getIconComponent(subject.icon)
            return (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className="group card p-4 sm:p-6 hover-lift"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <IconComponent className="text-lg sm:text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{subject.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
                      {subject.questionsCount} questions across {subject.groupsCount} groups
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">
                    {t.startPractice} <FiArrowRight className="text-base sm:text-lg" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      
    </div>
  )
}
