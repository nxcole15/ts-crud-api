import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express'
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { requestService } from './request.service';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

function getAll(req: Request, res: Response, next: NextFunction): void {
    requestService.getAll()
    .then((requests) => res.json(requests))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    requestService.getById(Number(req.params.id))
    .then((request) => res.json(request))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    requestService.create(req.body)
    .then(() => res.json({ message: 'Request created'}))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
    requestService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'Request updated' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    requestService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'Request deleted' }))
    .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
       userId: Joi.number().required(),
       type: Joi.string().required(),
       itemName: Joi.string().required(),
       status: Joi.string().valid('Pending', 'Approved', 'Rejected').default('Pending'),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        userId: Joi.number(),
        type: Joi.string(),
        itemName: Joi.string(),
        status: Joi.string().valid('Pending', 'Approved', 'Rejected'),
    });
    validateRequest(req, next, schema);
}
