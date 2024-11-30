import {TableCell, TableRow} from "@/components/ui/table";

export default function PerformanceEntry({performance}: { performance: any }) {
    const performances = performance.performances

    return (
        <TableRow>

            <TableCell>{performance.user.name}</TableCell>
            <TableCell>{performance.average}</TableCell>
            {performance.performances.map((performance: any) => <TableCell className="px-2"
                                                                   key={performance.timeTableId + performance.id}>{performance.attendance === 0 ? performance.points >0 ? performance.points : "+" : performance.attendance === 1 ? "-" : performance.attendance === 2 ? "У" : "+"}</TableCell>)}

        </TableRow>
    )
}