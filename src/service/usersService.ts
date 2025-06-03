import * as bcrypt from "bcryptjs";
import {usersRepository} from "../repositories/usersRepository";

export const usersService = {
    async createUser(login: string, password: string, email: string) {
        const newUser = {
            login: login,
            password: this._generateHash(password),
            email: email
        }

        await usersRepository.createUser(newUser);
    },

    // async checkCredentials() {},

    _generateHash(password: string) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        return hash;
    }
}