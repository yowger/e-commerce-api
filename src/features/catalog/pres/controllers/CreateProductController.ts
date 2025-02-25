import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { CreateProductUseCase } from "@/features/catalog/app/useCases/CreateProductUseCase"
import { CreateProductSchema } from "@/features/catalog/app/validation/productSchema"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { validator } from "@/lib/http/validation/Validator"

const { getBody } = validator({
    body: CreateProductSchema,
})

@injectable()
export class CreateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private createProductUseCase: CreateProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description, price, categoryId } = getBody(req)

        await this.createProductUseCase.execute({
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
