import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { UpdateProductUseCase } from "@/features/catalog/app/useCases/UpdateProductUseCase"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

@injectable()
export class UpdateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private updateProductUseCase: UpdateProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { name, description, price, categoryId } = req.body

        await this.updateProductUseCase.execute({
            id,
            name,
            description,
            price,
            categoryId,
        })

        return res
            .status(StatusCodes.OK)
            .json({ message: "Product updated successfully" })
    }
}
