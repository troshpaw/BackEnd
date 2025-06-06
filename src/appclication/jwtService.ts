import jwt from 'jsonwebtoken';
import {UserDBType} from "../db/db";
import {settings} from "../settings";

// const JWT_SECRET = process.env.JWT_SECRET || '123';

export const jwtService = {
    async createJWT(user: any): Promise<any> {
        const token = jwt.sign({uderId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"});
        return token;
    }
}