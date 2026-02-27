import { type Request, type Response, type NextFunction } from "express"
import admin from './firebase.js'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ error: "no token provided" });
        return;
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.uid = decoded.uid;
        next();
    } catch (err) {
        res.status(401).json({ error: 'invalid token' })
    }
}

