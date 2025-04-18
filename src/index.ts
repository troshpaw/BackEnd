import { app } from "./app";

// app.get('/', (req, res: Response<{ message: string }>) => {
//     res.json({ message: 'IT-INCUBATOR' });
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})