'use client'
import React, { useState } from "react";

export default function GitStudent() {

    const tasks = [
        { subject: "Системы искусственного интеллекта", taskName: "Задача 1", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
        { subject: "Системы искусственного интеллекта", taskName: "Задача 2", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
        { subject: "Бэкенд-разработка", taskName: "Задача 3", description: "Пойти на сайт и проверить что все работает на сайте и проверить что все работает на сайте и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
        { subject: "Бэкенд-разработка", taskName: "Задача 4", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
        { subject: "Бэкенд-разработка", taskName: "Задача 5", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
    ];

    // Получаем уникальные значения subject
    const uniqueSubjects = [...new Set(tasks.map(task => task.subject))];

    const [selectedSubject, setSelectedSubject] = useState("");

    // Фильтруем задачи по выбранному subject
    const filteredTasks = selectedSubject ? tasks.filter(task => task.subject === selectedSubject) : tasks;

    
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex flex-col w-[80%] gap-y-4">
                <h1 className="font-bold text-4xl p-2 pb-5 pt-0">Репозиторий</h1>

                <select onChange={(e) => setSelectedSubject(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
                    <option value="">Все предметы</option>
                    {uniqueSubjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                    ))}
                </select>

                <ul role="list" className="divide-y divide-gray-100 max-h-[75vh] sm:max-h-[55vh] overflow-y-auto">
                            {filteredTasks.map((task, index) => (
                                <li className="flex justify-between gap-x-6 py-4 items-center" key={index}>
                                    
                                    <a href={task.gitLink} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        {task.taskName}
                                    </a>
                                    <p className="text-gray-500 sm:w-[50%]">{task.description}</p>
                                    <p className="text-bold w-[25%] overflow-hidden">{task.subject}</p>
                                </li>
                            ))}
                </ul>
            </div>
        </div>
    );
}