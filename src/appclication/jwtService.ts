import jwt from 'jsonwebtoken';
import {settings} from "../settings";
import {ObjectId} from "mongodb";

// const JWT_SECRET = process.env.JWT_SECRET || '123';

export const jwtService = {
    async createJWT(user: any): Promise<any> {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"});
        return token;
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET);
            // return new ObjectId(result.userId);
            return result.userId;
        } catch (error) {
            return null;
        }
    }
}

// type decodedToken = {
//     userId: string;
//     iat: number;
//     exp: number
// }