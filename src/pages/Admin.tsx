import React, { useState, useMemo } from 'react'
import { FiLock, FiDatabase, FiPlusCircle, FiDownload, FiTrash2, FiCheck, FiPieChart, FiFileText } from 'react-icons/fi'
import { SUBJECTS } from '../config/subjects'
import { useSubjects } from '../hooks/useSubjects'
import { useLanguage } from '../contexts/LanguageContext'

// Sophisticated Parser Logic
function sophisticatedParse(text: string) {
  const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  if (cleanText.includes('====')) {
    const questions: any[] = [];
    const blocks = cleanText.split(/={4,}/);

    for (let i = 1; i < blocks.length; i += 2) {
      const questionText = blocks[i].trim();
      const optionsBlock = blocks[i+1] || '';
      const options = optionsBlock.split(/\+{4,}/).map(o => o.trim()).filter(o => o);

      if (questionText && options.length > 0) {
        questions.push({
          text: questionText.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').trim(),
          options: options.map(o => o.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').trim())
        });
      }
    }
    return questions;
  }

  const blocks = cleanText.split(/\n(?=\s*\d+[\.\)\-\:])|(?<=^)\s*\d+[\.\)\-\:]/m);
  const questions: any[] = [];

  blocks.forEach(block => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return;
    const content = trimmedBlock.replace(/^\s*\d+[\.\)\-\:]\s*/, '').trim();
    if (!content) return;
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return;

    let questionText = '';
    const options: string[] = [];
    let parsingOptions = false;

    lines.forEach((line, index) => {
      if (line.startsWith('#') || /^[A-D][\.\)\-]/.test(line) || index > 0) {
        parsingOptions = true;
      }
      if (!parsingOptions) {
        questionText += (questionText ? ' ' : '') + line;
      } else {
        options.push(line.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').trim());
      }
    });

    if (questionText && options.length > 0) {
      questions.push({
        text: questionText.replace(/\s*\[cite:\s*\d+\]\s*/gi, ' ').trim(),
        options: options
      });
    }
  });

  return questions;
}

export default function Admin() {
  const { t } = useLanguage()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const [activeTab, setActiveTab] = useState<'overalls' | 'manage' | 'parser'>('overalls')
  const { subjects, isLoading } = useSubjects()

  const [rawText, setRawText] = useState('')
  const [targetSubject, setTargetSubject] = useState(SUBJECTS[0].id)
  const [parsedData, setParsedData] = useState<any[] | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login === 'ismatovsanjarbek' && password === 'nopassword') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError(t.adminInvalid)
    }
  }

  const stats = useMemo(() => {
    const totalQuestions = subjects.reduce((acc, s) => acc + s.questionsCount, 0)
    return {
      totalSubjects: subjects.length,
      totalQuestions,
      avgQuestions: subjects.length ? Math.round(totalQuestions / subjects.length) : 0
    }
  }, [subjects])

  const handleParse = () => {
    const result = sophisticatedParse(rawText)
    setParsedData(result)
  }

  const handleDownload = () => {
    if (!parsedData) return
    const out = { questions: parsedData }
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${targetSubject}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 sm:mt-20 fade-in">
        <div className="card p-8 border-t-4 border-primary-600">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <FiLock className="text-3xl text-primary-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">{t.adminAccess}</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm">Please enter your credentials to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.adminLogin}</label>
              <input
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus-ring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.adminPassword}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus-ring"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <button type="submit" className="w-full btn-primary py-3 mt-4">{t.adminLoginBtn}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{activeTab === 'overalls' ? 'Admin Overalls' : activeTab === 'manage' ? 'Manage Tests' : 'Sophisticated Parser'}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t.adminWelcome}</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="btn-secondary text-sm">{t.adminLogout}</button>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overalls')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'overalls' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FiPieChart className="inline mr-2" /> {t.adminOveralls}
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'manage' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FiDatabase className="inline mr-2" /> {t.adminManage}
        </button>
        <button
          onClick={() => setActiveTab('parser')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'parser' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FiPlusCircle className="inline mr-2" /> {t.adminParser}
        </button>
      </div>

      {activeTab === 'overalls' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card p-6 flex items-center gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <FiFileText className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.adminTotalSubjects}</p>
              <p className="text-2xl font-bold dark:text-white">{isLoading ? '...' : stats.totalSubjects}</p>
            </div>
          </div>
          <div className="card p-6 flex items-center gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600">
              <FiCheck className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.adminTotalQuestions}</p>
              <p className="text-2xl font-bold dark:text-white">{isLoading ? '...' : stats.totalQuestions}</p>
            </div>
          </div>
          <div className="card p-6 flex items-center gap-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600">
              <FiPieChart className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.adminAvgQuestions}</p>
              <p className="text-2xl font-bold dark:text-white">{isLoading ? '...' : stats.avgQuestions}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.adminSubjectName}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{t.totalQuestions}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{t.groups}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.adminStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading dynamic data...</td></tr>
              ) : subjects.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.id}.json</div>
                  </td>
                  <td className="px-6 py-4 text-center dark:text-gray-300">{s.questionsCount}</td>
                  <td className="px-6 py-4 text-center dark:text-gray-300">{s.groupsCount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">{t.adminActive}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'parser' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4 dark:text-white">{t.adminRawInput}</h3>
              <select
                value={targetSubject}
                onChange={e => setTargetSubject(e.target.value)}
                className="w-full mb-4 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <textarea
                rows={15}
                className="w-full p-4 font-mono text-xs rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus-ring"
                placeholder="Paste questions here... Supports both '1. Question' and '==== Question ====' formats."
                value={rawText}
                onChange={e => setRawText(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleParse} className="btn-primary flex-1">{t.adminParseBtn}</button>
              <button onClick={() => {setRawText(''); setParsedData(null)}} className="btn-secondary px-4"><FiTrash2 /></button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 dark:text-white">{t.adminPreview}</h3>
            {parsedData ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-300 flex items-center justify-between">
                  <span>{t.adminDetected.replace('{count}', parsedData.length.toString())}</span>
                  <button onClick={handleDownload} className="flex items-center gap-1 text-primary-600 font-bold"><FiDownload /> {t.adminDownloadJson}</button>
                </div>
                <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
                  {parsedData.slice(0, 5).map((q, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded border dark:border-gray-700 text-xs">
                      <p className="font-bold mb-2">{i+1}. {q.text}</p>
                      <ul className="space-y-1">
                        {q.options.map((o: string, oi: number) => (
                          <li key={oi} className={o.startsWith('#') ? 'text-green-600 font-bold' : 'text-gray-500'}>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {parsedData.length > 5 && <p className="text-center text-gray-500 text-xs italic">... and {parsedData.length - 5} more questions</p>}
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-center">
                <FiFileText className="text-5xl mb-4" />
                <p>{t.adminNoData}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
