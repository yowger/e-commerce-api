export type Exception<T = any> = Readonly<{
    statusCode: number
    message: string
    meta?: T
}>

export class BaseError<T = any> extends Error implements Exception {
    public readonly statusCode: number
    public readonly meta?: T

    constructor(exception: Exception<T>) {
        super(exception.message)
        this.statusCode = exception.statusCode
        this.meta = exception.meta
        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}
