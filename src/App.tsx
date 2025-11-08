import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FiBookOpen } from 'react-icons/fi'
import Home from './pages/Home'
import Subject from './pages/Subject'
import Quiz from './pages/Quiz'
import Importer from './pages/Importer'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b">
        <div className="app-container flex items-center gap-4">
        <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
          <FiBookOpen className="text-2xl text-indigo-600" />
          <span>Quiz App</span>
        </Link>
          <div className="ml-auto text-sm text-gray-500 hidden sm:block">Simple — clean — fast</div>
        </div>
      </header>
      <main className="app-container py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/subject/:subjectId" element={<Subject/>} />
          <Route path="/subject/:subjectId/group/:groupId" element={<Quiz/>} />
        </Routes>
      </main>
    </div>
  )
}
