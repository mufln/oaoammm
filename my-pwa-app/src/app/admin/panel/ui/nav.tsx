import Link from "next/link";

export default function Nav() {
    return (
        <div className="flex flex-col w-[20%] text-2xl gap-y-2 p-4 border-r border-gray-200">
            <Link href="/admin/panel/affiliations" className="hover:text-indigo-600">
                <p>Филиалы</p>
            </Link>
            <Link href="/admin/panel/campuses" className="hover:text-indigo-600">
                <p>Корпусы</p>
            </Link>
            <Link href="/admin/panel/rooms" className="hover:text-indigo-600">
                <p>Аудитории</p>
            </Link>
            <Link href="/admin/panel/institutes" className="hover:text-indigo-600">
                <p>Институты</p>
            </Link>
            <Link href="/admin/panel/groups" className="hover:text-indigo-600">
                <p>Группы</p>
            </Link>
            <Link href="/admin/panel/specialties" className="hover:text-indigo-600">
                <p>Специальности</p>
            </Link>
            <Link href="/admin/panel/electives" className="hover:text-indigo-600">
                <p>Элективы</p>
            </Link>
            <Link href="/admin/panel/subjects" className="hover:text-indigo-600">
                <p>Предметы</p>
            </Link>
            <Link href="/admin/panel/users" className="hover:text-indigo-600">
                <p>Пользователи</p>
            </Link>
        </div>
    )
}