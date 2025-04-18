import { Request, Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { UpdateCourseModel } from '../models/UpdateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesModel';
import { CourseViewModel } from '../models/CourseViewModel';
import { URIParamsCourseIdModelseViewModel } from '../models/URIParamsCourseIdModel';
import { db } from '../db/db';

import { CourseType } from '../db/db';
import { HTTP_STATUSES } from '../utils';


import { Router } from "express";

export const coursesRouter = Router({});

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

coursesRouter.get('/', (req: RequestWithQuery<QueryCoursesModel>,
    res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses
            .filter(course => course.title
                .indexOf(req.query.title as string) > -1);
    }

    // if (foundCourses.length === 0) {
    //     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    //     return;
    // } else {
    //     res.status(200).json(foundCourses);
    // }

    res.status(HTTP_STATUSES.OK_200).json(foundCourses.map(getCourseViewModel));
})

coursesRouter.get('/:id', (req: RequestWithParams<URIParamsCourseIdModelseViewModel>,
    res: Response<CourseViewModel>) => {
    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        res.status(HTTP_STATUSES.OK_200).json(getCourseViewModel(foundCourse));
    }
})

coursesRouter.post('/', (req: RequestWithBody<CreateCourseModel>,
    res: Response<CourseViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const createdCourse: CourseType = {
        id: db.courses.length > 0
            ? db.courses[db.courses.length - 1].id + 1
            : 1,
        title: req.body.title,
        studentsCount: 0
    }

    db.courses.push(createdCourse);

    res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(createdCourse));
})

coursesRouter.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModelseViewModel>, res) => {
    const arrayAfterDelete = db.courses
        .filter(course => course.id !== +req.params.id);

    if (db.courses.length === arrayAfterDelete.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    db.courses = arrayAfterDelete;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

coursesRouter.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModelseViewModel,
    UpdateCourseModel>,
    res: Response<CourseViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const foundCourse = db.courses
        .find(course => course.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    } else {
        foundCourse.title = req.body.title;
        res.status(HTTP_STATUSES.NO_CONTENT_204).json(getCourseViewModel(foundCourse));
    }
})