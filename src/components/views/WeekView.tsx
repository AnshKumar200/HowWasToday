import { useEffect, useState } from "react"
import { api } from "../../lib/api";
import { Cube } from "../Cubes";
import { formatDate } from "../../lib/helper";
import { startOfWeek, format, addDays } from "date-fns";

const getWeekDays = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    return Array.from({ length: 7 }, (_, i) =>
        format(addDays(start, i), "yyyy-MM-dd")
    )
}

export const WeekView = () => {
    const [loading, setLoading] = useState(true);
    const [weekEntry, setWeekEntry] = useState<{ date: string; mood: string | null }[]>([]);

    useEffect(() => {
        const checkWeek = async () => {
            try {
                const res = await api.get("/mood?range=week");
                const resMap = Object.fromEntries(res.map((e: any) => [e.date, e.mood]));
                const days = getWeekDays();
                setWeekEntry(days.map((date) => ({
                    date: formatDate(date),
                    mood: resMap[date] ?? null
                })))
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }
        checkWeek()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className="flex flex-col gap-5 items-center">
            <div>
                {/* randomize this */}
                <div>Soooo, I guess this was a pretty good week!</div>
            </div>
            <div className="flex gap-5 flex-wrap text-lg">
                {weekEntry.map(({ date, mood }) => (
                    <div key={date} className="flex flex-col">
                        {mood
                            ? <Cube face={mood} />
                            : <Cube face="empty" />
                        }
                        <div>{date}</div>
                    </div>
                ))}
            </div>

            {/*
                sec mood below the main one - small small
                clicking on the mood to show up note for that day
            */}
        </div>
    )
}


