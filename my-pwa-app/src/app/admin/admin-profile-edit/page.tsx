'use client'
import React, { useState } from "react";

interface User {
    id: number,
    login: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    role: number,
    groupId: number | null
}

// 0-admin, 1 - lector, 2 - student

const getUserById = async (userId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });
  
      // Проверяем статус-код ответа
      if (response.status === 200) {
        const user = await response.json(); // Преобразуем ответ в JSON
        return user; // Возвращаем массив пользователя
      } else {
        throw new Error('Не удалось получить пользователя');
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
      throw error; // Пробрасываем ошибку дальше
    }
};
  
const adminInfo = await getUserById(1);

const updateUser = async (userId: number, userData: User) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      // Проверяем статус-код ответа
      if (response.status === 200) {
        console.log("Данные обновлены");
      } else {
        throw new Error('Не удалось получить пользователя');
      }
    }
    catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      throw error; // Пробрасываем ошибку дальше
    }
};


export default function EditAdminProfile() {
    const [userInfo, setUserInfo] = useState(adminInfo);
    const [formData, setFormData] = useState(userInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveData = () => {
        const shouldSave = confirm("Вы уверены, что хотите сохранить данные?");
        if (!shouldSave) return;

        setUserInfo(prevState => ({
            ...prevState,
            name: formData.name.trim() !== "" ? formData.name : prevState.name,
            login: formData.login.trim() !== "" ? formData.login : prevState.login,
            email: formData.email.trim() !== "" ? formData.email : prevState.email,
            password: formData.password.trim() !== "" ? formData.password : prevState.password,
            phone: formData.phone.trim() !== "" ? formData.phone : prevState.phone,
        }));
        
        updateUser(userInfo.id, formData);

        console.log("Сохраненные данные:", {
            name: formData.name || userInfo.name,
            login: formData.login || userInfo.login,
            email: formData.email || userInfo.email,
            password: formData.password || userInfo.password,
            phone: formData.phone || userInfo.phone,
        });
    };

    return (
        <div className="flex justify-center">
            <div className="w-[80%]">
                <h1 className="text-4xl font-bold">Редактирование профиля</h1>
                <ul role="list" className="divide-y divide-gray-100">
                    <li className="w-full py-5">
                        <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                            <div className="text-xl flex gap-x-2"><strong>Имя:</strong> <div className="text-indigo-600">{userInfo.name}</div></div>
                            <input
                                name="name"
                                type="text"
                                className="border border-gray-300 rounded px-4 py-2 sm:w-[20%] w-full"
                                placeholder="Степанов Степан Степанович"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </li>
                    <li className="w-full py-5">
                        <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                            <div className="text-xl flex gap-x-2"><strong>Логин:</strong> <div className="text-indigo-600">{userInfo.login}</div></div>
                            <input
                                name="login"
                                type="text"
                                className="border border-gray-300 rounded px-4 py-2 sm:w-[20%] w-full"
                                placeholder="stepanov.s.s@edu.mirea.ru"
                                value={formData.login}
                                onChange={handleChange}
                            />
                        </div>
                    </li>
                    <li className="w-full py-5">
                        <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                            <div className="text-xl flex gap-x-2"><strong>Почта:</strong> <div className="text-indigo-600">{userInfo.email}</div></div>
                            <input
                                name="email"
                                type="text"
                                className="border border-gray-300 rounded px-4 py-2 sm:w-[20%] w-full"
                                placeholder="stepanov.s.s@edu.mirea.ru"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </li>
                    <li className="w-full py-5">
                        <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                            <div className="text-xl flex gap-x-2"><strong>Пароль:</strong></div>
                            <input
                                name="password"
                                type="password"
                                placeholder="f_zBjQHX-JOCL8T1"
                                className="border border-gray-300 rounded px-4 py-2 sm:w-[20%] w-full"
                                value={formData.password}
                                onChange={handleChange}
                                />
                                </div>
                            </li>
                            <li className="w-full py-5">
                                <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                                    <div className="text-xl flex gap-x-2"><strong>Телефон:</strong> <div className="text-indigo-600">{userInfo.phone}</div></div>
                                    <input
                                        name="phone"
                                        type="text"
                                        className="border border-gray-300 rounded px-4 py-2 sm:w-[20%] w-full"
                                        placeholder="+7 (495) 392-71-84"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </li>
                            <li className="w-full py-5">
                                <div className="flex min-w-0 justify-between items-center sm:flex-row flex-col gap-y-2">
                                    <div className="text-xl flex gap-x-2"><strong>Роль:</strong><div className="text-indigo-600"> 
                                    {userInfo.role === 0 ? (<p>Ректор</p>) : (<p>Профессор</p>)}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="flex w-full justify-center pb-5">
                            <button onClick={saveData} className="flex bg-indigo-600 hover:bg-indigo-400 text-white py-2 px-4 rounded">Сохранить</button>
                        </div>
                    </div>
                </div>
            );
        }