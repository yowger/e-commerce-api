import { Request, Response } from "express"
import { inject, injectable } from "inversify"
import { StatusCodes } from "http-status-codes"

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
                return response
                    .status(StatusCodes.NOT_FOUND)
                    .json({ error: "Product not found" })
            }

            return response.status(StatusCodes.OK).json(product)
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}
