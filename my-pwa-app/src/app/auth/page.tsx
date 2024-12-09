"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Функция для обработки запроса на логин
const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Проверяем статус-код ответа
  if (response.status === 200) {
    // Успешный логин
    return true; // Можно вернуть true или любые другие данные, которые вам нужны
  } else if (response.status === 401) {
    // Неверные учетные данные
    throw new Error('Неверный логин или пароль');
  } else if (response.status === 400) {
    // Ошибка в запросе
    throw new Error('Ошибка в запросе');
  } else {
    // Другие ошибки
    throw new Error('Ошибка сервера');
  }
};

const getMe = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}


// Главный компонент аутентификации
export default function Authorization() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    

    try {
      await login(email, password); // Вызов функции логина
      
      const me = await getMe();
      
      
      if (me.role === 0 || me.role === 1) {
        router.push('/admin/panel'); // Перенаправление на панель управления
      }
      else if (me.role === 2) {
        router.push('/student/stud-schedule'); // Перенаправление на панель управления
      }
      //router.push('/dashboard'); // Перенаправление на панель управления
    } catch (err : any) {
      setError(err.message); // Установка сообщения об ошибке
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Авторизация</h2>
      </div>

      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6 justify-between">
          <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="Введите логин"
              autoComplete="name"
              className="block mx-auto w-52 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
            autoComplete="current-password"
            className=" block w-52 px-2 mx-auto  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-52 justify-center mx-auto  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}