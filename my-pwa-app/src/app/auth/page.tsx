"use client"
import { useRouter } from "next/navigation";
export default function Authorization() {
    const router = useRouter();
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            /> */}
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Войти
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                {/* <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Логин
                </label> */}
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Введите логин"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  {/* <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Пароль
                  </label> */}
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Войти
                </button>
              </div>
            </form>
  
            <div className="mt-10 text-center text-sm/6 text-gray-500">
              Нет учётной записи?{' '}
              <button onClick={() => router.push('/registration')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  