import bcrypt from 'bcryptjs';
import {usersRepository} from "../repositories/usersRepository";
import {UserInputType} from "../db/db";

export const usersService = {
    async findUserByUserId(userId: string) {
        return await usersRepository.findUserByUserId(userId);
    },

    // async createUser(login: string, email: string, password: string) {
    //     const passwordSalt = await bcrypt.genSalt(10);
    //     const passwordHash = await this._generateHash(password, passwordSalt);
    //
    //     const newUser = {
    //         userName: login,
    //         email,
    //         passwordSalt,
    //         passwordHash,
    //         createdAt: Date.now()
    //     }
    //
    //     return await usersRepository.createUser(newUser);
    // },

    async createUser(login: string, email: string, password: string)  {
        const passwordHash = await this._generateHash(password);

        const newUser: UserInputType = {
            userName: login,
            email,
            passwordHash,
            createdAt: Date.now()
        }

        return await usersRepository.createUser(newUser);
    },

    // async checkCredentials(loginOrEmail: string, password: string) {
    //     const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    //
    //     if (!user) {
    //         return false;
    //     }
    //
    //     const passwordSalt = user.passwordSalt;
    //     const passwordHash = await this._generateHash(password, passwordSalt);
    //
    //     if (user.passwordHash !== passwordHash) {
    //         return false;
    //     }
    //
    //     return true;
    // },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);

        console.log('---------------');
        if (!user) {
            console.log('User not found');
            return false;
        } else {
            console.log('User found');
        }

        const passwordHash = user.passwordHash;
        const passwordIsValid = await this._verifyPassword(password, passwordHash);

        if (!passwordIsValid) {
            return false;
        } else {
            return user;
        }
    },

    // async _generateHash(password: string, salt: string) {
    //     const hash = bcrypt.hash(password, salt);
    //     return hash;
    // },

    async _generateHash(password: string) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        return hash;
    },

    async _verifyPassword(password: string, passwordHash: string): Promise<boolean | undefined> {
        return new Promise((resolve) => {
            bcrypt.compare(password, passwordHash, (err, result) => {
                if (err) {
                    console.error('Error verifying password:', err);
                    resolve(false);
                } else {
                    console.log('Password match:', result);
                    resolve(result);
                }
            })
        })
    }
}