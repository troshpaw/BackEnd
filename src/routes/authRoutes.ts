import {Request, Response} from 'express';
import {Router} from "express";
import {usersService} from "../domain/usersService";
import {HTTP_STATUSES} from '../utils';
import {jwtService} from "../appclication/jwtService";

export const authRouter = Router({});

// usersRouter.get('/',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.get('/:id',
//     async (req: Request, res: Response) => {}
// )

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const user =
            await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);

        if (!user) {
            res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        } else {
            const token = await jwtService.createJWT(user);
            res.status(HTTP_STATUSES.CREATED_201).json(token);
        }
    }
)

// usersRouter.put('/:id',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.delete('/:id',
//     async (req: Request, res: Response) => {}
// )