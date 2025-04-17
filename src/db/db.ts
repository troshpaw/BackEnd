import { CourseType } from '../index';

export const db: { courses: CourseType[] } = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'fullstack', studentsCount: 10 },
        { id: 4, title: 'devops', studentsCount: 10 }
    ]
};