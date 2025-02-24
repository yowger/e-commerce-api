export type Exception = Readonly<{
    statusCode: number
    message: string
    meta?: Record<string, unknown>
}>

export class BaseError extends Error implements Exception {
    public readonly statusCode: number
    public readonly meta?: any

    constructor(
        message: string,
        statusCode: number,
        meta: Record<string, unknown> = {}
    ) {
        super(message)
        this.statusCode = statusCode
        this.meta = meta
        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}
