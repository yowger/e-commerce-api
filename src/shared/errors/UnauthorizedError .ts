import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { BaseError } from "./BaseErrors"

export class UnauthorizedError extends BaseError {
    constructor(message = getReasonPhrase(StatusCodes.UNAUTHORIZED)) {
        super({
            message,
            statusCode: StatusCodes.UNAUTHORIZED,
        })
    }
}
