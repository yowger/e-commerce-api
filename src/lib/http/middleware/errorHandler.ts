import { NextFunction, Request, Response } from "express"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { BaseError } from "@/lib/errors/BaseErrors"

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof BaseError) {
        const { statusCode, response } = createErrorResponseBuilder(error)

        res.status(statusCode).json(response)
    } else {
        console.error(error.stack)

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        })
    }
}

interface ErrorResponseBuilder {
    statusCode: number
    response: {
        error: string
        meta?: any
    }
}

function createErrorResponseBuilder(error: BaseError): ErrorResponseBuilder {
    const response: { error: string; meta?: any } = {
        error: error.message,
    }

    if (error.meta) {
        response.meta = error.meta
    }

    return {
        statusCode: error.statusCode,
        response,
    }
}
