import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

router.get('/health/ready', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
            await mongoose.connection.db.admin().ping();
            return res.json({ status: 'READY' });
        }
    } catch {
        // Treat a failed ping as unavailable.
    }

    return res.status(503).json({ status: 'NOT_READY' });
});

export default router;