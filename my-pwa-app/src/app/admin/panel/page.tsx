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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const people= [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product'
  },
]

const getUsers = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const users = await response.json(); // Преобразуем ответ в JSON
      return users; // Возвращаем массив пользователей
    } else {
      throw new Error('Не удалось получить пользователей');
    }
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

// Пример использования функции getUsers
const fetchUsers = async () => {
  try {
    const usersArray = await getUsers(); // Получаем массив пользователей
    return usersArray; // Возвращаем массив пользователей
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

const workers = await fetchUsers();

const getCampuses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campus`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const institutions = await response.json(); // Преобразуем ответ в JSON
      return institutions; // Возвращаем массив институтов
    } else {
      throw new Error('Не удалось получить кампусы');
    }
  } catch (error) {
    console.error('Ошибка при получении кампусов:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

// Пример использования функции getUsers
const fetchCampuses = async () => {
  try {
    const institutionsArray = await getCampuses(); // Получаем массив институтов
    return institutionsArray; // Возвращаем массив институтов
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

function transformToCampuses(data) {
  return data.map((item) => ({
    id: item.id,
    name: item.address
  }));
}

const campusesInit = await fetchCampuses();
console.log(campusesInit);

const campuses = transformToCampuses(campusesInit);
console.log(campuses);

const getInstitutions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutes`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const institutions = await response.json(); // Преобразуем ответ в JSON
      return institutions; // Возвращаем массив институтов
    } else {
      throw new Error('Не удалось получить институты');
    }
  }
  catch (error) {
    console.error('Ошибка при получении институтов:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

// Пример использования функции getUsers
const fetchInstitutions = async () => {
  try {
    const institutionsArray = await getInstitutions(); // Получаем массив институтов
    return institutionsArray; // Возвращаем массив институтов
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

const institutions = await fetchInstitutions();

const getSubjects = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const subjects = await response.json(); // Преобразуем ответ в JSON
      return subjects; // Возвращаем массив предметов
    } else {
      throw new Error('Не удалось получить предметы');
    }
  }
  catch (error) {
    console.error('Ошибка при получении предметов:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

const subjects = await getSubjects();

const getGroups = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const groups = await response.json(); // Преобразуем ответ в JSON
      return groups; // Возвращаем массив групп
    } else {
      throw new Error('Не удалось получить группы');
    }
  }
  catch (error) {
    console.error('Ошибка при получении групп:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

const groups = await getGroups();

const getClasses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    // Проверяем статус-код ответа
    if (response.status === 200) {
      const classes = await response.json(); // Преобразуем ответ в JSON
      return classes; // Возвращаем массив классов
    } else {
      throw new Error('Не удалось получить классы');
    }
  }
  catch (error) {
    console.error('Ошибка при получении классов:', error);
    throw error; // Пробрасываем ошибку дальше
  }
};

const classes = await getClasses();
// ]

// const subjects = [
//   {id: 1, name: 'Математика'},
//   {id: 2, name: 'Физика'},
//   {id: 3, name: 'Информатика'},
// ]

// const groups = [
//   {id: 1, name: 'Группа 1'},
//   {id: 2, name: 'Группа 2'},
//   {id: 3, name: 'Группа 3'},
//   {id: 4, name: 'Группа 4'},
//   {id: 5, name: 'Группа 5'},
//   {id: 6, name: 'Группа 6'},
//   {id: 7, name: 'Группа 7'},
//   {id: 8, name: 'Группа 8'},
// ]

// const classes = [
//   { id: 1, name: 'А-101' },
//   { id: 2, name: 'Б-202' },
//   { id: 3, name: 'В-303' },
//   { id: 4, name: 'Г-404' },
//   { id: 5, name: 'Д-505' },
//   { id: 6, name: 'Е-606' },
//   { id: 7, name: 'З-707' },
//   { id: 8, name: 'И-808' },
//   { id: 9, name: 'К-909' },
//   { id: 10, name: 'Л-101' },
//   { id: 11, name: 'МП-61' },
//   { id: 12, name: 'НТ-72' },
// ];

// const campuses = [
//   {id: 1, name: 'Кампус 1'},
//   {id: 2, name: 'Кампус 2'},
//   {id: 3, name: 'Кампус 3'},
// ]


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
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              <div className="">
                <div className="flex rounded-md shadow-sm ring-1 mr-4 ring-inset ring-gray-300 sm:max-w-md">
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
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать институты</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
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
          <Dialog>
            <DialogTrigger className="text-sm/6 underline text-indigo-500">
              Открыть список сотрудников
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Сотрудники</DialogTitle>
              </DialogHeader>
              <ul role="list" className="max-h-[300px] w-full overflow-y-auto divide-y divide-gray-100 ">
              {people.map((person) => (
                <li key={person.email} className="flex justify-between py-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center md:w-full">
                      <p className="text-sm/6 font-semibold text-gray-900 whitespace-nowrap">{person.name}</p>
                      <Select>
                        <SelectTrigger className="max-w-min px-0">
                          <SelectValue placeholder={person.role}/>
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
                    </div>
                </li>
              ))}
            </ul>
            </DialogContent>
          </Dialog>
          <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4 mr-4">
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
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать информацию о сотрудниках</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
                <div className="flex flex-col space-y-2">
                <Combobox 
                  items={workers}
                  placeholder="Выберите сотрудника"
                  onSelect={(value) => setSelectedWorker(Number(value))}
                  />
                </div>
                <Edit selectedInstitution={selectedWorker} institutions={workers} isWorkers={true}/>
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
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4 mr-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название кампуса"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать кампусы</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
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
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4 mr-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название группы"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать аудитории</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
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
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              {/* <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Институты</h2>
              </label> */}
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4 mr-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название дисциплины"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать дисциплины</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
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
            <div className="flex md:items-center flex-col md:flex-row sm:col-span-4">
              <div className="rounded-md ring-1 ring-inset ring-gray-300 px-4 mr-4">
                  <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Введите название группы"
                    className="block flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none w-max border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                  />
              </div>
              <Button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg">
                Добавить
              </Button>
            </div>

            <div className="flex flex-col sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                <h2 className="font-semibold text-indigo-600">Редактировать группы</h2>
              </label>
              <div className="flex md:items-center flex-col md:flex-row sm:col-span-4 space-x-2 mt-2">
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
