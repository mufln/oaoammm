'use client'

import {useState} from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import PerformanceEntry from "@/app/admin/editable-score/ui/performance";

export default function ScoreTable() {
    const queryClient = useQueryClient()
    const {data: groups, status: groupsStatus, isLoading: groupsIsLoading} = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });
            return await response.json()
        }
    })

    let [groupId, setGroupId] = useState(groups ? groups.id : 0)
    const {data: subjects, status: subjectsStatus, isLoading: subjectsIsLoading, refetch: refetchSubjects} = useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/group/${groupId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });
            console.log(response)
            return await response.json()

        },
        enabled: false,
    })
    const fetchPerformances = async (subjectId: number, groupId: number) => {
        if (subjectId === null || groupId === null) {
            return []
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/performances/filter_by`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({classId: subjectId, groupId: groupId})
        });
        return await response.json()
    }
    const fetchSubjects = async (id: number) => {
        setGroupId(id)
        await queryClient.invalidateQueries({queryKey: ["subjects"]})
        await refetchSubjects()
    }
    const {
        data: performance,
        status: performanceStatus,
        isLoading: performanceIsLoading,
        refetch: refetchPerformance
    } = useQuery({
        queryKey: ['performance'],
        queryFn: async () => await fetchPerformances(subjectId, groupId),
        enabled: false,
    })
    let [subjectId, setSubjectId] = useState(subjects ? subjects.id : 0)
    const fetchPerformance = async (id: number) => {
        setSubjectId(id)
        await queryClient.invalidateQueries({queryKey: ["performance"]})
        await refetchPerformance()
    }

    return (
        <div>
            <div className="w-full flex">
                <select onChange={(e) => fetchSubjects(Number(e.target.value))} defaultValue={groups ? groups.id : 0}
                        className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                    <option value={0} disabled>Выберите Группу</option>
                    {groupsStatus === "success" && groupsIsLoading === false && groups.map((group: any) => <option
                        key={"asdsad" + group.id + group.name} value={group.id}>{group.name}</option>)}
                </select>
                <select onChange={(e) => fetchPerformance(Number(e.target.value))}
                        defaultValue={subjects ? subjects.id : 0}
                        className="block px-2 max-w-52 flex-1 bg-transparent py-2 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none border-b-0 focus:border-b-2 focus:border-indigo-600 sm:text-sm/6 w-max">
                    <option value={0} disabled>Выберите Предмет</option>
                    {subjectsStatus === "success" && subjectsIsLoading === false && subjects.map((subject: any) =>
                        <option
                            key={"asdsad" + subject.id + subject.name} value={subject.id}>{subject.name}</option>)}
                </select>


            </div>
            <div className="w-full flex">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ФИО</TableHead>
                            <TableHead>Средняя оценка</TableHead>
                            <TableHead>1</TableHead>
                            <TableHead>2</TableHead>
                            <TableHead>3</TableHead>
                            <TableHead>4</TableHead>
                            <TableHead>5</TableHead>
                            <TableHead>6</TableHead>
                            <TableHead>7</TableHead>
                            <TableHead>8</TableHead>
                            <TableHead>9</TableHead>
                            <TableHead>10</TableHead>
                            <TableHead>11</TableHead>
                            <TableHead>12</TableHead>
                            <TableHead>13</TableHead>
                            <TableHead>14</TableHead>
                            <TableHead>15</TableHead>
                            <TableHead>16</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {performanceStatus === "success" && performanceIsLoading === false &&
                            performance.map((performance: any) => <PerformanceEntry key={performance.user.Id + "performance" + performance.user.name + performance.user.phone }
                                                                                performance={performance}/>)}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}