import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { UpdateProductUseCase } from "@/features/catalog/app/useCases/UpdateProductUseCase"
import { UpdateProductSchema } from "@/features/catalog/app/validation/productSchema"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { validator } from "@/lib/http/validation/Validator"

const { getBody } = validator({
    body: UpdateProductSchema,
})

@injectable()
export class UpdateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private updateProductUseCase: UpdateProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        // TODO: finish
        const { id } = req.params
        const { name, description, price, categoryId } = getBody(req)

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
