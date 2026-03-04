import { useEffect, useState } from "react"
import { api } from "../../lib/api";
import { formatDate } from "../../lib/helper";
import { eachDayOfInterval, endOfYear, startOfYear, format, eachMonthOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";
import { Cube } from "../Cubes";

const getYearDays = () => {
    const now = new Date();
    const days = eachDayOfInterval({
        start: startOfYear(now),
        end: endOfYear(now),
    })
    return days.map((date) => format(date, "yyyy-MM-dd"))
}

const getYearMonths = () => {
    return eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date())
    })
}

const getMonthGrid = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    const days = eachDayOfInterval({ start, end });

    const startDay = getDay(start);
    const offset = startDay === 0 ? 6 : startDay - 1;

    const grid: (string | null)[] = [];
    for(let i = 0; i < offset; i++) {
        grid.push(null);
    }

    days.forEach((d) => {
        grid.push(format(d, "yyyy-MM-dd"))
    })
    
    return grid;
}

export const YearView = () => {
    const [loading, setLoading] = useState(true);
    const [resMap, setResMap] = useState<Record<string, string | null>>({});

    useEffect(() => {
        const checkYear = async () => {
            try {
                const res = await api.get("/mood?range=year");
                const map = Object.fromEntries(res.map((e: any) => [e.date, e.mood]));
                setResMap(map);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        }
        checkYear()
    }, [])

    if (loading) return <div>Loading...</div>

    const months = getYearMonths();
    const today = format(new Date(), "yyyy-MM-dd")

    return (
        <div className="flex flex-col h-150 overflow-y-scroll">
            <div>Year</div>
            {months.map((monthDate) => {
                const grid = getMonthGrid(monthDate);

                return (
                    <div key={monthDate.toISOString()}>
                        <div>{format(monthDate, "yyyy-MM-dd")}</div>

                        <div className="grid grid-cols-7">
                            {["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"].map(d => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {grid.map((date, i) => (
                                <div key={i}>
                                    {date ? (
                                        <>
                                            <div>
                                                <Cube face={resMap[date] ?? "empty"} />
                                            </div>
                                            <div>{date.split("-")[2]}</div>
                                        </>
                                    ) : (
                                        <div className="w-10 h-10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
