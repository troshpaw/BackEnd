import {client, UserDBType} from '../db/db';
import {settings} from "../settings";

const usersCollection = client.db(settings.DB_NAME).collection('users');

export const usersRepository = {
    async createUser(newUser: UserDBType) {
        return await usersCollection.insertOne(newUser);
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user =
            await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]});

        return user;
    }
}