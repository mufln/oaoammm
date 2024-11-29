'use client'
import {useQuery} from "@tanstack/react-query";
import AffiliationEntry from "@/app/admin/panel/affiliations/ui/entry";
import CampusEntry from "@/app/admin/panel/campuses/ui/campus";
import InstitutEntry from "@/app/admin/panel/rooms/ui/room";
import RoomEntry from "@/app/admin/panel/institutes/ui/room";
import SpecialtyEntry from "@/app/admin/panel/specialties/ui/specialty";

export default function Specialties() {
    const {data, status, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specialty`, {
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
            <h1 className="text-4xl font-italic text-indigo-600 mb-4">Специальности</h1>
            <div>
                <SpecialtyEntry entry={null}/>
                {status === "success" && data.map((entry: any) => <SpecialtyEntry key={entry.id + entry.name + entry.affiliationId} entry={entry}/>)}
            </div>
        </div>
    )
}