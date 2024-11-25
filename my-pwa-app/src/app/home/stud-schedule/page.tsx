'use client';
import React, { useState } from "react";
import leftArrowG from "./left"
import rightArrowG from "./right"

// Example data structure for weeksData
const weeksData = [
    {
        nomer: 1,
        type: "Нечетная",
        days: [
            { day: "Понедельник", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Вторник", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Среда", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Четверг", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Пятница", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Суббота", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
        ],
    },
    {
        nomer: 2,
        type: "Четная",
        days: [
            { day: "Понедельник", subjects: [
                {number: 1, name: "Math2", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Вторник", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Среда", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Четверг", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Пятница", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Суббота", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
        ]
    },
    {
        nomer: 3,
        type: "Нечетная",
        days: [
            { day: "Понедельник", subjects: [
                {number: 1, name: "Math3", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Вторник", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Среда", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 6, name: "Math", time: "17.10 - 18.40", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Четверг", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 5, name: "Math", time: "15.30 - 17.00", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Пятница", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 4, name: "Math", time: "13.50 - 15.20", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
            { day: "Суббота", subjects: [
                {number: 1, name: "Math", time: "9.00 - 10.30", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 2, name: "Math", time: "10.40 - 12.10", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
                {number: 3, name: "Math", time: "12.20 - 13.50", teacher: "Евгений Лебедев", room: "101", building: "В-78."},
            ] },
        ]
    }         
    // Add more weeks as needed
];

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
                {selectedDay != null && (<div>{ScheduleTemplate(selectedDay, currentWeekIndex)}</div>)}
            </div>
        </div>
    );
}