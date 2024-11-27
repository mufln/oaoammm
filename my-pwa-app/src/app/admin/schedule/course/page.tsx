'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { User, MapPin } from 'lucide-react'

type Group = {
  name: string
  schedule: {
    [key: string]: {
      [key: string]: {
        subject: string
        teacher: string
        room: string
        startTime: string
        endTime: string
      }[]
    }
  }
}

const groups: Group[] = [
  {
    name: 'ЭФБО-01-23',
    schedule: {
      even: {
        'Понедельник': [
          { subject: 'Математика', teacher: 'Иванов И.И.', room: 'А-130', startTime: '09:00', endTime: '10:30' },
          { subject: 'Физика', teacher: 'Петров П.П.', room: 'А-140', startTime: '11:00', endTime: '12:30' },
        ],
        'Вторник': [
          { subject: 'Химия', teacher: 'Сидорова С.С.', room: 'А-150', startTime: '09:00', endTime: '10:30' },
          { subject: 'Информатика', teacher: 'Козлов К.К.', room: 'А-160', startTime: '11:00', endTime: '12:30' },
        ],
      },
      odd: {
        'Понедельник': [
          { subject: 'Литература', teacher: 'Смирнова Л.Л.', room: 'А-170', startTime: '09:00', endTime: '10:30' },
          { subject: 'История', teacher: 'Новиков Н.Н.', room: 'А-180', startTime: '11:00', endTime: '12:30' },
        ],
        'Вторник': [
          { subject: 'Английский', teacher: 'Морозова А.А.', room: 'А-190', startTime: '09:00', endTime: '10:30' },
          { subject: 'Экономика', teacher: 'Волков В.В.', room: 'А-200', startTime: '11:00', endTime: '12:30' },
        ],
      },
    },
  },
  {
    name: 'ИФБО-02-23',
    schedule: {
      even: {
        'Понедельник': [
          { subject: 'Программирование', teacher: 'Соколов С.С.', room: 'А-210', startTime: '09:00', endTime: '10:30' },
          { subject: 'Базы данных', teacher: 'Лебедева Б.Б.', room: 'А-220', startTime: '11:00', endTime: '12:30' },
        ],
        'Вторник': [
          { subject: 'Сети', teacher: 'Григорьев Г.Г.', room: 'А-230', startTime: '09:00', endTime: '10:30' },
          { subject: 'Алгоритмы', teacher: 'Кузнецов А.А.', room: 'А-240', startTime: '11:00', endTime: '12:30' },
        ],
      },
      odd: {
        'Понедельник': [
          { subject: 'Веб-разработка', teacher: 'Титов В.В.', room: 'А-250', startTime: '09:00', endTime: '10:30' },
          { subject: 'Мобильная разработка', teacher: 'Орлова М.М.', room: 'А-260', startTime: '11:00', endTime: '12:30' },
        ],
        'Вторник': [
          { subject: 'Искусственный интеллект', teacher: 'Федоров И.И.', room: 'А-270', startTime: '09:00', endTime: '10:30' },
          { subject: 'Машинное обучение', teacher: 'Романова Р.Р.', room: 'А-280', startTime: '11:00', endTime: '12:30' },
        ],
      },
    },
  },
]

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const timeSlots = ['09:00 - 10:30', '11:00 - 12:30', '13:30 - 15:00', '15:30 - 17:00']

export default function ScheduleTable() {
  const [isEvenWeek, setIsEvenWeek] = useState(true)

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="week-toggle"
          checked={isEvenWeek}
          onCheckedChange={setIsEvenWeek}
          className="data-[state=checked]:bg-blue-600"
        />
        <Label htmlFor="week-toggle" className="text-primary">
          {isEvenWeek ? 'Четная неделя' : 'Нечетная неделя'}
        </Label>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow key={0}>
              <TableHead className="w-6 sticky left-0 z-1 bg-white text-black" rowSpan={2}>
                <span className="sr-only text-black">День недели</span>
              </TableHead>
              <TableHead className="w-32 sticky left-12 z-1 bg-white" rowSpan={2}>
                Время
              </TableHead>
              {groups.map((group, index) => (
                <TableHead key={index} className="text-center text-blue-600" colSpan={3}>
                  {group.name}
                </TableHead>
              ))}
            </TableRow>
            <TableRow key={1}>
              {groups.map((group, index) => (
                <>
                  <TableHead key={`${index}-subject`} className="w-48">
                    <div className="flex space-x-2">
                      <span>Дисциплина</span>
                    </div>
                  </TableHead>
                  <TableHead key={`${index}-teacher`} className="w-48">
                    <div className="flex space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>Преподаватель</span>
                    </div>
                  </TableHead>
                  <TableHead key={`${index}-room`} className="w-24">
                    <div className="flex space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Аудитория</span>
                    </div>
                  </TableHead>
                </>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOfWeek.map((day) => (
              timeSlots.map((timeSlot, timeIndex) => (
                <TableRow key={`${day}-${timeSlot}`}>
                  {timeIndex === 0 && (
                    <TableCell key={`${day}-${timeSlot}`} rowSpan={timeSlots.length} className="font-medium sticky left-0 z-10 bg-white border-r p-0">
                      <div className="h-full flex items-center justify-center">
                        <span className="transform -rotate-90 whitespace-nowrap">{day}</span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="sticky left-12 z-10 bg-white">{timeSlot}</TableCell>
                  {groups.map((group, index) => {
                    const lesson = group.schedule[isEvenWeek ? 'even' : 'odd'][day]?.find(
                      l => `${l.startTime} - ${l.endTime}` === timeSlot
                    )
                    return (
                      <>
                        <TableCell key={index*3} className="p-2">
                          {lesson ? (
                            <div className="font-semibold">{lesson.subject}</div>
                          ) : null}
                        </TableCell>
                        <TableCell key={index*3 + 1} className="p-2">
                          {lesson ? (
                            <div>{lesson.teacher}</div>
                          ) : null}
                        </TableCell>
                        <TableCell key={index*3 + 2} className="p-2 text-center">
                          {lesson ? <div className="text-sm font-medium">{lesson.room}</div> : null}
                        </TableCell>
                      </>
                    )
                  })}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}