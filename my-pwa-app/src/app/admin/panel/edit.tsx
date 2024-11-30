'use client'

import React from 'react'
import {Button} from '@headlessui/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"

interface EditProps {
    isWorkers: boolean;
    selectedInstitution: number | null;
    institutions: { id: number, name: string }[];
}

export default function Edit({selectedInstitution, institutions, isWorkers}: EditProps) {
    const [institutionName, setInstitutionName] = React.useState('')
    const institution = institutions.find(institution => institution.id === selectedInstitution)
    React.useEffect(() => {
        if (selectedInstitution !== null) {
            setInstitutionName(institution? institution.name : "")
        }
    }, [selectedInstitution, institutions])

    const handleSave = async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/institutes/' + selectedInstitution, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name: institutionName})
        })
        if (res.ok) {
            console.log("ok")
        }
    }

    const handleDelete = async (id: number | null) => {
        if (id === null) {
            return
        }
        let res = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + '/institutions/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (res.ok) {
            window.location.reload()
        }
    }

    return (
        <>
            {selectedInstitution !== null ? (
                <div className='flex flex-row items-center'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="mr-2 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg max-h-[40px]">
                                Изменить
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-min">
                            <DialogHeader className="col-span-3 md:col-span-4">
                                <DialogTitle>Редактировать</DialogTitle>
                                <DialogDescription>
                                    информацию о {institution? institution.name: ""}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col sm:col-span-4">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                                    <input
                                        id="item"
                                        name="item"
                                        type="text"
                                        onChange={(e) => setInstitutionName(e.target.value)}
                                        placeholder={institution? institution.name: ""}
                                        className="block w-[320px] max-w-full flex-1 bg-transparent py-2 px-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max"
                                    />
                                </div>
                                {isWorkers ?
                                    (<Select>
                                        <SelectTrigger className="w-max px-0 m-2">
                                            <SelectValue placeholder="Выберите роль"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Выберите роль</SelectLabel>
                                                <SelectItem value="apple">Администратор</SelectItem>
                                                <SelectItem value="banana">Студент</SelectItem>
                                                <SelectItem value="blueberry">Ректор</SelectItem>
                                                <SelectItem value="grapes">Заведующий кафедры</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>)
                                    :
                                    null}
                                <Button className="my-4 p-2 bg-indigo-600 text-sm font-bold text-white rounded-lg" onClick={handleSave}>
                                    Сохранить
                                </Button>
                            </div>

                        </DialogContent>
                    </Dialog>
                    <Button className="m-2 p-2 ring-1 ring-red-500 font-bold text-sm text-red-500 rounded-lg"
                            onClick={() => handleDelete(selectedInstitution)}>
                        Удалить
                    </Button>
                </div>
            ) : (
                <div className='flex flex-row items-center'>
                    <Button className="mr-2 p-2 bg-gray-400 text-sm font-bold text-white rounded-lg max-h-[40px]"
                            disabled>
                        Изменить
                    </Button>
                    <Button className="m-2 p-2 ring-1 ring-gray-500 font-bold text-sm text-gray-500 rounded-lg"
                            onClick={() => handleDelete(selectedInstitution)} disabled>
                        Удалить
                    </Button>
                </div>
            )}
        </>
    )
}

