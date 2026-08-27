import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log('⚠️ MONGODB_URI is not defined in .env. Skipping database connection.');
            return;
        }
        const uri = process.env.MONGODB_URI.replace(/\/$/, '');
        const connectionInstance = await mongoose.connect(`${uri}/${DB_NAME}`, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout instead of 30 seconds default
        });
        console.log(`\n MongoDB Connected !! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('⚠️ MONGO DB connection error (Database offline or invalid URI):', error.message);
    }
}
