import {client, UserDBType, UserInputType} from '../db/db';
import {settings} from "../settings";

const usersCollection = client.db(settings.DB_NAME).collection('users');

export const usersRepository = {
    async createUser(newUser: UserInputType): Promise<UserDBType> {
        const createdUser: UserDBType = await usersRepository.createUser(newUser);
        return createdUser;
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user =
            await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]});

        return user;
    }
}