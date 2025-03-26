const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3003;

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}

const server = http.createServer(async (request, response) => {

    switch (request.url) {

        case '/':
            // fs.readFile('./pages/about.html', (err, data) => {
            //     if (err) console.error(err);
            //     else response.write(data);
            //     response.end();
            // });

            try {
                const data = await readFile('./pages/about.html');
                response.write(data);
                response.end();
            } catch (error) {
                response.write('something wrong');
                response.end();
            }

            break;

        case '/courses':
            setTimeout(() => {
                response.write('BACK + FRONT');
                response.end();
            }, 3000);
            break;

        case '/students':
            response.write('STUDENTS');
            response.end();
            break;

        default:
            response.write('404 not found');
            response.end();
            break;
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
