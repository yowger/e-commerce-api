import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetProductsUseCase } from "@/features/catalog/app/useCases/GetProductsUseCase"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { validator } from "@/lib/http/validation/Validator"
import { paginationSchema } from "@/lib/http/validation/paginationSchema"

const { getQuery } = validator({
    query: paginationSchema,
})

@injectable()
export class GetProductsController {
    constructor(
        @inject(catalogTokens.useCases.GetProducts)
        private getProductsUseCase: GetProductsUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { page, pageSize } = getQuery(req)

        const product = await this.getProductsUseCase.execute(page, pageSize)

        return res.status(StatusCodes.OK).json(product)
    }
}
