import express from 'express';

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
// app.use(express.json());

const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'fullstack' },
        { id: 4, title: 'devops' }
    ]
};

app.get('/', (req, res) => {
    // res.send({ message: 'BACK-END' });
    res.json({ message: 'IT-INCUBATOR' });
})

app.get('/courses', (req, res) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses
            .filter(course => course.title.indexOf(req.query.title as string) > -1);
    }

    res.json(foundCourses);
})

app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }

    res.json(foundCourse);
})

app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }

    const createdCourse = {
        id: db.courses[db.courses.length - 1].id + 1,
        title: req.body.title
    }

    db.courses.push(createdCourse);

    res.status(201).json(createdCourse);
})

// app.delete('/courses', (req, res) => {
//     db.courses = db.courses.filter(course => course.title !== req.body.title);

//     res.sendStatus(204);
// })

app.delete('/courses/:id', (req, res) => {
    const arrayAfterDelete = db.courses.filter(course => course.id !== +req.params.id);

    if (db.courses.length === arrayAfterDelete.length) {
        res.sendStatus(404);
        return;
    }
    
    db.courses = arrayAfterDelete;
    res.sendStatus(204);
})

app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }

    const foundCourse = db.courses.find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }

    foundCourse.title = req.body.title;

    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})