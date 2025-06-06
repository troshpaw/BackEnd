import {NextFunction, Request, Response} from 'express';
import {Router} from "express";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from '../types';
import {CreateCourseModel} from '../models/CreateCourseModel';
import {UpdateCourseModel} from '../models/UpdateCourseModel';
import {QueryCoursesModel} from '../models/QueryCoursesModel';
import {CourseViewModel} from '../models/CourseViewModel';
import {URIParamsCourseIdModelsViewModel} from '../models/URIParamsCourseIdModel';
import {HTTP_STATUSES} from '../utils';
import {coursesRepository} from '../repositories/coursesDBRepository';
import {body, validationResult} from 'express-validator';
import {inputValidationMiddlware} from '../middlewares/middlewares';
import {coursesService} from "../domain/coursesService";

const titleValidation = body('title').isLength({min: 1, max: 10})
    .withMessage('Title length from 1 to 10 symbols.');

export const coursesRouter = Router({});

coursesRouter.get('/',
    async (req: RequestWithQuery<QueryCoursesModel>,
           res: Response<CourseViewModel[]>) => {

        const foundCourses =
            await coursesRepository.findCourses(req.query.title?.toString());

        res.status(HTTP_STATUSES.OK_200).json(foundCourses);
    }
)

coursesRouter.get('/:id',
    async (req: RequestWithParams<URIParamsCourseIdModelsViewModel>,
           res: Response<CourseViewModel>) => {

        const foundCourse = await coursesRepository.findCourseOnId(+req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            res.status(HTTP_STATUSES.OK_200).json(foundCourse);
        }
    }
)

coursesRouter.post('/',
    titleValidation,
    inputValidationMiddlware,

    async (req: RequestWithBody<CreateCourseModel>,
           res: Response<CourseViewModel>) => {

        const createdCourse = await coursesService.createCourse(req.body.title)

        res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
    }
)

coursesRouter.put('/:id',
    titleValidation,
    inputValidationMiddlware,

    async (req: RequestWithParamsAndBody<URIParamsCourseIdModelsViewModel, UpdateCourseModel>,
           res: Response<CourseViewModel>) => {

        const isUpdate =
            await coursesRepository.updateCourse(+req.params.id, req.body.title);

        if (!isUpdate) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            const updatedCourse =
                await coursesRepository.findCourseOnId(+req.params.id);
            res.status(HTTP_STATUSES.NO_CONTENT_204).json(updatedCourse);
        }
    }
)

coursesRouter.delete('/:id',
    async (req: RequestWithParams<URIParamsCourseIdModelsViewModel>,
           res) => {

        const isDeleted = await coursesRepository.deleteCourse(+req.params.id)

        if (!isDeleted) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        }
    }
)
