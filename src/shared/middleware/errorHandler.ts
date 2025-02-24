import { NextFunction, Request, Response } from "express"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { BaseError } from "@/shared/errors/BaseErrors"

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof BaseError) {
        res.status(error.statusCode).json({ error: error.message })
    }

    console.error(error.stack)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
}
