import {Request, Response} from 'express';
import {Router} from "express";
import {usersService} from "../service/usersService";
import {HTTP_STATUSES} from '../utils';

export const authRouter = Router({});

// usersRouter.get('/',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.get('/:id',
//     async (req: Request, res: Response) => {}
// )

authRouter.post('/',
    async (req: Request, res: Response) => {
        const checkResult =
            await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);

        if (!checkResult) {
            res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        } else {
            res.send(HTTP_STATUSES.OK_200);
        }
    }
)

// usersRouter.put('/:id',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.delete('/:id',
//     async (req: Request, res: Response) => {}
// )