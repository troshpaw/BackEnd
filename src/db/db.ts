import { MongoClient } from "mongodb";

const mongoUri = process.env.mongoURI || 'mongoDB://localhost:27017';

export const client = new MongoClient(mongoUri);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected succesfully to DB');

        await client.db('students').command({ping: 1});
        console.log('Connected successfully to mongo server');
    } catch (error) {
        console.log('Can not connect to mongo server');
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