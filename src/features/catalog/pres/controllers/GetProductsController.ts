import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"
import { z } from "zod"

import { GetProductsUseCase } from "@/features/catalog/app/useCases/GetProductsUseCase"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { validator } from "@/lib/http/validation/Validator"
import { paginationSchema } from "@/lib/http/validation/paginationSchema"

export const productFilterSchema = z.object({
    name: z.string().optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    categoryId: z.string().uuid().optional(),
    createdAfter: z.coerce.date().optional(),
    createdBefore: z.coerce.date().optional(),
})

const { getQuery, getParams } = validator({
    query: paginationSchema,
    params: productFilterSchema,
})

@injectable()
export class GetProductsController {
    constructor(
        @inject(catalogTokens.useCases.GetProducts)
        private getProductsUseCase: GetProductsUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { page, pageSize } = getQuery(req)
        const productFilters = getParams(req)

        const product = await this.getProductsUseCase.execute(page, pageSize, productFilters)

        return res.status(StatusCodes.OK).json(product)
    }
}
