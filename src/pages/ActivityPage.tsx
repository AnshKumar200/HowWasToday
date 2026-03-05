import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TodayNotDone from "../components/TodayNotDone";
import NavbarActivityPage from "../components/NavbarActivityPage";
import { VIEWS, type ViewType } from "../components/views";
import { api } from "../lib/api";
import quoteData from '../data/quotes.json'

const viewList: { key: ViewType; label: string }[] = [
    { key: "year", label: "Last Year" },
    { key: "month", label: "Last Month" },
    { key: "week", label: "Last Week" },
    { key: "yesterday", label: "Yesterday" },
    { key: "today", label: "Today" },
    { key: "tomorrow", label: "Tomorrow" },
]

const getRandomText = (main) => {
    const options = quoteData[main] ?? "";
    return options[Math.floor(Math.random() * options.length)]
}

const ActivityPage = () => {
    const [todayDone, setTodayDone] = useState(false);
    const [todayEntry, setTodayEntry] = useState<{ mood: string; note: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewing, setViewing] = useState<ViewType>("today");
    const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkToday = async () => {
            try {
                const res = await api.get("/mood?range=today");

                const entry = res?.[0];
                if (!entry) {
                    setTodayDone(false);
                }
                else {
                    setTodayEntry({ mood: entry.mood, note: entry.note });
                    setTodayDone(true);
                }
            } catch (err: any) {
                setTodayDone(false);
            } finally {
                setLoading(false)
            }
        }
        checkToday();
    }, [])

    useLayoutEffect(() => {
        const activeB = buttonRefs.current[viewing];
        const container = containerRef.current;
        if (activeB && container) {
            const BRect = activeB.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setSliderStyle({
                left: BRect.left - containerRect.left,
                width: BRect.width,
                height: BRect.height,
            });
        }
    }, [viewing, loading])

    const handleMarkedToday = ({ mood, note }: { mood: string, note: string }) => {
        setTodayEntry({ mood, note })
        setTodayDone(true);
    }

    const quoteText = useMemo(() => getRandomText(todayEntry?.mood), [todayEntry?.mood])

    if (loading) return <div>Loading...</div>
    if (!todayDone) {
        return <TodayNotDone onDone={handleMarkedToday} />
    }

    const ActiveView = VIEWS[viewing];
    return (
        <div className="flex flex-col flex-1">
            <NavbarActivityPage />
            <div className="flex p-5 flex-1">
                <div className="w-2/3 flex flex-col">
                    <div ref={containerRef} className="flex gap-5 text-xl justify-center relative">
                        <div className="absolute top-0 bg-red-400 rounded-lg transition-all duration-300 ease-in-out" style={sliderStyle} />

                        {viewList.map(({ key, label }) => (
                            <button key={key}
                                ref={(e) => { buttonRefs.current[key] = e }}
                                onClick={() => setViewing(key)}
                                className={`font-medium z-1 px-5 py-2 rounded-lg transition-all duration-600 ease-in-out ${viewing === key ? "text-white" : ""} cursor-pointer`}
                            >{label}</button>
                        ))}

                    </div>
                    <div className="flex flex-col flex-1 items-center justify-center text-4xl">
                        <ActiveView todayEntry={todayEntry} onUpdate={setTodayEntry} />
                    </div>
                </div>
                <div className="flex flex-col flex-1 text-center border-2 rounded-xl p-5 bg-amber-50 border-gray-400">
                    <div className="text-xl font-medium">You've shown up for yourself [] days in a row </div>
                    <div className="flex-1 flex items-center text-4xl">{quoteText}</div>
                </div>
            </div>
        </div>
    )
}

export default ActivityPage;
