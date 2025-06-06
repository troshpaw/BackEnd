import jwt from 'jsonwebtoken';
import {settings} from "../settings";
import {ObjectId} from "mongodb";

// const JWT_SECRET = process.env.JWT_SECRET || '123';

export const jwtService = {
    async createJWT(user: any): Promise<any> {
        const token = jwt.sign({uderId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"});
        return token;
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = await jwt.verify(token, settings.JWT_SECRET);
            return new ObjectId(result);
        } catch (error) {
            return null;
        }
    }
}