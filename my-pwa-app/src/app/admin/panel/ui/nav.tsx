import Link from "next/link";

export default function Nav() {
    return (
        <div className="w-52">
            <Link href="/admin/panel/affiliations">
                <p>Филиалы</p>
            </Link>
            <Link href="/admin/panel/campuses">
                <p>Корпусы</p>
            </Link>
            <Link href="/admin/panel/rooms">
                <p>Аудитории</p>
            </Link>
            <Link href="/admin/panel/institutes">
                <p>Институты</p>
            </Link>
            <Link href="/admin/panel/groups">
                <p>Группы</p>
            </Link>
            <Link href="/admin/panel/specialties">
                <p>Специальности</p>
            </Link>
            <Link href="/admin/panel/electives">
                <p>Элективы</p>
            </Link>
            <Link href="/admin/panel/subjects">
                <p>Предметы</p>
            </Link>
            <Link href="/admin/panel/users">
                <p>Пользователи</p>
            </Link>
        </div>
    )
}