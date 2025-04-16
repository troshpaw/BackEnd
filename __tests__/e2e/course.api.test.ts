import request from 'supertest';
import { app, HTTP_STATUSES } from '../../src/index';

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data');
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should'nt created course with incorrect input data`, async () => {
        const headers = { 'content-type': 'application/json;charset=utf-8' };
        // const body = JSON.stringify({ title: 'ML' });
        const body = { title: 'ML' };

        await request(app)
            .post('/courses')
            .set(headers)
            // .send({ title: '' })
            .send(body)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        // await request(app)
        //     .get('/courses')
        //     .expect(HTTP_STATUSES.OK_200, [])
    })
})