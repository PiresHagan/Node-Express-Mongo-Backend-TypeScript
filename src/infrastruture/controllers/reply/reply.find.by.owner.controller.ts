import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet } from "inversify-express-utils"
import { ReplyFindByIdUseCase } from "../../../application/use-cases/reply/reply.find.by.id.usecase"
import { ReplyFindByOwnerIdUseCase } from "../../../application/use-cases/reply/reply.find.by.owner.usecase"
import { UuidVO } from "../../../domain/value-objects/uuid.vo"
import { TYPES } from "../../../types"
import { TweetDtoType } from "../../dtos/tweet.dto"
import { TweetRequest } from "../../types"

@controller('/tweet')
export class ReplyFindByOwnerIdController {
    constructor(
        @inject(TYPES.ReplyFindByOwnerIdUseCase)
        private replyFindByOwnerIdUseCase: ReplyFindByOwnerIdUseCase
    ) {
    }
    @httpGet('/reply/ownner', TYPES.AuthMiddleware)
    async execute(req: TweetRequest<TweetDtoType>, res: Response, next: NextFunction) {
        try {

            const replyFound = await this.replyFindByOwnerIdUseCase.execute(new UuidVO(req.userId))

            res.status(200).send(replyFound)
        } catch (error) {
            next(error)
        }

    }
}