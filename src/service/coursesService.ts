import {CourseType} from '../db/db';
import {coursesRepository} from "../repositories/coursesDBRepository";

export const coursesService = {
    async createCourse(title: string) {
        const createdCourse: CourseType = {
            id: 10,
            title: title,
            studentsCount: 0
        }

        return await coursesRepository.createCourse(createdCourse);
    }
}