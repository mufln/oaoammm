import { Button } from "@/components/ui/button"

const sections = [
    {
      id: 1,
      title: 'ИПТИП',
      href: '#',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Обновлено' },
    },
    {
        id: 2,
        title: 'ИИИ',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Обновлено' },
      },
    // More posts...
  ]
  
  export default function Cards() {
    return (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {sections.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between ring-1 ring-gray-200 rounded-lg p-8">
                <div className="flex items-center gap-x-4 text-xs">
                    <p className="inline-flex items-center py-1 text-xs font-medium text-gray-500 ">
                        {post.category.title} {post.date}
                    </p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                </div>
                <section className="mt-6 flex flex-col gap-y-4">
                    <h2 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-gray-600">
                        Бакалавриат
                    </h2>
                    <div className="flex flex-wrap gap-x-2">
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            1 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            2 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            3 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            4 курс
                        </span>
                    </div>
                </section>
                <section className="mt-6 flex flex-col gap-y-4">
                    <h2 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-gray-600">
                        Магистратура
                    </h2>
                    <div className="flex flex-wrap gap-x-2">
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            1 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            2 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            3 курс
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/2 hover:cursor-pointer">
                            4 курс
                        </span>
                    </div>
                </section>
              </article>
            ))}
          </div>
    )
  }
  