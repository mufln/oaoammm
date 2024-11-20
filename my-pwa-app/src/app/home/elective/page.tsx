import { Button } from "@/components/ui/button"

const sections = [
    {
      id: 1,
      title: 'Мобильная разработка',
      href: '#',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Обновлено' },
      
    },
    {
        id: 2,
        title: 'Шагающие роботы',
        href: '#',
        date: 'Sep 15, 2020',
        datetime: '2020-09-15',
        category: { title: 'Обновлено' },
      },
      {
        id: 3,
        title: 'Искусственный интеллект в медицине',
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
              <article key={post.id} className="flex max-w-xl items-start justify-between align-end ring-1 ring-gray-200 rounded-lg p-8">
                <div className="flex flex-col">
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
                </div>
              </article>
            ))}
          </div>
    )
  }
  