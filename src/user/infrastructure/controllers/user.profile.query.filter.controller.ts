import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { ProfileFindByQueryFilterUseCase } from '../../application,/usecases/profile.find.query.filter.usecase';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { QueryFilterVO } from '../../../shared/domain/value-objects/query-filter.vo';

@controller('/user')
export class ProfileFindQueryFilterController {
    constructor(
        @inject(TYPES.ProfileFindByQueryFilterUseCase)
        private profileFindByQueryFilterUseCase: ProfileFindByQueryFilterUseCase
    ) {}
    @httpGet('/:id?query=query', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const { query } = req.query;
        const id = req.params.id;
        //todo -> get with id user
        try {
            const user = await this.profileFindByQueryFilterUseCase.execute(
                new UuidVO(id),
                new QueryFilterVO(`${query}`)
            );
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }
}
