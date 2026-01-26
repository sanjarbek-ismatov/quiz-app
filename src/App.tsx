import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FiBookOpen, FiGithub, FiGlobe, FiSun, FiMoon, FiChevronDown, FiMessageCircle } from 'react-icons/fi'
import { useLanguage } from './contexts/LanguageContext'
import { useTheme } from './contexts/ThemeContext'
import Home from './pages/Home'
import Subject from './pages/Subject'
import Quiz from './pages/Quiz'
import Importer from './pages/Importer'
import DisclaimerModal from './components/DisclaimerModal'

const DISCLAIMER_AGREED_KEY = 'quiz-master-disclaimer-agreed'

export default function App(){
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  // Check if user has agreed to disclaimer on first visit
  useEffect(() => {
    const hasAgreed = localStorage.getItem(DISCLAIMER_AGREED_KEY)
    if (!hasAgreed) {
      setShowDisclaimer(true)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem(DISCLAIMER_AGREED_KEY, 'true')
    setShowDisclaimer(false)
  }

  const handleQuit = () => {
    // Redirect to blank page - browsers don't allow closing user-opened tabs via script
    window.location.href = 'about:blank'
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''} bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      <style>{`
        :root {
          color-scheme: ${theme === 'dark' ? 'dark' : 'light'};
        }
      `}</style>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="app-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg group-hover:shadow-lg transition-shadow duration-200">
              <FiBookOpen className="text-2xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.quizMaster}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t.learnAndPractice}</p>
            </div>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4 text-sm">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors focus-ring"
                aria-label="Select language"
              >
                <FiGlobe className="text-lg" aria-hidden="true" />
                <span className="font-medium">{language.toUpperCase()}</span>
                <FiChevronDown className={`text-sm transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  {(['en', 'uz', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang)
                        setIsLanguageDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 transition-colors ${
                        language === lang
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'uz' ? 'O\'zbek' : 'Русский'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors focus-ring"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <FiMoon className="text-lg" aria-hidden="true" />
              ) : (
                <FiSun className="text-lg" aria-hidden="true" />
              )}
            </button> <a 
              href="https://t.me/Sanjarbek_Ismatov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              aria-label="Telegram profile"
            >
              <FiMessageCircle className="text-lg" />
              Developer: Sanjarbek
            </a><a 
              href="https://github.com/sanjarbek-ismatov/quiz-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              aria-label="GitHub repository"
            >
              <FiGithub className="text-lg" />
              {t.code}
            </a>
           
          </nav>
        </div>
      </header>
      <main className="flex-1 py-8 sm:py-12">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/subject/:subjectId" element={<Subject/>} />
            <Route path="/subject/:subjectId/group/:groupId" element={<Quiz/>} />
            <Route path="/import" element={<Importer/>} />
          </Routes>
        </div>
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-12">
        <div className="app-container py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>{t.copyright}</p>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal onAgree={handleAgree} onQuit={handleQuit} />
      )}
    </div>
  )
}
