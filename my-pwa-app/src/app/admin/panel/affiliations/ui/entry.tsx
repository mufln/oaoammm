'use client'
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

export default function AffiliationEntry({affiliation}: {affiliation: {id: number, name: string}| null}) {
    const queryClient = useQueryClient()
    const UpdateAffiliation = async (id: number, name: string) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/affiliation/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name: name})
        })
        if (res.ok) {
            console.log("ok")
        }
    }
    const SaveAffiliation = async (name: string) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/affiliation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name: name})
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["affiliations"]})
        }
    }
    const deleteAffiliation = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/affiliation/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["affiliations"]})
        }
    }
    const [name, setName] = useState(affiliation? affiliation.name : "")
    return (
        <div className="flex flex-row items-center gap-x-2 ">
            <input type="text" placeholder={affiliation? affiliation.name: "Имя"} className="text-xl block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max" value={name} onChange={(e) => setName(e.target.value)}/>
            {affiliation === null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                     onClick={() => SaveAffiliation(name)}>
                Добавить
            </button>}
            {affiliation !== null && <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                     onClick={() => UpdateAffiliation(affiliation.id, name)}>
                Изменить
            </button>}
            {affiliation !== null && <button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                     onClick={() => deleteAffiliation(affiliation.id)}>
                Удалить
            </button>}
        </div>
    )
}