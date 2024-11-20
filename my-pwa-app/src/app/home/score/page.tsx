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
      {(selectedGroupData && selectedSubjectData) ? (
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
      )
      :
      (
        <div className="flex flex-col items-center justify-center grow space-y-4 m-16">
          <svg width="220" height="185" viewBox="0 0 220 185" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M108.375 48.5783L112.047 78.7589L123.586 50.6309M108.375 48.5783L73.9094 36.1833L68.4053 36.5877M108.375 48.5783C89.7031 35.4565 81.162 25.2394 50.1675 30.3981L49.1412 38.0037L68.4053 36.5877M123.586 50.6309L161.372 47.986L166.291 49.7969M123.586 50.6309C151.352 40.5007 164.826 39.735 184.531 48.5296L183.505 56.1353L166.291 49.7969M68.4053 36.5877L75.015 85.3776L86.7546 93.371M166.291 49.7969L145.999 94.9566L135.582 98.5193M135.582 98.5193L116.855 104.924M135.582 98.5193L137.472 102.325M86.7546 93.371L72.3052 116.394M86.7546 93.371L89.5723 95.2896M14.8986 101.045L4.66602 68.9257L48.1543 56.135L51.0716 68.9257M51.0716 68.9257L61.2816 113.693M51.0716 68.9257L58.3871 66.3676L59.1694 79.1582M25.1312 136.716L27.6894 144.391L43.038 138.039M43.038 138.039L46.2357 136.716L64.7822 129.042L61.2816 113.693M43.038 138.039L46.2357 144.391L64.7822 139.445M61.2816 113.693L59.1694 79.1582M59.1694 79.1582H67.3406L72.3052 116.394M72.3052 116.394L75.0147 136.716L64.7822 139.445M64.7822 139.445L77.7983 155.42M191.861 120.231L203.372 99.7664L165 81.8594L156.543 97.2082M156.543 97.2082L145.814 93.371L143.119 113.693M156.543 97.2082L141.742 124.069M171.396 150.929L165 162.441L147.733 153.487M147.733 153.487L130.465 144.534L141.742 124.069M147.733 153.487L136.541 163.08M143.119 113.693L141.742 124.069M143.119 113.693L137.472 102.325M77.7983 155.42L90.8143 171.394L125.349 172.673L136.541 163.08M77.7983 155.42L43.0383 172.673M136.541 163.08L171.396 177.79M89.5723 95.2896L92.3901 97.2082L104.884 105.715M89.5723 95.2896C90.0346 101.908 92.9189 106.273 102.392 115.115M116.855 104.924L108.112 107.913L104.884 105.715M116.855 104.924C116.855 104.924 122.021 108.716 123.586 112.557C123.368 113.492 123.139 114.337 122.89 115.115M137.472 102.325L122.89 115.115M43.0383 172.673L35.8143 158.604M43.0383 172.673L51.0716 158.604M43.0383 172.673L51.0716 180.348M171.396 177.79V164.999M171.396 177.79L185.465 171.394M171.396 177.79L158.605 180.348M104.884 105.715C103.094 108.373 102.328 110.3 102.243 112.557C102.213 113.353 102.268 114.19 102.392 115.115M102.392 115.115C102.447 115.523 102.516 115.948 102.597 116.394C104.642 118.738 106.484 120.311 108.867 121.511M116.855 124.069C120.036 121.013 121.698 118.83 122.89 115.115M116.855 124.069C113.447 123.323 110.95 122.559 108.867 121.511M116.855 124.069C119.682 135.128 118.833 141.336 123.586 148.371C118.503 154.379 118.735 156.46 113.838 162.441L97.2097 149.65L108.867 121.511M198.256 33.255L202.093 28.1387C231.512 20.4651 208.488 -7.67465 198.256 11.5109M116.855 43.1258L61.4354 13.8495L121.797 6.50696L179.32 29.7575L116.855 43.1258ZM128.068 68.3069C125.09 80.8116 141.74 81.7678 145.814 70.7016C149.889 59.6356 131.046 55.8022 128.068 68.3069ZM84.8508 60.8919C84.485 73.7491 102.287 73.57 102.597 63.2865C102.907 53.0031 85.2169 48.0346 84.8508 60.8919ZM77.7983 70.7016C77.4562 73.2369 81.2589 73.7501 81.6009 71.2147C81.9432 68.6796 78.1405 68.1664 77.7983 70.7016ZM143.256 81.8594C142.914 84.3945 146.751 84.3945 147.093 81.8594C147.435 79.3243 143.598 79.3243 143.256 81.8594ZM9.78229 111.135L14.8986 136.716L30.2473 129.042C39.1248 116.816 39.2827 108.158 34.0845 90.6699L9.78229 111.135ZM176.512 112.557L203.372 134.301L185.465 156.045L173.954 147.092C170.829 134.103 171.617 126.518 176.512 112.557ZM193.174 40.416C192.832 42.9511 196.635 43.4643 196.977 40.9292C197.319 38.394 193.516 37.8809 193.174 40.416Z" stroke="#D4D4D8" stroke-width="3.5"/>
</svg>


          <p className='text-zinc-300 font-semibold text-xl'>Выберите группу и предмет </p>        
        </div>
      )}
    </div>
  )
}