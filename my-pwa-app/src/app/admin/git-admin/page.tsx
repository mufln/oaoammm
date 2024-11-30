'use client'
import React, { useState } from "react";
import { Button } from '@headlessui/react'

interface Task {
    taskName: string;
    description: string;
    gitLink: string;
}

interface Group {
    name: string;
    tasks: Task[];
}

interface Subject {
    name: string;
    groups: Group[];
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [newTask, setNewTask] = useState<Task>({ taskName: '', description: '', gitLink: '' });

    const handleAddTask = () => {
        if (newTask.taskName && newTask.description && newTask.gitLink) {
            onAddTask(newTask);
            setNewTask({ taskName: '', description: '', gitLink: '' }); // Сбросить форму
            onClose(); // Закрыть модальное окно
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded p-6 w-96">
                <h3 className="text-lg font-bold">Добавить новую задачу:</h3>
                <input
                    type="text"
                    placeholder="Имя задачи"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Ссылка на репозиторий"
                    value={newTask.gitLink}
                    onChange={(e) => setNewTask({ ...newTask, gitLink: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
                />
                <div className="flex justify-between">
                    <Button onClick={handleAddTask} className="border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-400 hover:border-indigo-400 rounded px-4 py-2">
                        Добавить
                    </Button>
                    <Button onClick={onClose} className="border border-gray-300 rounded px-4 py-2">
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function GitAdmin() {
    const initialSubjects: Subject[] = [
        { name: "Бэкенд-разработка", groups: [
            { name: "ЭФБО-01-23", tasks: [
                { taskName: "Задача 1", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 2", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 3", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 4", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 5", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
            ]},
            { name: "ЭФБО-02-23", tasks: [
                { taskName: "Задача 1", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 2", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 3", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 4", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 5", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
            ]},
        ]},
        { name: "Системы искусственного интеллекта", groups: [
            { name: "ИИИИ-01-23", tasks: [
                { taskName: "Задача 1", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 2", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 3", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 4", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 5", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
            ]},
            { name: "ИКБО-02-23", tasks: [
                { taskName: "Задача 1", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 2", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 3", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 4", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
                { taskName: "Задача 5", description: "Пойти на сайт и проверить что все работает", gitLink: "https://github.com/ivanfan-123/test-repo" },
            ]},
        ]}
    ];

    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subjectName = e.target.value;
        setSelectedSubject(subjectName);
        setSelectedGroup('');
    };

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const groupName = e.target.value;
        setSelectedGroup(groupName);
    };

    const handleAddTask = (newTask: Task) => {
        setSubjects((prevSubjects) => {
            return prevSubjects.map((subject) => {
                if (subject.name === selectedSubject) {
                    return {
                        ...subject,
                        groups: subject.groups.map((group) => {
                            if (group.name === selectedGroup) {
                                return {
                                    ...group,
                                    tasks: [...group.tasks, newTask],
                                };
                            }
                            return group;
                        }),
                    };
                }
                return subject;
            });
        });
    };

    const handleDeleteTask = (index: number) => {
        setSubjects((prevSubjects) => {
            return prevSubjects.map((subject) => {
                if (subject.name === selectedSubject) {
                    return {
                        ...subject,
                        groups: subject.groups.map((group) => {
                            if (group.name === selectedGroup) {
                                const updatedTasks = group.tasks.filter((_, i) => i !== index);
                                return {
                                    ...group,
                                    tasks: updatedTasks,
                                };
                            }
                            return group;
                        }),
                    };
                }
                return subject;
            });
        });
    };

    const tasks = selectedSubject && selectedGroup
        ? subjects.find(subject => subject.name === selectedSubject)?.groups.find(group => group.name === selectedGroup)?.tasks || []
        : [];

    return (
        <div className="flex w-full items-center justify-center">
            <div className="w-[80%]">
                <h1 className="font-bold text-4xl p-2 pb-5 pt-0">Репозиторий</h1>

                <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4">
                    <select
                        className="border border-gray-300 rounded px-4 py-2"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                    >
                        <option value="">Выберите предмет</option>
                        {subjects.map((subject) => (
                            <option key={subject.name} value={subject.name}>
                                {subject.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border border-gray-300 rounded px-4 py-2"
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        disabled={!selectedSubject}
                    >
                        <option value="">Выберите группу</option>
                        {selectedSubject && subjects.find(subject => subject.name === selectedSubject)?.groups.map((group) => (
                            <option key={group.name} value={group.name}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {tasks.length > 0 && (
                    <div className="mt-4 pb-4">
                        <h2 className="text-lg font-bold">Задачи для группы {selectedGroup}:</h2>
                        
                        <ul role="list" className="divide-y divide-gray-100 max-h-[75vh] sm:max-h-[55vh] overflow-y-auto">
                            {tasks.map((task, index) => (
                                <li className="flex justify-between gap-x-6 py-4 items-center" key={index}>
                                    <a href={task.gitLink} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        {task.taskName}
                                    </a>
                                    <p className="text-gray-500">{task.description}</p>
                                    <Button onClick={() => handleDeleteTask(index)} className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                                        Удалить
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center w-full">
                            <Button onClick={() => setIsModalOpen(true)} className="border border-indigo-600 bg-indigo-600 text-white hover:border-indigo-400 hover:bg-indigo-400 rounded px-4 py-2">
                                Добавить задачу
                            </Button>
                        </div>

                    </div>
                )}

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />
            </div>
        </div>
    );
}