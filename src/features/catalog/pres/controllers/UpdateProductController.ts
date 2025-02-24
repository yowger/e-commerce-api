import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { UpdateProductUseCase } from "@/features/catalog/app/useCases/UpdateProductUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class UpdateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private updateProductUseCase: UpdateProductUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { name, description, price, categoryId } = request.body

        await this.updateProductUseCase.execute({
            id,
            name,
            description,
            price,
            categoryId,
        })

        return response
            .status(StatusCodes.OK)
            .json({ message: "Product updated successfully" })
    }
}
