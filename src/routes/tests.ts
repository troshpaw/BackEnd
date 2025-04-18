import { db } from '../db/db';
import { HTTP_STATUSES } from '../utils';

import { Router } from "express";

export const testsRouter = Router({});

testsRouter.delete('/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})