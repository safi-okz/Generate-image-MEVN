import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {connectDb } from './db/connect.js';
import postRoutes from './routes/post.js';
import dalleRoutes from './routes/dalle.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

const start = async () => {
    try{
     connectDb(process.env.MONGO_URI);
     app.listen(8000, () => console.log("Server Start"));
    } catch(err) {
        console.log("connection error ", err);
    }
}

start();