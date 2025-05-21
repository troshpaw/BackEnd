import {client, db, DB_NAME} from '../db/db';
import {CourseType} from '../db/db';
import {CourseViewModel} from '../models/CourseViewModel';

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

export const coursesRepository = {

    async findCourses(title: string | null | undefined): Promise<CourseViewModel[]> {
        let foundCourses;

        if (title) {
            foundCourses = await client.db(DB_NAME).collection<CourseType>('courses')
                .find({title: {$regex: title}}).toArray();
        } else {
            foundCourses = await client.db(DB_NAME).collection<CourseType>('courses')
                .find().toArray();
        }

        return (foundCourses.map(getCourseViewModel));
    },

    async findCourseOnId(id: number): Promise<CourseViewModel | undefined> {
        const foundCourseOnId: CourseType | null =
            await client.db(DB_NAME).collection<CourseType>('courses').findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            return getCourseViewModel(foundCourseOnId);
        }
    },

    async createCourse(title: string) {
        const createdCourse: CourseType = {
            id: 10,
            title: title,
            studentsCount: 0
        }

        const result =
            await client.db(DB_NAME).collection<CourseType>('courses').insertOne(createdCourse);

        if (result) {
            return (getCourseViewModel(createdCourse));
        }
    },

    async updateCourse(id: number, title: string) {
        const foundCourseOnId: CourseType | null =
            await client.db(DB_NAME).collection<CourseType>('courses').findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            const result =
                await client.db(DB_NAME).collection<CourseType>('courses').updateOne({id: id}, {$set: {title: title}});
            return result;
        }
    },

    async deleteCourse(id: number) {
        const foundCourseOnId: CourseType | null =
            await client.db(DB_NAME).collection<CourseType>('courses').findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            const result =
                await client.db(DB_NAME).collection<CourseType>('courses').deleteOne({id: id});
            return result;
        }
    }
}