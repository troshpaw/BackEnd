import {client, UserDBType, UserInputType} from '../db/db';
import {settings} from "../settings";
import {ObjectId} from "mongodb";

const usersCollection = client.db(settings.DB_NAME).collection('users');

export const usersRepository = {
    async findUserByUserId(userId: string) {
        return await usersCollection.findOne({_id: new ObjectId(userId)});
    },

    async createUser(newUser: UserInputType) {
        const result = await usersCollection.insertOne(newUser);

        if (!result.acknowledged) {
            return false;
        }
        return true;
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user =
            await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]});

        return user;
    }
}