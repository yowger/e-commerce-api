import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetProductBySlugUseCase } from "@/features/catalog/app/useCases/GetProductBySlugUseCase"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { NotFoundError } from "@/lib/errors/NotFoundError "

@injectable()
export class GetProductBySlugController {
    constructor(
        @inject(catalogTokens.useCases.GetProductBySlug)
        private getProductBySlugUseCase: GetProductBySlugUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { slug } = req.params

        const product = await this.getProductBySlugUseCase.execute(slug)

        if (!product) {
            throw new NotFoundError("Product not found")
        }

        return res.status(StatusCodes.OK).json(ProductMapper.toDTO(product))
    }
}
