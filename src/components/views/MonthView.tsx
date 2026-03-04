import { useEffect, useState } from "react"
import { api } from "../../lib/api";
import { formatDate } from "../../lib/helper";
import { Cube } from "../Cubes";
import { eachDayOfInterval, endOfMonth, startOfMonth, format } from "date-fns";

const getMonthDays = () => {
    const now = new Date();
    const days = eachDayOfInterval({
        start: startOfMonth(now),
        end: endOfMonth(now),
    })
    return days.map((date) => format(date, "yyyy-MM-dd"))
}

export const MonthView = () => {
    const [loading, setLoading] = useState(true);
    const [monthEntry, setMonthEntry] = useState<{ date: string; mood: string | null }[]>([]);

    useEffect(() => {
        const checkMonth = async () => {
            try {
                const res = await api.get("/mood?range=month");
                const resMap = Object.fromEntries(res.map((e: any) => [e.date, e.mood]));
                const days = getMonthDays();
                setMonthEntry(days.map((date) => ({
                    date: formatDate(date),
                    mood: resMap[date] ?? null
                })))
            } catch (err) {
            } finally {
                setLoading(false);
            }
        }
        checkMonth()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            {/* diff views? like weekly view - scroll to go to next or prev week of the month */}
            <div>Its going pretty good!</div>
            <div className="flex gap-5 flex-wrap text-lg">
                {monthEntry.map(({ date, mood }) => (
                    <div key={date} className="flex flex-col">
                        {mood
                            ? <Cube face={mood} />
                            : <Cube face="empty" />
                        }
                        <div>{date}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
