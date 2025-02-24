import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { BaseError } from "./BaseErrors"

export class BadRequestError extends BaseError {
    constructor(message = getReasonPhrase(StatusCodes.BAD_REQUEST)) {
        super({
            message,
            statusCode: StatusCodes.BAD_REQUEST,
        })
    }
}
