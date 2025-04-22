import { NextFunction } from 'express';
import { Response } from 'express';

///////// Middleware - lesson 19 /////////

// let requestCount = 0;

// export const requestCounterMiddlware = (req: Request, res: Response, next: NextFunction) => {
//     requestCount++;
//     next();
// }


// http://localhost:3000/account?token=123

// export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.query.token === "123") {
        next();
    } else {
        res.sendStatus(401);
    }
}

// // @ts-ignore
// app.get('/students', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'This is students' });
// })

// // @ts-ignore
// app.get('/account', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'Hello!' + ' ' + 'Requests: ' + requestCount });
// })