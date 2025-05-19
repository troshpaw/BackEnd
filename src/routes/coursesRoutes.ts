import { NextFunction, Request, Response } from 'express';
import { Router } from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from '../types';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { UpdateCourseModel } from '../models/UpdateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesModel';
import { CourseViewModel } from '../models/CourseViewModel';
import { URIParamsCourseIdModelseViewModel } from '../models/URIParamsCourseIdModel';
import { HTTP_STATUSES } from '../utils';
import { coursesRepository } from '../repositories/coursesDBRepository';
import { body, validationResult } from 'express-validator';
import { inputValidationMiddlware } from '../middlewares/middlewares';

const titleValidation = body('title').isLength({ min: 1, max: 10 })
    .withMessage('Title length from 1 to 10 symbols.');

export const coursesRouter = Router({});

coursesRouter.get('/',
    async (req: RequestWithQuery<QueryCoursesModel>,
           res: Response<CourseViewModel[]>) => {
        // (req: RequestWithQuery<QueryCoursesModel>, res: Response<Promise<CourseViewModel[]>>) => {

        const foundCourses = await coursesRepository.findCourses(req.query.title?.toString());

        res.status(HTTP_STATUSES.OK_200).json(foundCourses);
    })

coursesRouter.get('/:id',
    async (req: RequestWithParams<URIParamsCourseIdModelseViewModel>,
           res: Response<CourseViewModel>) => {

        const foundCourse = await coursesRepository.findCourseOnId(+req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            res.status(HTTP_STATUSES.OK_200).json(foundCourse);
        }
    })

coursesRouter.post('/',
    titleValidation,
    inputValidationMiddlware,

    // (req: RequestWithBody<CreateCourseModel>,
    // res: Response<CourseViewModel>) => {
    async (req: Request,
           res: Response) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     // res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ errors: errors.array() });
        //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        //     return;
        // }

        // if (!req.body.title) {
        //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        //     return;
        // }

        const createdCourse = await coursesRepository.createCourse(req.body.title)

        res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
    }
)

coursesRouter.put('/:id',
    titleValidation,
    inputValidationMiddlware,

    // (req: RequestWithParamsAndBody<URIParamsCourseIdModelsViewModel, UpdateCourseModel>,
    // res: Response<CourseViewModel>) => {
    async (req: Request,
           res: Response) => {


        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     // res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ errors: errors.array() });
        //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        //     return;
        // }

        // if (!req.body.title) {
        //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        //     return;
        // }

        const isUpdate = await coursesRepository.updateCourse(+req.params.id, req.body.title);

        if (!isUpdate) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            const updatedCourse = coursesRepository.findCourseOnId(+req.params.id)
            res.status(HTTP_STATUSES.NO_CONTENT_204).json(updatedCourse);
        }
    })

coursesRouter.delete('/:id',
    async (req: RequestWithParams<URIParamsCourseIdModelseViewModel>,
           res) => {

        const isDeleted = await coursesRepository.deleteCourse(+req.params.id)

        if (!isDeleted) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        }
    })
