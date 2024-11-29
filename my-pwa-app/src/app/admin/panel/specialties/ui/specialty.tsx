'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function SpecialtyEntry({entry}: {entry: {id: number, name: string, institutId: number}| null}) {
    const queryClient = useQueryClient()

    const [institutId, setAffiliationId] = useState(entry? entry.institutId : 0)
    const {data: affiliations, status: affiliationStatus, isLoading: affiliationIsLoading} = useQuery({
        queryKey: ['insitutes'],
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

    const Update = async (id: number, capmus: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/specialty/' + id, {
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
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/specialty/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(capmus)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["specialty"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/specialty/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["specialty"]})
        }
    }
    const [name, setName] = useState(entry? entry.name : "")

    let capmus = {
        name: name,
        institutId: institutId
    }
    return (
        <div className="flex ">
            <input type="text" placeholder={entry? entry.name: "Имя"} className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max" defaultValue={entry? entry.name : ""} onChange={(e) => setName(e.target.value)}/>
            <select onChange={(e) => setAffiliationId(Number(e.target.value))} defaultValue={entry? entry.institutId : 0} className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Институт</option>
                {affiliationStatus === "success" && affiliationIsLoading === false && affiliations.map((affiliation: any) => <option key={"asdsad" + affiliation.id + affiliation.name} value={affiliation.id}>{affiliation.name}</option>)}
            </select>
            {entry === null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                                       onClick={() => Save(capmus)}>
                Добавить
            </button>}
            {entry !== null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
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