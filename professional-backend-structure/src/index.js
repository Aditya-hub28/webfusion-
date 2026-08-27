import dotenv from 'dotenv';
import { createServer } from 'http';
import { connectDB } from "./db/index.js";
import { app } from './app.js';
import { initializeSocket } from './socket.js';
import { startReminderScheduler } from './services/reminder.service.js';

dotenv.config({ path: '.env' });

const server = createServer(app);
const port = process.env.PORT || 8000;

initializeSocket(server);
server.listen(port, () => console.log(`Server running on port ${port} 🔥`));

connectDB()
    .then(() => {
        try {
            startReminderScheduler();
        } catch (e) {
            console.log('Scheduler error:', e.message);
        }
    })
    .catch((err) => {
        console.log('MongoDB connection warning:', err.message);
    });
