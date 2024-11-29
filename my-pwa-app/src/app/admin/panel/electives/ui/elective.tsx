'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function ElectiveEntry({entry}: {
    entry: {
        id: number,
        name: string,
        affiliationId: number,
        campusId: number,
        description: string,
    } | null
}) {
    const queryClient = useQueryClient()
    const {data: affiliation, status: affiliationStatus, isLoading: affiliationIsLoading} = useQuery({
        queryKey: ['affiliation'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/affiliation`, {
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


    const Update = async (id: number, subject: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/electives/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(subject)
        })
        if (res.ok) {
            console.log("ok")
        }
    }
    const Save = async (subject: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/electives/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(subject)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["electives"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/electives/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["electives"]})
        }
    }
    const [name, setName] = useState(entry ? entry.name : "")
    const [affiliationId, setSpecialtyId] = useState(entry ? entry.affiliationId : 0)
    const [campusId, setCampusId] = useState(entry ? entry.campusId : 0)
    const [description, setDescription] = useState(entry ? entry.description : "")
    let subject = {
        name: name,
        affiliationId: affiliationId,
        campusId: campusId,
        description: description
    }

    function parseTerms(terms: string) {
        let result: number[] = []
        if (terms === "") {
            return result
        }
        let termsArray = terms.split(",")
        for (let i = 0; i < termsArray.length; i++) {
            result.push(Number(termsArray[i]))
        }
        return result
    }

    function parseTermsToString(terms: number[]) {
        let result = ""
        for (let i = 0; i < terms.length; i++) {
            result += terms[i] + ","
        }
        return result.slice(0, -1)
    }

    return (
        <div className="flex flex-row items-center gap-x-2">
            <input type="text" placeholder={entry ? entry.name : "Название"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.name : ""} onChange={(e) => setName(e.target.value)}/>

            <select onChange={(e) => setSpecialtyId(Number(e.target.value))}
                    defaultValue={entry ? entry.affiliationId : 0}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Филиал</option>
                {affiliationStatus === "success" && affiliationIsLoading === false && affiliation.map((affiliation: any) =>
                    <option key={"asdsad" + affiliation.id + affiliation.name}
                            value={affiliation.id}>{affiliation.name}</option>)}
            </select>
            <select onChange={(e) => setCampusId(Number(e.target.value))}
                    defaultValue={entry ? entry.campusId : -1}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={-1} disabled>Выберите Кампус</option>
                {campusesStatus === "success" && campusesIsLoading === false && campuses.map((campus: any) =>
                    <option key={"asdsad" + campus.id + campus.address}
                            value={campus.id}>{campus.address}</option>)}
            </select>
            <input type="text"
                   placeholder={"Описание"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.description : ""} onChange={(e) => setDescription(e.target.value)}/>
            {entry === null &&
                <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Save(subject)}>
                    Добавить
                </button>}
            {entry !== null &&
                <button className="mr-4 mt-4 md:mt-0 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg"
                        onClick={() => Update(entry?.id, subject)}>
                    Изменить
                </button>}
            {entry !== null && <button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                                       onClick={() => Delete(entry.id)}>
                Удалить
            </button>}
        </div>
    )
}