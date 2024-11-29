'use client'
import {useQuery} from "@tanstack/react-query";
import AffiliationEntry from "@/app/admin/panel/affiliations/ui/entry";
import CampusEntry from "@/app/admin/panel/campuses/ui/campus";
import InstitutEntry from "@/app/admin/panel/rooms/ui/room";
import RoomEntry from "@/app/admin/panel/institutes/ui/room";
import SpecialtyEntry from "@/app/admin/panel/specialties/ui/specialty";
import UserEntry from "@/app/admin/panel/users/ui/user";

export default function Specialties() {
    const {data, status, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
        <div className="w-full">
            <h1>Пользователи</h1>
            <div>
                <UserEntry entry={null}/>
                {status === "success" && data.map((entry: any) => <UserEntry key={entry.id + entry.name + entry.affiliationId } entry={entry}/>)}
            </div>
        </div>
    )
}