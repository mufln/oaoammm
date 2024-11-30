'use client'
import {useQuery} from "@tanstack/react-query";
import AffiliationEntry from "@/app/admin/panel/affiliations/ui/entry";
import {useId} from "react";



export default function Affiliations() {
    const {data, status, isLoading} = useQuery({
        queryKey: ['affiliations'],
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
    return (
        <div className="w-full p-3 text-xl">
            <h1 className="text-4xl font-italic text-indigo-600 mb-4">Филиалы</h1>
            <div>
                <AffiliationEntry affiliation={null}/>
                {status === "success" && data.map((affiliation: any) => <AffiliationEntry key={affiliation.id + affiliation.name} affiliation={affiliation}/>)}
            </div>
        </div>
    )
}