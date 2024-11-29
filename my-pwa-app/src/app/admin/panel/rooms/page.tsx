'use client'
import {useQuery} from "@tanstack/react-query";
import AffiliationEntry from "@/app/admin/panel/affiliations/ui/entry";
import CampusEntry from "@/app/admin/panel/campuses/ui/campus";
import InstitutEntry from "@/app/admin/panel/rooms/ui/room";
import RoomEntry from "@/app/admin/panel/institutes/ui/room";

export default function Institutes() {
    const {data, status, isLoading} = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });
            return await response.json()
        }
    })
    return (
        <div className="w-full p-3 text-xl">
            <h1 className="text-4xl font-italic text-indigo-600 mb-4">Аудитории</h1>
            <div>
                <RoomEntry entry={null}/>
                {status === "success" && data.map((entry: any) => <RoomEntry key={entry.id + entry.name + entry.affiliationId} entry={entry}/>)}
            </div>
        </div>
    )
}