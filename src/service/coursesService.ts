import {CourseType} from '../db/db';
import {coursesRepository} from "../repositories/coursesDBRepository";

export const coursesService = {
    async createCourse(title: string) {
        const newCourse: CourseType = {
            id: 10,
            title: title,
            studentsCount: 0
        }

        const createdCourse = await coursesRepository.createCourse(newCourse);
        return createdCourse;
    }
}