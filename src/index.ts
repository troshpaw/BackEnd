import express, { Request, Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types';
import { CreateCourseModel } from './models/CreateCourseModel';
import { UpdateCourseModel } from './models/UpdateCourseModel';
import { QueryCoursesModel } from './models/QueryCoursesModel';
import { CourseViewModel } from './models/CourseViewModel';

export const app = express();
const port = process.env.PORT || 3000;

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

type CourseType = {
    id: number,
    title: string
}

const db: { courses: CourseType[] } = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'fullstack' },
        { id: 4, title: 'devops' }
    ]
};

app.get('/', (req, res: Response<{ message: string }>) => {
    res.json({ message: 'IT-INCUBATOR' });
})

app.get('/courses', (req: RequestWithQuery<QueryCoursesModel>,
    res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses
            .filter(course => course.title
                .indexOf(req.query.title as string) > -1);
    }

    // if (foundCourses.length === 0) {
    //     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    //     return;
    // } else {
    //     res.status(200).json(foundCourses);
    // }

    res.status(HTTP_STATUSES.OK_200).json(foundCourses);
})

app.get('/courses/:id', (req: RequestWithParams<{ id: string }>, 
    res: Response<CourseViewModel>) => {
    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        res.status(HTTP_STATUSES.OK_200).json(foundCourse);
    }
})

// fetch('http://localhost:3000/courses', {
//     method: 'POST',
//     headers: { 'content-type': 'application/json;charset=utf-8' },
//     body: JSON.stringify({ title: 'ML' })
// })

app.post('/courses', (req: RequestWithBody<CreateCourseModel>,
    res: Response<CourseViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const createdCourse = {
        id: db.courses.length > 0
            ? db.courses[db.courses.length - 1].id + 1
            : 1,
        title: req.body.title
    }

    db.courses.push(createdCourse);

    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
})

app.delete('/courses/:id', (req: RequestWithParams<{ id: string }>, res) => {
    const arrayAfterDelete = db.courses
        .filter(course => course.id !== +req.params.id);

    if (db.courses.length === arrayAfterDelete.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    db.courses = arrayAfterDelete;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.put('/courses/:id', (req: RequestWithParamsAndBody<{ id: string }, UpdateCourseModel>,
    res: Response<CourseViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        foundCourse.title = req.body.title;
        res.status(HTTP_STATUSES.NO_CONTENT_204).json(foundCourse);
    }
})

app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})