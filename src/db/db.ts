import {MongoClient} from "mongodb";
import {settings} from "../settings";

// const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// export const DB_NAME = process.env.DB_NAME || 'incubator';

export const client = new MongoClient(settings.MONGO_URI);

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db(settings.DB_NAME).command({ping: 1});
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
        {id: 1, title: 'front-end', studentsCount: 10},
        {id: 2, title: 'back-end', studentsCount: 10},
        {id: 3, title: 'fullstack', studentsCount: 10},
        {id: 4, title: 'devops', studentsCount: 10}
    ]
}

export type UserDBType = {
    userName: string,
    email: string,
    passwordHash: string,
    createdAt: number
}