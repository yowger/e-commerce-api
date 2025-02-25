import { StatusCodes, getReasonPhrase } from "http-status-codes"

import { BaseError } from "./BaseErrors"

export class NotFoundError extends BaseError {
    constructor(message = getReasonPhrase(StatusCodes.NOT_FOUND)) {
        super({ message, statusCode: StatusCodes.NOT_FOUND })
    }
}
