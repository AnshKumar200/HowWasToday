import { useState } from "react";
import { api } from "../lib/api";
import { Cube } from "./Cubes";
import { useAuth } from "../context/AuthContext";

type Props = {
    onDone: () => void;
}

const TodayNotDone = ({ onDone }: Props) => {
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();

    const handleMark = async (mood: string) => {
        setSaving(true);
        try {
            await api.post("/mood", { mood })
            onDone();
        } catch (err) {
            console.error("error saving mood ", err);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex flex-col absolute w-full h-full bg-amber-200 items-center justify-center text-5xl gap-10">
            {/* TODO: animate opening */}
            <div>What's today been like for you? </div>
            <div className="flex gap-5">
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
