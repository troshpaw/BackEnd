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
        await request(app)
            .post('/courses')
            .send({ title: '' })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse: any = null;

    it(`should created course with correct input data`, async () => {
        const createdResponse = await request(app)
            .post('/courses')
            .send({ title: 'ML' })
            .expect(HTTP_STATUSES.CREATED_201)

        createdCourse = createdResponse.body;

        // Testing with Jest:
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'ML'
        })
        /////////////////////

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse])
    })

    it(`should'nt update course with incorrect input data`, async () => {
        await request(app)
            .put('/courses/' + createdCourse.id)
            .send({ title: '' })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.OK_200, createdCourse)
    })

    it(`should'nt update course that not exist`, async () => {
        await request(app)
            .put('/courses/' + -100)
            .send({ title: 'title' })
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update course with correct input data`, async () => {
        await request(app)
            .put('/courses/' + createdCourse.id)
            .send({ title: 'DBA' })
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdCourse,
                title: 'DBA'
            })
    })

    it(`should delete course`, async () => {
        await request(app)
            .delete('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/courses/' + createdCourse.id)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
            .get('/courses/')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})