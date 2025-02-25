import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"
import { z } from "zod"

import { GetProductByIdUseCase } from "@/features/catalog/app/useCases/GetProductByIdUseCase"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { validator } from "@/lib/http/validation/Validator"

const { getParams } = validator({
    params: z.object({
        id: z.string(),
    }),
})

@injectable()
export class GetProductByIdController {
    constructor(
        @inject(catalogTokens.useCases.GetProductById)
        private getProductByIdUseCase: GetProductByIdUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = getParams(req)

        const product = await this.getProductByIdUseCase.execute(id)

        return res.status(StatusCodes.OK).json(ProductMapper.toDTO(product))
    }
}
