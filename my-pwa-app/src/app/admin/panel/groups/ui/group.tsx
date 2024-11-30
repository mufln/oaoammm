'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function GroupEntry({entry}: {
    entry: {
        id: number,
        name: string,
        institutId: number,
        specialtyId: number,
        course: number
    } | null
}) {
    const queryClient = useQueryClient()


    const {data: institutes, status: institutStatus, isLoading: institutIsLoading} = useQuery({
        queryKey: ['institutes'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutes`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });
            console.log(response)
            return response.json()
        }
    })
    const {data: specialties, status: specialtyStatus, isLoading: specialtyIsLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specialty`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });
            console.log(response)
            return response.json()
        }
    })

    const Update = async (id: number, group: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/groups/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(group)
        })
        if (res.ok) {
            console.log("ok")
        }
    }
    const Save = async (group: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/groups/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(group)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["groups"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/groups/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["groups"]})
        }
    }
    const [name, setName] = useState(entry ? entry.name : "")
    const [institutId, setGroupId] = useState(entry ? entry.institutId : 0)
    const [specialtyId, setSpecialtyId] = useState(entry ? entry.specialtyId : 0)
    const [course, setCourse] = useState(entry ? entry.course : 0)
    let group = {
        name: name,
        institutId: institutId,
        specialtyId: specialtyId,
        course: course
    }
    return (
        <div className="flex">
            <input type="text" placeholder={entry ? entry.name : "Имя"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.name : ""} onChange={(e) => setName(e.target.value)}/>
            <select onChange={(e) => setGroupId(Number(e.target.value))}
                    defaultValue={entry ? entry.institutId : 0}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Институт</option>
                {institutStatus === "success" && institutIsLoading === false && institutes.map((institut: any) =>
                    <option key={"asdsad" + institut.id + institut.name}
                            value={institut.id}>{institut.name}</option>)}
            </select>
            <select onChange={(e) => setSpecialtyId(Number(e.target.value))}
                    defaultValue={entry ? entry.specialtyId : 0}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Специальность</option>
                {specialtyStatus === "success" && specialtyIsLoading === false && specialties.map((specialty: any) =>
                    <option key={"asdsad" + specialty.id + specialty.name}
                            value={specialty.id}>{specialty.name}</option>)}
            </select>
            <input type="number"
                   placeholder={"Курс"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.course : undefined} onChange={(e) => setCourse(Number(e.target.value))}/>
            {entry === null &&
                <button className="m-2 p-2 ring-1 ring-indigo-600 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Save(group)}>
                    Добавить
                </button>}
            {entry !== null &&
                <button className="m-2 p-2 ring-1 ring-indigo-600 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Update(entry?.id, group)}>
                    Изменить
                </button>}
            {entry !== null && <button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                                       onClick={() => Delete(entry.id)}>
                Удалить
            </button>}
        </div>
    )
}