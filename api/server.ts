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
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    try {
        const entry = await Mood.findOne({ uid, date: today } as any);
        if(!entry) {
            res.status(404).json({ message: "no entry found for today" })
            return;
        }
        res.status(200).json(entry);
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
                new: true,
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
