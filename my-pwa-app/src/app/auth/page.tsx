"use client"
import { useRouter } from "next/navigation";
export default function Authorization() {
    const router = useRouter();
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <svg className="mx-auto w-auto " width="74" height="64" viewBox="0 0 74 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M61.4301 22.7044L60.0538 48.1668C47.5514 47.6898 42.5912 50.3552 35.9678 58.9079C29.7113 50.2644 24.8685 47.9567 13.9462 48.1668L12.5699 22.7044M61.4301 22.7044L41.4731 26.8335L35.9678 44.0379L31.1506 26.8335L12.5699 22.7044M61.4301 22.7044L69 20.64M12.5699 22.7044L5 20.64M5.99105 13.2074L36.9588 5L69 13.2074L36.9588 20.6401L19.8388 16.6313L5.99105 13.2074ZM46.2904 37.1561C46.2904 31.6507 54.5484 31.6507 54.5484 37.1561C54.5484 42.6615 46.2904 42.6615 46.2904 37.1561ZM27.0215 37.1561C27.0215 31.6507 18.7634 31.6507 18.7634 37.1561C18.7634 42.6615 27.0215 42.6615 27.0215 37.1561Z" stroke="#1E3A8A" stroke-width="4"/>
</svg>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Войти
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
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
  