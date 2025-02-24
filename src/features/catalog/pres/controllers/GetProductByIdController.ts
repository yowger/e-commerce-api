import { Request, Response } from "express"
import { inject, injectable } from "inversify"
import { StatusCodes } from "http-status-codes"

import { GetProductByIdUseCase } from "@/features/catalog/app/useCases/GetProductByIdUseCase"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class GetProductByIdController {
    constructor(
        @inject(catalogTokens.useCases.GetProductById)
        private getProductByIdUseCase: GetProductByIdUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const product = await this.getProductByIdUseCase.execute(id)

        return response
            .status(StatusCodes.OK)
            .json(ProductMapper.toDTO(product))
    }
}
