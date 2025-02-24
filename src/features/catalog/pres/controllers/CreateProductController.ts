import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { CreateProductUseCase } from "@/features/catalog/app/useCases/CreateProductUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class CreateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private createProductUseCase: CreateProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id, name, description, price, categoryId } = req.body
        await this.createProductUseCase.execute({
            id,
            name,
            description,
            price,
            categoryId,
        })

        return res.status(StatusCodes.CREATED).json({
            message: "Product created successfully",
        })
    }
}
