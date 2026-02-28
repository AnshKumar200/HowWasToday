import { useState } from "react";
import { Cube } from "../Cubes"
import { api } from "../../lib/api";

type Props = {
    todayEntry: { mood: string; note: string } | null;
    onUpdate: (entry: { mood: string; note: string }) => void;
}

export const TodayView = ({ todayEntry, onUpdate }: Props) => {
    const [marked, setMarked] = useState(todayEntry?.mood ?? null);
    const [selected, setSelected] = useState(marked);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!selected) return;
        setSaving(true);
        try {
            const updated = await api.post("/mood", { mood: selected });
            onUpdate({ mood: updated.entry.mood, note: "" });
            setMarked(updated.entry.mood);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            <div>So, what's today been like for you?</div>
            <div className="flex gap-5">
                {["amazing", "good", "okay", "meh", "bad"].map((mood) => (
                    <button
                        key={mood}
                        onClick={() => setSelected(mood)}
                        className={`transition-all duration-300 ease-in-out ${marked === mood ? "bg-red-400 text-white" : selected === mood ? "bg-red-300" : ""} flex flex-col items-center rounded-2xl p-2 font-medium cursor-pointer group`}>
                        <div className="group-hover:scale-105 transition-all duration-300 ease-in-out">
                            <Cube face={mood as any} />
                            <div className="text-xl">{mood.charAt(0).toUpperCase() + mood.slice(1)}</div>
                        </div>
                    </button>
                ))}
            </div>
            <button onClick={handleSave} disabled={saving || (selected === marked)} className={`${selected === marked ? "bg-gray-600" : "bg-black"} text-white px-5 py-2 rounded-lg text-2xl transition-all duration-300 ease-in-out cursor-pointer`}>{saving ? "Saving..." : "Save"}</button>
            <div>
                {/* after selecting, this shows up */}
                Add some more context? ( fun, tiring.. all those options. )
            </div>
        </div>
    )
}
