import { MongoClient } from "mongodb";

const url = 'myUrl';
const client = new MongoClient(url);

const dbName = 'myDbName';

export const connectDB = async () => {
    // await client.connect();
    // console.log('Connected succesfully to DB');

    // const db = client.db(dbName);
    // const collections = db.collection('myCollection');

    // return 'done';
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