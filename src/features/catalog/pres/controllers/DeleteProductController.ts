import { Request, Response } from "express"

import { DeleteProductUseCase } from "@/features/catalog/app/useCases/DeleteProductUseCase"
import { InMemoryProductRepository } from "@/features/catalog/infra/repo/InMemoryProductRepository"

export class DeleteProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const productRepository = new InMemoryProductRepository()
        const deleteProductUseCase = new DeleteProductUseCase(productRepository)

        try {
            await deleteProductUseCase.execute(id)
            
            return response.status(204).send()
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}
