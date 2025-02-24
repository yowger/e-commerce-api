import { NextFunction, Request, Response } from "express"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(StatusCodes.NOT_FOUND).json({
        error: getReasonPhrase(StatusCodes.NOT_FOUND),
    })
}
