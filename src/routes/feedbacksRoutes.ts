import {Request, Response} from 'express';
import {Router} from "express";
import {feedbackService} from "../domain/feedbackService";
import {authMiddleware} from "../middlewares/middlewares";
import {HTTP_STATUSES} from "../utils";

export const feedbackRouter = Router({});

feedbackRouter.post('/', authMiddleware,
    async (req: Request, res: Response) => {
        const feedbackIsSend =
            await feedbackService.sendFeedback(req.body.comment, req.body.user);
        if (feedbackIsSend) {
            console.log('The feedback was left: ' + req.body.user.userName);
            res.send(HTTP_STATUSES.CREATED_201);
        }
    })