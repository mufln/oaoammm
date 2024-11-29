'use client'
import {useQuery} from "@tanstack/react-query";
import AffiliationEntry from "@/app/admin/panel/affiliations/ui/entry";
import CampusEntry from "@/app/admin/panel/campuses/ui/campus";

export default function Affiliations() {
    const {data, status, isLoading} = useQuery({
        queryKey: ['campus'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campus`, {
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
            <h1>Корпусы</h1>
            <div>
                <CampusEntry entry={null}/>
                {status === "success" && data.map((entry: any) => <CampusEntry key={entry.id + entry.address + entry.affiliationId} entry={entry}/>)}
            </div>
        </div>
    )
}