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

const fields = [{label: 'Институты', isEditing: false},
                {label: 'Кампусы', isEditing: false},
                {label: 'Аудитории', isEditing: false},
]

export default function Example() {
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null)
  
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
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="технологий управления"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
                </div>
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить институт
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать институты</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedInstitution(Number(value))}>
                    <SelectTrigger id="Institution-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите институт" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(institution => (
                        <SelectItem key={institution.id} value={institution.id.toString()}>{institution.name}</SelectItem>
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
              <div className="">
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Введите название кампуса"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить кампус
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать кампусы</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedInstitution(Number(value))}>
                    <SelectTrigger id="Institution-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите кампус" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(institution => (
                        <SelectItem key={institution.id} value={institution.id.toString()}>{institution.name}</SelectItem>
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
            Добавить аудиторию или редактировать информацию об аудитории.
          </p>

          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex items-center sm:flex-wrap sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="">
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Введите название аудитории"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="m-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить кампус
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать кампусы</h2>
              </label>
              <div className="flex items-center sm:flex-wrap sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                  <Select onValueChange={(value) => setSelectedInstitution(Number(value))}>
                    <SelectTrigger id="Institution-select" className="w-[180px] ring-1 ring-zinc-300 ring-inset">
                      <SelectValue placeholder="Выберите кампус" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(institution => (
                        <SelectItem key={institution.id} value={institution.id.toString()}>{institution.name}</SelectItem>
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
