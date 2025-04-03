"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    const a = 4;
    if (a < 5) {
        res.send('OK!');
    }
    else {
        res.send('Not OK!');
    }
});
app.get('/courses', (req, res) => {
    const a = 4;
    if (a < 5) {
        res.send('Courses!');
    }
    else {
        res.send('Not OK!');
    }
});
app.get('/students', (req, res) => {
    res.send('It is students.');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
