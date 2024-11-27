/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'
import { Button } from '@headlessui/react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const institutions = [
  {id: 1, name: 'Институт информационных технологий'},
  {id: 2, name: 'Институт индустриального программирования'},
  {id: 3, name: 'Институт радиоэлектроники'},
  {id: 4, name: 'Институт тонких химических технологий'},
]

const subjects = [
  {id: 1, name: 'Математика'},
  {id: 2, name: 'Физика'},
  {id: 3, name: 'Информатика'},
]

const groups = [
  {id: 1, name: 'Группа 1'},
  {id: 2, name: 'Группа 2'},
  {id: 3, name: 'Группа 3'},
  {id: 4, name: 'Группа 4'},
  {id: 5, name: 'Группа 5'},
  {id: 6, name: 'Группа 6'},
  {id: 7, name: 'Группа 7'},
  {id: 8, name: 'Группа 8'},
]

const classes = [
  {id: 1, name: 'Класс 1'},
  {id: 2, name: 'Класс 2'},
  {id: 3, name: 'Класс 3'},
]

const campuses = [
  {id: 1, name: 'Кампус 1'},
  {id: 2, name: 'Кампус 2'},
  {id: 3, name: 'Кампус 3'},
]

const fields = [{label: 'Институты', isEditing: false},
                {label: 'Кампусы', isEditing: false},
                {label: 'Аудитории', isEditing: false},
                {label: 'Группы', isEditing: false},
                {label: 'Дисциплины', isEditing: false},
]

export default function Example() {
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null)
  const [ selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [ selectedSubject, setSelectedSubject] = useState<number | null>(null)
  const [ selectedClass, setSelectedClass] = useState<number | null>(null)
  const [ selectedCampus, setSelectedCampus] = useState<number | null>(null)
  
  return (
    <div>
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Институты</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить институт или редактировать информацию об институте.
          </p>

          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <span className="flex select-none items-center px-4 text-black sm:text-sm">Институт </span>
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="технологий управления"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
                </div>
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать институты</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedInstitution(Number(value))}>
                    <SelectTrigger id="item-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите институт" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                  Изменить
                </Button>
                <Button className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                  Удалить
                </Button>
              </div>
              
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Кампусы</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить кампус или редактировать информацию о кампусе.
          </p>

          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название кампуса"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать кампусы</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedCampus(Number(value))}>
                    <SelectTrigger id="item-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите аудиторию" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                  Изменить
                </Button>
                <Button className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Аудитории</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить аудитории или редактировать информацию об аудиториях.
          </p>
          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название группы"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать аудитории</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedClass(Number(value))}>
                    <SelectTrigger id="item-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите аудиторию" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                  Изменить
                </Button>
                <Button className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Дисциплины</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить дисциплины или редактировать информацию о дисциплинах.
          </p>
          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название дисциплины"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать дисциплины</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedSubject(Number(value))}>
                    <SelectTrigger id="item-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите дисциплину" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                  Изменить
                </Button>
                <Button className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Группы</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить группу или редактировать информацию о группе.
          </p>
          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название группы"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать группы</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedGroup(Number(value))}>
                    <SelectTrigger id="item-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите группу" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                  Изменить
                </Button>
                <Button className="m-4 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
