'use client'
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useMemo } from 'react';
import { useRouter } from "next/navigation";

const studentInfo = {
    name: "Иванов Иван Иванович",
    login: "ivanov.i.i@edu.mirea.ru",
    sex: "муж.",
    age: 20,
    birthday: "28.09.2004",
    phone: "79991234567",
    email: "ivanov.i.i@edu.mirea.ru",
    group: "ЭФБО-00-00",
    personalNumber: "1234567890",
    course: 2,
    type: "Активный"
}

const adminInfo = {
    name: "Иванов Иван Иванович",
    login: "ivanov.i.i@edu.mirea.ru",
    sex: "муж.",
    age: 40,
    birthday: "28.09.1984",
    email: "ivanov.i.i@edu.mirea.ru",
    department: "Кафедра компьютерных наук",
    personalNumber: "1234567890",
    role: "Преподаватель",
    type: "Активный",
    subjects: ["Математика", "Физика", "Информатика"]
}



export function AdminProfile() {
    const [isVisible, setIsVisible] = useState(false); 

    const router = useRouter()

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Dialog>
      <DialogTrigger asChild>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className='inline-flex max-w-max space-x-4'>
            <img className="inline-block size-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            <div className='flex flex-col'>
              <div className='text-sm/6 font-semibold text-gray-900'>Профиль</div> 
              <div className='text-xs text-gray-500'>Ректор</div>
            </div>
          </a>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-max">
        <DialogHeader>
          <DialogTitle>Профиль</DialogTitle>
          <DialogDescription>
            Информация и настройки профиля
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white mx-auto w-max"> 
                   <div className="flex flex-col sm:flex-row items-center">
                        <div className="rounded-full w-32 h-32 bg-indigo-100 text-indigo-600 text-5xl font-bold content-center text-center">{studentInfo.name[0]}</div>
                        <div className="ml-8">
                            <button className="flex mt-4 py-2 px-auto space-x-4" onClick={() => router.push('/admin/admin-profile-edit')}>
                                <h2 className="text-xl font-semibold">{studentInfo.name}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                            </button>
                            <p className="text-gray-600">Логин: {studentInfo.login}</p>
                            <p className="text-gray-600">Пол: {studentInfo.sex}</p>
                            <p className="text-gray-600">Возраст: {studentInfo.age} ({studentInfo.birthday})</p>
                            <p className="text-indigo-600 mt-2"><i className="fas fa-envelope"></i> {studentInfo.email}</p>
                            <button className="flex mt-4 text-base text-red-500 py-2 px-4 rounded ring-1 ring-red-500 space-x-4 px-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
                                <div>Выйти из аккаунта</div>
                            </button>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-gray-600">Кафедра</p>
                            <p className="font-semibold">{adminInfo.department}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Личный номер</p>
                            <p className="font-semibold">{adminInfo.personalNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Должность</p>
                            <p className="font-semibold">{adminInfo.role}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Состояние</p>
                            <p className="font-semibold text-indigo-600">{adminInfo.type}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={toggleVisibility} className="bg-indigo-600 text-white py-2 px-4 rounded">{isVisible ? 'Скрыть предметы' : 'Показать предметы'}</button>
                    </div>
                    {isVisible && (
            <ul className="divide-y divide-gray-100 p-2">
                {adminInfo.subjects.map((item, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="text-2xl font-bold content-center">{item}</div>
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded">Подробнее</button>
                </li>
            ))}
            </ul>
        )}
        </div>
      </DialogContent>
    </Dialog>
        
    )
}