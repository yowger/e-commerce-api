import { NextFunction, Request, Response } from "express"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack)
    res.status(500).json({ error: "Something went wrong!" })
}

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({ error: "Route Not Found" })
}
