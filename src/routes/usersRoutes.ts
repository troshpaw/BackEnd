import {Request, Response} from 'express';
import {Router} from "express";
import {usersService} from "../service/usersService";
import {HTTP_STATUSES} from '../utils';

export const usersRouter = Router({});

// usersRouter.get('/',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.get('/:id',
//     async (req: Request, res: Response) => {}
// )

usersRouter.post('/',
    async (req: any, res: any) => {
        const result =
            await usersService.createUser(req.body.login, req.body.password, req.body.email);

        if (!result) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        } else {
            res.sendStatus(HTTP_STATUSES.CREATED_201);
        }
    }
)

// usersRouter.put('/:id',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.delete('/:id',
//     async (req: Request, res: Response) => {}
// )