const http = require('http');

const hostname = '127.0.0.1';
const port = 3003;

let requestsCount = 0;

const server = http.createServer((request, response) => {

    if (request.url !== '/favicon.ico') {
        requestsCount++;
    }

    switch (request.url) {
        case '/':

            setTimeout(() => {
                response.write('IT-KAMASUTRA');
                response.write(' Requests: ' + requestsCount);
                response.end();
            }, 3000);

            // const start = new Date();

            // while (new Date() - start < 3000) {
            //     console.log(new Date() - start);
            // }

            // response.write('IT-KAMASUTRA');
            // response.write(' Requests: ' + requestsCount);
            // response.end();

            break;

        case '/courses':
            response.write('BACK + FRONT');
            response.end();
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

    // response.write(' Requests: ' + requestsCount);
    // response.end();

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//// Example on nodejs.org:
// const http = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
