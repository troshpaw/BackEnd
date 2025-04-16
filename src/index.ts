import express, { Request, Response } from 'express';

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

const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'fullstack' },
        { id: 4, title: 'devops' }
    ]
};

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'IT-INCUBATOR' });
})

app.get('/courses', (req, res) => {
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

    res.status(200).json(foundCourses);
})

app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        res.json(foundCourse);
    }
})

// fetch('http://localhost:3001/courses', {
//     method: 'POST',
//     headers: { 'content-type': 'application/json;charset=utf-8' },
//     body: JSON.stringify({ title: 'ML' })
// })

app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const createdCourse = {
        id: db.courses[db.courses.length - 1].id + 1,
        title: req.body.title
    }

    db.courses.push(createdCourse);


    //////////////////////////////////////////////////
    // if (!req.body.title) {
    //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    //     return;
    // }
    //////////////////////////////////////////////////


    // res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201);
})

app.delete('/courses/:id', (req, res) => {
    const arrayAfterDelete = db.courses
        .filter(course => course.id !== +req.params.id);

    if (db.courses.length === arrayAfterDelete.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    db.courses = arrayAfterDelete;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        foundCourse.title = req.body.title;
        res.status(HTTP_STATUSES.NO_CONTENT_204);
    }
})

app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})