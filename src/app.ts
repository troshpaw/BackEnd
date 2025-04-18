import express, { Request, Response } from 'express';
import { coursesRouter } from './routes/courses';
import { testsRouter } from './routes/tests';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use('/courses', coursesRouter);
app.use('/__test__', testsRouter);