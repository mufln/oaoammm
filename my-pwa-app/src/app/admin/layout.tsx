'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { StudentProfile } from '@/components/stud-profile'
import { AdminProfile } from "@/components/adm-profile"

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Example({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="space-y-20">
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.2151 13.8522L32.5269 26.5834C26.2757 26.3449 23.7956 27.6776 20.4839 31.954C17.3557 27.6322 14.9343 26.4784 9.47312 26.5834L8.78494 13.8522M33.2151 13.8522L23.2365 15.9168L20.4839 24.5189L18.0753 15.9168L8.78494 13.8522M33.2151 13.8522L37 12.82M8.78494 13.8522L5 12.82M5.49552 9.10371L20.9794 5L37 9.10371L20.9794 12.8201L12.4194 10.8156L5.49552 9.10371ZM25.6452 21.078C25.6452 18.3253 29.7742 18.3253 29.7742 21.078C29.7742 23.8308 25.6452 23.8308 25.6452 21.078ZM16.0108 21.078C16.0108 18.3253 11.8817 18.3253 11.8817 21.078C11.8817 23.8308 16.0108 23.8308 16.0108 21.078Z" stroke="#1E3A8A" strokeWidth="2"/>
</svg>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <a onClick={() => router.push('/admin/schedule')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Расписание
          </a>
          <a onClick={() => router.push('/admin/score')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Успеваемость
          </a>
          {/* <a onClick={() => router.push('/student/elective')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Факультативы
          </a> */}
          <a onClick={() => router.push('/admin/panel')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Админ-панель
          </a>
          {/* <a onClick={() => router.push('/student/stud-schedule')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Расписание студента
          </a> */}
          <a onClick={() => router.push('/admin/editable-score')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Ред. успеваемость
          </a>
          <a onClick={() => router.push('/admin/git-admin')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
            Репозиторий
          </a>
        </PopoverGroup>
        <AdminProfile/>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.2151 13.8522L32.5269 26.5834C26.2757 26.3449 23.7956 27.6776 20.4839 31.954C17.3557 27.6322 14.9343 26.4784 9.47312 26.5834L8.78494 13.8522M33.2151 13.8522L23.2365 15.9168L20.4839 24.5189L18.0753 15.9168L8.78494 13.8522M33.2151 13.8522L37 12.82M8.78494 13.8522L5 12.82M5.49552 9.10371L20.9794 5L37 9.10371L20.9794 12.8201L12.4194 10.8156L5.49552 9.10371ZM25.6452 21.078C25.6452 18.3253 29.7742 18.3253 29.7742 21.078C29.7742 23.8308 25.6452 23.8308 25.6452 21.078ZM16.0108 21.078C16.0108 18.3253 11.8817 18.3253 11.8817 21.078C11.8817 23.8308 16.0108 23.8308 16.0108 21.078Z" stroke="#1E3A8A" strokeWidth="2"/>
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <a onClick={() => router.push('/admin/schedule')} className="text-base block font-semibold text-gray-900 hover:cursor-pointer">
                Расписание
              </a>
              <a onClick={() => router.push('/admin/score')} className="text-base block font-semibold text-gray-900 hover:cursor-pointer">
                Успеваемость
              </a>
              {/* <a onClick={() => router.push('/student/elective')} className="text-base block font-semibold text-gray-900 hover:cursor-pointer">
                Факультативы
              </a> */}
              <a onClick={() => router.push('/admin/panel')} className="text-base block font-semibold text-gray-900 hover:cursor-pointer">
                Админ-панель
              </a>
              <a onClick={() => router.push('/admin/editable-score')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
                Ред. успеваемость
              </a>
              <a onClick={() => router.push('/admin/git-admin')} className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">
                Репозиторий
              </a>
              </div>
              <div className="py-6">
                <AdminProfile/>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    {children}
    </div>
  )
}
