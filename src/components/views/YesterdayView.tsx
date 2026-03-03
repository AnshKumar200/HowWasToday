import { useEffect, useMemo, useState } from "react";
import moodTexts from '../../data/yesterday.json'
import { api } from "../../lib/api";
import { Cube } from "../Cubes";

const getRandomText = (main) => {
    const options = moodTexts[main] ?? "";
    return options[Math.floor(Math.random() * options.length)]
}

export const YesterdayView = () => {
    const [loading, setLoading] = useState(true);
    const [yesterdayEntry, setYesterdayEntry] = useState<{ mood: string; note: string } | null>(null);

    useEffect(() => {
        const checkYesterday = async () => {
            try {
                const res = await api.get("/mood?range=yesterday");

                const entry = res?.[0];
                if (entry) {
                    setYesterdayEntry({ mood: entry.mood, note: entry.note });
                }
            } catch (err) {
            } finally {
                setLoading(false);
            }
        }
        checkYesterday();
    }, [])

    const headingText = useMemo(() => getRandomText(yesterdayEntry?.mood), [yesterdayEntry?.mood])
    const isDone = !!yesterdayEntry;

    if (loading) return <div>Loading...</div>
    if (!isDone) return <div>not entry for yesterday</div>

    return (
        <div className="flex flex-col items-center">
            <Cube face={yesterdayEntry.mood} />
            <div>{yesterdayEntry.mood}</div>
            <div>{headingText}</div>
        </div>
    )
}
