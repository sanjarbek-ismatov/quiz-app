import React, { useState } from 'react'
import { FiDownload, FiTrash2, FiCheck } from 'react-icons/fi'
import { SUBJECTS } from '../config/subjects'

// Simple importer: paste raw questions (numbered) where correct options are prefixed with '#'
// Output: JSON object with subjects keys mapping to { questions: [...] }

function parseBlock(text: string) {
  // Expect blocks like:
  // 1. Question text\n\n    // #Correct\n    // Wrong\n    // ...
  const lines = text.split(/\r?\n/).map(l => l.trim())
  const questions: any[] = []
  let i = 0
  while (i < lines.length) {
    // find a line that starts with digits and a dot
    if (!lines[i]) { i++; continue }
    const m = lines[i].match(/^(\d+)\./)
    if (m) {
      // question number line
      const qlines = [lines[i].replace(/^\d+\.\s*/, '')]
      i++
      // collect lines until we hit an option start or next question
      while (i < lines.length && lines[i] && !lines[i].match(/^\d+\./)) {
        qlines.push(lines[i])
        i++
      }
      const qtext = qlines.join(' ').trim()
      // Now following lines that start with option markers, or are standalone options
      // We'll gather up to 6 options or until next question
      const opts: string[] = []
      while (i < lines.length && lines[i] && !lines[i].match(/^\d+\./) && opts.length < 10) {
        // Recognize options lines like: "#Option text" or "Option text"
        if (lines[i].startsWith('#')) opts.push(lines[i])
        else {
          // Sometimes options are quoted or start with letters; just collect
          opts.push(lines[i])
        }
        i++
      }
      if (qtext) {
        questions.push({ text: qtext, options: opts })
      }
    } else {
      i++
    }
  }
  return questions
}

export default function Importer(){
  const [raw, setRaw] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0].id)
  const [parseResult, setParseResult] = useState<any>(null)

  function handlePreview(){
    const parsed = parseBlock(raw)
    setParseResult({
      count: parsed.length,
      questions: parsed.slice(0, 3) // preview first 3
    })
  }

  function handleImport(){
    const parsed = parseBlock(raw)
    // ensure exactly 200 questions by padding or truncating
    const targetCount = 200
    const filled = parsed.slice(0, targetCount)
    while (filled.length < targetCount) filled.push({ text: 'Placeholder question', options: ['#Option A','Option B','Option C','Option D'] })

    // Split into 20 groups (no in-structure grouping required, we keep flat array)
    const out: any = {}
    out[subject] = { questions: filled }

    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-data.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    
    setParseResult(null)
  }

  return (
    <div className="space-y-8 fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Question Importer</h1>
        <p className="text-gray-600 mt-2">Import your questions in bulk and generate a sample-data.json file</p>
      </div>

      <div className="card p-8 space-y-6">
        {/* Subject Selection */}
        <div>
          <label htmlFor="subject-select" className="block text-sm font-semibold text-gray-900 mb-3">
            Select Subject
          </label>
          <select 
            id="subject-select"
            value={subject} 
            onChange={e => setSubject(e.target.value)} 
            className="w-full rounded-lg border-2 border-gray-200 p-3 text-gray-900 focus-ring transition-all hover:border-gray-300"
          >
            {SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-blue-900">Format Instructions</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• Number each question (1., 2., 3., ...)</p>
            <p>• Mark the correct option with a leading <code className="bg-blue-100 px-2 py-1 rounded font-mono">#</code></p>
            <p>• One option per line</p>
            <p>• Empty lines separate questions</p>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-blue-800 font-medium mb-2">Example:</p>
            <pre className="bg-white rounded p-3 text-xs overflow-auto border border-blue-100">
{`1. What is 2+2?
#4
3
5
2

2. What is the capital of France?
#Paris
London
Berlin`}
            </pre>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label htmlFor="questions-textarea" className="block text-sm font-semibold text-gray-900 mb-3">
            Paste Your Questions
          </label>
          <textarea 
            id="questions-textarea"
            value={raw} 
            onChange={e => setRaw(e.target.value)} 
            rows={12} 
            className="w-full rounded-lg border-2 border-gray-200 p-4 font-mono text-sm focus-ring transition-all hover:border-gray-300"
            placeholder={`Paste questions here (numbered). Example:
1. Question text
#Correct option
Wrong option
...
2. ...`}
          />
          <p className="text-xs text-gray-500 mt-2">
            {raw.length} characters • {raw.split('\n').filter(l => l.match(/^\d+\./)).length} questions detected
          </p>
        </div>

        {/* Preview Result */}
        {parseResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FiCheck className="text-green-600 text-lg" />
              <span className="font-semibold text-green-900">
                {parseResult.count} questions parsed successfully
              </span>
            </div>
            {parseResult.count < 200 && (
              <p className="text-sm text-green-800">
                Note: {200 - parseResult.count} placeholder questions will be added to reach 200 total.
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            onClick={handlePreview} 
            disabled={!raw.trim()}
            className="btn-secondary flex-1 gap-2"
          >
            Preview
          </button>
          <button 
            onClick={handleImport}
            disabled={!raw.trim()}
            className="btn-primary flex-1 gap-2"
          >
            <FiDownload className="text-lg" aria-hidden="true" />
            Generate & Download
          </button>
          <button 
            onClick={() => {
              setRaw('')
              setParseResult(null)
            }}
            className="btn-secondary gap-2"
            title="Clear all text"
          >
            <FiTrash2 className="text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-900 mb-4">Tips for Best Results</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-purple-600 font-bold">✓</span>
            <span>Ensure questions are clearly numbered (1., 2., 3., etc.)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-600 font-bold">✓</span>
            <span>Mark exactly one correct answer per question with #</span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-600 font-bold">✓</span>
            <span>Provide 3-4 options per question for best experience</span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-600 font-bold">✓</span>
            <span>The system will automatically shuffle questions and options</span>
          </li>
        </ul>
      </div>

      {/* How to Add New Subject */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">How to Add a New Subject</h3>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>Add the subject to <code className="bg-amber-100 px-2 py-1 rounded font-mono text-xs">src/config/subjects.ts</code></li>
          <li>Add the questions to <code className="bg-amber-100 px-2 py-1 rounded font-mono text-xs">src/data/sample-data.json</code></li>
          <li>That's it! It will automatically appear in the app</li>
        </ol>
      </div>
    </div>
  )
}
