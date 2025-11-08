import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

function groupsForSubject(){
  // 200 tests, groups of 20
  const groups = [] as {id:string,label:string,start:number,end:number}[]
  for(let i=0;i<10;i++){
    const start = i*20+1
    const end = (i+1)*20
    groups.push({id:`${i+1}`, label:`${start}-${end}`, start, end})
  }
  return groups
}

export default function Subject(){
  const { subjectId } = useParams()
  const groups = groupsForSubject()

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-2xl font-bold">{subjectId}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {groups.map(g => (
          <Link key={g.id} to={`/subject/${subjectId}/group/${g.id}`} className="card p-3 bg-white hover:shadow-md text-center pop focus-ring">
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">{g.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
