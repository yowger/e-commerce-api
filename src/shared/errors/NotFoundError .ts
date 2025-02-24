import { StatusCodes, getReasonPhrase } from "http-status-codes"

import { BaseError } from "./BaseErrors"

export class NotFoundError extends BaseError {
    constructor(message = getReasonPhrase(StatusCodes.NOT_FOUND), meta = {}) {
        super(message, StatusCodes.NOT_FOUND, meta)
    }
}
