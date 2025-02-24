import { Request, Response } from "express"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { CustomError } from "@/shared/errors/customErrors"

export function errorHandler(error: Error, req: Request, res: Response) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message })
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
}
