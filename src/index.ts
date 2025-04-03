import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const a = 4;
    if (a < 5) {
        res.send('OK!');
    } else {
        res.send('Not OK!');
    }
})

app.get('/courses', (req, res) => {
    const a = 4;
    if (a < 5) {
        res.send('Courses!');
    } else {
        res.send('Not OK!');
    }
})

app.get('/students', (req, res) => {
    res.send('It is students.');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})