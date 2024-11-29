"use client";
import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';


const getTimetable = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const timetable = await response.json(); // Преобразуем ответ в JSON
      return timetable; // Возвращаем массив расписание
    } else {
      throw new Error('Не удалось получить расписание');
    }
  }
  catch (error) {
    console.error('Ошибка при получении расписания:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

const timetableData = await getTimetable();
console.log(timetableData);

// const timetableData = [
//   [
//     {
//       affiliation: null,
//       affiliationId: 1,
//       campus: null,
//       campusId: 1,
//       class: null,
//       classId: 1,
//       day: 1,
//       groupIds: [1,2,3,4,5,6],
//       groups: null,
//       id: 1,
//       lecturer: null,
//       lecturerId: 1,
//       room: null,
//       roomId: 1,
//       slot: 1,
//       slotType: 1,
//       week: 1,
//     },
//     {
//       affiliation: null,
//       affiliationId: 1,
//       campus: null,
//       campusId: 1,
//       class: null,
//       classId: 1,
//       day: 1,
//       groupIds: [1],
//       groups: null,
//       id: 2,
//       lecturer: null,
//       lecturerId: 1,
//       room: null,
//       roomId: 1,
//       slot: 2,
//       slotType: 1,
//       week: 1,
//     },
//   ],
//   [
//     {
//       affiliation: null,
//       affiliationId: 1,
//       campus: null,
//       campusId: 1,
//       class: null,
//       classId: 1,
//       day: 2,
//       groupIds: [1],
//       groups: null,
//       id: 3,
//       lecturer: null,
//       lecturerId: 1,
//       room: null,
//       roomId: 1,
//       slot: 1,
//       slotType: 1,
//       week: 1,
//     },
//     {
//       affiliation: null,
//       affiliationId: 1,
//       campus: null,
//       campusId: 1,
//       class: null,
//       classId: 1,
//       day: 2,
//       groupIds: [1],
//       groups: null,
//       id: 4,
//       lecturer: null,
//       lecturerId: 1,
//       room: null,
//       roomId: 1,
//       slot:   2,
//       slotType: 1,
//       week: 2,
//     },
//   ],
// ];


const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Объект с временными интервалами
const timeSlots = {
  1: '09:00 - 10:30',
  2: '10:40 - 12:10',
  3: '12:40 - 14:10',
  4: '14:20 - 15:50',
  5: '16:20 - 17:50',
  6: '18:00 - 19:30',
};

const Timetable = () => {
  const [currentWeek, setCurrentWeek] = React.useState(1);

  const schedule = {};
  daysOfWeek.forEach(day => {
    schedule[day] = {};
  });

  const uniqueGroupIds = new Set();

  timetableData.forEach(week => {
    week.forEach(item => {
      if (item.week === currentWeek) {
        const day = daysOfWeek[item.day - 1];

        item.groupIds.forEach(groupId => uniqueGroupIds.add(groupId));

        const entry = item.class ? item.class.name : 'Не указано';
        const lecturer = item.lecturer ? item.lecturer.name : 'Не указано';
        const room = item.room ? item.room.name : 'Не указано';

        item.groupIds.forEach(groupId => {
          if (!schedule[day][groupId]) {
            schedule[day][groupId] = [];
          }

          schedule[day][groupId].push({ entry, lecturer, room, slot: item.slot });
        });
      }
    });
  });

  const groups = Array.from(uniqueGroupIds);

  const nextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek + 1);
  };

  const prevWeek = () => {
    setCurrentWeek(prevWeek => (prevWeek > 1 ? prevWeek - 1 : 1));
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center space-x-2 mb-4'>
        <button onClick={prevWeek}><ChevronLeft className="h-10 w-10" /></button>
        <span className='text-primary text-2xl'>Неделя: {currentWeek} </span>
        <button onClick={nextWeek}><ChevronRight className="h-10 w-10" /></button>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">День недели</th>
              <th className="border border-gray-300 p-2">Время</th>
              {groups.map((group, index) => (
                <th key={index} className="border border-gray-300 p-2">Группа {group}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map(day => (
              <React.Fragment key={day}>
                {Object.keys(timeSlots).map((slot, index) => (
                  <tr key={`${day}-${slot}`} className="hover:bg-gray-50">
                    {index === 0 ? (
                      <td className="border border-gray-300 p-2" rowSpan={6}>
                        {day}
                      </td>
                    ) : null}
                    <td className="border border-gray-300 p-2">{timeSlots[slot]}</td>
                    {groups.map(group => {
                      const groupEntries = schedule[day][group] || [];
                      const groupEntry = groupEntries.find(e => e.slot === parseInt(slot));
                      return (
                        <td key={group} className="border border-gray-300 p-2">
                          {groupEntry ? (
                            <div>
                              {groupEntry.entry} - {groupEntry.lecturer} - {groupEntry.room}
                            </div>
                          ) : 'Нет занятий'}
 </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Timetable;