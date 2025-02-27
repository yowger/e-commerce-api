import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetProductByIdUseCase } from "@/features/catalog/app/useCases/GetProductByIdUseCase"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

@injectable()
export class GetProductByIdController {
    constructor(
        @inject(catalogTokens.useCases.GetProductById)
        private getProductByIdUseCase: GetProductByIdUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const product = await this.getProductByIdUseCase.execute(id)

        return res.status(StatusCodes.OK).json(ProductMapper.toDTO(product))
    }
}
