import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'yotube';

export const client = new MongoClient(MONGO_URI);

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db(DB_NAME).command({ ping: 1 });
        console.log('Connected successfully to the mongo server');
    } catch (error) {
        console.log('Unable to connect to the mongo server');
        await client.close();
    }
}

export type CourseType = {
    id: number,
    title: string,
    studentsCount: number
}

type DBType = { courses: CourseType[] }

export const db: DBType = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'fullstack', studentsCount: 10 },
        { id: 4, title: 'devops', studentsCount: 10 }
    ]
}