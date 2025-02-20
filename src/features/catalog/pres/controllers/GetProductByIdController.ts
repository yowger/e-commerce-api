import { Request, Response } from "express"

import { GetProductByIdUseCase } from "@/features/catalog/app/useCases/GetProductByIdUseCase"
import { InMemoryProductRepository } from "@/features/catalog/infra/repo/InMemoryProductRepository"

export class GetProductByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        console.log("nice")
        const productRepository = new InMemoryProductRepository()
        const getProductByIdUseCase = new GetProductByIdUseCase(
            productRepository
        )

        try {
            const product = await getProductByIdUseCase.execute(id)

            if (!product) {
                return response.status(404).json({ error: "Product not found" })
            }

            return response.status(200).json(product)
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}
