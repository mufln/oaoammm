'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function RoomEntry({entry}: {entry: {id: number, name: string, campusId: number}| null}) {
    const queryClient = useQueryClient()

    const [campusId, setCampusId] = useState(entry? entry.campusId : 0)
    const {data: campuses, status: campusesStatus, isLoading: campusesIsLoading} = useQuery({
        queryKey: ['campus'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campus`, {
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

    const Update = async (id: number, room: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/rooms/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(room)
        })
        if (res.ok) {
            console.log("ok")
        }
    }
    const Save = async (room: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/rooms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(room)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["rooms"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/rooms/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["rooms"]})
        }
    }
    const [name, setName] = useState(entry? entry.name : "")

    let room = {
        name: name,
        campusId: campusId
    }
    return (
        <div className="flex ">
            <input type="text" placeholder={entry? entry.name: "Имя"} className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max" defaultValue={entry? entry.name : ""} onChange={(e) => setName(e.target.value)}/>
            {campusesStatus === "success" && campusesIsLoading === false && <select onChange={(e) => setCampusId(Number(e.target.value))} defaultValue={entry? entry.campusId : 0} className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите корпус</option>
                {campuses.map((campus: any) => <option key={"asdsad" + campus.id + campus.address} value={campus.id}>{campus.address}</option>)}
            </select>}
            {entry === null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                                       onClick={() => Save(room)}>
                Добавить
            </button>}
            {entry !== null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                                       onClick={() => Update(entry?.id, room)}>
                Изменить
            </button>}
            {entry !== null && <button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                                       onClick={() => Delete(entry.id)}>
                Удалить
            </button>}
        </div>
    )
}