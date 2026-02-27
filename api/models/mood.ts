import mongoose, { Document } from 'mongoose'

interface IMood extends Document {
    uid: string;
    mood: string;
    note: string;
    timestamp: Date;
    date: string;
    year: number;
    month: number;
    week: number;
}

const moodSchema = new mongoose.Schema<IMood>({
    uid: { type: String, required: true },
    mood: { type: String, required: true, enum: ["amazing", "good", "okay", "meh", "bad"] },
    note: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now },
    date: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    week: { type: Number, required: true },
})

moodSchema.index({ uid: 1, date: 1 }, { unique: true });
export const Mood = mongoose.model<IMood>("Mood", moodSchema)
export type { IMood };
