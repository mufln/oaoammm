'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, MapPin } from 'lucide-react'
import { ComboboxEdit } from '@/components/combobox'

type Lesson = {
  subject: string
  teacher: string
  room: string
  startTime: string
  endTime: string
}

type Group = {
  name: string
  schedule: {
    [key: string]: {
      [key: string]: Lesson[]
    }
  }
}

const subjects = [
  {id: 1, name: 'Математика'},
  {id: 2, name: 'Физика'},
  {id: 3, name: 'Информатика'},
]

const classes = [
  { id: 1, name: 'А-101' },
  { id: 2, name: 'Б-202' },
  { id: 3, name: 'В-303' },
  { id: 4, name: 'Г-404' },
  { id: 5, name: 'Д-505' },
  { id: 6, name: 'Е-606' },
  { id: 7, name: 'З-707' },
  { id: 8, name: 'И-808' },
  { id: 9, name: 'К-909' },
  { id: 10, name: 'Л-101' },
  { id: 11, name: 'МП-61' },
  { id: 12, name: 'НТ-72' },
];

const teachers = [
  { id: 1, name: 'Иванов Иван Сергеевич' },
  { id: 2, name: 'Петрова Анна Александровна' },
  { id: 3, name: 'Сидоров Алексей Викторович' },
  { id: 4, name: 'Кузнецова Екатерина Дмитриевна' },
  { id: 5, name: 'Федоров Сергей Николаевич' },
  { id: 6, name: 'Смирнова Ольга Павловна' },
  { id: 7, name: 'Зайцева Мария Андреевна' },
  { id: 8, name: 'Морозов Дмитрий Владимирович' },
  { id: 9, name: 'Лебедев Виктория Игоревна' },
  { id: 10, name: 'Ковалев Артем Сергеевич' },
  { id: 11, name: 'Павлова Наталья Сергеевна' },
  { id: 12, name: 'Григорьев Олег Анатольевич' },
  { id: 13, name: 'Соловьева Анастасия Валерьевна' },
  { id: 14, name: 'Тихонов Денис Васильевич' },
  { id: 15, name: 'Куликова Ирина Викторовна' },
];

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
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-6 sticky left-0 z-20 bg-white" rowSpan={2}>
                <span className="sr-only">День недели</span>
              </TableHead>
              <TableHead className="w-32 sticky left-12 z-20 bg-white" rowSpan={2}>
                Время
              </TableHead>
              <TableHead className="w-8 left-44 z-20 bg-white" rowSpan={2}>
                Неделя
              </TableHead>
              {groups.map((group, index) => (
                <TableHead key={index} className="text-center text-blue-600" colSpan={3}>
                  {group.name}
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              {groups.map((_, index) => (
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
                <>
                  <TableRow key={`${day}-${timeSlot}-odd`} className="border-b border-gray-200">
                    {timeIndex === 0 && (
                      <TableCell rowSpan={timeSlots.length * 2} className="font-medium sticky left-0 z-10 bg-white border-r p-0">
                        <div className="h-full flex items-center justify-center">
                          <span className="transform -rotate-90 whitespace-nowrap">{day}</span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell rowSpan={2} className="sticky left-12 z-10 bg-white border-r">
                      <div>{timeSlot}</div>
                    </TableCell>
                    <TableCell className="w-8 left-44 z-10 bg-gray-100 text-center">
                      <div className="text-xs font-medium">I</div>
                    </TableCell>
                    {groups.map((group, groupIndex) => {
                      const oddLesson = group.schedule.odd[day]?.find(
                        l => `${l.startTime} - ${l.endTime}` === timeSlot
                      )
                      return (
                        <>
                          <TableCell key={`${groupIndex}-odd-subject`} className="p-2">
                            {oddLesson && <div className="font-semibold">
                              <ComboboxEdit
                              items={subjects}
                              placeholder={oddLesson.subject}
                              />
                            </div>}
                          </TableCell>
                          <TableCell key={`${groupIndex}-odd-teacher`} className="p-2">
                            {oddLesson && <div>
                              <ComboboxEdit
                              items={teachers}
                              placeholder={oddLesson.teacher}
                              />
                            </div>}
                          </TableCell>
                          <TableCell key={`${groupIndex}-odd-room`} className="p-2 text-center">
                            {oddLesson && <div className="text-sm font-medium">
                              <ComboboxEdit
                              items={classes}
                              placeholder={oddLesson.room}
                              />
                            </div>}
                          </TableCell>
                        </>
                      )
                    })}
                  </TableRow>
                  <TableRow key={`${day}-${timeSlot}-even`} className="border-b border-gray-200">
                    <TableCell className="w-8 left-44 z-10 bg-gray-100 text-center">
                      <div className="text-xs font-medium">II</div>
                    </TableCell>
                    {groups.map((group, groupIndex) => {
                      const evenLesson = group.schedule.even[day]?.find(
                        l => `${l.startTime} - ${l.endTime}` === timeSlot
                      )
                      return (
                        <>
                          <TableCell key={`${groupIndex}-even-subject`} className="p-2">
                            {evenLesson && <div className="font-semibold">
                              <ComboboxEdit
                              items={subjects}
                              placeholder={evenLesson.subject}
                              />
                            </div>}
                          </TableCell>
                          <TableCell key={`${groupIndex}-even-teacher`} className="p-2">
                            {evenLesson && <div>
                              <ComboboxEdit
                              items={teachers}
                              placeholder={evenLesson.teacher}
                              />
                            </div>}
                          </TableCell>
                          <TableCell key={`${groupIndex}-even-room`} className="p-2 text-center">
                            {evenLesson && <div className="text-sm font-medium">
                              <ComboboxEdit
                              items={classes}
                              placeholder={evenLesson.room}
                              />
                            </div>}
                          </TableCell>
                        </>
                      )
                    })}
                  </TableRow>
                </>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}