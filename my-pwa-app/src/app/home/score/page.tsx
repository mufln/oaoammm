'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Student = {
  id: number
  name: string
  grades: { [date: string]: number | 'Н' }
}

type Subject = {
  id: number
  name: string
  dates: string[]
}

type Group = {
  id: number
  name: string
  students: Student[]
}

const subjects: Subject[] = [
  { id: 1, name: 'Математика', dates: ['2024-03-01', '2024-03-08', '2024-03-15', '2024-03-22'] },
  { id: 2, name: 'Физика', dates: ['2024-03-02', '2024-03-09', '2024-03-16', '2024-03-23'] },
]

const groups: Group[] = [
  {
    id: 1,
    name: 'ЭФБО-01-23',
    students: [
      { id: 1, name: 'Иванов Иван', grades: { '2024-03-01': 8, '2024-03-08': 7, '2024-03-15': 9, '2024-03-22': 'Н' } },
      { id: 2, name: 'Петрова Анна', grades: { '2024-03-01': 9, '2024-03-08': 10, '2024-03-15': 8, '2024-03-22': 9 } },
      { id: 3, name: 'Сидоров Алексей', grades: { '2024-03-01': 7, '2024-03-08': 'Н', '2024-03-15': 8, '2024-03-22': 8 } },
    ]
  },
  {
    id: 2,
    name: 'ИФБО-02-23',
    students: [
      { id: 4, name: 'Козлова Екатерина', grades: { '2024-03-02': 9, '2024-03-09': 8, '2024-03-16': 10, '2024-03-23': 9 } },
      { id: 5, name: 'Новиков Дмитрий', grades: { '2024-03-02': 7, '2024-03-09': 'Н', '2024-03-16': 8, '2024-03-23': 7 } },
      { id: 6, name: 'Морозова Ольга', grades: { '2024-03-02': 10, '2024-03-09': 9, '2024-03-16': 9, '2024-03-23': 10 } },
    ]
  },
]

export default function StudentPerformance() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)

  const selectedGroupData = groups.find(group => group.id === selectedGroup)
  const selectedSubjectData = subjects.find(subject => subject.id === selectedSubject)

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-col space-y-2">
          <Select onValueChange={(value) => setSelectedGroup(Number(value))}>
            <SelectTrigger id="group-select" className="w-[180px]">
              <SelectValue placeholder="Группа" />
            </SelectTrigger>
            <SelectContent>
              {groups.map(group => (
                <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <Select onValueChange={(value) => setSelectedSubject(Number(value))}>
            <SelectTrigger id="subject-select" className="w-[180px]">
              <SelectValue placeholder="Предмет" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id.toString()}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedGroupData && selectedSubjectData && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48 sticky left-0 z-20 bg-white">ФИО студента</TableHead>
                {selectedSubjectData.dates.map(date => (
                  <TableHead key={date} className="text-center">
                    {new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedGroupData.students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium sticky left-0 z-10 bg-white">{student.name}</TableCell>
                  {selectedSubjectData.dates.map(date => (
                    <TableCell key={date} className="text-center">
                      {student.grades[date]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}