import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifyToken } from './middleware.js';
import { getISOWeek, format, startOfWeek } from 'date-fns'
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

const formateDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
}

app.get('/mood', verifyToken, async (req, res) => {
    const uid = req.uid;
    const { range } = req.query;
    const now = new Date();
    const date = now.getUTCDate();
    const month = now.getUTCMonth();
    const year = now.getUTCFullYear();

    let query: any = { uid };

    switch (range) {
        case "today":
            query.date = now.toISOString().split("T")[0];
            break;
        case "yesterday":
            const yest = new Date(Date.UTC(year, month, date - 1));
            query.date = yest.toISOString().split("T")[0];
            break;
        case "week":
            const localDate = req.query.localDate as string;
            const refDate = localDate ? new Date(localDate + "T12:00:00") : now;
            const monday = startOfWeek(refDate, { weekStartsOn: 1 });
            query.date = { $gte: formateDate(monday), $lte: localDate ?? formateDate(now) };
            break;
        case "month":
            const monthStart = `${year}-${String(month + 1).padStart(2, "0")}-01`;
            const todayS = now.toISOString().split("T")[0];
            query.date = { $gte: monthStart, $lte: todayS };
            break;
        case "year":
            const yearStart = `${year}-01-01`
            const todayY = now.toISOString().split("T")[0];
            query.date = { $gte: yearStart, $lte: todayY };
            break;
        default:
            res.status(400).json({ error: "invalid range" });
            return;
    }

    try {
        const entries = await Mood.find(query).sort({ date: 1 });
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
