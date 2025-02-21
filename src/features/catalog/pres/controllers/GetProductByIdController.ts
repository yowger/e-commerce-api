import { Request, Response } from "express"
import { inject, injectable } from "inversify"

import { GetProductByIdUseCase } from "@/features/catalog/app/useCases/GetProductByIdUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class GetProductByIdController {
    constructor(
        @inject(catalogTokens.useCases.GetProductById)
        private getProductByIdUseCase: GetProductByIdUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        try {

            const product = await this.getProductByIdUseCase.execute(id)
            if (!product) {
                return response.status(404).json({ error: "Product not found" })
            }

            return response.status(200).json(product)
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}
