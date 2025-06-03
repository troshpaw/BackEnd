import {Request, Response} from 'express';
import {Router} from "express";
import {usersService} from "../service/usersService";

export const usersRouter = Router({});

// usersRouter.get('/',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.get('/:id',
//     async (req: Request, res: Response) => {}
// )

usersRouter.post('/',
    async (req: Request, res: Response) => {
        const createdUser =
            await usersService.createUser(req.body.login, req.body.password, req.body.email);
    }
)

// usersRouter.put('/:id',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.delete('/:id',
//     async (req: Request, res: Response) => {}
// )