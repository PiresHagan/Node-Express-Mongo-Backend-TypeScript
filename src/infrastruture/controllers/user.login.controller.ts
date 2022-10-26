import { NextFunction, Response } from "express"
import { MissingFieldException } from "../errors/missing.fields.exception"
import { UnnecesayFieldsExceptions } from "../errors/unnecesay.fields.exception"
import { UserRequest } from "../types"
import { UserLoginUseCase } from '../../application/use-cases/user.login.usecase'
import { UserLogintDtoType } from "../dtos/user-login.dto"
import { controller, httpPost }
    from "inversify-express-utils"
import { inject } from "inversify"
import { TYPES } from "../../types"

@controller('/auth')
export class UserLoginController {
    constructor(
        @inject(TYPES.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) { }

    @httpPost('/login', TYPES.AuthMiddleware)
    async execute(req: UserRequest<UserLogintDtoType>, res: Response, next: NextFunction) {
        console.log(req.userId)
        try {
            const { email, password, ...rest } = req.body
            if (!email || !password) throw new MissingFieldException()

            if (Object.keys(rest).length > 0) {
                throw new UnnecesayFieldsExceptions()
            }
            const token = await this.userLoginUseCase.execute(email, password)
            res.status(200).send(token)
        } catch (error) {
            next(error)
        }

    }
} 