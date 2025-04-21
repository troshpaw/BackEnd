import express from 'express';
// import { NextFunction } from 'express';
// import { Response } from 'express';
import { coursesRouter } from './routes/courses';
import { testsRouter } from './routes/tests';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use('/courses', coursesRouter);
app.use('/__test__', testsRouter);

//////////////////////////////////////////
///////// Middleware - lesson 19 /////////
//////////////////////////////////////////

// let requestCount = 0;

// const requestCounterMiddlware = (req: Request, res: Response, next: NextFunction) => {
//     requestCount++;
//     next();
// }

// // @ts-ignore
// app.use(requestCounterMiddlware);


// http://localhost:3000/account?token=123

// const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // @ts-ignore
//     if (req.query.token === "123") {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// // @ts-ignore
// app.get('/account', authGuardMiddleware, (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'Hello!' });
// })

// // @ts-ignore
// app.get('/students', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'This is students' });
// })


// http://localhost:3000/ANY_ENDPOINT?token=123

// const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // @ts-ignore
//     if (req.query.token === "123") {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// // @ts-ignore
// app.use(authGuardMiddleware);

// app.get('/students', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'This is students' });
// })

// app.get('/account', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'Hello!' + ' ' + 'Requests: ' + requestCount });
// })

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

// app.use('/courses', coursesRouter);
// app.use('/__test__', testsRouter);