import jwt from 'jsonwebtoken';
import {settings} from "../settings";

// const JWT_SECRET = process.env.JWT_SECRET || '123';

export const jwtService = {
    async createJWT(user: any): Promise<any> {
        const token = jwt.sign({uderId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"});
        return token;
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = await jwt.verify(token, settings.JWT_SECRET);
            // return new ObjectId(result);
            return result.userId;
        } catch (error) {
            return null;
        }
    }
}