import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

const subjects = [
{id: 'academic-writing', name: "Akademik yozuv"}
]

export default function Home() {
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Subjects</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {subjects.map(s => (
          <Link key={s.id} to={`/subject/${s.id}`} className="card p-4 bg-white hover:shadow-md transition pop focus-ring">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-medium">{s.name}</h2>
              <FiChevronRight className="text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
