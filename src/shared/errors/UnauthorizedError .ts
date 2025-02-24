import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { BaseError } from "./BaseErrors"

export class UnauthorizedError extends BaseError {
    constructor(
        message = getReasonPhrase(StatusCodes.UNAUTHORIZED),
        meta: any = {}
    ) {
        super(message, StatusCodes.UNAUTHORIZED, meta)
    }
}
