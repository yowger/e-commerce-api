import { Request, Response } from "express"

import { UpdateProductUseCase } from "@/features/catalog/app/useCases/UpdateProductUseCase"
import { InMemoryProductRepository } from "@/features/catalog/infra/repo/InMemoryProductRepository"

export class UpdateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { name, description, price, categoryId } = request.body

        const productRepository = new InMemoryProductRepository()
        const updateProductUseCase = new UpdateProductUseCase(productRepository)

        try {
            await updateProductUseCase.execute({
                id,
                name,
                description,
                price,
                categoryId,
            })
            return response
                .status(200)
                .json({ message: "Product updated successfully" })
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}
