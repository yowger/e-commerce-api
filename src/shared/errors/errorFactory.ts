import { StatusCodes } from "http-status-codes"

import { BadRequestError } from "./BadRequestError "
import { BaseError } from "./BaseErrors"
import { InternalServerError } from "./InternalServerError "
import { NotFoundError } from "./NotFoundError "
import { UnauthorizedError } from "./UnauthorizedError "

export function createHttpError(
    statusCode: number,
    message: string,
    meta: any = {}
): BaseError {
    switch (statusCode) {
        case StatusCodes.BAD_REQUEST:
            return new BadRequestError(message, meta)
        case StatusCodes.UNAUTHORIZED:
            return new UnauthorizedError(message, meta)
        case StatusCodes.NOT_FOUND:
            return new NotFoundError(message, meta)
        case StatusCodes.INTERNAL_SERVER_ERROR:
            return new InternalServerError(message, meta)
        default:
            return new BaseError(message, statusCode, meta)
    }
}
