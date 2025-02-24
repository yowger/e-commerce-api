import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { BaseError } from "./BaseErrors"

export class InternalServerError extends BaseError {
    constructor(message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)) {
        super({
            message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}
