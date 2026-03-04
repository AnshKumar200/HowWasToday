import { useState } from "react";
import { api } from "../lib/api";
import { Cube } from "./Cubes";
import { formatDate } from "../lib/helper";

type Props = {
    onDone: (entry: { mood: string; note: string }) => void;
}

const TodayNotDone = ({ onDone }: Props) => {
    const [saving, setSaving] = useState(false);

    const date = new Date();
    const formattedDate = formatDate(date)

    const handleMark = async (mood: string) => {
        setSaving(true);
        try {
            await api.post("/mood", { mood })
            onDone({ mood, note: "" });
        } catch (err) {
            console.error("error saving mood ", err);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex flex-col absolute w-full h-full items-center justify-center text-5xl gap-5">
            <div className="text-2xl">{formattedDate}</div>
            <div>What's today been like for you?</div>
            <div className="flex gap-5 text-2xl">
                <button onClick={() => handleMark("amazing")} disabled={saving} className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="amazing" />
                    <div>Amazing</div>
                </button>

                <button onClick={() => handleMark("good")} disabled={saving} className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="good" />
                    <div>Good</div>
                </button>
                <button onClick={() => handleMark("okay")} disabled={saving} className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="okay" />
                    <div>Okay</div>
                </button>

                <button onClick={() => handleMark("meh")} disabled={saving} className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="meh" />
                    <div>Meh</div>
                </button>

                <button onClick={() => handleMark("bad")} disabled={saving} className="group hover:scale-110 transition-all duration-300 ease-in-out">
                    <Cube face="bad" />
                    <div>Bad</div>
                </button>
            </div>
        </div>
    )
}

export default TodayNotDone;
