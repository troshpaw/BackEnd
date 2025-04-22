import express from 'express';
import { coursesRouter } from './routes/coursesRoutes';
import { testsRouter } from './routes/testsRoutes';
// import { authGuardMiddleware } from './middleware';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

// // @ts-ignore
// app.use(authGuardMiddleware);

app.use('/courses', coursesRouter);
app.use('/__test__', testsRouter);