import { StatusCodes } from "http-status-codes"

import { BaseError } from "./BaseErrors"

type Exception = {
    message?: string
    meta: any
}

export class ValidationError extends BaseError {
    constructor({ message = "Validation Error", meta }: Exception) {
        super({
            message,
            statusCode: StatusCodes.BAD_REQUEST,
            meta,
        })
    }
}
