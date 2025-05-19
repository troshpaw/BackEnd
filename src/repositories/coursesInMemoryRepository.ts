import { db } from '../db/db';
import { CourseType } from '../db/db';
import { CourseViewModel } from '../models/CourseViewModel';

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

export const coursesRepository = {
    
    async findCourses(title: string | null | undefined) {
        if (title) {
            let filteredCourses = db.courses.filter(course => course.title.indexOf(title as string) > -1);
            return filteredCourses.map(getCourseViewModel);
        } else {
            return db.courses.map(getCourseViewModel);
        }
    },

    async findCourseOnId(id: number) {
        const foundCourseOnId = db.courses.find(course => course.id === id);

        if (!foundCourseOnId) {
            return undefined;
        } else {
            return (getCourseViewModel(foundCourseOnId));
        }

    },

    async createCourse(title: string) {
        const createdCourse: CourseType = {
            id: db.courses.length > 0
                ? db.courses[db.courses.length - 1].id + 1
                : 1,
            title: title,
            studentsCount: 0
        }

        db.courses.push(createdCourse);

        return (getCourseViewModel(createdCourse));
    },

    async updateCourse(id: number, title: string) {
        const foundCourseOnId = db.courses.find(course => course.id === id);

        if (!foundCourseOnId) {
            return false;
        } else {
            foundCourseOnId.title = title;
            return true;
        }
    },

    async deleteCourse(id: number) {
        const arrayAfterDelete = db.courses.filter(course => course.id !== id);

        if (db.courses.length === arrayAfterDelete.length) {
            return false;
        } else {
            db.courses = arrayAfterDelete;
            return true;
        }
    }
}