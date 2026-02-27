import { useEffect, useRef, useState } from "react";
import TodayNotDone from "../components/TodayNotDone";
import NavbarActivityPage from "../components/NavbarActivityPage";
import { VIEWS, type ViewType } from "../components/views";
import { api } from "../lib/api";

const viewList: { key: ViewType; label: string }[] = [
    { key: "year", label: "Last Year" },
    { key: "month", label: "Last Month" },
    { key: "week", label: "Last Week" },
    { key: "yesterday", label: "Yesterday" },
    { key: "today", label: "Today" },
    { key: "tomorrow", label: "Tomorrow" },
]

const ActivityPage = () => {
    const [todayDone, setTodayDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewing, setViewing] = useState<ViewType>("today");
    const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkToday = async () => {
            try {
                await api.get("/mood");
                setTodayDone(true);
            } catch (err: any) {
                setTodayDone(false);
            } finally {
                setLoading(false)
            }
        }
        checkToday();
    }, [])

    useEffect(() => {
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
    }, [viewing])


    if (loading) return <div>Loading...</div>
    if (!todayDone) {
        return <TodayNotDone onDone={() => setTodayDone(true)} />
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
                                className={`z-1 px-5 py-2 rounded-lg transition-all duration-600 ease-in-out ${viewing === key ? "text-white" : ""} cursor-pointer`}
                            >{label}</button>
                        ))}

                    </div>
                    <div className="flex flex-col flex-1 items-center justify-center text-4xl">
                        {/* 
                            graph here if selected < yesterday
                            month def - scroll to change month? smooth scroll animations. changes on the left as well?
                            weekly graph? faces in a row?
                            yearly just the color                        
                        */}
                        <ActiveView />
                    </div>
                </div>
                <div className="bg-blue-200 flex-1">
                    <div>You've shown up for yourself [] days in a row </div>
                    <div>( quote data and choose a random one for now )</div>
                </div>
            </div>
        </div>
    )
}

export default ActivityPage;
