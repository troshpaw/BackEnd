import {client, DB_NAME} from '../db/db';

const usersCollection = client.db(DB_NAME).collection('users');

export const usersRepository = {
    async createUser(newUser: any) {
        return await usersCollection.insertOne(newUser);
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user =
            await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]});

        return user;
    }
}