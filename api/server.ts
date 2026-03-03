import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifyToken } from './middleware.js';
import { getISOWeek } from 'date-fns'
import mongoose from 'mongoose';
import { Mood, type IMood } from './models/mood';
dotenv.config();

const PORT = process.env.PORT || 7878;
const DB_URL = process.env.DATABASE_URL || "";

mongoose.connect(DB_URL)
    .then(() => console.log('db connected'))
    .catch((err) => console.error('error connecting to db', err))

const app = express();
app.use(express.json())
app.use(cors())

app.get('/mood', verifyToken, async (req, res) => {
    const uid = req.uid;
    const { range } = req.query;
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (range) {
        case "today":
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
            break;
        case "yesterday":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(now);
            endDate.setDate(now.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
            break;
        case "week":
            startDate = new Date(now);
            const day = startDate.getDay();
            const diff = day === 0 ? -6 : 1 - day;
            startDate.setDate(startDate.getDate() + diff);
            startDate.setHours(0, 0, 0, 0);
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "year":
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            res.status(400).json({ error: "invalid range" });
            return;
    }

    try {
        const entries = await Mood.find({
            uid,
            timestamp: { $gte: startDate, $lte: endDate }
        }).sort({ timestamp: 1 });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: "not able to find todays entry" })
    }
})

app.post('/mood', verifyToken, async (req, res) => {
    const { mood, note } = req.body;
    const uid = req.uid;
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    try {
        const entry = await Mood.findOneAndUpdate(
            { uid, date: today } as any,
            {
                $set: {
                    mood,
                    note,
                    timestamp: now,
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                    week: getISOWeek(now),
                }
            },
            {
                upsert: true,
                returnDocument: 'after',
                runValidators: true
            }
        );

        res.status(200).json({ message: "mood saved", entry })
    } catch (err) {
        res.status(500).json({ error: "failed to save mood" })
    }
})

app.listen(PORT, () => {
    console.log('server running on: ', PORT)
})
