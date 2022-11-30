import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { TweetFindByIdUseCase } from '../../application/usecase/tweet.find.by.id.usecase';

@controller('/tweet')
export class TweetFindByIdWithReplysController {
    constructor(
        @inject(TYPES.TweetFindByIdUseCase)
        private TweetFindByIdUseCase: TweetFindByIdUseCase
    ) {}
    @httpGet('/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        //todo => populate with replys and pagination
        const id = req.params.id;
        try {
            const tweet = await this.TweetFindByIdUseCase.execute(
                new UuidVO(id)
            );
            res.status(200).send(tweet);
        } catch (error) {
            next(error);
        }
    }
}
