import {Request, Response} from 'express';
import {Router} from "express";
import {feedbackService} from "../domain/feedbackService";
import {authMiddleware} from "../middlewares/middlewares";

export const feedbackRouter = Router({});

feedbackRouter.post('/', authMiddleware,
    async (req: Request, res: Response) => {
        const feedbackIsSend =
            await feedbackService.sendFeedback(req.body.comment, req.body.user._id);
    });