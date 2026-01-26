import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useLanguage } from '../contexts/LanguageContext'

interface DisclaimerModalProps {
  onAgree: () => void
  onQuit: () => void
}

export default function DisclaimerModal({ onAgree, onQuit }: DisclaimerModalProps) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-[100] p-3 sm:p-4 fade-in">
      <div className="modal-card bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-lg w-full scale-in shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex-shrink-0">
              <FiAlertTriangle className="text-xl sm:text-2xl text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t.disclaimerTitle}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-7">
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {t.disclaimerContent}
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 sm:p-4 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
              <strong className="font-semibold">{t.disclaimerWarning}</strong>
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-3 sm:p-4 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
              {t.disclaimerReport}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onQuit}
            className="btn-secondary flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
          >
            {t.disclaimerQuit}
          </button>
          <button
            onClick={onAgree}
            className="btn-primary flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
          >
            {t.disclaimerAgree}
          </button>
        </div>
      </div>
    </div>
  )
}
