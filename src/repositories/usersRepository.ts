import {client, CourseType, DB_NAME} from '../db/db';

const usersCollection = client.db(DB_NAME).collection('users');

export const usersRepository = {
    async createUser(newUser: any) {
        return await usersCollection.insertOne(newUser);
    }
}