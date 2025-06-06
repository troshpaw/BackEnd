import express from 'express';
import {coursesRouter} from './routes/coursesRoutes';
import {testsRouter} from './routes/testsRoutes';
import {usersRouter} from "./routes/usersRoutes";
import {authRouter} from "./routes/authRoutes";
import {feedbackRouter} from "./routes/feedbacksRoutes";
// import { authGuardMiddleware } from './middlewares/middlewares';

export const app = express();

// app.use((req, res, next) => {
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'none'; connect-src 'self' http://localhost:3001 ws://localhost:3001 ws://localhost:*/sockjs-node"
//     );
//     next();
// });

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

// // @ts-ignore
// app.use(authGuardMiddleware);

app.use('/courses', coursesRouter);
app.use('/__test__', testsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feedbacks', feedbackRouter);