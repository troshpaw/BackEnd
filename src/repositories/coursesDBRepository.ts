import {client, db} from '../db/db';
import {settings} from "../settings";
import {CourseType} from '../db/db';
import {CourseViewModel} from '../models/CourseViewModel';

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

const coursesCollection =
    client.db(settings.DB_NAME).collection<CourseType>('courses');

export const coursesRepository = {

    async findCourses(title: string | null | undefined): Promise<CourseViewModel[] | undefined> {
        const filter: any = {};

        if (title) {
            filter.title = {$regex: title};
        }

        const foundCourses = await coursesCollection.find(filter).toArray();

        if (!foundCourses) {
            return undefined;
        } else {
            return (foundCourses.map(getCourseViewModel));
        }
    },

    async findCourseOnId(id: number): Promise<CourseViewModel | undefined> {
        const foundCourseOnId: CourseType | null = await coursesCollection.findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            return getCourseViewModel(foundCourseOnId);
        }
    },

    async createCourse(createdCourse: CourseType): Promise<CourseViewModel | undefined> {
        const result = await coursesCollection.insertOne(createdCourse);

        if (!result.acknowledged) {
            return undefined;
        } else {
            return (getCourseViewModel(createdCourse));
        }
    },

    async updateCourse(id: number, title: string) {
        const foundCourseOnId: CourseType | null = await coursesCollection.findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            const result =
                await coursesCollection.updateOne({id: id}, {$set: {title: title}});
            return result;
        }
    },

    async deleteCourse(id: number) {
        const foundCourseOnId: CourseType | null = await coursesCollection.findOne({id: id});

        if (!foundCourseOnId) {
            return undefined;
        } else {
            const result = await coursesCollection.deleteOne({id: id});
            return result;
        }
    }
}