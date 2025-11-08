import React, { useState } from 'react'

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
  const [subject, setSubject] = useState('history-econ')

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
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Importer</h1>
      <p className="text-sm text-gray-600">Paste the full set of questions here. Mark the correct option with a leading <code>#</code>. The importer will produce a <code>sample-data.json</code> file for download with exactly 200 questions (it will pad with placeholders if needed).</p>
      <div>
        <label className="block text-sm font-medium">Subject</label>
        <select value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full rounded border p-2">
          <option value="history-econ">History of Economic Thoughts</option>
          <option value="modern-uz">Modern History of Uzbekistan</option>
        </select>
      </div>
      <textarea value={raw} onChange={e => setRaw(e.target.value)} rows={18} className="w-full rounded border p-3 font-mono" placeholder={`Paste questions here (numbered). Example:\n1. Question text\n#Correct option\nWrong option\n...\n2. ...`} />
      <div className="flex gap-2">
        <button onClick={handleImport} className="px-4 py-2 bg-indigo-600 text-white rounded pop">Generate JSON & Download</button>
        <button onClick={() => setRaw('')} className="px-4 py-2 bg-gray-200 rounded pop">Clear</button>
      </div>
    </div>
  )
}
