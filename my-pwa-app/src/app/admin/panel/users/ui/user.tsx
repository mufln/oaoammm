'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function UserEntry({entry}: {
    entry: {
        id: number,
        name: string,
        role: number,
        groupId: number,
        email: string,
        login: string,
        phone: string
    } | null
}) {
    const queryClient = useQueryClient()


    const {data: affiliations, status: affiliationStatus, isLoading: affiliationIsLoading} = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
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

    const Update = async (id: number, capmus: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(capmus)
        })
        if (res.ok) {
            console.log("ok")
        }
    }
    const Save = async (capmus: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(capmus)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    }
    const [name, setName] = useState(entry ? entry.name : "")
    const [role, setRole] = useState(entry ? entry.role : 0)
    const [email, setEmail] = useState(entry ? entry.email : "")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(entry ? entry.phone : "")
    const [groupId, setAffiliationId] = useState(entry ? entry.groupId : 0)
    let capmus = {
        name: name,
        groupId: groupId,
        login: "",
        email: email,
        password: password,
        phone: phone,
        role: role
    }
    return (
        <div className="flex">
            <input type="text" placeholder={entry ? entry.name : "Имя"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.name : ""} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder={entry ? entry.email : "Email"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.email : ""} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder={entry ? entry.phone : "Телефон"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.phone : ""} onChange={(e) => setPhone(e.target.value)}/>
            <select onChange={(e) => setRole(Number(e.target.value))} defaultValue={entry ? entry.role : -1}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={-1} disabled>Выберите Роль</option>
                <option value={0}>Администратор</option>
                <option value={1}>Лектор</option>
                <option value={2}>Студент</option>
            </select>
            <select onChange={(e) => setAffiliationId(Number(e.target.value))} defaultValue={entry ? entry.groupId : 0}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Группу</option>
                {affiliationStatus === "success" && affiliationIsLoading === false && affiliations.map((affiliation: any) =>
                    <option key={"asdsad" + affiliation.id + affiliation.name}
                            value={affiliation.id}>{affiliation.name}</option>)}
            </select>
            {entry === null &&
                <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Save(capmus)}>
                    Добавить
                </button>}
            {entry !== null &&
                <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Update(entry?.id, capmus)}>
                    Изменить
                </button>}
            {entry !== null && <button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                                       onClick={() => Delete(entry.id)}>
                Удалить
            </button>}
        </div>
    )
}