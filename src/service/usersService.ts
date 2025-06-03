import bcrypt from 'bcryptjs';
import {usersRepository} from "../repositories/usersRepository";

export const usersService = {
    async createUser(login: string, email: string, password: string) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);

        const newUser = {
            userName: login,
            email,
            passwordSalt,
            passwordHash,
            createdAt: Date.now()
        }

        return await usersRepository.createUser(newUser);
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);

        if (!user) {
            return false;
        }

        const passwordSalt = user.passwordSalt;
        const passwordHash = await this._generateHash(password, passwordSalt);

        if (user.passwordHash !== passwordHash) {
            return false;
        }

        return true;
    },

    async _generateHash(password: string, salt: string) {
        const hash = bcrypt.hash(password, salt);
        return hash;
    },

    // async __generateHash(password: string) {
    //     const saltRounds = 10;
    //     const hash = bcrypt.hashSync(password, saltRounds);
    //
    //     return hash;
    // }
}