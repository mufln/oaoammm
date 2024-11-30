'use client'
import React from "react";
import { useState } from "react";

interface Elective {
    id: number;
    name: string;
    affiliationId: number;
    campusId: number;
    description: string | null;
}

const initialMyElectives: Elective[] = [
    {   
        id: 1,
        name: "Физика1",
        affiliationId: 1,
        campusId: 1,
        description: "Физика для всех"
    },
    {   
        id: 2,
        name: "Математика1",
        affiliationId: 1,
        campusId: 1,
        description: "Математика для всех"
    }
];

const initialAvailableElectives: Elective[] = [
    {   
        id: 3,
        name: "Физика",
        affiliationId: 1,
        campusId: 1,
        description: "Физика для всех"
    },
    {   
        id: 4,
        name: "Математика",
        affiliationId: 1,
        campusId: 1,
        description: "Математика для всех"
    }
];

export default function Electives() {
    const [myElectives, setMyElectives] = useState<Elective[]>(initialMyElectives);
    const [availableElectives, setAvailableElectives] = useState<Elective[]>(initialAvailableElectives);
    const [mySearchTerm, setMySearchTerm] = useState("");
    const [availableSearchTerm, setAvailableSearchTerm] = useState("");
    const [selectedElective, setSelectedElective] = useState<Elective | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = () => {
        // Отправка сохраненных данных на сервер
        alert("Изменения сохранены");
        console.log("save");
    }

    const openModal = (elective: Elective) => {
        setSelectedElective(elective);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedElective(null);
        setIsModalOpen(false);
    }

    const filteredMyElectives = myElectives.filter(elective => 
        elective.name.toLowerCase().includes(mySearchTerm.toLowerCase())
    );

    const filteredAvailableElectives = availableElectives.filter(elective => 
        elective.name.toLowerCase().includes(availableSearchTerm.toLowerCase())
    );

    const registerElective = (elective: Elective) => {
        setMyElectives([...myElectives, elective]);
        setAvailableElectives(availableElectives.filter(item => item.id !== elective.id));
    }

    const deleteElective = (elective: Elective) => {
        setAvailableElectives([...availableElectives, elective]);
        setMyElectives(myElectives.filter(item => item.id !== elective.id));
    }

    return (
        <div className="flex w-full items-center justify-center">
            <div className="w-[80%] ">
                <h2 className="font-italic text-xl p-2 text-indigo-600">Мои факультативы</h2>
                <div className="flex flex-wrap gap-y-2 space-x-4 mb-4">
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded px-4 py-2" 
                        placeholder="Поиск"
                        value={mySearchTerm}
                        onChange={(e) => setMySearchTerm(e.target.value)}
                    />
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                    {filteredMyElectives.map((subject, ind) => (
                        <li key={ind} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="text-xl items-center justify-center flex font-bold">{subject.name}</div>
                                <button 
                                    className="text-indigo-600 hover:text-indigo-400"
                                    onClick={() => openModal(subject)}
                                > Подробнее
                                </button>
                            </div>
                            <div className="flex flex-col items-end">
                                <button 
                                    className="text-red-600 hover:text-red-400 text-xl"
                                    onClick={() => deleteElective(subject)}
                                >
                                    -
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <h2 className="font-italic text-xl p-2 text-indigo-600">Доступные</h2>
                <div className="flex flex-wrap gap-y-2 space-x-4 mb-4">
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded px-4 py-2" 
                        placeholder="Поиск"
                        value={availableSearchTerm}
                        onChange={(e) => setAvailableSearchTerm(e.target.value)}
                    />
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                    {filteredAvailableElectives.map((subject, ind) => (
                        <li key={ind} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="text-xl items-center justify-center flex font-bold">{subject.name}</div>
                                <button 
                                    className="text-indigo-600 hover:text-indigo-400"
                                    onClick={() => openModal(subject)}
                                > Подробнее
                                </button>
                            </div>
                            <div className="flex flex-col items-end">
                                <button 
                                    className="text-green-600 hover:text-green-400 text-xl"
                                    onClick={() => registerElective(subject)}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="w-full flex justify-center py-4">
                    <button 
                        className="border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo rounded px-4 py-2 justify-center"
                        onClick={handleSave}
                    > Сохранить
                    </button>
                </div>
                
            </div>

            {/* Модальное окно */}
            {isModalOpen && selectedElective && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 sm:w-1/3 md:w-1/2 lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-4">{selectedElective.name}</h2>
                        <p>{selectedElective.description}</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-400"
                                onClick={closeModal}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}