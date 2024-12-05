'use client';
import React, { useState } from "react";
import leftArrowG from "./left"
import rightArrowG from "./right"
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";


const getGroupTimeTable = async (groupId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable/group/${groupId}`, {
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

const tt = await getGroupTimeTable(1);
console.log(tt);


function defineTime(slot: number) {
    switch (slot) {
        case 1:
            return "09:00 - 10:30";
        case 2:
            return "10:40 - 12:10";
        case 3:
            return "12:40 - 14:10";
        case 4:
            return "14:20 - 15:50";
        case 5:
            return "16:20 - 17:50";
        case 6:
            return "18:00 - 19:30";
        default:
            return "";
    }
}

function transformData(inputData) {
    const weeksData = [];

    // Группируем данные по неделям
    inputData.forEach(item => {
        const weekIndex = item.week - 1; // Индекс недели (0 для первой недели, 1 для второй и т.д.)
        const dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        const dayIndex = item.day - 1; // Индекс дня (0 для понедельника, 1 для вторника и т.д.)

        // Убедимся, что массив для недели существует
        if (!weeksData[weekIndex]) {
            weeksData[weekIndex] = {
                nomer: weekIndex + 1,
                type: weekIndex % 2 === 0 ? "Нечетная" : "Четная",
                days: Array(6).fill(null).map((_, i) => ({ day: dayNames[i], subjects: [] }))
            };
        }

        // Создаем объект предмета
        const subject = {
            number: item.slot,
            name: item.class.name,
            time: `${defineTime(item.slot)}`, // Пример времени, можно адаптировать
            teacher: item.lecturer.user.name,
            room: item.room.name,
            building: item.room.campus.address
        };

        // Добавляем предмет в соответствующий день
        weeksData[weekIndex].days[dayIndex].subjects.push(subject);
    });

    // Сортируем предметы по номеру пары в каждом дне
    weeksData.forEach(week => {
        week.days.forEach(day => {
            day.subjects.sort((a, b) => a.number - b.number);
        });
    });

    return weeksData;
}


// Пример использования
const inputData = tt;
const weeksData = transformData(inputData);
// console.log(JSON.stringify(outputData, null, 2));

// Example data structure for weeksData
// const weeksData = [
//     {
//         nomer: 1,
//         type: "Нечетная",
//         days: [
//             { day: "Понедельник", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Вторник", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Среда", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Четверг", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Пятница", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Суббота", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//         ],
//     },
//     {
//         nomer: 2,
//         type: "Четная",
//         days: [
//             { day: "Понедельник", subjects: [
//                 {number: 1, name: "Math2", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Вторник", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Среда", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Четверг", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Пятница", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Суббота", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//         ]
//     },
//     {
//         nomer: 3,
//         type: "Нечетная",
//         days: [
//             { day: "Понедельник", subjects: [
//                 {number: 1, name: "Math3", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Вторник", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Среда", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Четверг", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Пятница", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//             { day: "Суббота", subjects: [
//                 {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//                 {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
//             ] },
//         ]
//     }         
//     // Add more weeks as needed
// ];

const ScheduleTemplate = (day: string, week: number) => {
    let index = 0;
    switch (day) {
        case "Понедельник":
            index = 0;
            break;
        case "Вторник":
            index = 1;
            break;
        case "Среда":
            index = 2;
            break;
        case "Четверг":
            index = 3;
            break;
        case "Пятница":
            index = 4;
            break;
        case "Суббота":
            index = 5;
            break;
        default:
            return null; // Return null or handle the case when the day is not recognized
    }
    return (
        <div className="p-2">
            <ul role="list" className="divide-y divide-gray-100">
                {weeksData[week].days[index].subjects.map((subject, ind) => (
                    <li key={ind} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="text-2xl size-12 items-center justify-center flex rounded-full bg-indigo-100">
                                {subject.number}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{subject.name}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{subject.teacher}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-sm/6 text-gray-900">{subject.time}</p>
                            <p className="mt-1 text-xs/5 text-gray-500">{subject.building} : {subject.room}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Schedule() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null); // Allow string or null
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const {data: timeTableData, isLoading, error} = useQuery({
        queryKey: ["timetable"],
        queryFn: () => getGroupTimeTable(1),
    });
    console.log(timeTableData);

    // Define currentWeek based on currentWeekIndex
    const currentWeek = weeksData[currentWeekIndex];

    const handleButtonClick = (day: string) => {
        setSelectedDay(day);
    };

    const handleNextWeek = () => {
        if (currentWeekIndex < weeksData.length - 1) {
            setCurrentWeekIndex(currentWeekIndex + 1);
        }
    };

    const handlePreviousWeek = () => {
        if (currentWeekIndex > 0) {
            setCurrentWeekIndex(currentWeekIndex - 1);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-[80%]">
                <h1 className="font-bold text-4xl p-2">Расписание</h1>
                <div className="flex justify-center gap-x-2 p-2">
                    <button 
                        onClick={handlePreviousWeek} 
                        className="px-4 py-1 bg-indigo-600 text-white border-2 border-indigo-600 rounded-full text-center align-middle hover:bg-indigo-500 hover:border-indigo-500 hover:cursor-pointer">
                        {leftArrowG()}
                    </button>
                    <p className="px-4 py-1 bg-indigo-600 text-white border-2 border-indigo-600 rounded-full text-center align-middle">
                        Неделя {currentWeek.nomer} ({currentWeek.type})
                    </p>
                    <button 
                        onClick={handleNextWeek} 
                        className="px-4 py-1 bg-indigo-600 text-white border-2 border-indigo-600 rounded-full text-center align-middle hover:bg-indigo-500 hover:border-indigo-500 hover:cursor-pointer">
                        {rightArrowG()}
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex justify-between p-3 rounded-lg w-full flex-wrap center">
                        {currentWeek.days.map((dayOne) => (
                            <div 
                                key={dayOne.day} 
                                onClick={() => handleButtonClick(dayOne.day)} 
                                className="justify-center w-[16%] btn flex flex-col gap-y-1 border-2 border-indigo-600 rounded-lg p-2 bg-indigo-600 text-white hover:bg-indigo-500 hover:border-indigo-500 hover:cursor-pointer">
                                <div className="text-ellipsis overflow-hidden text-center">{dayOne.day}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedDay != null ? <div>{ScheduleTemplate(selectedDay, currentWeekIndex)}</div>
                :
                <div className="flex flex-col items-center justify-center grow space-y-4 m-16">
          <svg width="220" height="185" viewBox="0 0 220 185" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M108.375 48.5783L112.047 78.7589L123.586 50.6309M108.375 48.5783L73.9094 36.1833L68.4053 36.5877M108.375 48.5783C89.7031 35.4565 81.162 25.2394 50.1675 30.3981L49.1412 38.0037L68.4053 36.5877M123.586 50.6309L161.372 47.986L166.291 49.7969M123.586 50.6309C151.352 40.5007 164.826 39.735 184.531 48.5296L183.505 56.1353L166.291 49.7969M68.4053 36.5877L75.015 85.3776L86.7546 93.371M166.291 49.7969L145.999 94.9566L135.582 98.5193M135.582 98.5193L116.855 104.924M135.582 98.5193L137.472 102.325M86.7546 93.371L72.3052 116.394M86.7546 93.371L89.5723 95.2896M14.8986 101.045L4.66602 68.9257L48.1543 56.135L51.0716 68.9257M51.0716 68.9257L61.2816 113.693M51.0716 68.9257L58.3871 66.3676L59.1694 79.1582M25.1312 136.716L27.6894 144.391L43.038 138.039M43.038 138.039L46.2357 136.716L64.7822 129.042L61.2816 113.693M43.038 138.039L46.2357 144.391L64.7822 139.445M61.2816 113.693L59.1694 79.1582M59.1694 79.1582H67.3406L72.3052 116.394M72.3052 116.394L75.0147 136.716L64.7822 139.445M64.7822 139.445L77.7983 155.42M191.861 120.231L203.372 99.7664L165 81.8594L156.543 97.2082M156.543 97.2082L145.814 93.371L143.119 113.693M156.543 97.2082L141.742 124.069M171.396 150.929L165 162.441L147.733 153.487M147.733 153.487L130.465 144.534L141.742 124.069M147.733 153.487L136.541 163.08M143.119 113.693L141.742 124.069M143.119 113.693L137.472 102.325M77.7983 155.42L90.8143 171.394L125.349 172.673L136.541 163.08M77.7983 155.42L43.0383 172.673M136.541 163.08L171.396 177.79M89.5723 95.2896L92.3901 97.2082L104.884 105.715M89.5723 95.2896C90.0346 101.908 92.9189 106.273 102.392 115.115M116.855 104.924L108.112 107.913L104.884 105.715M116.855 104.924C116.855 104.924 122.021 108.716 123.586 112.557C123.368 113.492 123.139 114.337 122.89 115.115M137.472 102.325L122.89 115.115M43.0383 172.673L35.8143 158.604M43.0383 172.673L51.0716 158.604M43.0383 172.673L51.0716 180.348M171.396 177.79V164.999M171.396 177.79L185.465 171.394M171.396 177.79L158.605 180.348M104.884 105.715C103.094 108.373 102.328 110.3 102.243 112.557C102.213 113.353 102.268 114.19 102.392 115.115M102.392 115.115C102.447 115.523 102.516 115.948 102.597 116.394C104.642 118.738 106.484 120.311 108.867 121.511M116.855 124.069C120.036 121.013 121.698 118.83 122.89 115.115M116.855 124.069C113.447 123.323 110.95 122.559 108.867 121.511M116.855 124.069C119.682 135.128 118.833 141.336 123.586 148.371C118.503 154.379 118.735 156.46 113.838 162.441L97.2097 149.65L108.867 121.511M198.256 33.255L202.093 28.1387C231.512 20.4651 208.488 -7.67465 198.256 11.5109M116.855 43.1258L61.4354 13.8495L121.797 6.50696L179.32 29.7575L116.855 43.1258ZM128.068 68.3069C125.09 80.8116 141.74 81.7678 145.814 70.7016C149.889 59.6356 131.046 55.8022 128.068 68.3069ZM84.8508 60.8919C84.485 73.7491 102.287 73.57 102.597 63.2865C102.907 53.0031 85.2169 48.0346 84.8508 60.8919ZM77.7983 70.7016C77.4562 73.2369 81.2589 73.7501 81.6009 71.2147C81.9432 68.6796 78.1405 68.1664 77.7983 70.7016ZM143.256 81.8594C142.914 84.3945 146.751 84.3945 147.093 81.8594C147.435 79.3243 143.598 79.3243 143.256 81.8594ZM9.78229 111.135L14.8986 136.716L30.2473 129.042C39.1248 116.816 39.2827 108.158 34.0845 90.6699L9.78229 111.135ZM176.512 112.557L203.372 134.301L185.465 156.045L173.954 147.092C170.829 134.103 171.617 126.518 176.512 112.557ZM193.174 40.416C192.832 42.9511 196.635 43.4643 196.977 40.9292C197.319 38.394 193.516 37.8809 193.174 40.416Z" stroke="#D4D4D8" strokeWidth="3.5"/>
</svg>


          <p className='text-zinc-300 font-semibold text-xl'>Выберите день недели </p>        
        </div>}
            </div>
        </div>
    );
}