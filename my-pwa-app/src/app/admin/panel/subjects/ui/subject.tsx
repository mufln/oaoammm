'use client'
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function SubjectEntry({entry}: {
    entry: {
        id: number,
        name: string,
        specialtyId: number,
        terms: number[],
        hours: number,
        slotType: number,
    } | null
}) {
    const queryClient = useQueryClient()
    const {data: specialty, status: specialtyStatus, isLoading: specialtyIsLoading} = useQuery({
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

    const Update = async (id: number, subject: any) => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/subjects/' + id, {
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
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/subjects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(subject)
        })
        if (res.ok) {
            console.log("ok")
            queryClient.invalidateQueries({queryKey: ["subjects"]})
        }
    }
    const Delete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/subjects/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            queryClient.invalidateQueries({queryKey: ["subjects"]})
        }
    }
    const [name, setName] = useState(entry ? entry.name : "")
    const [specialtyId, setSpecialtyId] = useState(entry ? entry.specialtyId : 0)
    const [terms, setTerms] = useState(entry ? entry.terms : [])
    const [hours, setHours] = useState(entry ? entry.hours : 0)
    const [slotType, setSlotType] = useState(entry ? entry.slotType : 0)
    let subject = {
        name: name,
        specialtyId: specialtyId,
        terms: terms,
        hours: hours,
        slotType: slotType
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
        <div className="flex">
            <input type="text" placeholder={entry ? entry.name : "Название"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.name : ""} onChange={(e) => setName(e.target.value)}/>
            <input type="number"
                   placeholder={"Часы (всего)"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? entry.hours : undefined} onChange={(e) => setHours(Number(e.target.value))}/>
            <select onChange={(e) => setSlotType(Number(e.target.value))} defaultValue={entry ? entry.slotType : -1}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={-1} disabled>Тип пары</option>
                <option value={0}>Лекция</option>
                <option value={1}>Семинар</option>
                <option value={1}>Лабораторная</option>
            </select>
            <input type="text"
                   placeholder={"Семестры (через запятую)"}
                   className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                   defaultValue={entry ? parseTermsToString(entry.terms) : undefined}
                   onChange={(e) => setTerms(parseTerms(e.target.value))}/>
            <select onChange={(e) => setSpecialtyId(Number(e.target.value))}
                    defaultValue={entry ? entry.specialtyId : 0}
                    className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                <option value={0} disabled>Выберите Специальность</option>
                {specialtyStatus === "success" && specialtyIsLoading === false && specialty.map((affiliation: any) =>
                    <option key={"asdsad" + affiliation.id + affiliation.name}
                            value={affiliation.id}>{affiliation.name}</option>)}
            </select>
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