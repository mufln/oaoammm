'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from 'react'
import { Button } from '@headlessui/react'

import { Combobox } from "@/components/combobox"

import Edit from "./edit"

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

const people = [
  {id: 1, name: 'Сотрудник 1'},
  {id: 2, name: 'Сотрудник 2'},
  {id: 3, name: 'Сотрудник 3'},
]

export default function Example() {
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null)
  const [ selectedWorker, setSelectedWorker ] = useState<number | null>(null)
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
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <span className="flex select-none items-center px-4 text-black sm:text-sm">Институт</span>
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
                  <Combobox 
                  items={institutions}
                  placeholder="Выберите институт"
                  onSelect={(value) => setSelectedInstitution(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedInstitution} institutions={institutions} isWorkers={false}/>
              </div>
              
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-12">
          <h2 className="text-xl font-semibold text-gray-900">Сотрудники</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Добавить сотрудника или редактировать информацию о сотруднике.
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
                    placeholder="Введите ФИО"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Select>
                <SelectTrigger className="w-[200px] px-0 mx-2">
                  <SelectValue placeholder="Выберите роль"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Выберите роль</SelectLabel>
                    <SelectItem value="apple">Администратор</SelectItem>
                    <SelectItem value="banana">Студент</SelectItem>
                    <SelectItem value="blueberry">Ректор</SelectItem>
                    <SelectItem value="grapes">Заведующий кафедры</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать информацию о сотрудниках</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                <Combobox 
                  items={people}
                  placeholder="Выберите сотрудника"
                  onSelect={(value) => setSelectedWorker(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedWorker} institutions={people} isWorkers={true}/>
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
                <Combobox 
                  items={campuses}
                  placeholder="Выберите кампус"
                  onSelect={(value) => setSelectedCampus(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedCampus} institutions={campuses} isWorkers={false}/>
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
                <Combobox 
                  items={classes}
                  placeholder="Выберите аудиторию"
                  onSelect={(value) => setSelectedClass(Number(value))}
                />
                </div>
                <Edit selectedInstitution={selectedClass} institutions={classes} isWorkers={false}/>
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
                <Combobox 
                  items={subjects}
                  placeholder="Выберите дисциплину"
                  onSelect={(value) => setSelectedSubject(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedSubject} institutions={subjects} isWorkers={false}/>
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
                <Combobox 
                  items={groups}
                  placeholder="Выберите группу"
                  onSelect={(value) => setSelectedGroup(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedGroup} institutions={groups} isWorkers={false}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
